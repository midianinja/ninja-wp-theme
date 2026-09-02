<?php

/**
 * Redirect access to single Layout Archive to home
 */
function redirect_single_layout_archive() {
	if ( is_singular( 'header-footer' ) ) {
		$redirect_url = home_url();
		wp_redirect( $redirect_url );
		exit;
	}
}

add_action( 'template_redirect', 'redirect_single_layout_archive' );


/**
 * Check and return the archive slug
 */
function check_archive() {

	$get_queried_object = get_queried_object();

	if ( is_category() || is_tag() ) {
		return $get_queried_object->taxonomy;
	}

	if ( is_tax() ) {
		return $get_queried_object->slug;
	}

	if ( is_post_type_archive() ) {
		return $get_queried_object->name;
	}

	if ( is_page_template( 'page-anchor-membresia.php' ) ) {
		return 'membresia';
	}

	if ( is_page_template( 'page-anchor.php' ) ) {
		return 'anchor';
	}

	if ( is_search() ) {
		return 'search';
	}

	return false;

}


/**
 * Get the layout of the archive
 */
function get_layout_archive( $slug, $position = '' ) {

	$position = ( 'header' === $position ) ? 'header' : 'footer' ;
	$return = false;
	$html = '';

	$args = [
		'post_type'  => 'header-footer',
		'meta_key'   => 'archive',
		'meta_query' => [
			[
				'key'   => 'archive',
				'value' => $slug
			]
		]
	];

	if ( $position ) {
		array_push( $args['meta_query'], [
			'key'   => 'position',
			'value' => $position
		] );
	}

	$wp_query = new WP_Query( $args );

	if ( $wp_query && ! is_wp_error( $wp_query ) && $wp_query->post_count ) {
		$return =  $wp_query->posts[0];
	}

	if ( $return ) {
		$html .= '<div class="header-and-footer-archive position-' . $position . '">';
		$html .= apply_filters( 'the_content', $return->post_content );
		$html .=  '</div>';

		wp_reset_postdata();

		return $html;
	}

	wp_reset_postdata();

	return $return;

}

function get_layout_header( $slug ) {
	return get_layout_archive( $slug, 'header' );
}

function get_layout_footer( $slug ) {
	return get_layout_archive( $slug, 'footer' );
}


/**
 * Retrieve the header-footer (CPT) post object for a given archive slug.
 *
 * Mirrors the WP_Query performed by get_layout_archive() but returns the
 * post object (without rendering) so callers can inspect its post_content.
 *
 * @param string $slug Archive slug (e.g. 'blog').
 * @return WP_Post|null
 */
function ninja_get_header_footer_post( $slug ) {
	$args = [
		'post_type'  => 'header-footer',
		'post_status' => 'publish',
		'posts_per_page' => 1,
		'meta_query' => [
			[
				'key'   => 'archive',
				'value' => $slug,
			],
			[
				'key'   => 'position',
				'value' => 'header',
			],
		],
	];

	$wp_query = new WP_Query( $args );

	if ( $wp_query && ! is_wp_error( $wp_query ) && $wp_query->post_count ) {
		$post = $wp_query->posts[0];
		wp_reset_postdata();
		return $post;
	}

	wp_reset_postdata();
	return null;
}

/**
 * Pre-render the blog (Notícias) header-footer and collect the post IDs
 * that its newspack/ninja blocks display, so the main archive query can
 * exclude them and avoid duplication in the loop.
 *
 * The header content is rendered through `the_content` filter inside an
 * output buffer (output is discarded). During rendering, the newspack
 * blocks and the theme blocks populate the globals:
 *   - $newspack_blocks_post_id  (newspack homepage-articles, carousel)
 *   - $latest_blocks_posts_ids  (theme blocks: high-spot, latest-* etc.)
 *
 * Result is cached in a transient keyed by the header post's post_modified
 * timestamp, so it is automatically invalidated whenever the header is
 * edited (a different post_modified => different cache key).
 *
 * @return int[] List of post IDs to exclude.
 */
function ninja_collect_blog_header_post_ids() {
	$header_post = ninja_get_header_footer_post( 'blog' );

	if ( ! $header_post ) {
		return [];
	}

	$cache_key = 'ninja_blog_header_excluded_ids_' . strtotime( $header_post->post_modified_gmt );
	$cached    = get_transient( $cache_key );

	if ( is_array( $cached ) ) {
		return $cached;
	}

	// Snapshot the globals so we can restore them after pre-rendering,
	// leaving the request state exactly as it was before.
	$prev_newspack_ids = isset( $GLOBALS['newspack_blocks_post_id'] ) ? $GLOBALS['newspack_blocks_post_id'] : [];
	$prev_latest_ids   = isset( $GLOBALS['latest_blocks_posts_ids'] ) ? $GLOBALS['latest_blocks_posts_ids'] : [];

	$GLOBALS['newspack_blocks_post_id'] = [];
	$GLOBALS['latest_blocks_posts_ids'] = [];

	// Pre-render the header content (discarded). Blocks populate the globals.
	// `apply_filters('the_content')` already runs `do_blocks` and every block
	// render callback, which is what populates $newspack_blocks_post_id and
	// $latest_blocks_posts_ids. Output is captured and thrown away.
	//
	// Set up the global $post and postdata so that get_the_content() (called
	// inside block render callbacks like Homepage Posts) returns the correct
	// content and template functions work as expected.
	$prev_post = $GLOBALS['post'];
	$GLOBALS['post'] = $header_post;
	setup_postdata( $header_post );

	ob_start();
	apply_filters( 'the_content', $header_post->post_content );
	ob_end_clean();

	// Restore the previous post state.
	$GLOBALS['post'] = $prev_post;
	wp_reset_postdata();

	$newspack_ids = isset( $GLOBALS['newspack_blocks_post_id'] ) ? array_keys( $GLOBALS['newspack_blocks_post_id'] ) : [];
	$latest_ids   = isset( $GLOBALS['latest_blocks_posts_ids'] ) ? $GLOBALS['latest_blocks_posts_ids'] : [];

	$ids = array_unique( array_map( 'intval', array_merge( $newspack_ids, $latest_ids ) ) );

	// Restore the globals to their previous state.
	$GLOBALS['newspack_blocks_post_id'] = $prev_newspack_ids;
	$GLOBALS['latest_blocks_posts_ids'] = $prev_latest_ids;

	set_transient( $cache_key, $ids, DAY_IN_SECONDS );

	return $ids;
}

/**
 * Exclude posts displayed in the blog (Notícias) header from the main
 * archive query, so they don't repeat in the post loop.
 *
 * Runs on pre_get_posts, only on the front-end main query of is_home().
 * Applies to every page of the archive (including is_paged()).
 */
function ninja_exclude_blog_header_posts_from_main_query( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_home() ) {
		return;
	}

	$ids = ninja_collect_blog_header_post_ids();

	if ( empty( $ids ) ) {
		return;
	}

	$not_in = $query->get( 'post__not_in' );
	if ( ! is_array( $not_in ) ) {
		$not_in = [];
	}

	$query->set( 'post__not_in', array_unique( array_merge( $not_in, $ids ) ) );
}
add_action( 'pre_get_posts', 'ninja_exclude_blog_header_posts_from_main_query', 20 );

/**
 * Flush the W3 Total Cache page cache if the plugin is active.
 *
 * This is a no-op when W3TC is not available, keeping the theme safe
 * on environments without the plugin installed.
 */
function ninja_flush_page_cache() {
	if ( function_exists( 'w3tc_pgcache_flush' ) ) {
		w3tc_pgcache_flush();
	}
}

/**
 * Bypass Cloudflare APO edge caching on the blog home (/noticias/).
 *
 * The blog home is rebuilt on every publish because the featured post
 * (high-spot) changes, so its HTML must not be cached at Cloudflare's edge.
 * Origin page cache (W3TC) is still used and is invalidated by the publish
 * hooks below.
 *
 * @param bool $cache Whether Cloudflare APO should cache the current page.
 * @return bool
 */
add_filter( 'cloudflare_use_cache', 'ninja_bypass_cloudflare_cache_on_blog_home' );
function ninja_bypass_cloudflare_cache_on_blog_home( $cache ) {
	if ( is_home() ) {
		return false;
	}
	return $cache;
}

/**
 * Purge the Cloudflare edge cache.
 *
 * First tries the direct Cloudflare API when NINJA_CF_API_TOKEN and
 * NINJA_CF_ZONE_ID are configured. Otherwise, delegates to the official
 * Cloudflare plugin's Hooks class if it is available. Does nothing (safely)
 * when neither path is available, so post publishing never breaks.
 */
function ninja_purge_cloudflare_cache() {
	if ( defined( 'NINJA_CF_API_TOKEN' ) && defined( 'NINJA_CF_ZONE_ID' )
		&& ! empty( NINJA_CF_API_TOKEN ) && ! empty( NINJA_CF_ZONE_ID ) ) {
		$api_url = sprintf(
			'https://api.cloudflare.com/client/v4/zones/%s/purge_cache',
			NINJA_CF_ZONE_ID
		);

		$response = wp_remote_post(
			$api_url,
			[
				'headers' => [
					'Authorization' => 'Bearer ' . NINJA_CF_API_TOKEN,
					'Content-Type'  => 'application/json',
				],
				'body'    => wp_json_encode( [ 'purge_everything' => true ] ),
				'timeout' => 15,
			]
		);

		if ( is_wp_error( $response ) ) {
			return;
		}

		$response_code = wp_remote_retrieve_response_code( $response );

		if ( 200 !== (int) $response_code ) {
			$response_body = wp_remote_retrieve_body( $response );
			error_log(
				sprintf(
					'Cloudflare cache purge failed. HTTP %s: %s',
					$response_code,
					substr( $response_body, 0, 200 )
				)
			);
		}

		return;
	}

	if ( ! class_exists( '\CF\WordPress\Hooks' ) ) {
		return;
	}

	try {
		$cloudflare_hooks = new \CF\WordPress\Hooks();
		if ( method_exists( $cloudflare_hooks, 'purgeCacheEverything' ) ) {
			$cloudflare_hooks->purgeCacheEverything();
		}
	} catch ( \Throwable $e ) {
		error_log( 'Cloudflare purge failed: ' . $e->getMessage() );
	}
}

/**
 * Clean up orphaned transients when the blog header-footer is edited.
 *
 * The cache key is derived from post_modified_gmt, so saving the post
 * automatically produces a fresh key on the next request. This handler
 * only removes the leftover transients to keep the options table tidy.
 *
 * @param int $post_id Saved post ID.
 */
function ninja_clean_blog_header_transients( $post_id ) {
	if ( get_post_meta( $post_id, 'archive', true ) !== 'blog'
		|| get_post_meta( $post_id, 'position', true ) !== 'header' ) {
		return;
	}

	global $wpdb;
	$like   = $wpdb->esc_like( '_transient_ninja_blog_header_excluded_ids_' ) . '%';
	$names  = $wpdb->get_col( $wpdb->prepare( "SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE %s", $like ) );
	foreach ( $names as $name ) {
		$key = str_replace( '_transient_', '', $name );
		delete_transient( $key );
	}

	ninja_flush_page_cache();
	ninja_purge_cloudflare_cache();
}
add_action( 'save_post_header-footer', 'ninja_clean_blog_header_transients' );
add_action( 'post_updated', 'ninja_clean_blog_header_transients' );

/**
 * Invalidate the blog header excluded-ids transient when a post changes
 * publication status. The transient caches the list of post IDs shown
 * inside the blog header block, so those IDs can be excluded from the
 * main loop to avoid duplication. When a post is published (including
 * a draft being published via the block editor) it may become the latest
 * post rendered inside the "high-spot" block, making the previously
 * cached exclusion list stale. Deleting the transient forces a fresh
 * collection on the next page load.
 *
 * Fires on any transition involving 'publish' (publish, unpublish,
 * trash, etc.) for the 'post' post type, ignoring revisions and
 * autosaves.
 *
 * @param string  $new_status New post status.
 * @param string  $old_status Old post status.
 * @param WP_Post $post       Post object.
 */
function ninja_clean_blog_header_transient_on_new_post( $new_status, $old_status, $post ) {
	if ( $new_status === $old_status ) {
		return;
	}

	if ( 'publish' !== $new_status && 'publish' !== $old_status ) {
		return;
	}

	if ( null === $post || 'post' !== $post->post_type ) {
		return;
	}

	if ( wp_is_post_revision( $post->ID ) ) {
		return;
	}

	if ( wp_is_post_autosave( $post->ID ) ) {
		return;
	}

	global $wpdb;
	$like  = $wpdb->esc_like( '_transient_ninja_blog_header_excluded_ids_' ) . '%';
	$names = $wpdb->get_col( $wpdb->prepare( "SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE %s", $like ) );
	foreach ( $names as $name ) {
		$key = str_replace( '_transient_', '', $name );
		delete_transient( $key );
	}

	ninja_flush_page_cache();
	ninja_purge_cloudflare_cache();
}
add_action( 'transition_post_status', 'ninja_clean_blog_header_transient_on_new_post', 10, 3 );
