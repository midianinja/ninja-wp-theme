<?php
namespace hacklabTema;

// require_once 'vendor/autoload.php';

// Blocos ativos:
add_filter('hacklab_blocos_ativos','hacklabTema\\blocos_ativos');
function blocos_ativos($blocos_ativos){
    // unset($blocos_ativos['sample-block']);
    return $blocos_ativos;
}

// exemplo de como adicionar elementos através dos filtros no bloco de posts via API
// Descomentar a linha abaixo para adicionar, exemplo utilizando atributos (image_credits e meta_authors) adicionados à resposta da API no projeto de onde vem os posts.
// add_filter('hacklab-fetch-posts-api-before-excerpt-embed_post','hacklabTema\\add_image_credits',10,3);
function add_image_credits($content,$attributes, $post){
    if($attributes['showImageCredit'] == true){
        $content .= '<p class="post-image-credit">Foto: '.$post['image_credit'].'</p>';
    }
    $content .= '<p class="post-authors">'.$post['meta_authors'].'</p>';
    return $content;
}

if ( ! function_exists( 'is_plugin_active' ) ) {
    include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
}

if ( is_plugin_active( 'tutor/tutor.php' ) ) {
    require __DIR__ . '/library/tutorstarter.php';
}

// REMOVE WP EMOJI
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

require __DIR__ . '/library/header-and-footer-archive/header-and-footer-archive.php';
require __DIR__ . '/library/supports.php';
require __DIR__ . '/library/blocks/index.php';
require __DIR__ . '/library/categories.php';
require __DIR__ . '/library/sidebars.php';
require __DIR__ . '/library/menus.php';
require __DIR__ . '/library/assets.php';
require __DIR__ . '/library/search.php';
require __DIR__ . '/library/api/index.php';
require __DIR__ . '/library/sanitizers/index.php';
require __DIR__ . '/library/template-tags/index.php';
require __DIR__ . '/library/customizer/index.php';
require __DIR__ . '/library/utils.php';
require __DIR__ . '/library/admin.php';
