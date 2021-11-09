<?php

namespace jaci;

function custom_menus() {
    register_nav_menu('main-menu', __('Menu Principal', 'jaci'));
    /* register_nav_menu('footer-menu', __('Menu de Rodapé', 'jaci')); */

    register_nav_menu('social-networks', __('Redes Sociais', 'jaci'));
    register_nav_menu('footer-menu-first', __('Menu de Rodapé 1', 'jaci'));
    register_nav_menu('footer-menu-second', __('Menu de Rodapé 2', 'jaci'));
    register_nav_menu('footer-menu-third', __('Menu de Rodapé 3', 'jaci'));
    register_nav_menu('footer-menu-fourth', __('Menu de Rodapé 4', 'jaci'));
}

add_action('init', 'jaci\\custom_menus');



add_filter('walker_nav_menu_start_el', 'jaci\\add_arrow', 10, 4);
function add_arrow($output, $item, $depth, $args) {

    //Only add class to 'top level' items on the 'primary' menu.
    if ($depth === 0) {
        if (in_array("menu-item-has-children", $item->classes)) {
            $output .= '<i class="fas fa-angle-down"></i>';
        }
    }
    return $output;
}
