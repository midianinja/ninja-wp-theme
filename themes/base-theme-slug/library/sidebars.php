<?php 

function widgets_areas() {
	register_sidebar(array(
		'name'          => 'Sidebar Padrão',
		'id'            => 'sidebar-default',
		'description'   => 'Barra lateral utilizada na maioria das listagens, como categorias, tags e etc',
		'before_widget' => '<div class="sidebar-area before-sidebar-default">',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	));

	register_sidebar(array(
		'name'          => 'Sidebar Notícias',
		'id'            => 'sidebar-posts',
		'before_widget' => '<div class="sidebar-area before-sidebar-posts">',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	));

	register_sidebar(array(
		'name'          => 'Sidebar Resultado de Pesquisa',
		'id'            => 'sidebar-search',
		'before_widget' => '<div class="sidebar-area before-sidebar-search">',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	));

    register_sidebar(array(
		'name'          => 'Before Footer logos area',
		'id'            => 'before_footer_logos_area',
		'before_widget' => '<div class="sidebar-area before-footer-logos-area">',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	));

    register_sidebar(array(
		'name'          => 'Footer logos area',
		'id'            => 'footer_logos_area',
		'before_widget' => '<div class="footer-logos-area">',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	));

	register_sidebar(array(
		'name'          => 'Footer copyright area',
		'id'            => 'footer_copyright_area',
		'before_widget' => '<div class="footer-copyright-area">',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	));

}

add_action('widgets_init', 'widgets_areas');
