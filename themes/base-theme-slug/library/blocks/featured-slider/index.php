<?php 
/**
 * Featured Slider
 */
function featured_slider_block() {

	// automatically load dependencies and version
	$asset_file = include(get_stylesheet_directory() . '/dist/js/blocks/featured-slider.asset.php');

	wp_register_script(
		'featured-slider-block',
		get_stylesheet_directory_uri() . '/dist/js/blocks/featured-slider.js',
		$asset_file['dependencies'],
		$asset_file['version']
		//filemtime(get_stylesheet_directory() . '/dist/imageBlock.js')
	);

	wp_register_style(
		'featured-slider-block',
		get_stylesheet_directory_uri() . '/assets/javascript/blocks/featuredSlider/dashboard.css',
		[],
		filemtime(get_stylesheet_directory() . '/assets/javascript/blocks/featuredSlider/dashboard.css'),
		'all'
	);

	register_block_type('jaci/featured-slider', array(
		'editor_script' => 'featured-slider-block',
		'editor_style'  => 'featured-slider-block',
	));

	wp_set_script_translations( 'featured-slider-block', 'base-textdomain', get_template_directory() . '/languages' );
}

add_action('init', 'featured_slider_block');