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

    $slides_to_show = $attributes['slidesToShow'] ?? 3;

    ob_start();
    if ( $posts_query->have_posts() ) :

        $card_format = ( isset( $attributes['cardFormat'] ) && ! empty( $attributes['cardFormat'] ) ) ? esc_attr( $attributes['cardFormat'] ) : 'specials';
        $content_position = ( isset( $attributes['contentPosition'] ) && ! empty( $attributes['contentPosition'] ) ) ? esc_attr( $attributes['contentPosition'] ) : 'left';
        $custom_class = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';
        $description = ( isset( $attributes['description'] ) && ! empty( $attributes['description'] ) ) ? apply_filters( 'the_content', $attributes['description'] ) : false;
        $show_taxonomy = ( isset( $attributes['showTaxonomy'] ) && ! empty( $attributes['showTaxonomy'] ) ) ? true : false;

        $block_classes[] = 'latest-horizontal-posts-block';
        $block_classes[] = $custom_class;
        $block_classes[] = 'card-' . $card_format;
        $block_classes[] = 'content-' . $content_position;
        $block_classes[] = 'show-slides-' . $slides_to_show;
        $block_classes[] = $show_taxonomy ? 'post--has-taxonomy' : '';

        $block_classes = array_filter( $block_classes );

        // Start the block structure
        echo '<div id="block__' . esc_attr( $attributes['blockId'] ) . '" class="' . implode( ' ', $block_classes ) . '" data-slider="horizontal-posts" data-slides-to-show="'. $slides_to_show. '">';
            echo '<div class="container">';
                echo '<div class="latest-horizontal-posts-block__content">';
                    $heading = $attributes['heading'] ?? '';

                    if ( $heading || $description ) {
                        echo '<div class="latest-horizontal-posts-block__heading">';
                            if ( ! empty( $heading ) ) {
                                echo '<h2>'. $heading. '</h2>';
                            }

                            if ( ! empty( $description ) ) {
                                echo $description;
                        }
                        echo '</div>';
                    }

                    // The footer with dots and arrows
                    echo '<div class="latest-horizontal-posts-block__footer">';
                        echo '<div class="latest-horizontal-posts-block__dots"></div>';
                        echo '<div class="latest-horizontal-posts-block__arrows"></div>';
                    echo '</div><!-- .latest-horizontal-posts-block__footer -->';

                echo '</div><!-- .latest-horizontal-posts-block__content -->';

                // List of the posts to mount slider
                echo '<div class="latest-horizontal-posts-block__slides">';
                    while ( $posts_query->have_posts() ) :
                        $posts_query->the_post();
                        global $post;

                        $latest_horizontal_posts_ids[] = $post->ID;

                        echo "<div class='slide'>";
                        get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', $card_format, ['post' => $post, 'attributes' => $attributes] );
                        echo "</div>";

                    endwhile;
                echo '</div><!-- .latest-horizontal-posts-block__slides -->';

                // The footer with dots and arrows on medium
                echo '<div class="latest-horizontal-posts-block__footer medium-only">';
                    echo '<div class="latest-horizontal-posts-block__dots"></div>';
                    echo '<div class="latest-horizontal-posts-block__arrows"></div>';
                echo '</div><!-- .latest-horizontal-posts-block__footer -->';
            echo '</div>';

        echo '</div><!-- .latest-horizontal-posts-block -->';

    endif;

    wp_reset_postdata();

    $output = ob_get_clean();

    return $output;

}
