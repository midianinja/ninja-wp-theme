<?php
/**
 * WP-CLI: ninja assign-legacy-guest-author
 *
 * Bulk-assigns a chosen guest author (Co-Authors Plus) to legacy posts whose
 * byline currently resolves to a WP user WITHOUT a usable avatar, so the
 * columnist (guest author) avatar/thumbnail appears on the frontend.
 *
 * QA-safe by design (issue #252): fail-closed active-theme check, fatal error
 * when the target guest author has no thumbnail, confirmation-free dry-run,
 * pilot mode and a full-run gate with explicit acknowledgement flags.
 *
 * Loaded from functions.php only when WP_CLI is active.
 *
 * @package hacklabTema
 */

namespace hacklabTema\CLI;

use WP_CLI;
use WP_CLI\Utils;
use WP_Query;

/**
 * Assign a guest author to legacy posts whose byline resolves to a WP user
 * without an avatar.
 */
class Assign_Legacy_Guest_Author_Command {

	const BATCH_SIZE         = 200;
	const DRY_RUN_SAMPLE     = 20;
	const GRAVATAR_TIMEOUT   = 5;
	const FULL_RUN_THRESHOLD = 500;
	const PILOT_MAX          = 100;

	/**
	 * Caches the Gravatar check per email hash (static, per-process).
	 *
	 * @var array<string, bool|null>
	 */
	private static $gravatar_cache = array();

	/**
	 * Pilot mode: post IDs collected while scanning (phase 1).
	 *
	 * @var array<int>
	 */
	private $pilot_ids = array();

	/**
	 * Whether the scan is currently collecting pilot matches.
	 *
	 * @var bool
	 */
	private $pilot_collecting = false;

	/**
	 * Pilot mode: how many matches to collect before stopping the scan.
	 *
	 * @var int
	 */
	private $pilot_target = 0;

	/**
	 * Post IDs successfully assigned in this run (for sample permalinks).
	 *
	 * @var array<int>
	 */
	private $assigned_ids = array();

	/**
	 * Assign a guest author to legacy posts byline'd by avatar-less WP users.
	 *
	 * ## OPTIONS
	 *
	 * --guest-author=<id-or-slug>
	 * : The target guest author (post of type `guest-author`). Accepts the
	 * guest author post ID or slug (with or without the `cap-` prefix).
	 *
	 * [--before=<YYYY-MM-DD>]
	 * : Only posts published before this date.
	 * ---
	 * default: 2023-12-01
	 * ---
	 *
	 * [--dry-run]
	 * : Change NOTHING. Only list what would happen. No confirmation is
	 * asked in this mode. Recommended first run.
	 *
	 * [--pilot=<N>]
	 * : Pilot mode: scan (changing nothing) until N matches are found, then
	 * apply ONLY those N posts (same apply/verify path) and print their
	 * permalinks for visual QA. N must be <= 100. A pilot never counts as
	 * a full run. Cannot be combined with --dry-run, --post-ids,
	 * --full-run or --backup-taken.
	 *
	 * [--limit=<N>]
	 * : Cap the number of posts processed (useful for a small first batch).
	 *
	 * [--post-ids=<id1,id2>]
	 * : Explicit comma-separated list of post IDs. Overrides --before.
	 *
	 * [--post-types=<type1,type2>]
	 * : Comma-separated post types to scan.
	 * ---
	 * default: post,opiniao
	 * ---
	 *
	 * [--full-run]
	 * : Acknowledge a full-batch run: "I know I will affect all N matched
	 * posts". Required (together with --backup-taken) whenever the scope
	 * exceeds 500 posts and no --post-ids/--pilot/--limit(<=500) narrows it.
	 *
	 * [--backup-taken]
	 * : Acknowledge that a fresh database backup was taken just now.
	 * Required together with --full-run for scopes above the threshold.
	 *
	 * [--skip-theme-check]
	 * : Skip the fail-closed active-theme template check. A warning is
	 * logged. Only for emergencies — assigning guest authors without the
	 * fixed templates does NOT fix the avatars.
	 *
	 * [--yes]
	 * : Answer yes to the confirmation prompt (useful for scripts).
	 *
	 * ## EXAMPLES
	 *
	 *     # 1. Simulate — no confirmation, no changes.
	 *     wp ninja assign-legacy-guest-author --guest-author=cap-ninja --dry-run
	 *
	 *     # 2. Pilot — apply only the first 3 matches, then check their URLs.
	 *     wp ninja assign-legacy-guest-author --guest-author=cap-ninja --pilot=3
	 *
	 *     # 3. Full run — refuses to run without BOTH acknowledgement flags.
	 *     wp ninja assign-legacy-guest-author --guest-author=cap-ninja --full-run --backup-taken
	 *
	 *     # Manual batch of known IDs (narrow scope, no full-run flags needed).
	 *     wp ninja assign-legacy-guest-author --guest-author=cap-ninja --post-ids=123,456
	 *
	 * @when after_wp_load
	 *
	 * @param array $args Positional args.
	 * @param array $assoc_args Associative args.
	 */
	public function __invoke( $args, $assoc_args ) {
		$dry_run          = (bool) Utils\get_flag_value( $assoc_args, 'dry-run', false );
		$pilot            = absint( Utils\get_flag_value( $assoc_args, 'pilot', 0 ) );
		$full_run         = (bool) Utils\get_flag_value( $assoc_args, 'full-run', false );
		$backup_taken     = (bool) Utils\get_flag_value( $assoc_args, 'backup-taken', false );
		$skip_theme_check = (bool) Utils\get_flag_value( $assoc_args, 'skip-theme-check', false );

		$mode = $pilot > 0 ? 'PILOT' : ( $dry_run ? 'DRY-RUN' : 'APPLY' );

		// --- Guard: the ACTIVE theme must already contain the template fix. ---
		$this->guard_active_theme_templates( $skip_theme_check );

		// --- Safeguard: the plugin object and method MUST be available. ---
		global $coauthors_plus;
		if ( ! $coauthors_plus instanceof \CoAuthors_Plus || ! is_callable( array( $coauthors_plus, 'add_coauthors' ) ) ) {
			WP_CLI::error( 'Co-Authors Plus object not available — is the plugin active and loaded? (Expected global $coauthors_plus of class CoAuthors_Plus with add_coauthors() method.)' );
		}
		if ( ! function_exists( '\get_coauthors' ) ) {
			WP_CLI::error( 'Co-Authors Plus template tags not loaded (get_coauthors() missing) — is the plugin active and loaded?' );
		}

		// --- Resolve the target guest author. ---
		$guest_author = $this->resolve_guest_author( $assoc_args );
		if ( ! $guest_author ) {
			WP_CLI::error( 'Guest author not found. Pass --guest-author=<id-or-slug> matching a post of type guest-author (try `wp post list --post_type=guest-author --fields=ID,post_name`).' );
		}
		$guest_slug = $guest_author->user_nicename;
		$label      = sprintf( 'guest author "%s" (ID %d)%s', $guest_author->post_title ?? $guest_slug, $guest_author->ID, isset( $guest_author->wp_user ) ? ' [linked to WP user ' . $guest_author->wp_user->user_login . ']' : ' [NOT linked to a WP user]' );
		WP_CLI::log( 'Target: ' . $label );

		// Prerequisite #1 of the guide: a guest author WITHOUT a featured image
		// does not fix the avatar — refuse to run.
		if ( ! has_post_thumbnail( $guest_author->ID ) ) {
			WP_CLI::error( sprintf( 'The target guest author has NO featured image/thumbnail — assigning it will NOT fix the avatar. This is prerequisite #1: set the guest author featured image BEFORE running (check with `wp post meta get %d _thumbnail_id`).', $guest_author->ID ) );
		}

		$post_types = array_filter( array_map( 'trim', explode( ',', (string) Utils\get_flag_value( $assoc_args, 'post-types', 'post,opiniao' ) ) ) );
		$before     = (string) Utils\get_flag_value( $assoc_args, 'before', '2023-12-01' );
		$limit      = (int) Utils\get_flag_value( $assoc_args, 'limit', 0 );
		$post_ids   = $this->parse_post_ids( Utils\get_flag_value( $assoc_args, 'post-ids', '' ) );

		// --- Pilot mode: validate combinations up front (fail-closed). ---
		if ( $pilot > 0 ) {
			if ( $dry_run ) {
				WP_CLI::error( '--pilot cannot be combined with --dry-run: the pilot APPLIES to N posts (use --dry-run alone for pure simulation).' );
			}
			if ( ! empty( $post_ids ) ) {
				WP_CLI::error( '--pilot cannot be combined with --post-ids (use --post-ids alone for a manual batch of known IDs).' );
			}
			if ( $full_run || $backup_taken ) {
				WP_CLI::error( '--pilot cannot be combined with --full-run/--backup-taken: a pilot is never a full run.' );
			}
			if ( $pilot > self::PILOT_MAX ) {
				WP_CLI::error( sprintf( '--pilot=%d exceeds the maximum of %d matches. A pilot is a small visual-QA batch — use --full-run --backup-taken for the total batch.', $pilot, self::PILOT_MAX ) );
			}
		}

		$counts = array(
			'scanned'                 => 0,
			'matched'                 => 0,
			'assigned'                => 0,
			'skipped_ok'              => 0, // Already a guest author (byline OK).
			'skipped_already_assigned' => 0, // Target guest author already present.
			'skipped_has_avatar'      => 0,
			'skipped_other'           => 0,
			'failed'                  => 0,
		);

		$sample_shown = 0;
		$total        = $this->count_candidates( $post_types, $before, $post_ids );

		if ( 0 === $total ) {
			WP_CLI::warning( 'No published posts found for the given criteria — nothing to do.' );
			$this->print_summary( $counts, $mode );
			return;
		}
		WP_CLI::log( sprintf( 'Scanning %d published post(s) of type [%s] published before %s%s (batch size %d).', $total, implode( ', ', $post_types ), $post_ids ? '(n/a — explicit IDs)' : $before, $dry_run ? ' [DRY-RUN]' : '', self::BATCH_SIZE ) );

		// --- Full-run gate: an APPLY whose scope exceeds the threshold and is
		// not narrowed by --post-ids/--pilot/--limit(<=threshold) requires BOTH
		// --full-run AND --backup-taken. ---
		$small_limit = ( $limit > 0 && $limit <= self::FULL_RUN_THRESHOLD );
		if ( 'APPLY' === $mode && empty( $post_ids ) && ! $small_limit && $total > self::FULL_RUN_THRESHOLD && ! ( $full_run && $backup_taken ) ) {
			$missing = array();
			if ( ! $full_run ) {
				$missing[] = '--full-run      ("I know I will affect up to ' . $total . ' posts")';
			}
			if ( ! $backup_taken ) {
				$missing[] = '--backup-taken  ("a database backup was taken just now")';
			}
			$extra = '';
			if ( isset( $assoc_args['before'] ) ) {
				$extra .= ' --before=' . $assoc_args['before'];
			}
			if ( isset( $assoc_args['post-types'] ) ) {
				$extra .= ' --post-types=' . $assoc_args['post-types'];
			}
			$suggested = sprintf( 'wp ninja assign-legacy-guest-author --guest-author=%s%s --full-run --backup-taken', (string) $assoc_args['guest-author'], $extra );

			WP_CLI::error( sprintf(
				"ABORTED: this would be a FULL BATCH run.\nScope: %d published post(s) — above the safety threshold of %d — with no --post-ids, --pilot or --limit<=%d narrowing it.\nA full run requires BOTH acknowledgement flags. Missing:\n  %s\n\nFull command to copy:\n  %s",
				$total,
				self::FULL_RUN_THRESHOLD,
				self::FULL_RUN_THRESHOLD,
				implode( "\n  ", $missing ),
				$suggested
			) );
		}

		// --- Confirmation policy ---
		// DRY-RUN asks NOTHING (it changes nothing — confirming here would
		// teach the habit of typing/forcing --yes which then leaks into the
		// real apply run).
		if ( 'DRY-RUN' === $mode ) {
			WP_CLI::log( 'DRY-RUN: nothing will be changed — no confirmation needed.' );
		} elseif ( $full_run && $backup_taken ) {
			WP_CLI::confirm( sprintf( 'FULL RUN acknowledged (--full-run + --backup-taken): this will scan %d post(s) and MODIFY the byline of every match. Proceed?', $total ), $assoc_args );
		} elseif ( 'APPLY' === $mode ) {
			WP_CLI::confirm( 'This will MODIFY post bylines. Are you sure?', $assoc_args );
		}
		// PILOT confirms later, between the scan phase and the apply phase,
		// once the exact post IDs are known.

		if ( 'PILOT' === $mode ) {
			$this->run_pilot( $pilot, $post_types, $before, $guest_author, $guest_slug, $assoc_args, $counts, $sample_shown );
			return;
		}

		$this->run_scan( $post_ids, $post_types, $before, $limit, $guest_author, $guest_slug, $dry_run, $counts, $sample_shown );

		if ( ! $dry_run ) {
			wp_cache_flush();
			WP_CLI::log( 'Object cache flushed.' );
		}

		$this->print_summary( $counts, $mode );
	}

	/**
	 * Fail-closed guard: the ACTIVE theme must already contain the template
	 * fix (a call to coauthors_get_avatar()) in BOTH single.php and
	 * single-opiniao.php. Assigning guest authors without the fixed templates
	 * does not fix any avatar — refuse to run.
	 *
	 * @param bool $skip Whether --skip-theme-check was passed.
	 * @return void
	 */
	private function guard_active_theme_templates( $skip ) {
		if ( $skip ) {
			WP_CLI::warning( '--skip-theme-check: bypassing the active-theme template check. The templates MUST already contain coauthors_get_avatar() or the avatars will NOT be fixed.' );
			return;
		}

		$template = (string) get_template();
		$files    = array( 'single.php', 'single-opiniao.php' );
		$missing  = array();

		foreach ( $files as $file ) {
			$path    = (string) get_theme_file_path( $file );
			$content = ( $path && file_exists( $path ) ) ? (string) file_get_contents( $path ) : '';
			if ( false === strpos( $content, 'coauthors_get_avatar' ) ) {
				$missing[] = sprintf( '%s (looked at %s)', $file, $path ? $path : '(no path resolved)' );
			}
		}

		if ( ! empty( $missing ) ) {
			WP_CLI::error( sprintf(
				"ABORTED: the active theme (%s) does not contain the template fix — update the theme BEFORE assigning guest authors.\nMissing/without the fix:\n  %s\nThe fix is a call to coauthors_get_avatar() in the theme templates; assigning guest authors without it will NOT fix the avatars.\nIf you REALLY know better, rerun with --skip-theme-check (a warning will be logged).",
				$template,
				implode( "\n  ", $missing )
			) );
		}

		WP_CLI::log( sprintf( 'Theme check OK: active theme "%s" — coauthors_get_avatar() found in single.php and single-opiniao.php.', $template ) );
	}

	/**
	 * Run the scan/apply loop (explicit IDs mode or paged WP_Query mode).
	 *
	 * @param array  $post_ids      Explicit post IDs (empty = paged scan).
	 * @param array  $post_types    Post types.
	 * @param string $before        Before date.
	 * @param int    $limit         Max posts to scan (0 = no cap).
	 * @param object $guest_author  Resolved target guest author.
	 * @param string $guest_slug    Target guest author nicename.
	 * @param bool   $dry_run       Whether to change nothing.
	 * @param array  $counts        Counters (by reference).
	 * @param int    $sample_shown  Sample lines shown (by reference).
	 * @return void
	 */
	private function run_scan( $post_ids, $post_types, $before, $limit, $guest_author, $guest_slug, $dry_run, &$counts, &$sample_shown ) {
		$batch = 0;

		wp_suspend_cache_addition( true );

		if ( ! empty( $post_ids ) ) {
			// Explicit ID mode: process the given IDs directly.
			$chunks = array_chunk( $post_ids, self::BATCH_SIZE );
			foreach ( $chunks as $chunk ) {
				++$batch;
				WP_CLI::log( sprintf( '--- Batch %d (%d posts) ---', $batch, count( $chunk ) ) );
				foreach ( $chunk as $post_id ) {
					$this->process_post( (int) $post_id, $guest_author, $guest_slug, $dry_run, $counts, $sample_shown );
					if ( $this->should_stop_scan( $limit, $counts ) ) {
						break 2;
					}
				}
			}
		} else {
			$paged = 1;
			while ( true ) {
				$query = new WP_Query(
					array(
						'post_type'              => $post_types,
						'post_status'            => 'publish',
						'posts_per_page'         => self::BATCH_SIZE,
						'paged'                  => $paged,
						'no_found_rows'          => true,
						'fields'                 => 'ids',
						'update_post_meta_cache' => false,
						'update_post_term_cache' => false,
						'orderby'                => 'ID',
						'order'                  => 'ASC',
						'date_query'             => array(
							array(
								'before'    => $before . ' 00:00:00',
								'inclusive' => false,
							),
						),
					)
				);
				$post_ids_batch = $query->posts;
				if ( empty( $post_ids_batch ) ) {
					break;
				}
				++$batch;
				WP_CLI::log( sprintf( '--- Batch %d (page %d, %d posts) ---', $batch, $paged, count( $post_ids_batch ) ) );
				foreach ( $post_ids_batch as $post_id ) {
					$this->process_post( (int) $post_id, $guest_author, $guest_slug, $dry_run, $counts, $sample_shown );
					if ( $this->should_stop_scan( $limit, $counts ) ) {
						break 2;
					}
				}
				unset( $query );
				wp_cache_flush();
				++$paged;
			}
		}

		wp_suspend_cache_addition( false );
	}

	/**
	 * Whether the scan loop should stop now: --limit reached, or the pilot
	 * collected its target number of matches.
	 *
	 * @param int   $limit  Max posts to scan (0 = no cap).
	 * @param array $counts Counters.
	 * @return bool
	 */
	private function should_stop_scan( $limit, $counts ) {
		if ( $limit > 0 && $counts['scanned'] >= $limit ) {
			return true;
		}
		if ( $this->pilot_collecting && count( $this->pilot_ids ) >= $this->pilot_target ) {
			return true;
		}
		return false;
	}

	/**
	 * Pilot mode: phase 1 scans (changing nothing) until N matches are
	 * collected; phase 2 applies ONLY those N posts through the regular
	 * apply/verify path and lists their permalinks for visual QA.
	 *
	 * @param int    $pilot         Number of matches to apply (1..100).
	 * @param array  $post_types    Post types.
	 * @param string $before        Before date.
	 * @param object $guest_author  Resolved target guest author.
	 * @param string $guest_slug    Target guest author nicename.
	 * @param array  $assoc_args    Associative args (for --yes).
	 * @param array  $counts        Counters (by reference).
	 * @param int    $sample_shown  Sample lines shown (by reference).
	 * @return void
	 */
	private function run_pilot( $pilot, $post_types, $before, $guest_author, $guest_slug, $assoc_args, &$counts, &$sample_shown ) {
		WP_CLI::log( sprintf( 'PILOT phase 1/2: scanning (no changes yet) until %d match(es) are found...', $pilot ) );

		$this->pilot_collecting = true;
		$this->pilot_target     = $pilot;
		$this->run_scan( array(), $post_types, $before, 0, $guest_author, $guest_slug, true, $counts, $sample_shown );
		$this->pilot_collecting = false;

		if ( empty( $this->pilot_ids ) ) {
			WP_CLI::warning( sprintf( 'PILOT: no matches found while scanning %d post(s) — nothing applied (see summary).', $counts['scanned'] ) );
			$this->print_summary( $counts, 'PILOT' );
			return;
		}

		$found = count( $this->pilot_ids );
		WP_CLI::log( sprintf( 'PILOT phase 1/2 done: %d match(es) collected after scanning %d post(s).', $found, $counts['scanned'] ) );

		WP_CLI::confirm( sprintf( 'PILOT phase 2/2: APPLY "%s" to the %d post(s) above (IDs: %s)?', $guest_slug, $found, implode( ', ', $this->pilot_ids ) ), $assoc_args );

		// Reset the counters so the summary reflects the APPLY phase.
		foreach ( $counts as $key => $value ) {
			$counts[ $key ] = 0;
		}
		$sample_shown = 0;

		WP_CLI::log( sprintf( 'PILOT phase 2/2: applying to %d post(s)...', $found ) );
		foreach ( $this->pilot_ids as $post_id ) {
			$this->process_post( (int) $post_id, $guest_author, $guest_slug, false, $counts, $sample_shown );
		}

		wp_cache_flush();
		WP_CLI::log( 'Object cache flushed.' );

		$this->print_summary( $counts, 'PILOT' );

		$applied = array_intersect( $this->pilot_ids, $this->assigned_ids );
		if ( ! empty( $applied ) ) {
			WP_CLI::log( '' );
			WP_CLI::log( sprintf( 'PILOT: confira o avatar do colunista nestas %d URL(s) antes do lote total:', count( $applied ) ) );
			foreach ( $applied as $post_id ) {
				WP_CLI::log( '  - ' . get_permalink( $post_id ) );
			}
		} else {
			WP_CLI::warning( 'PILOT: none of the collected posts were applied — check the FAILED lines above.' );
		}
	}

	/**
	 * Resolve the --guest-author value to a guest author object.
	 *
	 * @param array $assoc_args Associative args.
	 * @return object|false Guest author object or false.
	 */
	private function resolve_guest_author( $assoc_args ) {
		global $coauthors_plus;

		$value = (string) Utils\get_flag_value( $assoc_args, 'guest-author', '' );
		if ( '' === $value ) {
			return false;
		}

		$guest_author = false;

		// Numeric value: try as guest-author post ID first.
		if ( is_numeric( $value ) ) {
			$guest_author = $coauthors_plus->guest_authors->get_guest_author_by( 'ID', (int) $value );
		}

		// Slug / login / nicename.
		if ( ! is_object( $guest_author ) ) {
			$guest_author = $coauthors_plus->get_coauthor_by( 'user_login', $value );
		}

		if ( ! is_object( $guest_author ) ) {
			$guest_author = $coauthors_plus->get_coauthor_by( 'slug', $value );
		}

		if ( ! is_object( $guest_author ) || ! isset( $guest_author->type ) || 'guest-author' !== $guest_author->type ) {
			return false;
		}

		return $guest_author;
	}

	/**
	 * Parse a comma-separated list of post IDs.
	 *
	 * @param string $raw Raw value.
	 * @return array<int>
	 */
	private function parse_post_ids( $raw ) {
		$ids = array_filter( array_map( 'absint', explode( ',', (string) $raw ) ) );
		return array_values( array_unique( $ids ) );
	}

	/**
	 * Count candidate posts for the progress header.
	 *
	 * @param array $post_types Post types.
	 * @param string $before Before date.
	 * @param array $post_ids Explicit post IDs (overrides everything).
	 * @return int
	 */
	private function count_candidates( $post_types, $before, $post_ids ) {
		global $wpdb;

		if ( $post_ids ) {
			return count( $post_ids );
		}

		$placeholders = implode( ',', array_fill( 0, count( $post_types ), '%s' ) );
		// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- placeholders used.
		$sql = $wpdb->prepare( "SELECT COUNT(*) FROM $wpdb->posts WHERE post_status = 'publish' AND post_type IN ($placeholders) AND post_date < %s", array_merge( $post_types, array( $before . ' 00:00:00' ) ) );

		return (int) $wpdb->get_var( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
	}

	/**
	 * Process a single post: decide match/skip and (optionally) assign.
	 *
	 * @param int    $post_id      Post ID.
	 * @param object $guest_author Resolved target guest author.
	 * @param string $guest_slug   Target guest author nicename.
	 * @param bool   $dry_run      Whether to change nothing.
	 * @param array  $counts       Counters (by reference).
	 * @param int    $sample_shown Sample lines shown (by reference).
	 */
	private function process_post( $post_id, $guest_author, $guest_slug, $dry_run, &$counts, &$sample_shown ) {
		global $coauthors_plus;

		++$counts['scanned'];

		$post     = get_post( $post_id );
		$date     = $post ? $post->post_date : '?';
		$coauthors = function_exists( '\get_coauthors' ) ? \get_coauthors( $post_id ) : array();

		if ( empty( $coauthors ) || ! is_array( $coauthors ) ) {
			++$counts['skipped_other'];
			$this->line( $post_id, $date, '(no coauthors)', 'SKIP', 'no coauthors resolve', $dry_run, $counts, $sample_shown );
			return;
		}

		$first          = $coauthors[0];
		$first_desc     = $this->describe_coauthor( $first );
		$target_present = false;
		foreach ( $coauthors as $coauthor ) {
			if ( isset( $coauthor->user_nicename ) && $coauthor->user_nicename === $guest_slug ) {
				$target_present = true;
				break;
			}
		}

		// Idempotency: target guest author already assigned.
		if ( $target_present ) {
			++$counts['skipped_already_assigned'];
			$this->line( $post_id, $date, $first_desc, 'SKIP', 'target guest author already assigned', $dry_run, $counts, $sample_shown );
			return;
		}

		$is_guest_author = ( isset( $first->type ) && 'guest-author' === $first->type );
		$is_wp_user      = ( $first instanceof \WP_User ) || ( isset( $first->type ) && 'wpuser' === $first->type );

		if ( $is_guest_author ) {
			// Byline already resolves to a guest author.
			if ( has_post_thumbnail( $first->ID ) ) {
				++$counts['skipped_ok'];
				$this->line( $post_id, $date, $first_desc, 'SKIP', 'already OK (guest author with thumbnail)', $dry_run, $counts, $sample_shown );
			} else {
				++$counts['skipped_other'];
				$this->line( $post_id, $date, $first_desc, 'SKIP', 'byline already a guest author WITHOUT thumbnail (manual review)', $dry_run, $counts, $sample_shown );
			}
			return;
		}

		if ( ! $is_wp_user || ! isset( $first->ID ) || ! ( $first->ID > 0 ) ) {
			++$counts['skipped_other'];
			$this->line( $post_id, $date, $first_desc, 'SKIP', 'first coauthor is neither a WP user nor a guest author', $dry_run, $counts, $sample_shown );
			return;
		}

		// First coauthor is a WP user — check avatar.
		$has_avatar = $this->has_usable_avatar( (int) $first->ID );
		if ( null === $has_avatar ) {
			++$counts['skipped_other'];
			$this->line( $post_id, $date, $first_desc, 'SKIP', 'avatar check inconclusive (network error) — NOT touched for safety', $dry_run, $counts, $sample_shown );
			return;
		}
		if ( $has_avatar ) {
			++$counts['skipped_has_avatar'];
			$this->line( $post_id, $date, $first_desc, 'SKIP', 'WP user already has a usable avatar', $dry_run, $counts, $sample_shown );
			return;
		}

		// MATCH.
		++$counts['matched'];

		if ( $dry_run ) {
			$this->line( $post_id, $date, $first_desc, 'WOULD-ASSIGN', sprintf( 'replace byline with "%s"', $guest_slug ), $dry_run, $counts, $sample_shown, true );
			// Pilot phase 1: collect the match (no changes made yet).
			if ( $this->pilot_collecting ) {
				$this->pilot_ids[] = (int) $post_id;
			}
			return;
		}

		// APPLY. Use the plugin API as a METHOD (add_coauthors is NOT a global
		// function). NOTE: when the guest author is NOT linked to a WP user,
		// add_coauthors() sets the terms but returns false because it cannot
		// update wp_posts.post_author — so we verify via get_coauthors() below.
		$coauthors_plus->add_coauthors( $post_id, array( $guest_slug ) );

		$after     = \get_coauthors( $post_id );
		$now_first = ! empty( $after ) ? $after[0] : null;
		if ( $now_first && isset( $now_first->user_nicename ) && $now_first->user_nicename === $guest_slug ) {
			++$counts['assigned'];
			$this->assigned_ids[] = (int) $post_id;
			$this->line( $post_id, $date, $first_desc, 'ASSIGNED', sprintf( 'byline is now "%s"', $guest_slug ), false, $counts, $sample_shown );
		} else {
			++$counts['failed'];
			$after_desc = $now_first ? $this->describe_coauthor( $now_first ) : '(none)';
			WP_CLI::warning( sprintf( 'Post %d: add_coauthors() did NOT take effect (first coauthor is now %s).', $post_id, $after_desc ) );
			$this->line( $post_id, $date, $first_desc, 'FAILED', 'verification failed after add_coauthors()', false, $counts, $sample_shown );
		}
	}

	/**
	 * Output one per-post line; in dry-run only the first DRY_RUN_SAMPLE matches
	 * are shown individually (plus every skip in verbose-ish compact form).
	 *
	 * @param int    $post_id      Post ID.
	 * @param string $date         Post date.
	 * @param string $current      Current first coauthor description.
	 * @param string $action       Action label.
	 * @param string $reason       Reason.
	 * @param bool   $dry_run      Dry-run flag.
	 * @param array  $counts       Counters (by reference).
	 * @param int    $sample_shown Sample counter (by reference).
	 * @param bool   $is_match     Whether this line is a "match".
	 */
	private function line( $post_id, $date, $current, $action, $reason, $dry_run, &$counts, &$sample_shown, $is_match = false ) {
		if ( $dry_run && $is_match && $sample_shown >= self::DRY_RUN_SAMPLE ) {
			return; // Only the sample of matches is printed individually in dry-run.
		}
		if ( $dry_run && $is_match ) {
			++$sample_shown;
		}
		WP_CLI::log( sprintf( '[%s] post %d | %s | first coauthor: %s | %s', $action, $post_id, $date, $current, $reason ) );
	}

	/**
	 * Human description of a coauthor object.
	 *
	 * @param object $coauthor Coauthor object.
	 * @return string
	 */
	private function describe_coauthor( $coauthor ) {
		if ( $coauthor instanceof \WP_User ) {
			return sprintf( 'WP user "%s" (ID %d)', $coauthor->user_login, $coauthor->ID );
		}
		if ( isset( $coauthor->type ) && 'guest-author' === $coauthor->type ) {
			return sprintf( 'guest author "%s" (ID %d)%s', $coauthor->user_login ?? '?', $coauthor->ID, has_post_thumbnail( $coauthor->ID ) ? ' [thumb]' : ' [no-thumb]' );
		}
		return 'unknown (' . get_class( (object) $coauthor ) . ')';
	}

	/**
	 * Whether a WP user has a usable avatar.
	 *
	 * Heuristic (tri-state):
	 *  - true  = the user definitively has a usable avatar:
	 *            (a) a `simple_local_avatar` user meta pointing to a valid
	 *                attachment with a file (Simple Local Avatars plugin), OR
	 *            (b) a confirmed Gravatar (gravatar.com answers HTTP 200 for
	 *                the email hash with `d=404`, i.e. NOT the 404 fallback).
	 *  - false = confirmed NO usable avatar (no local avatar meta and
	 *            gravatar.com answers 404).
	 *  - null  = inconclusive (network error / unexpected status) — callers
	 *            MUST treat the post as a skip, never assign.
	 *
	 * Results of the remote Gravatar probe are cached per-process by email hash.
	 *
	 * @param int $user_id WP user ID.
	 * @return bool|null
	 */
	private function has_usable_avatar( $user_id ) {
		// (a) Simple Local Avatars: meta may be an array with media_id / full,
		// or a plain attachment ID depending on plugin version.
		$local = get_user_meta( $user_id, 'simple_local_avatar', true );
		if ( is_array( $local ) ) {
			$media_id = isset( $local['media_id'] ) ? (int) $local['media_id'] : 0;
		} else {
			$media_id = (int) $local;
		}
		if ( $media_id > 0 && wp_get_attachment_url( $media_id ) ) {
			return true;
		}

		// (b) Confirmed Gravatar probe.
		$user = get_userdata( $user_id );
		if ( ! $user || empty( $user->user_email ) ) {
			return false;
		}

		$hash = md5( strtolower( trim( $user->user_email ) ) );
		if ( array_key_exists( $hash, self::$gravatar_cache ) ) {
			return self::$gravatar_cache[ $hash ];
		}

		$url      = sprintf( 'https://www.gravatar.com/avatar/%s?d=404&s=32', $hash );
		$response = wp_remote_head(
			$url,
			array(
				'timeout'     => self::GRAVATAR_TIMEOUT,
				'redirection' => 2,
				'sslverify'   => false,
			)
		);

		if ( is_wp_error( $response ) ) {
			self::$gravatar_cache[ $hash ] = null;
			return null;
		}

		$code = (int) wp_remote_retrieve_response_code( $response );
		if ( 200 === $code ) {
			self::$gravatar_cache[ $hash ] = true;
			return true;
		}
		if ( 404 === $code ) {
			self::$gravatar_cache[ $hash ] = false;
			return false;
		}

		self::$gravatar_cache[ $hash ] = null;
		return null;
	}

	/**
	 * Print the final summary.
	 *
	 * @param array  $counts Counters.
	 * @param string $mode   Run mode: 'DRY-RUN', 'APPLY' or 'PILOT'.
	 * @return void
	 */
	private function print_summary( $counts, $mode ) {
		WP_CLI::log( '================ SUMMARY ================' );
		WP_CLI::log( sprintf( 'Mode:            %s', 'DRY-RUN' === $mode ? 'DRY-RUN (no changes made)' : $mode ) );
		WP_CLI::log( sprintf( 'Scanned:         %d', $counts['scanned'] ) );
		WP_CLI::log( sprintf( 'Matched:         %d', $counts['matched'] ) );
		WP_CLI::log( sprintf( 'Assigned:        %d', $counts['assigned'] ) );
		WP_CLI::log( sprintf( 'Skipped (already OK — guest author with thumbnail): %d', $counts['skipped_ok'] ) );
		WP_CLI::log( sprintf( 'Skipped (already assigned):  %d', $counts['skipped_already_assigned'] ) );
		WP_CLI::log( sprintf( 'Skipped (WP user has avatar): %d', $counts['skipped_has_avatar'] ) );
		WP_CLI::log( sprintf( 'Skipped (other): %d', $counts['skipped_other'] ) );
		WP_CLI::log( sprintf( 'Failed:          %d', $counts['failed'] ) );

		// Post-apply: sample permalinks of assigned posts (up to 5).
		if ( 'APPLY' === $mode && ! empty( $this->assigned_ids ) ) {
			WP_CLI::log( 'Example permalinks (up to 5):' );
			foreach ( array_slice( $this->assigned_ids, 0, 5 ) as $post_id ) {
				WP_CLI::log( '  - ' . get_permalink( $post_id ) );
			}
		}
	}
}

WP_CLI::add_command( 'ninja assign-legacy-guest-author', __NAMESPACE__ . '\\Assign_Legacy_Guest_Author_Command' );
