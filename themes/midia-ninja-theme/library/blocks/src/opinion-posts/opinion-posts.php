<?php

namespace Ninja;

function opinion_posts_callback( $attributes ) {
	$block_id = esc_attr( $attributes['blockId'] );

	$custom_class = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';
    $block_classes[] = 'opinion-posts-block';

    if ( ! empty( $custom_class ) ){
        $block_classes[]   = $custom_class;
    }

    $counter = 0;

    $posts_by_slide = $attributes['postsBySlide'] ?? 2;

	$attributes['postType'] = 'opiniao';
	$attributes_hash = md5( serialize( $attributes ) );

	$cache_key = 'ninja_opinion_' . $attributes_hash;
	$cached_posts = get_transient( $cache_key );

	if ( false !== $cached_posts ) {
		$posts_query = $cached_posts;
	} else {
		$args = build_posts_query( $attributes );
		$posts_query = new \WP_Query( $args );

		if ( false === $posts_query->have_posts() ) {
			if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
				return '<h2>'. __( 'No content found', 'ninja' ). '</h2>';
			}

			return;
		}

		set_transient( $cache_key, $posts_query, 3600 );
	}

	$has_content = $posts_query;

    if ( ! $has_content ) {
        if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
            return '<h2>'. __( 'No content found', 'ninja' ). '</h2>';
        }

        return;
    }

    ob_start();

    $block_classes = array_filter( $block_classes );

    // Start the block structure
    echo '<div id="block__' . esc_attr( $attributes['blockId'] ) . '" class="' . implode( ' ', $block_classes ) . '" data-slider="vertical-posts">';
	echo '<div class="container">';

    $heading = $attributes['heading'] ?? __('Opinion', 'ninja');
	$link_text = $attributes['linkText'] ?? __('See all columns', 'ninja');

	echo '<div class="opinion-posts-block__heading">';
		echo '<h2>'. $heading. '</h2>';
		echo '<a href="' . get_post_type_archive_link( 'opiniao' ) . '">' . $link_text . '</a>';
	echo '</div>';

	echo '<div class="opinion-posts-block__posts">';

     // List of the posts to mount slider
     echo '<div class="opinion-posts-block__slides">';

	if ( $has_content->have_posts() ) :

		$attributes['counter_posts'] = 0;

		while ( $has_content->have_posts() ) :
			$has_content->the_post();
			global $post;

			$counter++;

			if ( $counter == 1 ) {
				echo "<div class='slide'>";
			}

			$attributes['counter_posts']++;

			get_template_part( 'library/blocks/src/opinion-posts/template-parts/post', '', ['post' => $post, 'attributes' => $attributes] );

			if ( $counter == $posts_by_slide || $counter == $has_content->post_count ) {
				echo "</div>";
				$counter = 0;
			}

		endwhile;

		if ( $counter != 0 ) {
			echo "</div>";
		}

	endif;

	wp_reset_postdata();

    echo '</div><!-- .opinion-posts-block__slides -->';
	echo '</div><!-- .opinion-posts-block__posts -->';

    // The footer with dots and arrows
    echo '<div class="opinion-posts-block__footer">';
    echo '<div class="opinion-posts-block__dots"></div>';
    echo '<div class="opinion-posts-block__arrows"></div>';
    echo '</div><!-- .opinion-posts-block__footer -->';

	echo '</div><!-- .container -->';
    echo '</div><!-- .opinion-posts-block -->';

    $output = ob_get_clean();

    return $output;

}
