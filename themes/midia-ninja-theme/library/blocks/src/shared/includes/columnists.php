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
        'posts_per_page' => 999,
        'orderby'        => 'rand',
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
    $limit = 10;

    if ( $authors ) {
        foreach ( $authors as $author_id ) {
            if ( count_user_posts( $author_id, 'post' ) > 0 ) {
                $data[] = $author_id;
                if ( count( $data ) >= $limit ) {
                    break;
                }
            }
        }
    
        if ( ! empty( $data ) ) {
            set_transient( $cache_key, $data, 3600 );
        }
    }

    return $data;
}
