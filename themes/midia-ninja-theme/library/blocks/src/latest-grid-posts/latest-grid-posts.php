<?php

namespace Ninja;

function latest_grid_posts_callback( $attributes ) {

    $block_id        = esc_attr( $attributes['blockId'] );
    $block_classes[] = 'latest-grid-posts-block';
    $post_type       = ! empty( $attributes['postType'] ) ? esc_attr( $attributes['postType'] ) : 'post';
    $taxonomy        = ! empty( $attributes['taxonomy'] ) ? esc_attr( $attributes['taxonomy'] ) : '';
    $query_terms     = ! empty( $attributes['queryTerms'] ) ? $attributes['queryTerms'] : [];
    $posts_per_page  = ! empty( $attributes['postsPerPage'] ) ? esc_attr( $attributes['postsPerPage'] ) : 10;
    $posts_to_show   = ! empty( $attributes['postsToShow'] ) ? esc_attr( $attributes['postsToShow'] ) : 20;
    $show_author     = ! empty( $attributes['showAuthor'] );
    $show_date       = ! empty( $attributes['showDate'] );
    $show_excerpt    = ! empty( $attributes['showExcerpt'] );

    if ( ! $query_terms ) {
        $taxonomy = '';
    }

    ob_start();

    // Start the block structure
    echo '<div id="block__' . $block_id . '" class="' . implode( ' ', $block_classes ) . '">';
        echo '<div class="container">';
            echo '<div class="latest-grid-posts-block__content"
                data-taxonomy="' . $taxonomy . '"
                data-terms="' . implode( ',', array_column( $query_terms, 'id' ) ) . '"
                data-post-type="' . $post_type . '"
                data-per-page="' . $posts_per_page . '"
                data-max-posts="' . $posts_to_show . '"
                data-show-date="' . $show_date . '"
                data-show-author="' . $show_author . '"
                data-show-excerpt="' . $show_excerpt . '">';
            echo '</div><!-- .latest-grid-posts-block__content -->';
            echo '<ul class="latest-grid-posts-block__pagination"></ul>';
        echo '</div>';
    echo '</div><!-- .latest-grid-posts-block-block -->';

    $output = ob_get_clean();
    return $output;
}
