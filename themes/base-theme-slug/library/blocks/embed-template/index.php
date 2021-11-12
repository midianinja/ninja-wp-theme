<?php

/**
 * Embed template
 */
function block_embed_template() {

	// automatically load dependencies and version
	$asset_file = include(get_stylesheet_directory() . '/dist/js/blocks/embed-template.asset.php');

	wp_register_script(
		'embed-template',
		get_stylesheet_directory_uri() . '/dist/js/blocks/embed-template.js',
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'embed-template',
		get_stylesheet_directory_uri() . '/assets/javascript/blocks/embedTemplate/dashboard.css',
		[],
		filemtime(get_stylesheet_directory() . '/assets/javascript/blocks/embedTemplate/dashboard.css'),
		'all'
	);

	register_block_type('jaci/embed-template', array(
		'editor_script' => 'embed-template',
		'editor_style'  => 'embed-template',
	));
}

add_action('init', 'block_embed_template');
