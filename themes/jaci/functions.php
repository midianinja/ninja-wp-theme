<?php
namespace jaci;

require __DIR__ . '/library/settings.php';
require __DIR__ . '/library/images.php';
require __DIR__ . '/library/menus.php';
require __DIR__ . '/library/assets.php';
require __DIR__ . '/library/pagebuilder/index.php';

// descomentar se for um multisite e for utilizar o plugin de sincronização de posts
// require __DIR__ . '/library/mssync.php';

add_theme_support( 'align-wide' );
add_theme_support( 'custom-logo' );
add_theme_support( 'post-thumbnails' );

add_filter( 'show_admin_bar', '__return_false' );
add_filter( 'force_filtered_html_on_import' , '__return_false' );

add_action( 'init',  function () {
	remove_post_type_support( 'post', 'author' );
});
