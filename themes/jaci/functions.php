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

// descomentar para importar conteúdo
// add_filter( 'force_filtered_html_on_import' , '__return_false' );

// removemos a barra de admin para não cachear no cache de borda 
add_filter( 'show_admin_bar', '__return_false' );

// usamos uma taxonomia autor criada com o plugin Pods
add_action( 'init',  function () {
	remove_post_type_support( 'post', 'author' );
});

// filtro para adicionar mais classes de título
add_filter('widgets\\SectionTitle:css_classes', function($css_classes){
	$css_classes['title-jaci'] = __('Título Jaci', 'jaci');
	return $css_classes;
});