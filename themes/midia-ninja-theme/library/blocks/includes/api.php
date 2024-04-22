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
            'permission_callback' => '__return_true'
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
            'permission_callback' => '__return_true'
        ]
    );

    register_rest_route(
        'ninja/v1',
        '/posts/(?P<post_type>[a-zA-Z0-9_-]+)',
        [
            'methods'  => 'GET',
            'callback' => 'Ninja\\get_posts_by_taxonomy_term',
            'args'     => [
                'post_type' => [
                    'required' => true,
                    'validate_callback' => function( $param, $request, $key ) {
                        return post_type_exists( sanitize_text_field( $param ) );
                    }
                ],
                'taxonomy' => [
                    'required' => false,
                    'validate_callback' => function( $param, $request, $key ) {
                        return taxonomy_exists( sanitize_text_field( $param ) );
                    }
                ],
                'terms' => [
                    'required' => false,
                    'validate_callback' => function( $param, $request, $key ) {
                        $terms = explode( ',', sanitize_text_field( $request['terms'] ) );
                        foreach ( $terms as $term ) {

                            if ( is_numeric( $term ) ) {
                                $term = intval( $term );
                            }

                            if ( ! term_exists( $term, $request['taxonomy'] ) ) {
                                return false;
                            }
                        }
                        return true;
                    }
                ],
                'max_posts' => [
                    'required' => false,
                    'default' => 10,
                    'validate_callback' => function( $param, $request, $key ) {
                        return is_numeric( $param ) && $param > 0;
                    }
                ],
                'per_page' => [
                    'required' => false,
                    'default' => 10,
                    'validate_callback' => function( $param, $request, $key ) {
                        return is_numeric( $param ) && $param > 0;
                    }
                ],
                'page' => [
                    'required' => false,
                    'default' => 1,
                    'validate_callback' => function( $param, $request, $key ) {
                        return is_numeric( $param ) && $param > 0;
                    }
                ],
                'post_not_in' => [
                    'required' => false,
                    'validate_callback' => function( $param, $request, $key ) {
                        $post_not_in = explode( ',', sanitize_text_field( $request['post_not_in'] ) );
                        foreach ( $post_not_in as $post_id ) {
                            return is_numeric( $post_id );
                        }

                        return true;
                    }
                ],
                'post_parent' => [
                    'required' => false,
                    'validate_callback' => function( $param, $request, $key ) {
                        return is_numeric( $param );
                    }
                ]
            ],
            'permission_callback' => '__return_true'
        ]
    );

	register_rest_route(
		'ninja/v1',
		'/flickr_albums',
		[
			'methods' => 'GET',
			'callback' => 'Ninja\\flickr_album_rest_callback',
			'args' => [
				'api_key' => [
					'required' => true,
				],
				'page' => [
					'default' => 1,
				],
				'user_id' => [
					'required' => true,
				],
			],
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);

	register_rest_route(
		'ninja/v1',
		'/flickr_page',
		[
			'methods' => 'GET',
			'callback' => 'Ninja\\flickr_page_rest_callback',
			'args' => [
				'api_key' => [
					'required' => true,
				],
				'data_id' => [
					'required' => true,
				],
				'page' => [
					'required' => true,
				],
				'type' => [
					'required' => true,
				],
			],
			'permission_callback' => '__return_true',
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
    unset( $post_types_objects['header-footer'] );

    $post_types = [];

    foreach ( $post_types_objects as $post_type ) {
        $post_types[$post_type->name] = $post_type->label;
    }

    $post_types = apply_filters( 'ninja/helpers/post_types', $post_types );

    return new \WP_REST_Response( $post_types, 200 );
}

function get_taxonomies_by_post_type( $request ) {
    $post_type  = sanitize_text_field( $request['post_type'] );
    $taxonomies = get_object_taxonomies( $post_type, 'objects' );
    $response   = [];

    $remove_taxonomies = ['post_format', 'author'];

    foreach ( $taxonomies as $taxonomy ) {
        if ( ! in_array( $taxonomy->name, $remove_taxonomies ) ) {
            $response[] = [
                'label' => $taxonomy->label,
                'value' => $taxonomy->name
            ];
        }
    }

    /**
     * Filters the list of taxonomies associated with a post type.
     *
     * @param array  $response   The list of taxonomies associated with the post type.
     * @param string $post_type  The post type for which the taxonomies are being retrieved.
     *
     * @return array The modified list of taxonomies.
     */
    $response = apply_filters( 'ninja/helpers/taxonomies', $response, $post_type );

    array_unshift( $response, [
        'label' => __( 'Select an option', 'ninja' ),
        'value' => ''
    ] );

    return new \WP_REST_Response( $response, 200 );
}

function get_posts_by_taxonomy_term( $request ) {

    $post_type     = sanitize_text_field( $request['post_type'] );
    $taxonomy      = sanitize_text_field( $request['taxonomy'] );
    $terms         = explode( ',', sanitize_text_field( $request['terms'] ) );
    $max_posts     = ! empty( $request['max_posts']) ? intval( $request['max_posts'] ) : 10;
    $per_page      = ! empty( $request['per_page'] ) ? intval( $request['per_page'] ) : 10;
    $page          = ! empty( $request['page'] ) ? intval( $request['page'] ) : 1;
    $post__not_in  = explode( ',', sanitize_text_field( $request['post_not_in'] ) );
    $show_children = ! empty( intval( $request['post_parent'] ) );

    $no_found_rows = $page === 1 ? false : true;

    $args = [
        'post_type'           => $post_type,
        'posts_per_page'      => $per_page,
        'paged'               => $page,
        'no_found_rows'       => $no_found_rows,
        'ignore_sticky_posts' => true,
        'post__not_in'        => $post__not_in
    ];

    if ( ! $show_children ) {
        $args['post_parent'] = 0;
    }

    $terms_filter = array_filter( $terms, function( $item ) {
        return trim( $item ) !== "";
    } );

    if ( $taxonomy && $terms_filter ) {
        $args['tax_query'] = ['relation' => 'AND'];

        foreach ( $terms_filter as $term ) {
            $field = is_numeric( $term ) ? 'term_id' : 'slug';

            $args['tax_query'][] = [
                'taxonomy' => $taxonomy,
                'field'    => $field,
                'terms'    => [$term]
            ];
        }
    }

    $query = new \WP_Query( $args );
    $data = [];

    foreach ( $query->posts as $post ) {
        $data[] = [
            'ID'        => $post->ID,
            'author'    => get_list_coauthors( $post->ID ),
            'date'      => date_i18n( 'd \d\e F \d\e Y', strtotime( $post->post_date ) ),
            'excerpt'   => $post->post_excerpt,
            'link'      => get_permalink( $post ),
            'thumbnail' => has_post_thumbnail( $post ) ? get_the_post_thumbnail_url( $post ) : "https://via.placeholder.com/400",
            'title'     => $post->post_title
        ];
    }

    if ( empty( $data ) ) {
        return new \WP_Error( 'no_posts', 'Nenhum post encontrado com os critérios especificados', ['status' => 404] );
    }

    return new \WP_REST_Response( [
        'posts'      => $data,
        'totalPages' => ( $max_posts > $query->max_num_pages ) ? $query->max_num_pages : ceil( $max_posts / $per_page )
    ], 200 );
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

function flickr_album_rest_callback( \WP_REST_Request $request ) {
	require_once __DIR__ . '/../src/shared/includes/flickr.php';

	return flickr_get_albums( $request['api_key'], $request['user_id'], 10, $request['page'] );
}

function flickr_page_rest_callback( \WP_REST_Request $request ) {
	require_once __DIR__ . '/../src/shared/includes/flickr.php';

	$api_key = flickr_decrypt_key( $request['api_key'] );

	$data = flickr_get_photos( $api_key, $request['type'], $request['data_id'], 9, intval( $request['page'] ) );

	ob_start();

	if (!empty($data)) {
		foreach( $data['data'] as $photo ) {
			get_template_part( 'library/blocks/src/flickr-gallery/template-parts/photo', null, [ 'photo' => $photo ] );
		}
	}

	$html = ob_get_clean();

	return new \WP_REST_Response( [ 'html' => $html ], 200 );
}

add_action( 'rest_api_init', 'Ninja\\add_fields_to_post' );
