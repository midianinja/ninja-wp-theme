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
        ]
    ];

    $authors = get_posts( $args );
    $limit = 10;

    if ( $authors ) {
        foreach ( $authors as $author ) {
            if ( count_guest_author_posts( $author->post_name, 'post' ) > 0 ) {
                $data[] = $author->ID;
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
