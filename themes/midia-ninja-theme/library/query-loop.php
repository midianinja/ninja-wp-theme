<?php
/**
 * Query Loop block "sections" support.
 *
 * The site's "Colunas" and "Galerias" sections are not terms of the
 * `category` taxonomy ("Editorials"): "Colunas" maps to the `opiniao` post
 * type and "Galerias" maps to the `galeria` post type.
 *
 * This module registers a lightweight taxonomy (`ninja_secao`) whose terms
 * act as virtual section options inside the Query Loop block (`core/query`)
 * filter panel. A selected option is added to the loop's own post type: a
 * news loop (post type `post`) with "Colunas" and "Galerias" selected
 * becomes a mixed feed of `post` + `opiniao` + `galeria`, keeping the base
 * news feed intact. The same translation is applied to the REST queries
 * that power the block's editor preview, so the preview matches the
 * front-end render.
 *
 * @package Ninja
 */

namespace Ninja;

/**
 * Register the "section" taxonomy used to expose the Colunas and Galerias
 * options to the Query Loop block filter panel.
 *
 * The taxonomy is hidden from the admin UI and from the front-end (no
 * rewrite rules, no query var). It only needs to be visible to the REST API
 * (`show_in_rest`) so the block editor can list its terms, and publicly
 * queryable so the editor's filter panel displays it.
 */
function register_query_loop_sections_taxonomy() {
	register_taxonomy(
		'ninja_secao',
		[ 'post', 'opiniao', 'galeria' ],
		[
			'label'              => __( 'Sections', 'ninja' ),
			'labels'             => [
				'name'          => __( 'Sections', 'ninja' ),
				'singular_name' => __( 'Section', 'ninja' ),
			],
			'public'             => false,
			'publicly_queryable' => true,
			'show_ui'            => false,
			'show_in_menu'       => false,
			'show_in_nav_menus'  => false,
			'show_tagcloud'      => false,
			'show_in_quick_edit' => false,
			'show_admin_column'  => false,
			'show_in_rest'       => true,
			'hierarchical'       => false,
			'query_var'          => false,
			'rewrite'            => false,
		]
	);

	// Make sure the virtual section terms exist so the editor can select them.
	$sections = [
		'colunas'  => 'Colunas',
		'galerias' => 'Galerias',
	];

	$existing = get_terms(
		[
			'taxonomy'   => 'ninja_secao',
			'slug'       => array_keys( $sections ),
			'hide_empty' => false,
			'fields'     => 'id=>slug',
		]
	);

	if ( is_wp_error( $existing ) ) {
		return;
	}

	foreach ( $sections as $slug => $name ) {
		if ( ! in_array( $slug, $existing, true ) ) {
			wp_insert_term( $name, 'ninja_secao', [ 'slug' => $slug ] );
		}
	}
}
add_action( 'init', 'Ninja\\register_query_loop_sections_taxonomy', 12 );

/**
 * Map a section term slug to the post type it represents.
 *
 * @param string $term_slug Section term slug.
 * @return string Post type, or empty string when the slug is not a section.
 */
function get_query_loop_section_post_type( $term_slug ) {
	$sections = [
		'colunas'  => 'opiniao',
		'galerias' => 'galeria',
	];

	return isset( $sections[ $term_slug ] ) ? $sections[ $term_slug ] : '';
}

/**
 * Add the post types of the Query Loop block "section" selection to the
 * rendered query.
 *
 * The selection is additive: the post types of the selected sections are
 * merged with the loop's own post type (defaults to `post`), so a news loop
 * with "Colunas" and/or "Galerias" selected renders a mixed feed instead of
 * replacing the base news feed.
 *
 * @param array    $query WP_Query arguments built from the block.
 * @param WP_Block $block The block being rendered.
 * @param int      $page  Current query page.
 * @return array Updated WP_Query arguments.
 */
function translate_query_loop_section_tax_query( $query, $block, $page ) {
	$selected = isset( $block->context['query']['taxQuery']['ninja_secao'] )
		? (array) $block->context['query']['taxQuery']['ninja_secao']
		: [];

	if ( empty( $selected ) ) {
		return $query;
	}

	// Base post type of the loop (defaults to news), kept so the selected
	// sections are added to it instead of replacing it.
	$post_types = (array) $query['post_type'];
	$post_types = $post_types ? array_values( $post_types ) : [ 'post' ];

	foreach ( $selected as $term_id ) {
		$term = get_term( (int) $term_id, 'ninja_secao' );

		if ( ! $term || is_wp_error( $term ) ) {
			continue;
		}

		$post_type = get_query_loop_section_post_type( $term->slug );

		if ( $post_type ) {
			$post_types[] = $post_type;
		}
	}

	$post_types = array_values( array_unique( $post_types ) );

	if ( empty( $post_types ) ) {
		return $query;
	}

	$query['post_type'] = 1 === count( $post_types ) ? $post_types[0] : $post_types;

	// The section taxonomy is a virtual selector: drop it from the tax_query
	// so it does not filter out every post, keeping other filters untouched.
	if ( ! empty( $query['tax_query'] ) && is_array( $query['tax_query'] ) ) {
		$query['tax_query'] = array_values(
			array_filter(
				$query['tax_query'],
				function ( $tax_item ) {
					return ! ( is_array( $tax_item ) && isset( $tax_item['taxonomy'] ) && 'ninja_secao' === $tax_item['taxonomy'] );
				}
			)
		);
	}

	return $query;
}
add_filter( 'query_loop_block_query_vars', 'Ninja\\translate_query_loop_section_tax_query', 10, 3 );

/**
 * Add the post types of the Query Loop block "section" selection to the
 * editor preview query.
 *
 * The block editor preview fetches posts through the REST API, sending the
 * selected section terms as a taxonomy filter. The same additive merge
 * applied to the rendered query is applied here so the preview shows the
 * matching mixed feed.
 *
 * @param array           $args    WP_Query arguments for the REST request.
 * @param WP_REST_Request $request The REST request.
 * @return array Updated WP_Query arguments.
 */
function translate_query_loop_section_rest_query( $args, $request ) {
	if ( empty( $args['tax_query'] ) || ! is_array( $args['tax_query'] ) ) {
		return $args;
	}

	// Keep the request's own post type (the loop's post type) and add the
	// selected sections to it, matching the front-end merge.
	$post_types = (array) $args['post_type'];
	$post_types = $post_types ? array_values( $post_types ) : [ 'post' ];

	foreach ( $args['tax_query'] as $key => $tax_item ) {
		if ( ! is_array( $tax_item ) || ! isset( $tax_item['taxonomy'] ) || 'ninja_secao' !== $tax_item['taxonomy'] ) {
			continue;
		}

		foreach ( (array) $tax_item['terms'] as $term_id ) {
			$term = get_term( (int) $term_id, 'ninja_secao' );

			if ( ! $term || is_wp_error( $term ) ) {
				continue;
			}

			$post_type = get_query_loop_section_post_type( $term->slug );

			if ( $post_type ) {
				$post_types[] = $post_type;
			}
		}

		unset( $args['tax_query'][ $key ] );
	}

	$post_types = array_values( array_unique( $post_types ) );

	if ( empty( $post_types ) ) {
		return $args;
	}

	$args['post_type'] = 1 === count( $post_types ) ? $post_types[0] : $post_types;

	return $args;
}
add_filter( 'rest_post_query', 'Ninja\\translate_query_loop_section_rest_query', 10, 2 );
add_filter( 'rest_opiniao_query', 'Ninja\\translate_query_loop_section_rest_query', 10, 2 );
add_filter( 'rest_galeria_query', 'Ninja\\translate_query_loop_section_rest_query', 10, 2 );
