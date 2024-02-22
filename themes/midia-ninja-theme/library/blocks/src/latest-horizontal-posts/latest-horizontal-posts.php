<?php

namespace Ninja;

function latest_horizontal_posts_callback( $attributes ) {

    global $latest_horizontal_posts_ids;

    if ( ! is_array( $latest_horizontal_posts_ids ) ) {
        $latest_horizontal_posts_ids = [];
    }

    $args = build_posts_query( $attributes, $latest_horizontal_posts_ids );

    $posts_query = new \WP_Query( $args );
    $posts = [];

    if ( false === $posts_query->have_posts() ) {
        return;
    }

    $counter = 0;

    // Determina quando posts serão exibidos em cada slide
    $posts_by_slide = $attributes['postsBySlide'] ?? 1;

    ob_start();
    if ( $posts_query->have_posts() ) :

        $show_author = ( isset( $attributes['showAuthor'] ) && ! empty( $attributes['showAuthor'] ) ) ? true : false;
        $show_taxonomy = ( isset( $attributes['showTaxonomy'] ) && ! empty( $attributes['showTaxonomy'] ) ) ? true : false;
        $show_thumbnail = ( isset( $attributes['showThumbnail'] ) && ! empty( $attributes['showThumbnail'] ) ) ? true : false;
        $thumbnail_formtat = ( isset( $attributes['thumbnailFormat'] ) && ! empty( $attributes['thumbnailFormat'] ) ) ? true : '';
        $custom_class = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';

        $block_classes[] = 'latest-horizontal-posts-block';
        $block_classes[] = $custom_class;
        $block_classes[] = $show_author ? 'post--has-author' : '';
        $block_classes[] = $show_taxonomy ? 'post--has-taxonomy' : '';
        $block_classes[] = $show_thumbnail ? 'post--has-thumbnail' : '';
        $block_classes[] = $thumbnail_formtat ? 'post--thumbnail-rounded' : '';

        $block_classes = array_filter( $block_classes );

        // Start the block structure
        echo '<div id="block__' . esc_attr( $attributes['blockId'] ) . '" class="' . implode( ' ', $block_classes ) . '" data-slider="horizontal-posts">';

            $heading = $attributes['heading'] ?? '';

            if ( ! empty( $heading ) ) {
                echo '<div class="latest-horizontal-posts-block__heading"><h2>'. $heading. '</h2></div>';
            }

            // List of the posts to mount slider
            echo '<div class="latest-horizontal-posts-block__slides">';

                while ( $posts_query->have_posts() ) :
                    $posts_query->the_post();
                    global $post;

                    $latest_horizontal_posts_ids[] = $post->ID;
                    $counter++;

                    if ( $counter == 1 ) {
                        echo "<div class='slide'>";
                    }

                    get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', '', ['post' => $post, 'attributes' => $attributes] );

                    if ( $counter == $posts_by_slide || $counter == $posts_query->post_count ) {
                        echo "</div>";
                        $counter = 0;
                    }

                endwhile;

                if ( $counter != 0 ) {
                    echo "</div>";
                }

                echo '</div><!-- .latest-horizontal-posts-block__slides -->';

            // The footer with dots and arrows
            echo '<div class="latest-horizontal-posts-block__footer">';
                echo '<div class="latest-horizontal-posts-block__dots"></div>';
                echo '<div class="latest-horizontal-posts-block__arrows"></div>';
            echo '</div><!-- .latest-horizontal-posts-block__footer -->';

        echo '</div><!-- .latest-horizontal-posts-block -->';

    endif;

    wp_reset_postdata();

    $output = ob_get_clean();

    return $output;

}
