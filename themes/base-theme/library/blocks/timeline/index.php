<?php
/**
 * Featured Slider
 */
function timeline_block() {

	// automatically load dependencies and version
	$asset_file = include(get_stylesheet_directory() . '/dist/js/blocks/timeline.asset.php');

	wp_register_script(
		'timeline-block',
		get_stylesheet_directory_uri() . '/dist/js/blocks/timeline.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		filemtime(get_stylesheet_directory() . '/dist/js/blocks/timeline.js')
	);

	wp_register_style(
		'timeline-block',
		get_stylesheet_directory_uri() . '/dist/css/_b-timeline.css',
		[],
		filemtime(get_stylesheet_directory() . '/dist/css/_b-timeline.css'),
		'all'
	);


	register_block_type('jaci/timeline', array(
		'editor_script' => 'timeline-block',
		'editor_style'  => 'timeline-block',
		'render_callback' => 'timeline_render',

	));
}

add_action('init', 'timeline_block');


function timeline_render() {
    ob_start();
    // set_query_var( 'block_params', ['terms' => $terms, 'style' => $style]);
	get_template_part( 'template-parts/content/timeline');
	$output = ob_get_clean();

    return $output ;
}