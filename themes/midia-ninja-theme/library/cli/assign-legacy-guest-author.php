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
 * Performance-first (perf/252-cli-scan-optimization):
 * - No wp_cache_flush() during the scan (it wipes the WHOLE object cache —
 *   catastrophic with Redis on a live environment). Cache is warmed per batch
 *   via _prime_post_caches() instead of suspended, cutting ~27 queries/post
 *   down to ~3.
 * - End-of-run cache invalidation is targeted (clean_post_cache for changed
 *   posts + page-cache plugin flush if present), never a full object flush.
 * - Gravatar connectivity preflight: fails fast with a clear message when the
 *   host cannot reach gravatar.com (instead of silently skipping thousands of
 *   posts as "inconclusive" after 5s timeouts each).
 * - --resume continues an interrupted full run from the last processed post ID
 *   (cursor state persisted per batch under uploads/ninja-legacy-fix/).
 *
 * Audit / tracking:
 * - Every applied post receives the hidden meta `_ninja_legacy_byline_fix`
 *   with the FULL original byline (rollback ledger) + run id + timestamp.
 *   Posts carrying the ledger are fast-path-skipped on rescans.
 * - Run registry in the option `ninja_legacy_byline_fix_runs` (autoload off,
 *   last 20 runs): params, counters, duration, report paths.
 * - Per-run reports (JSON + Markdown + CSVs) are written to
 *   uploads/ninja-legacy-fix/run-<id>/ (directory is web-denied).
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
 * Assign a guest author to legacy posts byline'd by avatar-less WP users.
 */
class Assign_Legacy_Guest_Author_Command {

	const BATCH_SIZE_DEFAULT  = 500;
	const BATCH_SIZE_MIN      = 20;
	const BATCH_SIZE_MAX      = 2000;
	const DRY_RUN_SAMPLE      = 20;
	const SKIPS_SAMPLE        = 20;
	const GRAVATAR_TIMEOUT_DEF = 5;
	const GRAVATAR_TIMEOUT_MIN = 1;
	const GRAVATAR_TIMEOUT_MAX = 30;
	const FULL_RUN_THRESHOLD  = 500;
	const PILOT_MAX           = 100;
	const LEDGER_META_KEY     = '_ninja_legacy_byline_fix';
	const RUNS_OPTION_KEY     = 'ninja_legacy_byline_fix_runs';
	const RUNS_OPTION_MAX     = 20;
	const REPORTS_SUBDIR      = 'ninja-legacy-fix';
	const MEMORY_FLUSH_EVERY  = 10;

	/**
	 * Gravatar check results per email hash (static, per-process).
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
	 * Rows for the assigned.csv report (per applied post).
	 *
	 * @var array<array<string,mixed>>
	 */
	private $assigned_rows = array();

	/**
	 * Rows for the review-needed.csv report (skipped_other posts).
	 *
	 * @var array<array<string,mixed>>
	 */
	private $review_rows = array();

	/**
	 * Counters for skip lines already printed (quiet mode budget).
	 *
	 * @var int
	 */
	private $skips_shown = 0;

	/**
	 * Current run id (shared with ledger meta, reports and state file).
	 *
	 * @var string
	 */
	private $run_id = '';

	/**
	 * Unix timestamp (float) of the run start.
	 *
	 * @var float
	 */
	private $started_at = 0.0;

	/**
	 * Per-batch timings [batch => ['posts' => n, 'ms' => f]].
	 *
	 * @var array<array<string,float|int>>
	 */
	private $batch_timings = array();

	/**
	 * --batch-size (validated).
	 *
	 * @var int
	 */
	private $batch_size = self::BATCH_SIZE_DEFAULT;

	/**
	 * --gravatar-timeout (validated, seconds).
	 *
	 * @var int
	 */
	private $gravatar_timeout = self::GRAVATAR_TIMEOUT_DEF;

	/**
	 * --verbose: print every per-post line (legacy behaviour).
	 *
	 * @var bool
	 */
	private $verbose = false;

	/**
	 * Resume cursor: fixed starting point (from the state file). Only posts
	 * with ID > resume_cursor are scanned. Unlike $cursor (running last
	 * processed ID, persisted for the state file), this MUST NOT change
	 * during the run — composing it with paged OFFSETs would skip posts.
	 *
	 * @var int
	 */
	private $resume_cursor = 0;

	/**
	 * Scope definition shared by state/reports (guest slug, before, types).
	 *
	 * @var array<string,mixed>
	 */
	private $scope = array();

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
	 * [--resume]
	 * : Continue an interrupted APPLY run of the SAME scope from the last
	 * processed post ID (state persisted per batch under
	 * uploads/ninja-legacy-fix/). Counters are restored cumulatively.
	 *
	 * [--batch-size=<N>]
	 * : Posts per scan batch. Default 500 (20–2000).
	 *
	 * [--gravatar-timeout=<N>]
	 * : Timeout in seconds for the gravatar.com probes (preflight and per
	 * user). Default 5 (1–30).
	 *
	 * [--verbose]
	 * : Print every per-post line (legacy behaviour). Default prints batch
	 * headers, all matches (sample of 20 in dry-run) and a sample of skips.
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
	 *     # 4. Resume an interrupted full run (same scope).
	 *     wp ninja assign-legacy-guest-author --guest-author=cap-ninja --full-run --backup-taken --resume
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
		$resume           = (bool) Utils\get_flag_value( $assoc_args, 'resume', false );
		$this->verbose    = (bool) Utils\get_flag_value( $assoc_args, 'verbose', false );

		$mode = $pilot > 0 ? 'PILOT' : ( $dry_run ? 'DRY-RUN' : 'APPLY' );

		// --- Tunables (fail-closed on nonsense values). ---
		$this->batch_size = (int) Utils\get_flag_value( $assoc_args, 'batch-size', self::BATCH_SIZE_DEFAULT );
		if ( $this->batch_size < self::BATCH_SIZE_MIN || $this->batch_size > self::BATCH_SIZE_MAX ) {
			WP_CLI::error( sprintf( '--batch-size must be between %d and %d.', self::BATCH_SIZE_MIN, self::BATCH_SIZE_MAX ) );
		}
		$this->gravatar_timeout = (int) Utils\get_flag_value( $assoc_args, 'gravatar-timeout', self::GRAVATAR_TIMEOUT_DEF );
		if ( $this->gravatar_timeout < self::GRAVATAR_TIMEOUT_MIN || $this->gravatar_timeout > self::GRAVATAR_TIMEOUT_MAX ) {
			WP_CLI::error( sprintf( '--gravatar-timeout must be between %d and %d seconds.', self::GRAVATAR_TIMEOUT_MIN, self::GRAVATAR_TIMEOUT_MAX ) );
		}

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
		$limit       = (int) Utils\get_flag_value( $assoc_args, 'limit', 0 );
		$post_ids    = $this->parse_post_ids( Utils\get_flag_value( $assoc_args, 'post-ids', '' ) );

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
			if ( $resume ) {
				WP_CLI::error( '--pilot cannot be combined with --resume: a pilot is a small fresh batch.' );
			}
			if ( $pilot > self::PILOT_MAX ) {
				WP_CLI::error( sprintf( '--pilot=%d exceeds the maximum of %d matches. A pilot is a small visual-QA batch — use --full-run --backup-taken for the total batch.', $pilot, self::PILOT_MAX ) );
			}
		}
		if ( $resume && $dry_run ) {
			WP_CLI::error( '--resume is only valid for APPLY runs: a dry-run changes nothing, so there is nothing to resume.' );
		}
		if ( $resume && ! empty( $post_ids ) ) {
			WP_CLI::error( '--resume cannot be combined with --post-ids (explicit ID batches are small enough to re-run).' );
		}

		// --- Scope + run identity (shared by state, ledger and reports). ---
		$this->scope     = array(
			'guest' => $guest_slug,
			'before' => $before,
			'types' => implode( ',', $post_types ),
		);
		$this->run_id     = gmdate( 'Ymd-His' ) . '-' . substr( wp_hash( uniqid( '', true ) ), 0, 4 );
		$this->started_at = microtime( true );

		$counts = array(
			'scanned'                  => 0,
			'matched'                  => 0,
			'assigned'                => 0,
			'skipped_ok'              => 0, // Already a guest author (byline OK).
			'skipped_already_assigned' => 0, // Target guest author already present.
			'skipped_has_avatar'      => 0,
			'skipped_other'           => 0,
			'failed'                  => 0,
		);

		$sample_shown = 0;

		// --- Gravatar preflight: fail fast when egress is blocked. ---
		$this->preflight_gravatar();

		// --- Resume: restore cursor + cumulative counters from state. ---
		$state_file = $this->state_path();
		if ( $resume ) {
			$state = $this->load_state();
			if ( is_wp_error( $state ) ) {
				WP_CLI::error( '--resume: ' . $state->get_error_message() );
			}
			$this->run_id       = $state['run_id'];
			$this->started_at   = (float) $state['started_at'];
			$this->resume_cursor = (int) $state['cursor'];
			$this->cursor        = $this->resume_cursor;
			foreach ( $counts as $key => $value ) {
				if ( isset( $state['counts'][ $key ] ) ) {
					$counts[ $key ] = (int) $state['counts'][ $key ];
				}
			}
			WP_CLI::log( sprintf( 'RESUME: continuing run %s from post ID %d (previous counters restored: scanned %d, assigned %d, failed %d).', $this->run_id, $this->cursor, $counts['scanned'], $counts['assigned'], $counts['failed'] ) );
		} elseif ( 'APPLY' === $mode && file_exists( $state_file ) ) {
			$stale = json_decode( (string) file_get_contents( $state_file ), true );
			if ( is_array( $stale ) && empty( $stale['completed'] ) ) {
				WP_CLI::warning( sprintf( 'An interrupted run state exists for this scope (%s, cursor post ID %d). Use --resume to continue it, or delete the file to start over: %s', $stale['run_id'] ?? '?', $stale['cursor'] ?? 0, $state_file ) );
			}
		}

		$total = $this->count_candidates( $post_types, $before, $post_ids, $this->resume_cursor );

		if ( 0 === $total ) {
			WP_CLI::warning( 'No published posts found for the given criteria — nothing to do.' );
			$this->finish_run( $counts, $mode );
			return;
		}
		WP_CLI::log( sprintf( 'Scanning %d published post(s) of type [%s] published before %s%s (batch size %d).', $total, implode( ', ', $post_types ), $post_ids ? '(n/a — explicit IDs)' : $before, $dry_run ? ' [DRY-RUN]' : '', $this->batch_size ) );

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

		$this->ensure_reports_root();

		if ( 'PILOT' === $mode ) {
			$this->run_pilot( $pilot, $post_types, $before, $guest_author, $guest_slug, $assoc_args, $counts, $sample_shown );
			return;
		}

		$this->run_scan( $post_ids, $post_types, $before, $limit, $guest_author, $guest_slug, $dry_run, $counts, $sample_shown );

		if ( ! $dry_run ) {
			$this->invalidate_caches_after_apply();
		}

		$this->finish_run( $counts, $mode );
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
	 * Gravatar preflight: a single HEAD probe. When the host cannot reach
	 * gravatar.com every per-user probe would burn --gravatar-timeout seconds
	 * and classify thousands of posts as "inconclusive" (skipped_other),
	 * silently producing an incomplete run — abort instead, with guidance.
	 *
	 * @return void
	 */
	private function preflight_gravatar() {
		$hash     = md5( 'preflight@invalid.localhost' ); // Any hash works — we only test connectivity.
		$url      = sprintf( 'https://www.gravatar.com/avatar/%s?d=404&s=32', $hash );
		$response = wp_remote_head(
			$url,
			array(
				'timeout'     => $this->gravatar_timeout,
				'redirection' => 2,
				'sslverify'   => true,
			)
		);

		if ( is_wp_error( $response ) ) {
			WP_CLI::error( sprintf(
				"ABORTED: cannot reach gravatar.com (%s).\nThe avatar heuristic NEEDS gravatar.com to decide whether a WP user has a usable avatar. Without egress, every check times out after %ds and posts are skipped as \"inconclusive\" — the run would be useless and slow.\nFix the server egress/firewall for www.gravatar.com (port 443) and try again.",
				$response->get_error_message(),
				$this->gravatar_timeout
			) );
		}

		WP_CLI::log( sprintf( 'Gravatar preflight OK (HTTP %s, timeout %ds).', wp_remote_retrieve_response_code( $response ), $this->gravatar_timeout ) );
	}

	/**
	 * Run the scan/apply loop (explicit IDs mode or paged WP_Query mode).
	 *
	 * Performance model:
	 * - Cache additions are NOT suspended; instead each batch is primed in
	 *   bulk via _prime_post_caches() (3 bulk queries per batch) so the
	 *   per-post work (get_post/get_coauthors/meta) mostly hits warm caches
	 *   (~3 queries/post instead of ~27 with suspended cache).
	 * - NO wp_cache_flush() per batch: with a persistent object cache (Redis)
	 *   that wipes the WHOLE cache of the live site, 60+ times per run.
	 * - On non-persistent (in-process) caches only, the local memory cache is
	 *   reset every MEMORY_FLUSH_EVERY batches to bound RAM — harmless, it is
	 *   private to this process.
	 * - APPLY paged runs persist a cursor state per batch (--resume support).
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
		$batch        = 0;
		$batches_done = 0;

		if ( ! empty( $post_ids ) ) {
			// Explicit ID mode: process the given IDs directly.
			WP_CLI::log( sprintf( 'Scanning %d explicit post ID(s) in batches of %d...', count( $post_ids ), $this->batch_size ) );
			$chunks = array_chunk( $post_ids, $this->batch_size );
			foreach ( $chunks as $chunk ) {
				++$batch;
				$t0 = microtime( true );
				if ( function_exists( '_prime_post_caches' ) ) {
					_prime_post_caches( $chunk, true, true );
				}
				foreach ( $chunk as $post_id ) {
					$this->process_post( (int) $post_id, $guest_author, $guest_slug, $dry_run, $counts, $sample_shown );
					if ( $this->should_stop_scan( $limit, $counts ) ) {
						break 2;
					}
				}
				$this->batch_timings[ $batch ] = array( 'posts' => count( $chunk ), 'ms' => ( microtime( true ) - $t0 ) * 1000 );
				$this->log_batch_header( $batch, count( $chunk ), $counts, 'explicit IDs' );
			}
		} else {
			$paged = 1;
			while ( true ) {
				if ( $this->resume_cursor > 0 ) {
					add_filter( 'posts_where', array( $this, 'filter_where_id_gt' ), 10, 2 );
				}
				$query = new WP_Query(
					array(
						'post_type'              => $post_types,
						'post_status'            => 'publish',
						'posts_per_page'         => $this->batch_size,
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
				if ( $this->resume_cursor > 0 ) {
					remove_filter( 'posts_where', array( $this, 'filter_where_id_gt' ), 10 );
				}
				$post_ids_batch = $query->posts;
				if ( empty( $post_ids_batch ) ) {
					break;
				}
				++$batch;
				$t0 = microtime( true );
				if ( function_exists( '_prime_post_caches' ) ) {
					_prime_post_caches( $post_ids_batch, true, true );
				}
				foreach ( $post_ids_batch as $post_id ) {
					$this->process_post( (int) $post_id, $guest_author, $guest_slug, $dry_run, $counts, $sample_shown );
					if ( $this->should_stop_scan( $limit, $counts ) ) {
						break 2;
					}
				}
				$this->cursor = (int) end( $post_ids_batch );
				$this->batch_timings[ $batch ] = array( 'posts' => count( $post_ids_batch ), 'ms' => ( microtime( true ) - $t0 ) * 1000 );
				$this->log_batch_header( $batch, count( $post_ids_batch ), $counts, sprintf( 'page %d', $paged ) );

				if ( ! $dry_run ) {
					$this->write_state( $counts, false );
				}

				unset( $query, $post_ids_batch );
				++$paged;
				++$batches_done;

				// Bound RAM on non-persistent caches only (process-private).
				if ( 0 === $batches_done % self::MEMORY_FLUSH_EVERY && ! wp_using_ext_object_cache() ) {
					wp_cache_flush();
				}
			}
		}
	}

	/**
	 * posts_where filter: restrict to posts with ID greater than the resume
	 * cursor (the scan is ordered by ID ASC, so this is a strict cursor).
	 *
	 * @param string   $where WHERE clause.
	 * @param WP_Query $query Query.
	 * @return string
	 */
	public function filter_where_id_gt( $where, $query ) {
		global $wpdb;
		if ( $this->resume_cursor > 0 ) {
			$where .= $wpdb->prepare( " AND {$wpdb->posts}.ID > %d", $this->resume_cursor );
		}
		return $where;
	}

	/**
	 * One compact progress line per batch (with cumulative counters), so long
	 * runs give feedback without per-post spam.
	 *
	 * @param int   $batch  Batch number.
	 * @param int   $n      Posts in this batch.
	 * @param array $counts Counters.
	 * @param string $ctx    Context label (page N / explicit IDs).
	 * @return void
	 */
	private function log_batch_header( $batch, $n, $counts, $ctx ) {
		WP_CLI::log( sprintf(
			'--- Batch %d (%s, %d posts) | scanned %d | matched %d | skips: OK %d · assigned %d · avatar %d · other %d | failed %d ---',
			$batch,
			$ctx,
			$n,
			$counts['scanned'],
			$counts['matched'],
			$counts['skipped_ok'],
			$counts['skipped_already_assigned'],
			$counts['skipped_has_avatar'],
			$counts['skipped_other'],
			$counts['failed']
		) );
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
			$this->finish_run( $counts, 'PILOT' );
			return;
		}

		$found = count( $this->pilot_ids );
		WP_CLI::log( sprintf( 'PILOT phase 1/2 done: %d match(es) collected after scanning %d post(s).', $found, $counts['scanned'] ) );

		WP_CLI::confirm( sprintf( 'PILOT phase 2/2: APPLY "%s" to the %d post(s) above (IDs: %s)?', $guest_slug, $found, implode( ', ', $this->pilot_ids ) ), $assoc_args );

		// Reset the counters so the summary reflects the APPLY phase.
		foreach ( $counts as $key => $value ) {
			$counts[ $key ] = 0;
		}
		$sample_shown     = 0;
		$this->skips_shown = 0;

		WP_CLI::log( sprintf( 'PILOT phase 2/2: applying to %d post(s)...', $found ) );
		foreach ( $this->pilot_ids as $post_id ) {
			$this->process_post( (int) $post_id, $guest_author, $guest_slug, false, $counts, $sample_shown );
		}

		$this->invalidate_caches_after_apply();

		$this->finish_run( $counts, 'PILOT' );

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
	 * Count candidate posts for the progress header (optionally after a
	 * resume cursor).
	 *
	 * @param array  $post_types Post types.
	 * @param string $before Before date.
	 * @param array  $post_ids Explicit post IDs (overrides everything).
	 * @param int    $after_id Only count posts with ID > this (resume cursor).
	 * @return int
	 */
	private function count_candidates( $post_types, $before, $post_ids, $after_id = 0 ) {
		global $wpdb;

		if ( $post_ids ) {
			return count( $post_ids );
		}

		$placeholders = implode( ',', array_fill( 0, count( $post_types ), '%s' ) );
		// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- placeholders used.
		$sql = $wpdb->prepare( "SELECT COUNT(*) FROM $wpdb->posts WHERE post_status = 'publish' AND post_type IN ($placeholders) AND post_date < %s AND ID > %d", array_merge( $post_types, array( $before . ' 00:00:00', (int) $after_id ) ) );

		return (int) $wpdb->get_var( $sql ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
	}

	/**
	 * Process a single post: decide match/skip and (optionally) assign.
	 *
	 * Order of cheap-to-expensive checks:
	 * 1. Rollback ledger meta (fast-path: this tool already fixed the post —
	 *    zero term/user queries needed).
	 * 2. Target already present (idempotency).
	 * 3. First coauthor classification (guest author / WP user).
	 * 4. Avatar heuristic (local avatar meta, then gravatar probe).
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

		$post = get_post( $post_id );
		$date = $post ? $post->post_date : '?';

		// 1. Fast-path: the rollback ledger says a previous run of THIS tool
		// already assigned the target to this post.
		$ledger = get_post_meta( $post_id, self::LEDGER_META_KEY, true );
		if ( ! empty( $ledger ) ) {
			++$counts['skipped_already_assigned'];
			$this->line( $post_id, $date, '(ledger)', 'SKIP', 'already fixed by a previous run of this tool (ledger meta present)', $dry_run, $counts, $sample_shown );
			return;
		}

		$coauthors = function_exists( '\get_coauthors' ) ? \get_coauthors( $post_id ) : array();

		if ( empty( $coauthors ) || ! is_array( $coauthors ) ) {
			++$counts['skipped_other'];
			$this->collect_review( $post_id, $date, 'no coauthors resolve' );
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
				$this->collect_review( $post_id, $date, 'byline is a guest author WITHOUT thumbnail' );
				$this->line( $post_id, $date, $first_desc, 'SKIP', 'byline already a guest author WITHOUT thumbnail (manual review)', $dry_run, $counts, $sample_shown );
			}
			return;
		}

		if ( ! $is_wp_user || ! isset( $first->ID ) || ! ( $first->ID > 0 ) ) {
			++$counts['skipped_other'];
			$this->collect_review( $post_id, $date, 'first coauthor is neither a WP user nor a guest author' );
			$this->line( $post_id, $date, $first_desc, 'SKIP', 'first coauthor is neither a WP user nor a guest author', $dry_run, $counts, $sample_shown );
			return;
		}

		// First coauthor is a WP user — check avatar.
		$has_avatar = $this->has_usable_avatar( (int) $first->ID );
		if ( null === $has_avatar ) {
			++$counts['skipped_other'];
			$this->collect_review( $post_id, $date, 'avatar check inconclusive (network)' );
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

		// Full original byline for the rollback ledger (add_coauthors with
		// $append=false REPLACES the whole term set).
		$orig_slugs = array_values( array_filter( array_map(
			static function ( $coauthor ) {
				return isset( $coauthor->user_nicename ) ? (string) $coauthor->user_nicename : '';
			},
			$coauthors
		) ) );

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

			// Rollback ledger: full original byline + run id + timestamp.
			update_post_meta( $post_id, self::LEDGER_META_KEY, wp_json_encode( array(
				'v'          => 1,
				'run'        => $this->run_id,
				'at'         => gmdate( 'c' ),
				'guest'      => $guest_slug,
				'orig_first' => $first_desc,
				'orig_slugs' => $orig_slugs,
			), JSON_UNESCAPED_UNICODE ) );

			$this->assigned_rows[] = array(
				'post_id'    => (int) $post_id,
				'date'       => $date,
				'type'       => $post ? $post->post_type : '',
				'orig_first' => $first_desc,
				'orig_slugs' => implode( '|', $orig_slugs ),
				'run'        => $this->run_id,
				'at'         => gmdate( 'c' ),
			);

			$this->line( $post_id, $date, $first_desc, 'ASSIGNED', sprintf( 'byline is now "%s"', $guest_slug ), false, $counts, $sample_shown );
		} else {
			++$counts['failed'];
			$this->collect_review( $post_id, $date, 'add_coauthors() verification failed' );
			$after_desc = $now_first ? $this->describe_coauthor( $now_first ) : '(none)';
			WP_CLI::warning( sprintf( 'Post %d: add_coauthors() did NOT take effect (first coauthor is now %s).', $post_id, $after_desc ) );
			$this->line( $post_id, $date, $first_desc, 'FAILED', 'verification failed after add_coauthors()', false, $counts, $sample_shown );
		}
	}

	/**
	 * Collect a "review needed" row (skipped_other) for the report CSV.
	 *
	 * @param int    $post_id Post ID.
	 * @param string $date    Post date.
	 * @param string $reason  Reason.
	 * @return void
	 */
	private function collect_review( $post_id, $date, $reason ) {
		$this->review_rows[] = array(
			'post_id' => (int) $post_id,
			'date'    => $date,
			'reason'  => $reason,
		);
	}

	/**
	 * Output one per-post line. Quiet-by-default policy:
	 * - matches: always printed, except dry-run caps the sample at
	 *   DRY_RUN_SAMPLE (pilots print ALL matches — they are for humans);
	 * - skips: sample of SKIPS_SAMPLE lines unless --verbose.
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
		if ( $is_match ) {
			if ( $dry_run && ! $this->pilot_collecting && $sample_shown >= self::DRY_RUN_SAMPLE ) {
				return;
			}
			if ( $dry_run && ! $this->pilot_collecting ) {
				++$sample_shown;
			}
		} elseif ( ! $this->verbose && $this->skips_shown >= self::SKIPS_SAMPLE ) {
			return;
		} elseif ( ! $is_match && ! $this->verbose ) {
			++$this->skips_shown;
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
				'timeout'     => $this->gravatar_timeout,
				'redirection' => 2,
				'sslverify'   => true,
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

	// -------------------------------------------------------------------------
	// Cache invalidation (end of APPLY runs).
	// -------------------------------------------------------------------------

	/**
	 * Targeted invalidation after an APPLY run — NEVER a full object-cache
	 * flush:
	 * - clean_post_cache() for every changed post (also clears the
	 *   co-authors-plus per-post cache key);
	 * - page-cache plugin flush when available (W3TC) — that is the cache the
	 *   FRONTEND actually reads; a wp_cache_flush() would not touch it and
	 *   would wipe Redis for the whole site for nothing.
	 *
	 * @return void
	 */
	private function invalidate_caches_after_apply() {
		foreach ( $this->assigned_ids as $post_id ) {
			clean_post_cache( (int) $post_id );
		}

		if ( function_exists( 'w3tc_flush_all' ) ) {
			w3tc_flush_all();
			WP_CLI::log( sprintf( 'W3 Total Cache flushed (all) — page cache refreshed for %d changed post(s).', count( $this->assigned_ids ) ) );
		} else {
			WP_CLI::log( sprintf( 'Post caches cleaned for %d changed post(s). No page-cache plugin detected (no W3TC flush needed).', count( $this->assigned_ids ) ) );
		}
	}

	// -------------------------------------------------------------------------
	// State (resume support).
	// -------------------------------------------------------------------------

	/**
	 * Absolute path of the reports root (uploads basedir + subdir).
	 *
	 * @return string
	 */
	private function reports_root() {
		$uploads = wp_upload_dir();
		return trailingslashit( $uploads['basedir'] ) . self::REPORTS_SUBDIR;
	}

	/**
	 * Absolute path of the state file for the current scope.
	 *
	 * @return string
	 */
	private function state_path() {
		return $this->reports_root() . '/state-' . $this->scope_hash() . '.json';
	}

	/**
	 * Stable hash of the scope (guest + before + types) — the state identity.
	 *
	 * @return string
	 */
	private function scope_hash() {
		return substr( md5( implode( '|', array( $this->scope['guest'], $this->scope['before'], $this->scope['types'] ) ) ), 0, 10 );
	}

	/**
	 * Persist the resume state (called once per batch on APPLY paged runs).
	 *
	 * @param array $counts     Counters.
	 * @param bool  $completed  Whether the run has finished successfully.
	 * @return void
	 */
	private function write_state( $counts, $completed ) {
		$this->ensure_reports_root();
		$payload = array(
			'run_id'     => $this->run_id,
			'scope'      => $this->scope,
			'cursor'     => $this->cursor,
			'counts'     => $counts,
			'started_at' => $this->started_at,
			'updated_at' => microtime( true ),
			'completed'  => $completed,
		);
		file_put_contents( $this->state_path(), wp_json_encode( $payload, JSON_PRETTY_PRINT ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions
	}

	/**
	 * Load and validate the resume state for the current scope.
	 *
	 * @return array|\WP_Error State array or error.
	 */
	private function load_state() {
		$path = $this->state_path();
		if ( ! file_exists( $path ) ) {
			return new \WP_Error( 'no-state', sprintf( 'no interrupted-run state found for this scope (expected %s). Run without --resume or fix the scope flags.', $path ) );
		}
		$state = json_decode( (string) file_get_contents( $path ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		if ( ! is_array( $state ) ) {
			return new \WP_Error( 'bad-state', sprintf( 'state file %s is corrupt — delete it and start a fresh run (without --resume).', $path ) );
		}
		if ( ! empty( $state['completed'] ) ) {
			return new \WP_Error( 'already-completed', sprintf( 'run %s already COMPLETED — nothing to resume. Delete %s to start a new run.', $state['run_id'] ?? '?', $path ) );
		}
		foreach ( array( 'guest', 'before', 'types' ) as $key ) {
			if ( (string) ( $state['scope'][ $key ] ?? '' ) !== (string) $this->scope[ $key ] ) {
				return new \WP_Error( 'scope-mismatch', sprintf( 'state scope mismatch on "%s" (state: "%s", current: "%s") — --resume must use the same --guest-author/--before/--post-types as the interrupted run.', $key, $state['scope'][ $key ] ?? '?', $this->scope[ $key ] ) );
			}
		}
		return $state;
	}

	// -------------------------------------------------------------------------
	// Reports + run registry.
	// -------------------------------------------------------------------------

	/**
	 * Ensure the reports root exists and is web-protected.
	 *
	 * @return void
	 */
	private function ensure_reports_root() {
		$root = $this->reports_root();
		if ( ! is_dir( $root ) ) {
			wp_mkdir_p( $root );
		}
		$guards = array(
			$root . '/index.php' => "<?php\n// Silence is golden.\n",
			$root . '/.htaccess' => "<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\nOrder deny,allow\nDeny from all\n</IfModule>\n",
		);
		foreach ( $guards as $file => $content ) {
			if ( ! file_exists( $file ) ) {
				file_put_contents( $file, $content ); // phpcs:ignore WordPress.WP.AlternativeFunctions
			}
		}
	}

	/**
	 * Finish a run: write reports, record the run in the registry option,
	 * mark the state completed (APPLY paged runs) and print the summary.
	 *
	 * @param array  $counts Counters.
	 * @param string $mode   Run mode.
	 * @return void
	 */
	private function finish_run( $counts, $mode ) {
		$report_dir = $this->write_reports( $counts, $mode );
		$this->record_run( $counts, $mode, $report_dir );
		if ( 'APPLY' === $mode ) {
			$this->write_state( $counts, true );
		}
		$this->print_summary( $counts, $mode, $report_dir );
	}

	/**
	 * Write the per-run report directory (JSON + Markdown + CSVs).
	 *
	 * @param array  $counts Counters.
	 * @param string $mode   Run mode.
	 * @return string Absolute report directory (empty on failure).
	 */
	private function write_reports( $counts, $mode ) {
		$this->ensure_reports_root();
		$dir = $this->reports_root() . '/run-' . $this->run_id;
		if ( ! is_dir( $dir ) ) {
			wp_mkdir_p( $dir );
		}
		file_put_contents( $dir . '/index.php', "<?php\n// Silence is golden.\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions

		$duration = microtime( true ) - $this->started_at;
		$env      = array(
			'siteurl'     => home_url(),
			'wp_version'  => get_bloginfo( 'version' ),
			'theme'       => wp_get_theme()->get_stylesheet(),
			'theme_ver'   => wp_get_theme()->get( 'Version' ),
			'php'         => PHP_VERSION,
			'ext_cache'   => wp_using_ext_object_cache() ? 'yes' : 'no',
			'peak_memory' => memory_get_peak_usage( true ),
		);

		$json = array(
			'run_id'  => $this->run_id,
			'mode'    => $mode,
			'scope'   => $this->scope,
			'params'  => array(
				'batch_size'       => $this->batch_size,
				'gravatar_timeout' => $this->gravatar_timeout,
			),
			'env'     => $env,
			'counts'  => $counts,
			'duration_sec' => round( $duration, 2 ),
			'batches' => $this->batch_timings,
			'reports' => array(
				'assigned_csv'     => ( ! empty( $this->assigned_rows ) ) ? 'assigned.csv' : null,
				'review_needed_csv' => ( ! empty( $this->review_rows ) ) ? 'review-needed.csv' : null,
			),
		);
		file_put_contents( $dir . '/report.json', wp_json_encode( $json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions

		// assigned.csv — the applied ledger of this run (columns in header order).
		if ( ! empty( $this->assigned_rows ) ) {
			$this->write_csv( $dir . '/assigned.csv', array( 'post_id', 'date', 'type', 'url', 'orig_first', 'orig_slugs', 'run_id', 'assigned_at' ), array_map(
				static function ( $row ) {
					return array(
						$row['post_id'],
						$row['date'],
						$row['type'],
						get_permalink( $row['post_id'] ),
						$row['orig_first'],
						$row['orig_slugs'],
						$row['run'],
						$row['at'],
					);
				},
				$this->assigned_rows
			) );
		}

		// review-needed.csv — manual review queue (skipped_other).
		if ( ! empty( $this->review_rows ) ) {
			$this->write_csv( $dir . '/review-needed.csv', array( 'post_id', 'date', 'url', 'reason' ), array_map(
				static function ( $row ) {
					return array(
						$row['post_id'],
						$row['date'],
						get_permalink( $row['post_id'] ),
						$row['reason'],
					);
				},
				$this->review_rows
			) );
		}

		// report.md — human summary.
		$md  = sprintf( "# Run %s — %s\n\n", $this->run_id, $mode );
		$md .= sprintf( "- **Escopo:** guest `%s` · antes de `%s` · tipos `%s`\n", $this->scope['guest'], $this->scope['before'], $this->scope['types'] );
		$md .= sprintf( "- **Duração:** %.1fs (%d lotes, %d posts/lote)\n", $duration, count( $this->batch_timings ), $this->batch_size );
		$md .= sprintf( "- **Ambiente:** WP %s · tema %s %s · PHP %s · cache externo: %s\n", $env['wp_version'], $env['theme'], $env['theme_ver'], $env['php'], $env['ext_cache'] );
		$md .= "\n## Resultado\n\n| Métrica | Valor |\n|---|---|\n";
		foreach ( array(
			'Scanned'         => $counts['scanned'],
			'Matched'         => $counts['matched'],
			'Assigned'        => $counts['assigned'],
			'Skipped OK'      => $counts['skipped_ok'],
			'Skipped (assigned)' => $counts['skipped_already_assigned'],
			'Skipped (has avatar)' => $counts['skipped_has_avatar'],
			'Skipped (other)' => $counts['skipped_other'],
			'Failed'          => $counts['failed'],
		) as $k => $v ) {
			$md .= sprintf( "| %s | %d |\n", $k, $v );
		}
		if ( ! empty( $this->review_rows ) ) {
			$md .= sprintf( "\n> ⚠️ %d post(s) precisam de revisão manual — ver `review-needed.csv`.\n", count( $this->review_rows ) );
		}
		if ( ! empty( $this->assigned_rows ) ) {
			$md .= sprintf( "\nLedger por post no meta `%s` (rollback). Lista completa em `assigned.csv`.\n", self::LEDGER_META_KEY );
		}
		file_put_contents( $dir . '/report.md', $md ); // phpcs:ignore WordPress.WP.AlternativeFunctions

		return $dir;
	}

	/**
	 * Write rows to a CSV file.
	 *
	 * @param string              $path    Absolute path.
	 * @param array<string>       $header  Column names.
	 * @param array<array<mixed>> $rows    Rows.
	 * @return void
	 */
	private function write_csv( $path, $header, $rows ) {
		$fh = fopen( $path, 'w' ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		if ( ! $fh ) {
			WP_CLI::warning( sprintf( 'Could not write %s.', $path ) );
			return;
		}
		fputcsv( $fh, $header );
		foreach ( $rows as $row ) {
			fputcsv( $fh, array_map( static function ( $v ) {
				return is_scalar( $v ) ? (string) $v : wp_json_encode( $v );
			}, array_values( (array) $row ) ) );
		}
		fclose( $fh ); // phpcs:ignore WordPress.WP.AlternativeFunctions
	}

	/**
	 * Record the run in the registry option (autoload off, last N runs).
	 *
	 * @param array  $counts     Counters.
	 * @param string $mode       Mode.
	 * @param string $report_dir Report directory.
	 * @return void
	 */
	private function record_run( $counts, $mode, $report_dir ) {
		$runs = get_option( self::RUNS_OPTION_KEY, array() );
		if ( ! is_array( $runs ) ) {
			$runs = array();
		}
		$runs[ $this->run_id ] = array(
			'mode'         => $mode,
			'scope'        => $this->scope,
			'counts'       => $counts,
			'started_at'   => $this->started_at,
			'finished_at'  => microtime( true ),
			'duration_sec' => round( microtime( true ) - $this->started_at, 2 ),
			'report_dir'   => $report_dir,
		);
		// Keep the registry bounded: only the most recent runs.
		if ( count( $runs ) > self::RUNS_OPTION_MAX ) {
			$runs = array_slice( $runs, -1 * self::RUNS_OPTION_MAX, null, true );
		}
		update_option( self::RUNS_OPTION_KEY, $runs, false ); // autoload off.
	}

	/**
	 * Print the final summary.
	 *
	 * @param array  $counts Counters.
	 * @param string $mode   Run mode: 'DRY-RUN', 'APPLY' or 'PILOT'.
	 * @param string $report_dir Report directory (empty string hides).
	 * @return void
	 */
	private function print_summary( $counts, $mode, $report_dir = '' ) {
		WP_CLI::log( '================ SUMMARY ================' );
		WP_CLI::log( sprintf( 'Mode:            %s%s', 'DRY-RUN' === $mode ? 'DRY-RUN (no changes made)' : $mode, $this->run_id ? ' — run ' . $this->run_id : '' ) );
		WP_CLI::log( sprintf( 'Scanned:         %d', $counts['scanned'] ) );
		WP_CLI::log( sprintf( 'Matched:         %d', $counts['matched'] ) );
		WP_CLI::log( sprintf( 'Assigned:        %d', $counts['assigned'] ) );
		WP_CLI::log( sprintf( 'Skipped (already OK — guest author with thumbnail): %d', $counts['skipped_ok'] ) );
		WP_CLI::log( sprintf( 'Skipped (already assigned):  %d', $counts['skipped_already_assigned'] ) );
		WP_CLI::log( sprintf( 'Skipped (WP user has avatar): %d', $counts['skipped_has_avatar'] ) );
		WP_CLI::log( sprintf( 'Skipped (other): %d', $counts['skipped_other'] ) );
		WP_CLI::log( sprintf( 'Failed:          %d', $counts['failed'] ) );

		// Post-apply: sample permalinks of assigned posts (up to 5).
		if ( in_array( $mode, array( 'APPLY', 'PILOT' ), true ) && ! empty( $this->assigned_ids ) ) {
			WP_CLI::log( 'Example permalinks (up to 5):' );
			foreach ( array_slice( $this->assigned_ids, 0, 5 ) as $post_id ) {
				WP_CLI::log( '  - ' . get_permalink( $post_id ) );
			}
		}

		if ( ! empty( $this->review_rows ) ) {
			WP_CLI::log( sprintf( 'Manual review queue: %d post(s) — see review-needed.csv in the report dir.', count( $this->review_rows ) ) );
		}

		if ( $report_dir ) {
			WP_CLI::log( 'Report: ' . $report_dir . ' (report.json, report.md' . ( ! empty( $this->assigned_rows ) ? ', assigned.csv' : '' ) . ( ! empty( $this->review_rows ) ? ', review-needed.csv' : '' ) . ')' );
			WP_CLI::log( sprintf( 'Run registry: option `%s` · rollback ledger: post meta `%s`.', self::RUNS_OPTION_KEY, self::LEDGER_META_KEY ) );
		}
	}
}

WP_CLI::add_command( 'ninja assign-legacy-guest-author', __NAMESPACE__ . '\\Assign_Legacy_Guest_Author_Command' );
