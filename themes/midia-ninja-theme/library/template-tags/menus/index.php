<?php

function the_social_networks_menu() {
    $menu_items = get_menu_by_position( 'social-networks' );

    if ( ! $menu_items ) {
        return;
    }

    $icons_directory = get_template_directory() . '/assets/images/social-networks/';

    echo '<div class="social-menu">';

        foreach ( $menu_items as $item ) {
			$network_name = sanitize_title( $item->post_title );
			$icon_path = $icons_directory . $network_name . '.svg';

			if ( ! file_exists( $icon_path ) ) {
				continue;
			}

			$html = file_get_contents( $icon_path );

			if ( $html ) { ?>
				<div class="social-icon icon-<?= esc_attr( $network_name ) ?>">
					<a href="<?= esc_url( $item->url ) ?>" title="<?= esc_attr( $item->post_title ) ?>" target="_blank"><?= $html ?></a>
				</div><?php
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
