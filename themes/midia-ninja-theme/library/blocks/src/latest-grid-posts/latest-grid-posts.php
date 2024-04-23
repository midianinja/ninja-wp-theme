<?php

namespace Ninja;

function latest_grid_posts_callback( $attributes ) {

    $block_id        = esc_attr( $attributes['blockId'] );
    $post_type       = ! empty( $attributes['postType'] ) ? esc_attr( $attributes['postType'] ) : 'post';
    $taxonomy        = ! empty( $attributes['taxonomy'] ) ? esc_attr( $attributes['taxonomy'] ) : '';
    $query_terms     = ! empty( $attributes['queryTerms'] ) ? $attributes['queryTerms'] : [];
    $posts_per_page  = ! empty( $attributes['postsPerPage'] ) ? esc_attr( $attributes['postsPerPage'] ) : 10;
    $posts_to_show   = ! empty( $attributes['postsToShow'] ) ? esc_attr( $attributes['postsToShow'] ) : 20;
    $show_author     = ! empty( $attributes['showAuthor'] );
    $show_children   = ! empty( $attributes['showChildren'] );
    $show_date       = ! empty( $attributes['showDate'] );
    $show_excerpt    = ! empty( $attributes['showExcerpt'] );

    $block_classes[] = 'latest-grid-posts-block';
    $block_classes[] = $show_children ? 'post--has-children' : '';

    if ( ! $query_terms ) {
        $taxonomy = '';
    }

    global $latest_blocks_posts_ids;

    if ( ! is_array( $latest_blocks_posts_ids ) ) {
        $latest_blocks_posts_ids = [];
    }

    $attributes['returnIds'] = true;
    $post__not_in = $latest_blocks_posts_ids;

    $args = build_posts_query( $attributes, $latest_blocks_posts_ids );
    $posts_query = get_posts( $args );

    $latest_blocks_posts_ids = array_merge( $post__not_in, $posts_query );

    ob_start();

    // Start the block structure
    echo '<div id="block__' . $block_id . '" class="' . implode( ' ', $block_classes ) . '">';
        echo '<div class="container">';
            echo '<div class="latest-grid-posts-block__content"
                data-max-posts="' . $posts_to_show . '"
                data-per-page="' . $posts_per_page . '"
                data-post-not-in="' . implode( ',', $post__not_in ) . '"
                data-post-type="' . $post_type . '"
                data-show-author="' . $show_author . '"
                data-show-children="' . $show_children . '"
                data-show-date="' . $show_date . '"
                data-show-excerpt="' . $show_excerpt . '"
                data-taxonomy="' . $taxonomy . '"
                data-terms="' . implode( ',', array_column( $query_terms, 'id' ) ) . '">';
            echo '</div><!-- .latest-grid-posts-block__content -->';
            echo '<ul class="latest-grid-posts-block__pagination"></ul>';
        echo '</div>';
    echo '</div><!-- .latest-grid-posts-block-block -->';

    $output = ob_get_clean();
    return $output;
}
