<?php

namespace Ninja;

function latest_grid_posts_callback( $attributes ) {

    global $newspack_blocks_post_id;
    global $latest_blocks_posts_ids;

    $block_id = esc_attr( $attributes['blockId'] );
    $compare  = ! empty( $attributes['compare'] ) ? $attributes['compare'] : 'OR';

    $locale_code_attr = ! empty( $attributes['localeCode'] ) ? esc_attr( $attributes['localeCode'] ) : '';

    $current_lang = defined( 'ICL_LANGUAGE_CODE' ) ? ICL_LANGUAGE_CODE : '';

    $locale_code = $locale_code_attr ?: $current_lang;

    if ( $locale_code && strlen( $locale_code ) > 2 && strpos( $locale_code, '_' ) !== false ) {
        $locale_code = substr( $locale_code, 0, 2 );
    }

    $post_type      = ! empty( $attributes['postType'] ) ? esc_attr( $attributes['postType'] ) : 'post';
    $taxonomy       = ! empty( $attributes['taxonomy'] ) ? esc_attr( $attributes['taxonomy'] ) : '';
    $query_terms    = ! empty( $attributes['queryTerms'] ) ? $attributes['queryTerms'] : [];
    $posts_per_page = ! empty( $attributes['postsPerPage'] ) ? esc_attr( $attributes['postsPerPage'] ) : 10;
    $posts_to_show  = ! empty( $attributes['postsToShow'] ) ? esc_attr( $attributes['postsToShow'] ) : 20;
    $show_author    = ! empty( $attributes['showAuthor'] );
    $show_children  = ! empty( $attributes['showChildren'] );
    $show_date      = ! empty( $attributes['showDate'] );
    $show_excerpt   = ! empty( $attributes['showExcerpt'] );

    // Exclusão de posts
    $no_compare     = ! empty( $attributes['noCompare'] ) ? $attributes['noCompare'] : 'OR';
    $no_post_type   = ! empty( $attributes['noPostType'] ) ? $attributes['noPostType'] : '';
    $no_taxonomy    = ! empty( $attributes['noTaxonomy'] ) ? $attributes['noTaxonomy'] : '';
    $no_query_terms = ! empty( $attributes['noQueryTerms'] ) ? $attributes['noQueryTerms'] : [];

    $block_classes   = [];
    $block_classes[] = 'latest-grid-posts-block';
    $block_classes[] = $show_children ? 'post--has-children' : '';
    $block_classes[] = 'post--type-' . sanitize_title( $post_type );

    if ( ! $query_terms ) {
        $taxonomy = '';
    }

    $attributes['returnIds'] = true;

    $post__not_in = array_merge( $latest_blocks_posts_ids, array_keys( $newspack_blocks_post_id ) );
    $post__not_in = array_unique( $post__not_in, SORT_STRING );

    ob_start();

    echo '<div id="block__' . $block_id . '" class="' . implode( ' ', $block_classes ) . '">';
        echo '<div class="container">';
            echo '<div class="latest-grid-posts-block__content"
                data-compare="' . esc_attr( $compare ) . '"
                data-locale-code="' . esc_attr( $locale_code ) . '"
                data-max-posts="' . esc_attr( $posts_to_show ) . '"
                data-per-page="' . esc_attr( $posts_per_page ) . '"
                data-post-not-in="' . esc_attr( implode( ',', $post__not_in ) ) . '"
                data-post-type="' . esc_attr( $post_type ) . '"
                data-no-compare="' . esc_attr( $no_compare ) . '"
                data-no-post-type="' . esc_attr( $no_post_type ) . '"
                data-no-taxonomy="' . esc_attr( $no_taxonomy ) . '"
                data-no-query-terms="' . esc_attr( implode( ',', array_column( $no_query_terms, 'id' ) ) ) . '"
                data-show-author="' . esc_attr( $show_author ) . '"
                data-show-children="' . esc_attr( $show_children ) . '"
                data-show-date="' . esc_attr( $show_date ) . '"
                data-show-excerpt="' . esc_attr( $show_excerpt ) . '"
                data-taxonomy="' . esc_attr( $taxonomy ) . '"
                data-terms="' . esc_attr( implode( ',', array_column( $query_terms, 'id' ) ) ) . '">';
            echo '</div><!-- .latest-grid-posts-block__content -->';
            echo '<ul class="latest-grid-posts-block__pagination"></ul>';
        echo '</div>';
    echo '</div><!-- .latest-grid-posts-block -->';

    $output = ob_get_clean();
    return $output;
}
