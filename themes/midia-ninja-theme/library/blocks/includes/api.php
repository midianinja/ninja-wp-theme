<?php

namespace Ninja;

/**
 * Registers REST API endpoints.
 * 
 * Use the callback functions in the same order as the endpoints you created
 */
function register_endpoints() {
    register_rest_route(
        'ninja/v1',
        '/posttypes',
        [
            'methods'  => 'GET',
            'callback' => 'Ninja\\get_public_post_types',
            'permission_callback' => __return_true()
        ]
    );

    register_rest_route(
        'ninja/v1',
        '/taxonomias/(?P<post_type>[a-zA-Z0-9_-]+)',
        [
            'methods'  => 'GET',
            'callback' => 'Ninja\\get_taxonomies_by_post_type',
            'args'     => [
                'post_type' => [
                    'required' => true,
                    'validate_callback' => function( $param, $request, $key ) {
                        return post_type_exists( $param );
                    }
                ],
            ],
            'permission_callback' => __return_true()
        ]
    );
}

add_action( 'rest_api_init', 'Ninja\\register_endpoints' );

function get_public_post_types( $request ) {
    $args = [
        'public' => true,
        'publicly_queryable' => true
    ];

    $post_types_objects = get_post_types( $args, 'objects' );

    unset( $post_types_objects['attachment'] );

    $post_types = [];

    foreach ( $post_types_objects as $post_type ) {
        $post_types[$post_type->name] = $post_type->label;
    }

    $post_types = apply_filters( 'ninja/helpers/post_types', $post_types );
    
    return new \WP_REST_Response( $post_types, 200 );

}

function get_taxonomies_by_post_type( $request ) {
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
        'label' => __( 'Select an option', 'ninja' ),
        'value' => ''
    ] );

    return new \WP_REST_Response( $response, 200 );
}