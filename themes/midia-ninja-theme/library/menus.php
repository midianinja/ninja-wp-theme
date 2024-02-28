<?php

namespace jaci;

function custom_menus()
{
    register_nav_menu('main-menu', __('Menu Principal', 'base-textdomain'));
    /* register_nav_menu('footer-menu', __('Menu de Rodapé', 'base-textdomain')); */

    register_nav_menu('social-networks', __('Redes Sociais', 'base-textdomain'));
    register_nav_menu('footer-menu-first', __('Menu de Rodapé 1', 'base-textdomain'));
    register_nav_menu('footer-menu-second', __('Menu de Rodapé 2', 'base-textdomain'));
    register_nav_menu('footer-menu-third', __('Menu de Rodapé 3', 'base-textdomain'));
    register_nav_menu('footer-menu-fourth', __('Menu de Rodapé 4', 'base-textdomain'));
    register_nav_menu('hamburguer-menu', __('Menu Hamburguer', 'base-textdomain'));
}

add_action('init', 'jaci\\custom_menus');


// adiciona seta nos itens com subitens
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

//Descomente para adicionar css para top menu (WIP)
// add_filter('css_files_before_output','jaci\\add_top_menu', 10, 1);
function add_top_menu($files)
{
    $files['top-menu'] = array(
        'file' => '_c-top-menu.css',
        'global' => true,
        'inline' => true,
    );
    return $files;
}
// Descomente para alterar menu para sempre funcionar como hamburguer
// add_filter('css_files_before_output','jaci\\sempre_hamburguer', 10, 1);
function sempre_hamburguer($files)
{
    $files['sempre-hamburguer'] = array(
        'file' => 'menu-sempre-hamburguer.css',
        'global' => true,
        'inline' => true,
    );
    return $files;
}


//Adiciona item Mais + no main menu
function add_more_itens_on_menu($items, $args)
{
    if ($args->theme_location != 'main-menu') {
        return $items;
    }

    $link  = '<li class="menu-item nav-item mais">
                <a href="#">Mais +</a>
            </li>';

    $items .= $link;
    return $items;
}

add_action('wp_nav_menu_items', 'jaci\\add_more_itens_on_menu', 10, 2);
