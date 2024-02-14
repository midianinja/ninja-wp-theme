<?php

namespace Ninja;

function blocks_init() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$active_blocks = [
		'sample-block' => null,
		'dynamic' => [
			'render_callback' => 'Ninja\\dynamic_block_recent_posts',
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