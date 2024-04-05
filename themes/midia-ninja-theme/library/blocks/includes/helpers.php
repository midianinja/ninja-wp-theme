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

    $post_type     = isset( $attributes['postType'] ) ? $attributes['postType'] : 'post';
    $posts_to_show = isset( $attributes['postsToShow'] ) ? intval( $attributes['postsToShow'] ) : 3;

    $order    = isset( $attributes['order'] ) ? $attributes['order'] : 'desc';
    $order_by = isset( $attributes['orderBy'] ) ? $attributes['orderBy'] : 'date';

    $args = [
        'ignore_sticky_posts' => true,
        'order'               => $order,
        'orderby'             => $order_by,
        'post_type'           => $post_type,
        'posts_per_page'      => $posts_to_show
    ];

    if ( $post_type === 'post' && isset( $attributes['taxQueryTerms'] ) && ! empty( $attributes['taxQueryTerms'] ) ) {

        $args['tax_query'] = ['relation' => 'AND'];

        foreach ( $attributes['taxQueryTerms'] as $term ) {
            $args['tax_query'][] = [
                'taxonomy' => 'category', // TODO: Make this dynamic
                'field'    => 'term_id',
                'terms'    => [$term['id']]
            ];
        }
    }

    $args['post__not_in'] = array_merge(
        $post__not_in,
        get_the_ID() ? [ get_the_ID() ] : []
    );

    return $args;

}

function filter_save_post( $post_id, $post ) {
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return $post_id;
    }

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
            do_action( 'logger', 'Transient ' . $transient_name . ' deleted', $delete_transient );
        }
    }
}
