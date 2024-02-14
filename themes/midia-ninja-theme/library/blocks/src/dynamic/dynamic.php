<?php

namespace Ninja;

function dynamic_block_recent_posts( $attributes ) {

	$show_heading = $attributes['showHeading'] ?? true;
	$heading = $attributes['heading'] ?? '';

	$args = [
		'posts_per_page'      => $attributes['postsToShow'] ?? 10,
		'post_status'         => 'publish',
		'order'               => $attributes['order'] ?? 'DESC',
		'orderby'             => $attributes['orderBy'] ?? 'date',
		'ignore_sticky_posts' => true,
		'no_found_rows'       => true,
	];

	$query        = new \WP_Query();
	$latest_posts = $query->query( $args );

	$li_html = '';

	foreach ( $latest_posts as $post ) {
		$post_link = esc_url( get_permalink( $post ) );
		$title     = get_the_title( $post );

		if ( ! $title ) {
			$title = __( '(no title)', 'dynamic-block' );
		}

		$li_html .= '<li>';

		$li_html .= sprintf(
			'<a class="dynamic-block-recent-posts__post-title" href="%1$s">%2$s</a>',
			esc_url( $post_link ),
			$title
		);

		$li_html .= '</li>';
	}

	$classes = ['dynamic-block-recent-posts'];

	$wrapper_attributes = get_block_wrapper_attributes( ['class' => implode( ' ', $classes ) ] );

	$heading = $show_heading ? $heading : '';

	return sprintf(
		'%1$s<ul %2$s>%3$s</ul>',
		$heading,
		$wrapper_attributes,
		$li_html
	);
}
