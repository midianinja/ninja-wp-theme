<?php

namespace Ninja;

function columnists_get_contents( $attributes ) {
	$block_id = esc_attr( $attributes['blockId'] );

	$cache_key = 'ninja_columnists_' . $block_id;
	$cached_data = get_transient( $cache_key );

	if ( false !== $cached_data ) {
		return $cached_data;
	}

	$data = [];

	$limit = ! empty( $attributes['postsToShow'] ) ? $attributes['postsToShow'] : 10;

	if ( method_exists( 'AjaxPageviews', 'get_top_viewed_co_authors' ) ) {

		$top_viewed_posts = \AjaxPageviews::get_top_viewed_co_authors( $limit );

		if ( $top_viewed_posts ) {
			$top_viewed_posts = array_map( function( $item ) {
				return $item->ID;
			}, $top_viewed_posts );
		}

		$data = $top_viewed_posts;

	} else {
		$args = [
			'post_type'      => 'guest-author',
			'posts_per_page' => 999,
			'orderby'        => 'rand',
			'meta_query'     => [
				[
					'key'     => 'colunista',
					'value'   => 1,
					'compare' => '='
				],
			]
		];

		$authors = get_posts( $args );

		if ( $authors ) {
			foreach ( $authors as $author ) {
				if ( count_guest_author_posts( $author->post_name, 'post' ) > 0 ) {
					$data[] = $author->ID;
					if ( count( $data ) >= $limit ) {
						break;
					}
				}
			}
		}
	}

	if ( ! empty( $data ) ) {
		set_transient( $cache_key, $data, 3600 );
	}

	return $data;
}
