<?php
namespace hacklabTema;


function enqueue_reorder_admin_menus_script() {
  wp_enqueue_script( 'reorder-admin-menus-script', get_template_directory_uri() . '/assets/javascript/functionalities/admin/reorder-admin-menus.js', array(), '1.0', true );
}
add_action( 'admin_enqueue_scripts', 'hacklabTema\\enqueue_reorder_admin_menus_script' );