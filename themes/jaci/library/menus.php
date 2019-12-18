<?php

namespace jaci;

function custom_menus()
{
    register_nav_menu('main-menu', __('Menu Principal', 'jaci'));
    register_nav_menu('footer-menu', __('Menu de Rodapé', 'jaci'));
    register_nav_menu('social-networks', __('Redes Sociais', 'jaci'));
}

add_action('init', 'jaci\\custom_menus');

function the_social_networks_menu($color = false)
{

    $menu_items = get_menu_by_position('social-networks');
    if (!$menu_items) {
        return;
    }
    $icons_color_dir = get_template_directory_uri() . '/assets/images/social-networks/';

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


    foreach ($menu_items as $item) {
        if ($color) {
            $html = '<img src="' . $icons_color_dir . $icons_color[sanitize_title($item->post_title)] . '.svg' . '">';
        } else {
            $html = '<i class="fab ' . $icons[sanitize_title($item->post_title)] . '"></i>';
        }
        echo '<a href="' . $item->url . '" target="_blank">' . $html . '</a>';
    }
}

function get_menu_by_position($slug)
{
    $theme_locations = get_nav_menu_locations();
    if (isset($theme_locations[$slug])) {
        $menu_obj = get_term($theme_locations[$slug], 'nav_menu');
        if (!$menu_obj instanceof \WP_Error) {
            return wp_get_nav_menu_items($menu_obj->name);
        }
    }

    return false;
}

add_filter('walker_nav_menu_start_el', 'jaci\\add_arrow', 10, 4);
function add_arrow($output, $item, $depth, $args)
{

    //Only add class to 'top level' items on the 'primary' menu.
    if ($depth === 0) {
        if (in_array("menu-item-has-children", $item->classes)) {
            $output .= '<i class="fas fa-angle-down"></i>';
        }
    }
    return $output;
}
