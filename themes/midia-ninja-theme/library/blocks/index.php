<?php

namespace Ninja;

require __DIR__ . '/includes/helpers.php';
require __DIR__ . '/includes/settings.php';
require __DIR__ . '/includes/api.php';

function blocks_init() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$active_blocks = [
		'sample-block' => null,
		'dynamic' => [
			'render_callback' => 'Ninja\\dynamic_block_recent_posts',
		],
		'high-spot' => [
			'render_callback' => 'Ninja\\high_spot_callback'
		],
		'latest-editorial-posts' => [
			'render_callback' => 'Ninja\\latest_editorial_posts_callback'
		],
		'latest-horizontal-posts' => [
			'render_callback' => 'Ninja\\latest_horizontal_posts_callback'
		],
		'latest-vertical-posts' => [
			'render_callback' => 'Ninja\\latest_vertical_posts_callback'
		]
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