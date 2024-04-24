<?php

namespace Ninja;

function array_set_or_push( &$array, $key, $value ) {
	if ( empty( $array[ $key ] ) ) {
		$array[ $key ] = [ $value ];
	} else {
		$array[ $key ][] = $value;
	}
}

function configure_newspack_category_colors() {
	$categories = \get_terms( [
		'taxonomy' => 'category',
		'orderby' => 'term_id',
		'hide_empty' => false,
	] );

	$categories_roots = [];
	$categories_children = [];

	foreach ( $categories as $category ) {
		$background_color = \get_term_meta( $category->term_id, 'ninja_background_term_color', true );
		$font_color = \get_term_meta( $category->term_id, 'ninja_font_term_color', true );

		if ( !empty( $background_color ) && !empty( $font_color ) ) {
			$categories_roots[ $category->term_id ] = [
				'background-color' => $background_color,
				'color' => $font_color,
			];
			array_set_or_push( $categories_children, $category->term_id, $category->slug );
		} else if ( empty( $category->parent ) ) {
			$categories_roots[ $category->term_id ] = [
				'background-color' => 'var(--wp--preset--color--highlight-pure)',
				'color' => 'var(--wp--preset--color--primary-pure)',
			];
			array_set_or_push( $categories_children, $category->term_id, $category->slug );
		} else {
			array_set_or_push( $categories_children, $category->parent, $category->slug );
		}
	}

	$inline_css = '';

	foreach ( $categories_roots as $root => $properties ) {
		if ( ! empty( $categories_children[ $root ] ) ) {
			$slugs = $categories_children[ $root ];
			$classes = [];

			foreach ( $slugs as $slug ) {
				$classes[] = '.category-' . $slug;
			}

			$selector = \implode( ', ', $classes );
			$inline_css .= $selector . ' { --cat-background-color: ' . $properties['background-color'] . '; --cat-color: ' . $properties['color'] . '; }' . "\n";
		}
	}

	return $inline_css;
}

function add_newspack_category_colors() {
	$inline_css = configure_newspack_category_colors();
	\wp_add_inline_style( 'newspack-blocks-block-styles-stylesheet', $inline_css );
}

add_action( 'admin_enqueue_scripts', 'Ninja\\add_newspack_category_colors' );
add_action( 'wp_enqueue_scripts', 'Ninja\\add_newspack_category_colors' );
