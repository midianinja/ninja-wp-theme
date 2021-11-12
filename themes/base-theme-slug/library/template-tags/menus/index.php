<?php

function the_social_networks_menu($image = true) {
    $menu_items = get_menu_by_position('social-networks');
    if (!$menu_items) {
        return;
    }
    $icons_color_dir = get_template_directory_uri() . '/assets/images/social-networks/';

    $icons = [
        'facebook'  => 'fa-facebook-f',
        'twitter'   => 'fa-twitter',
        'youtube'   => 'fa-youtube',
        'instagram' => 'fa-instagram',
        'whatsapp'  => 'fa-whatsapp'
    ];

    $icons_color = [
        'facebook'  => 'Facebook',
        'twitter'   => 'Twitter',
        'youtube'   => 'Youtube',
        'instagram' => 'Instagram',
        'whatsapp'  => 'WhatsApp'
    ];

    echo '<div class="social-menu">';

        foreach ($menu_items as $item) {
            if ($image) {
                $html = file_get_contents( $icons_color_dir . strtolower( $icons_color[sanitize_title( $item->post_title )] ) . '.svg' );
            } else {
                $html = '<i class="fab ' . $icons[sanitize_title($item->post_title)] . '"></i>';
            }
            echo '<div class="social-icon">';
            echo '<a href="' . $item->url . '" target="_blank">' . $html . '</a>';
            echo '</div>';
        }

    echo '</div>';
}

function get_menu_by_position($slug) {
    $theme_locations = get_nav_menu_locations();
    if (isset($theme_locations[$slug])) {
        $menu_obj = get_term($theme_locations[$slug], 'nav_menu');
        if (!$menu_obj instanceof \WP_Error) {
            return wp_get_nav_menu_items($menu_obj->name);
        }
    }

    return false;
}
