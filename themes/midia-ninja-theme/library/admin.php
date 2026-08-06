<?php
namespace hacklabTema;


function enqueue_reorder_admin_menus_script() {
  wp_enqueue_script( 'reorder-admin-menus-script', get_template_directory_uri() . '/assets/javascript/functionalities/admin/reorder-admin-menus.js', array(), '1.0', true );
}
add_action( 'admin_enqueue_scripts', 'hacklabTema\\enqueue_reorder_admin_menus_script' );

function enqueue_force_color_picker_commit_script() {
  wp_enqueue_script(
    'force-color-picker-commit',
    get_template_directory_uri() . '/assets/javascript/functionalities/admin/force-color-picker-commit.js',
    array( 'jquery', 'wp-color-picker' ),
    '1.0',
    true
  );
}
add_action( 'admin_enqueue_scripts', 'hacklabTema\\enqueue_force_color_picker_commit_script' );