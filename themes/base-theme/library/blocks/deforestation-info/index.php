<?php 

/**
 * Deforestation Info
 */

function deforestation_info_block() {

	// automatically load dependencies and version
	$asset_file = include(get_stylesheet_directory() . '/dist/js/blocks/deforestation-info.asset.php');

	wp_register_script(
		'deforestation-info',
		get_stylesheet_directory_uri() . '/dist/js/blocks/deforestation-info.js',
		$asset_file['dependencies'],
		$asset_file['version']
		//filemtime(get_stylesheet_directory() . '/dist/imageBlock.js')
	);

	register_block_type('jaci/deforestation-info', array(
		'editor_script' => 'deforestation-info',
        'attributes' => [
            'boxTitle' => [
                'type' => 'string'
            ],
            'count' => [
                'type' => 'string'
            ],
            'dataSource' => [
                'type' => 'string'
            ],
        ],
	));
}

add_action('init', 'deforestation_info_block');