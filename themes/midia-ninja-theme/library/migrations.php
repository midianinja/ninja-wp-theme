<?php
/**
 * One-shot theme migrations.
 *
 * HARD REQUIREMENT (issue #332): a theme update must NEVER cause a fatal
 * error in any scenario. Every migration step fails silently (error_log
 * only) and the site keeps working. When a dependency (e.g. Co-Authors
 * Plus) is missing, the routine returns WITHOUT setting the flag so it
 * retries on the next request.
 *
 * Progress is tracked in the `ninja_theme_migrations` option (int). The
 * fast path performs a single get_option() per request and bails out as
 * soon as the stored version is >= the target version.
 *
 * The routine runs on `init` at priority 999: Co-Authors Plus registers
 * its `author` taxonomy on `init` at priority 100 (action_init_late,
 * since 3.6.x) — running earlier makes every term operation fail with
 * `invalid_taxonomy`.
 *
 * @package hacklabTema
 */

namespace hacklabTema;

const NINJA_THEME_MIGRATIONS_OPTION = 'ninja_theme_migrations';
const NINJA_THEME_MIGRATIONS_TARGET = 1;

add_action( 'init', function () {
	// Fast path: single get_option() per request — nothing to do.
	$version = (int) get_option( NINJA_THEME_MIGRATIONS_OPTION, 0 );
	if ( $version >= NINJA_THEME_MIGRATIONS_TARGET ) {
		return;
	}

	// Guard 1: Co-Authors Plus must be loaded with the API we rely on.
	// If not, skip WITHOUT setting the flag (retries next request).
	$cap = isset( $GLOBALS['coauthors_plus'] ) ? $GLOBALS['coauthors_plus'] : null;
	if (
		! $cap instanceof \CoAuthors_Plus
		|| ! isset( $cap->guest_authors )
		|| ! $cap->guest_authors instanceof \CoAuthors_Guest_Authors
		|| ! method_exists( $cap->guest_authors, 'get_guest_author_by' )
		|| ! method_exists( $cap->guest_authors, 'create' )
		|| ! method_exists( $cap, 'add_coauthors' )
		|| ! function_exists( 'get_coauthors' )
	) {
		error_log( 'Ninja theme migrations: Co-Authors Plus (or its API) not available — migration 001 skipped, will retry on the next request.' );
		return;
	}

	// Guard 2: the whole body is exception-proof. Nothing may leak.
	try {
		ninja_theme_migration_001_coauthor_fatima_lacerda( $cap );
	} catch ( \Throwable $e ) {
		error_log( sprintf(
			'Ninja theme migrations: migration 001 failed — %s (%s:%d). Flag NOT set; will retry on the next request.',
			$e->getMessage(),
			$e->getFile(),
			$e->getLine()
		) );
		return;
	}

	// Only reached on full success (skipped posts do not block the flag).
	update_option( NINJA_THEME_MIGRATIONS_OPTION, NINJA_THEME_MIGRATIONS_TARGET, true );
}, 999 );

/**
 * Migration 001 (issue #332): co-author Fátima Lacerda.
 *
 * Creates her guest-author profile (Co-Authors Plus) if missing, publishes
 * it and links her four legacy columns — looked up by SLUG, never by ID,
 * because each environment has its own database. Idempotent: existence is
 * verified before every creation.
 *
 * @param \CoAuthors_Plus $cap The Co-Authors Plus global object.
 * @return void
 */
function ninja_theme_migration_001_coauthor_fatima_lacerda( $cap ) {
	$login = 'fatima-lacerda';

	// --- 1. Ensure the guest-author profile exists. ---
	$guest   = $cap->guest_authors->get_guest_author_by( 'user_login', $login );
	$post_id = ( is_object( $guest ) && ! empty( $guest->ID ) ) ? (int) $guest->ID : 0;

	if ( 0 === $post_id ) {
		$created = $cap->guest_authors->create( array(
			'display_name' => 'Fátima Lacerda',
			'first_name'   => 'Fátima',
			'last_name'    => 'Lacerda',
			'user_login'   => $login,
			'description'  => 'Conexão Berlim - Carioca, radicada em Berlim desde 1988 e testemunha ocular da queda do Muro.',
		) );

		if ( is_wp_error( $created ) ) {
			error_log( sprintf(
				'Ninja theme migrations: could not create guest author "%s" (%s) — Flag NOT set; will retry on the next request.',
				$login,
				$created->get_error_message()
			) );
			return;
		}

		$post_id = (int) $created;
		error_log( sprintf( 'Ninja theme migrations: guest author "%s" created (post %d).', $login, $post_id ) );
	}

	// Social meta, following the exact convention of the guest-author
	// profiles already in the database (legacy-migrated cap-* keys, full
	// URLs). These keys are no longer part of the plugin field list, so
	// they are written directly. Only filled when empty (idempotent).
	$social = array(
		'cap-instagram' => 'https://www.instagram.com/rio.berlin2018',
		'cap-twitter'   => 'https://twitter.com/CinemaBerlin',
	);
	foreach ( $social as $meta_key => $meta_value ) {
		if ( '' === (string) get_post_meta( $post_id, $meta_key, true ) ) {
			update_post_meta( $post_id, $meta_key, $meta_value );
		}
	}

	// --- 2. Publish the guest-author post (the API creates it as draft). ---
	$guest_post = get_post( $post_id );
	if ( $guest_post && 'publish' !== $guest_post->post_status ) {
		wp_update_post( array(
			'ID'          => $post_id,
			'post_status' => 'publish',
		) );
	}

	// --- 3. Link the legacy columns by slug. ---
	$slugs = array(
		'por-que-berlim',
		'berlim-375-graus-o-sol-nunca-mais-vai-se-por',
		'milton-e-gil-fazem-do-verao-berlinense-uma-delicatessen-musical',
		'os-deuses-estao-em-festa-gilberto-gil-em-berlim',
	);

	foreach ( $slugs as $slug ) {
		$found = get_posts( array(
			'name'             => $slug,
			'post_type'        => 'any',
			'post_status'      => 'publish',
			'posts_per_page'   => 1,
			'fields'           => 'ids',
			'suppress_filters' => true, // Bypass WPML language filters.
		) );

		if ( empty( $found ) ) {
			error_log( sprintf( 'Ninja theme migrations: post "%s" not found — skipped (others are NOT aborted).', $slug ) );
			continue;
		}

		$target_id = (int) reset( $found );

		// Idempotency: already linked → skip. NOTE: get_coauthors() falls
		// back to the post_author when no author term exists, which is NOT
		// a real link — only a term-based match of our login counts.
		$existing_logins = array();
		foreach ( get_coauthors( $target_id ) as $coauthor ) {
			if ( ! empty( $coauthor->user_login ) ) {
				$existing_logins[] = (string) $coauthor->user_login;
			}
		}
		if ( in_array( $login, $existing_logins, true ) ) {
			continue;
		}

		// NOTE: for a guest author NOT linked to a WP user, add_coauthors()
		// may return false (it cannot update post_author) even when the
		// terms were set — verify the effective byline instead. $append
		// stays false: with no append, existing term-based co-authors are
		// not re-read (get_coauthors() would wrongly surface the
		// post_author fallback), and the byline becomes exactly ours.
		$cap->add_coauthors( $target_id, array( $login ), false, 'user_login' );

		$after = array();
		foreach ( get_coauthors( $target_id ) as $coauthor ) {
			if ( ! empty( $coauthor->user_login ) ) {
				$after[] = (string) $coauthor->user_login;
			}
		}

		if ( in_array( $login, $after, true ) ) {
			error_log( sprintf( 'Ninja theme migrations: guest author "%s" linked to post %d ("%s").', $login, $target_id, $slug ) );
		} else {
			error_log( sprintf(
				'Ninja theme migrations: linking guest author "%s" to post %d ("%s") FAILED (byline now: [%s]).',
				$login,
				$target_id,
				$slug,
				implode( ', ', $after )
			) );
		}
	}
}
