<?php

namespace Ninja;

/**
 * Builds a WP_Query args array to query posts for a block.
 *
 * This takes in the block attributes and an optional array of post IDs
 * to exclude. It returns a WP_Query args array to query posts according
 * to the attributes, excluding the given IDs.
 *
 * @param array $attributes Block attributes.
 * @param array $post__not_in Optional array of post IDs to exclude.
 * @return array WP_Query args array.
 */
function build_posts_query( $attributes, $post__not_in = [] ) {

    $compare       = ! empty( $attributes['compare'] ) ? $attributes['compare'] : 'OR';
    $post_type     = isset( $attributes['postType'] ) ? $attributes['postType'] : 'post';
    $posts_to_show = isset( $attributes['postsToShow'] ) ? intval( $attributes['postsToShow'] ) : 3;
    $taxonomy      = isset( $attributes['taxonomy'] ) ? $attributes['taxonomy'] : '';
    $query_terms   = isset( $attributes['queryTerms'] ) ? $attributes['queryTerms'] : [];
    $return_ids    = isset( $attributes['returnIds'] ) ? $attributes['returnIds'] : false;
    $show_children = ! empty( $attributes['showChildren'] );

    // Exclude posts
    $no_compare     = ! empty( $attributes['noCompare'] ) ? $attributes['noCompare'] : 'OR';
    $no_post_type   = ! empty( $attributes['noPostType'] ) ? $attributes['postType'] : '';
    $no_taxonomy    = ! empty( $attributes['noTaxonomy'] ) ? $attributes['noTaxonomy'] : '';
    $no_query_terms = ! empty( $attributes['noQueryTerms'] ) ? $attributes['noQueryTerms'] : [];

    $no_post__not_in = [];

    if ( $no_post_type ) {
        $no_args = [
            'post_type'      => $no_post_type,
            'posts_per_page' => -1,
            'fields'         => 'ids'
        ];

        if ( $no_taxonomy && $no_query_terms ) {
            $no_args['tax_query'] = ['relation' => $no_compare];

            foreach ( $no_query_terms as $no_term ) {
                $no_args['tax_query'][] = [
                    'taxonomy' => $no_taxonomy,
                    'field'    => 'term_id',
                    'terms'    => [$no_term['id']]
                ];
            }

            $no_post__not_in = get_posts( $no_args );
        }
    }

    $order    = isset( $attributes['order'] ) ? $attributes['order'] : 'desc';
    $order_by = isset( $attributes['orderBy'] ) ? $attributes['orderBy'] : 'date';

    $args = [
        'ignore_sticky_posts' => true,
        'order'               => $order,
        'orderby'             => $order_by,
        'post_type'           => $post_type,
        'posts_per_page'      => $posts_to_show
    ];

    if ( $taxonomy && $query_terms ) {
        $args['tax_query'] = ['relation' => $compare];

        foreach ( $query_terms as $term ) {
            $args['tax_query'][] = [
                'taxonomy' => $taxonomy,
                'field'    => 'term_id',
                'terms'    => [$term['id']]
            ];
        }
    }

    if ( $return_ids ) {
        $args['fields'] = 'ids';
    }

    if ( ! $show_children ) {
        $args['post_parent'] = 0;
    }

    $args['post__not_in'] = array_merge(
        $no_post__not_in,
        $post__not_in,
        get_the_ID() ? [ get_the_ID() ] : []
    );

	do_action( 'qm/debug', $attributes );
    do_action( 'qm/debug', $no_args );

    return $args;

}

function filter_save_post( $post_id, $post ) {
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return $post_id;
    }

    clear_block_transients( $post, 'ninja/latest-horizontal-posts', 'ninja_horizontal_' );
    // clear_block_transients( $post, 'ninja/latest-horizontal-posts', 'ninja_youtube_' );
    clear_block_transients( $post, 'ninja/latest-horizontal-posts', 'ninja_columnists_' );
    clear_block_transients( $post, 'ninja/latest-vertical-posts', 'ninja_vertical_' );
}

add_action( 'save_post', 'Ninja\\filter_save_post', 10, 2 );
add_action( 'delete_post', 'Ninja\\filter_save_post', 10, 2 );

function clear_block_transients( $post, $block_name, $transient_name ) {
    if ( has_block( $block_name, $post ) ) {
        global $wpdb;

        $transient_name = '_transient_' . $transient_name;
        $cache_keys = $wpdb->get_col( "SELECT option_name FROM {$wpdb->options} WHERE option_name LIKE '$transient_name%'" );

        foreach ( $cache_keys as $key ) {
            $transient_name = str_replace( '_transient_', '', $key );
            $delete_transient = delete_transient( $transient_name );
        }
    }
}
