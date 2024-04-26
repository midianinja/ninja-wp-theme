<?php

namespace Ninja;

function columnists_get_contents( $block_id ) {
    $cache_key = 'ninja_columnists_' . $block_id;
    $cached_data = get_transient( $cache_key );

    if ( false !== $cached_data ) {
        return $cached_data;
    }

    $data = [];

    $args = [
        'post_type'      => 'guest-author',
        'posts_per_page' => 8,
        'meta_query'     => [
            [
                'key'     => 'colunista',
                'value'   => 1,
                'compare' => '='
            ],
        ],
        'fields' => 'ids'
    ];

    $authors = get_posts( $args );

    if ( ! empty( $authors ) ) {
        set_transient( $cache_key, $authors, 3600 );
    }

    return $authors;
}
