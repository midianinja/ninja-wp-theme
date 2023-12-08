<?php

function the_social_networks_menu( $image = true ) {
    $menu_items = get_menu_by_position( 'social-networks' );

    if ( ! $menu_items ) {
        return;
    }

    $icons_directory = get_template_directory() . '/assets/images/social-networks/';

    $fa_icons = [
        'facebook'  => 'fa-facebook-f',
        'twitter'   => 'fa-twitter',
        'youtube'   => 'fa-youtube',
        'instagram' => 'fa-instagram',
        'whatsapp'  => 'fa-whatsapp'
    ];

    echo '<div class="social-menu">';

        foreach ( $menu_items as $item ) {
			$network_name = sanitize_title( $item->post_title );
			$html = '';

            if ( $image ) {
				// Checks if the icon file exists
				if ( ! file_exists( $icons_directory . $network_name . '.svg' ) ) {
					break;
				}

				$html = file_get_contents( $icons_directory . $network_name . '.svg' );
            } else {
				// Checks if item exists on array $fa_icons
				if ( isset( $fa_icons[$network_name] ) ) {
					$html = '<i class="fab ' . $fa_icons[$network_name] . '"></i>';
				}
            }

			if ( $html ) {
				echo '<div class="social-icon icon-' . $network_name . '">';
				echo '<a href="' . $item->url . '" target="_blank">' . $html . '</a>';
				echo '</div>';
			}
        }

    echo '</div>';
}

function get_menu_by_position( $slug ) {
    $theme_locations = get_nav_menu_locations();
    if ( isset( $theme_locations[$slug] ) ) {
        $menu_obj = get_term( $theme_locations[$slug], 'nav_menu' );
        if ( ! $menu_obj instanceof \WP_Error ) {
            return wp_get_nav_menu_items( $menu_obj->name );
        }
    }

    return false;
}
