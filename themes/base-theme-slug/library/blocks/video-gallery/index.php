<?php

/**
 * Video gallery
 */
function block_video_gallery() {

	// automatically load dependencies and version
	$asset_file = include(get_stylesheet_directory() . '/dist/js/blocks/video-gallery.asset.php');

	wp_register_script(
		'video-gallery',
		get_stylesheet_directory_uri() . '/dist/js/blocks/video-gallery.js',
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'video-gallery-dashboard',
		get_stylesheet_directory_uri() . '/assets/javascript/blocks/videoGallery/dashboard.css',
		[],
		filemtime(get_stylesheet_directory() . '/assets/javascript/blocks/videoGallery/dashboard.css'),
		'all'
	);

	register_block_type('jaci/video-gallery', array(
		'editor_script' => 'video-gallery',
		'editor_style'  => 'video-gallery',
	));
}

add_action('init', 'block_video_gallery');
