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

/**
 * Adds custom fields to a response post.
 */
function add_fields_to_post() {
    register_rest_field( 'post', 'rendered_categories', [
        'get_callback' => function( $attr ) {

            $terms = [];

            if ( \is_plugin_active( 'wordpress-seo/wp-seo.php' ) ) {
                // Get primary term using Yoast SEO plugin
                $primary_term_id = get_post_meta( $attr['id'], '_yoast_wpseo_primary_category', true );
                $get_term = get_term( $primary_term_id, 'category' );

                if ( $get_term && ! is_wp_error( $get_term ) ) {
                    $terms[] = $get_term;
                }
            } else {
                $terms = get_the_terms( $attr['id'], 'category' );
            }

            if ( isset( $terms[0] ) && $terms[0] === NULL ) {
                return [];
            }

            if ( $terms && ! is_wp_error( $terms ) ) {
                return array_map( function( $term ) {

                    $background_term_color = get_term_meta( $term->term_id, 'ninja_background_term_color', true );
                    $font_term_color = get_term_meta( $term->term_id, 'ninja_font_term_color', true );

                    if ( ! $background_term_color ) {
                        $background_term_color = '#333333';
                    }

                    if ( ! $font_term_color ) {
                        $font_term_color = '#FFFFFF';
                    }

                    return [
                        'id'               => $term->term_id,
                        'background_color' => $background_term_color,
                        'color'            => $font_term_color,
                        'link'             => get_term_link( $term->term_id ),
                        'name'             => $term->name,
                        'slug'             => $term->slug
                    ];

                }, $terms );
            }

            return [];
        }
    ]);
}

add_action( 'rest_api_init', 'Ninja\\add_fields_to_post' );