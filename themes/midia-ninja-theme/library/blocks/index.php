<?php

namespace Ninja;

require __DIR__ . '/includes/helpers.php';
require __DIR__ . '/includes/settings.php';
require __DIR__ . '/includes/api.php';

function blocks_init() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Add compatibility for Newspack blocks.
	global $newspack_blocks_post_id;

	if ( ! $newspack_blocks_post_id ) {
		$newspack_blocks_post_id = [];
	}

	global $latest_blocks_posts_ids;

	if ( ! $latest_blocks_posts_ids ) {
		$latest_blocks_posts_ids = [];
	}

	$active_blocks = [
		'sample-block' => null,
		'dynamic' => [
			'render_callback' => 'Ninja\\dynamic_block_recent_posts',
		],
		'flickr-gallery' => [
			'render_callback' => 'Ninja\\flickr_gallery_callback',
		],
		'high-spot' => [
			'render_callback' => 'Ninja\\high_spot_callback'
		],
		'image-card' => null,
		'latest-editorial-posts' => [
			'render_callback' => 'Ninja\\latest_editorial_posts_callback'
		],
		'latest-grid-posts' => [
			'render_callback' => 'Ninja\\latest_grid_posts_callback'
		],
		'latest-horizontal-posts' => [
			'render_callback' => 'Ninja\\latest_horizontal_posts_callback'
		],
		'latest-vertical-posts' => [
			'render_callback' => 'Ninja\\latest_vertical_posts_callback'
		],
		'opinion-posts' => [
			'render_callback' => 'Ninja\\opinion_posts_callback'
		],
	];

	$active_blocks = apply_filters( 'ninja/active_blocks', $active_blocks );

	foreach ( $active_blocks as $block_name => $block_args ) {
		$args = [];

		if ( $block_args ) {
			include_once __DIR__ . '/src/'. $block_name. '/'. $block_name. '.php';
			foreach ( $block_args as $arg => $value ) {
				$args[$arg] = $value;
			}
		}

		register_block_type( __DIR__ . '/build/'. $block_name, $args );
	}
}

add_action( 'init', 'Ninja\\blocks_init' );
