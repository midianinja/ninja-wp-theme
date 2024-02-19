<?php

namespace Ninja;

function register_endpoints() {
    register_rest_route(
        'ninja/v1',
        '/taxonomias/(?P<post_type>[a-zA-Z0-9_-]+)',
        [
            'methods'  => 'GET',
            'callback' => 'Ninja\\pegar_taxonomias_por_post_type',
            'args'     => [
                'post_type' => [
                    'required' => true,
                    'validate_callback' => function( $param, $request, $key ) {
                        return post_type_exists( $param );
                    }
                ],
            ]
        ]
    );
}

add_action( 'rest_api_init', 'Ninja\\register_endpoints' );

function pegar_taxonomias_por_post_type( $request ) {
    $post_type = $request['post_type'];
    $taxonomies = get_object_taxonomies( $post_type, 'objects' );
    $response = [];

    foreach ( $taxonomies as $taxonomy ) {
        $response[] = [
            'label' => $taxonomy->label,
            'value' => $taxonomy->name
        ];
    }

    array_unshift( $response, [
        'label' => __( 'Selecione uma opção', 'ninja' ),
        'value' => ''
    ] );

    return new \WP_REST_Response( $response, 200 );
}