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

    $post_type = isset( $attributes['postType'] ) ? $attributes['postType'] : [ 'post' ];
    $posts_to_show = intval( $attributes['postsToShow'] );

    $order = isset( $attributes['order'] ) ? $attributes['order'] : 'desc';
    $order_by = isset( $attributes['orderBy'] ) ? $attributes['orderBy'] : 'date';

    $args = [
        'ignore_sticky_posts' => true,
        'order'               => $order,
        'orderby'             => $order_by,
        'post_type'           => $post_type,
        'posts_per_page'      => $posts_to_show
    ];

    $args['post__not_in'] = array_merge(
        $post__not_in,
        get_the_ID() ? [ get_the_ID() ] : []
    );

    return $args;

}
