<?php

/**
 * Redirect access to single Layout Archive to home
 */
function redirect_single_layout_archive() {
	if ( is_singular( 'header-footer' ) ) {
		$redirect_url = home_url();
		wp_redirect( $redirect_url );
		exit;
	}
}

add_action( 'template_redirect', 'redirect_single_layout_archive' );


/**
 * Check and return the archive slug
 */
function check_archive() {

	$get_queried_object = get_queried_object();

	if ( is_category() || is_tag() ) {
		return $get_queried_object->taxonomy;
	}

	if ( is_tax() ) {
		return $get_queried_object->slug;
	}

	if ( is_post_type_archive() ) {
		return $get_queried_object->name;
	}

	if ( is_page_template( 'page-anchor-membresia.php' ) ) {
		return 'membresia';
	}

	if ( is_page_template( 'page-anchor.php' ) ) {
		return 'anchor';
	}

	if ( is_search() ) {
		return 'search';
	}

	return false;

}


/**
 * Get the layout of the archive
 */
function get_layout_archive( $slug, $position = '' ) {

	$position = ( 'header' === $position ) ? 'header' : 'footer' ;
	$return = false;
	$html = '';

	$args = [
		'post_type'  => 'header-footer',
		'meta_key'   => 'archive',
		'meta_query' => [
			[
				'key'   => 'archive',
				'value' => $slug
			]
		]
	];

	if ( $position ) {
		array_push( $args['meta_query'], [
			'key'   => 'position',
			'value' => $position
		] );
	}

	$wp_query = new WP_Query( $args );

	if ( $wp_query && ! is_wp_error( $wp_query ) && $wp_query->post_count ) {
		$return =  $wp_query->posts[0];
	}

	if ( $return ) {
		$html .= '<div class="header-and-footer-archive position-' . $position . '">';
		$html .= apply_filters( 'the_content', $return->post_content );
		$html .=  '</div>';

		wp_reset_postdata();

		return $html;
	}

	wp_reset_postdata();

	return $return;

}

function get_layout_header( $slug ) {
	return get_layout_archive( $slug, 'header' );
}

function get_layout_footer( $slug ) {
	return get_layout_archive( $slug, 'footer' );
}
