<?php

add_theme_support( 'align-wide' );
add_theme_support( 'custom-logo' );

require __DIR__ . '/library/images.php';
require __DIR__ . '/library/templates.php';
require __DIR__ . '/library/related-posts.php';

add_filter( 'show_admin_bar', '__return_false' );

add_filter( 'force_filtered_html_on_import' , '__return_false' );

add_theme_support( 'align-wide' );
add_theme_support( 'post-thumbnails' );

function array_flatten($array)
{
    if (!is_array($array)) {
        return [];
    }
    $result = array();
    foreach ($array as $key => $value) {
        if (is_array($value)) {
            $result = array_merge($result, array_flatten($value));
        } else {
            $result[$key] = $value;
        }
    }
    return $result;
}

function the_social_networks_menu($color = false){

    $menu_items = get_menu_by_position('social-networks');
    if(!$menu_items){
        return;
    }
    $icons_color_dir = get_template_directory_uri(). '/assets/images/social-networks/';

    $icons = [
        'facebook' => 'fa-facebook-f',
        'twitter' => 'fa-twitter',
        'youtube' => 'fa-youtube',
        'instagram' => 'fa-instagram',
    ];

    $icons_color = [
        'facebook' => 'Facebook',
        'twitter' => 'Twitter',
        'youtube' => 'Youtube',
        'instagram' => 'Instagram',
    ];

    
    foreach($menu_items as $item){
        if($color){
            $html = '<img src="'.$icons_color_dir.$icons_color[sanitize_title($item->post_title)].'.svg'.'">';
        }else{
            $html = '<i class="fab '.$icons[sanitize_title($item->post_title)].'"></i>';
        }
        echo '<a href="'.$item->url.'" target="_blank">'.$html.'</a>';
    }
}

function get_menu_by_position($slug){
    $theme_locations = get_nav_menu_locations();
    if(isset($theme_locations[$slug])){
        $menu_obj = get_term( $theme_locations[$slug], 'nav_menu' );
        if(!$menu_obj instanceof WP_Error){
            return wp_get_nav_menu_items($menu_obj->name);
        }
    }

    return false;
}

function jaci_site_load_assets() {
    wp_enqueue_style( 'foundation', get_template_directory_uri() . '/dist/foundation.min.css' );
    wp_enqueue_style( 'app', get_template_directory_uri() . '/dist/app.css', [], filemtime(__DIR__.'/dist/app.css') );
    wp_enqueue_script('no-js', get_stylesheet_directory_uri() . '/no-js.js', array('jquery'), false, true);
    wp_enqueue_script( 'main-app', get_template_directory_uri() . '/dist/app.js', array('jquery', 'no-js'), false, true);
    wp_enqueue_script( 'cookie', get_template_directory_uri() . '/assets/javascript/js.cookie.js', array('jquery'), false, true);
    wp_enqueue_script( 'acessibilidade', get_template_directory_uri() . '/assets/javascript/acessibilidade.js', array('jquery', 'cookie'), false, true);
    wp_enqueue_script( 'youtube-plataform', 'https://apis.google.com/js/platform.js' );
}
add_action( 'wp_enqueue_scripts', 'jaci_site_load_assets' );

function custom_menus() {
    register_nav_menu('main-menu',__( 'Menu Principal' ));
    register_nav_menu('footer-menu', __( 'Menu de Rodapé' ));
    register_nav_menu('social-networks', __( 'Redes Sociais' ));
}
add_action( 'init', 'custom_menus' );

function custom_excerpt_length() {
    return 20;
}
add_filter( 'excerpt_length', 'custom_excerpt_length' );

/**
 * Pagination
 */
function pagination() {
    global $wp_query;
    if ( $wp_query->max_num_pages > 1 ) {

        $paged = ( get_query_var( 'paged' ) ) ? absint( get_query_var( 'paged' ) ) : 1;
        $big = 999999999; // need an unlikely integer

        echo paginate_links( array(
            'base' => str_replace( $big , '%#%' , esc_url( get_pagenum_link( $big ) ) ) ,
            'format' => '?paged=%#%' ,
            'current' => max( 1 , get_query_var( 'paged' ) ) ,
            'total' => $wp_query->max_num_pages ,
            'prev_text' => __( '<' , 'green' ) ,
            'next_text' => __( '>' , 'green' )
        ) );
    }
}

function site_by_hacklab($args = []){
    $args += [
        'label' => 'desenvolvido pelo',
        'label_color' => 'black',
        'hacklab_color' => 'black'
    ];
    extract($args);
    ?>
    <style>
    .site-by-hacklab {
        font-size: 12px;
    }
    .site-by-hacklab span {
        color: <?= $label_color ?> !important;
    }
    .site-by-hacklab a{
        font-family: 'Museo', 'Source Sans Pro', 'Roboto', 'Helvetica Neue', sans-serif !important;
        color: <?= $hacklab_color ?> !important;
        font-weight: bold;
        font-size: 12px;
    }
    .site-by-hacklab a b {
        color:red !important;
        font-weight: bold;
    }

    </style>
    <div class="site-by-hacklab">
        <span><?= $label ?></span>
        <a href="https://hacklab.com.br/">hacklab<b>/</b></a>
    </div>
    <?php
}


add_filter('admin_init', 'jaci_site_settings_register_fields');
function jaci_site_settings_register_fields()
{
    register_setting('general', 'contact', 'esc_attr');
    add_settings_field('contact', '<label for="contact">'.__('Endereço' , 'contact' ).'</label>' , 'jaci_site_settings_contact_html', 'general');
}
 
function jaci_site_settings_contact_html() {
    $value = get_option( 'contact', '' );
    echo '<div><textarea style="width: 500px" type="text" id="contact" name="contact" />' . $value . '</textarea><div>';
}

function get_the_meta_author($field = ''){
    global $post;

    $author_meta = get_post_meta(get_the_ID(), 'author', true);

    if(empty($author_meta)){
        return '';
    } elseif (empty($field)) {
        return wp_get_single_post($author_meta);
    } elseif ($field == 'content'){
        $post = get_post($author_meta);
        setup_postdata($post);
        the_content();
        wp_reset_postdata();
    }else{
        $f = 'get_the_'.$field;
        return $f($author_meta);
    }
}

add_filter( 'walker_nav_menu_start_el', 'add_arrow',10,4);
function add_arrow( $output, $item, $depth, $args ){
 
    //Only add class to 'top level' items on the 'primary' menu.
    if($depth === 0 ){
        if (in_array("menu-item-has-children", $item->classes)) {
            $output .='<i class="fas fa-angle-down"></i>';
        }
    }
    return $output;
}

if(class_exists('hl\\mssync\\Rule')){
    
    $sp = new hl\mssync\Origin([
        'site_ids' => function($site_id){
            return $site_id > 1;
        }
    ]);

    $main_site = new hl\mssync\Destination([
        'site_ids' => [ 1 ],
        'add_terms' => [ 'category' => [ 'Subsites' ] ],
        'new_post_status' => 'publish',
        'publish_updates' => true
    ]);

    $main = new hl\mssync\Rule($sp, $main_site);

}
