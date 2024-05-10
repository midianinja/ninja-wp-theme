<?php

namespace Ninja;

function latest_vertical_posts_callback( $attributes ) {

    global $newspack_blocks_post_id;
    global $latest_blocks_posts_ids;

    $block_id        = esc_attr( $attributes['blockId'] );
    $block_model     = ( isset( $attributes['blockModel'] ) && ! empty( $attributes['blockModel'] ) ) ? esc_attr( $attributes['blockModel'] ) : 'posts';
    $block_classes[] = 'latest-vertical-posts-block';

    $columns       = ! empty( $attributes['columns'] )? absint( $attributes['columns'] ) : 2;
    $content_below = ! empty( $attributes['contentBelow'] );
    $grid_format   = ! empty( $attributes['gridFormat'] ) ? esc_attr( $attributes['gridFormat'] ) : 'columns';
    $show_as_grid  = ! empty( $attributes['showAsGrid'] );
    $link          = ( ! empty( $attributes['linkUrl'] ) ) ? esc_url( $attributes['linkUrl'] ) : false;

    $block_classes[] = $show_as_grid ? 'post--has-grid' : '';
    $block_classes[] = $columns > 1 ? 'post--columns-'. $columns : '';
    $block_classes[] = 'post--grid-' . $grid_format;
    $block_classes[] = $content_below ? 'post--content-below' : '';

    if ( $block_model == 'posts' || $block_model == 'numbered' || $block_model == 'most-read' ){
        $show_children   = ! empty( $attributes['showChildren'] );
        $show_author     = ( isset( $attributes['showAuthor'] ) && ! empty( $attributes['showAuthor'] ) ) ? true : false;
        $show_date       = ( isset( $attributes['showDate'] ) && ! empty( $attributes['showDate'] ) ) ? true : false;
        $show_excerpt    = ( isset( $attributes['showExcerpt'] ) && ! empty( $attributes['showExcerpt'] ) ) ? true : false;
        $show_taxonomy   = ( isset( $attributes['showTaxonomy'] ) && ! empty( $attributes['showTaxonomy'] ) ) ? true : false;

        $block_classes[] = $show_children ? 'post--has-children' : '';
        $block_classes[] = $show_author ? 'post--has-author' : '';
        $block_classes[] = $show_excerpt ? 'post--has-excerpt' : '';
        $block_classes[] = $show_taxonomy ? 'post--has-taxonomy' : '';
    }

    if ( $block_model !== 'numbered' ) {
        $show_thumbnail    = ( isset( $attributes['showThumbnail'] ) && ! empty( $attributes['showThumbnail'] ) ) ? true : false;
        $thumbnail_formtat = ( isset( $attributes['thumbnailFormat'] ) && ! empty( $attributes['thumbnailFormat'] ) ) ? true : '';
        $block_classes[]   = $show_thumbnail ? 'post--has-thumbnail' : '';
        $block_classes[]   = $thumbnail_formtat ? 'post--thumbnail-rounded' : '';
    }

    if ( $block_model == 'collection' || $block_model == 'columnists' ) {
        $block_classes[] = 'post--has-thumbnail';
    }

    $custom_class    = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';
    $block_classes[] = $custom_class;
    $block_classes[] = 'model-' . $block_model;

    $block_classes = array_filter( $block_classes );

    $has_content = false;

    $counter = 0;

    // Determina quantos posts serão exibidos em cada slide
    $posts_by_slide = $attributes['postsBySlide'] ?? 2;
    $posts_to_show  = $attributes['postsToShow'] ?? 8;

    if ( $block_model == 'collection' ) {
        // Flickr
        require_once  __DIR__ . '/../shared/includes/flickr.php';

        $api_key = ( isset( $attributes['flickrAPIKey'] ) && ! empty( $attributes['flickrAPIKey'] ) ) ? esc_attr( $attributes['flickrAPIKey'] ) : false;
        $flickr_by_type = ( isset( $attributes['flickrByType'] ) && ! empty( $attributes['flickrByType'] ) ) ? esc_attr( $attributes['flickrByType'] ) : 'user';

        if ( $flickr_by_type == 'album' ) {
            $data_id = ( isset( $attributes['flickrAlbumId'] ) && ! empty( $attributes['flickrAlbumId'] ) ) ? esc_attr( $attributes['flickrAlbumId'] ) : false;
        } else {
            $data_id = ( isset( $attributes['flickrUserId'] ) && ! empty( $attributes['flickrUserId'] ) ) ? esc_attr( $attributes['flickrUserId'] ) : false;
        }

        if ( ! $api_key || ! $data_id ) {
            if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
                return '<h2>' . __( 'Check the API Key, user or album ID', 'ninja' ) . '</h2>';
            }

            return;
        }

        $has_content = flickr_get_photos( $api_key, $flickr_by_type, $data_id, 10, 1 );
    }

    if ( $block_model == 'columnists' ) {
        // Co Authors
        require_once  __DIR__ . '/../shared/includes/columnists.php';
        $has_content = columnists_get_contents( $block_id );
    }

    if ( $block_model == 'posts' || $block_model == 'numbered' || $block_model == 'most-read' ) {
        // Posts

        $attributes_hash = md5( $block_id );

        $cache_key = 'ninja_vertical_' . $attributes_hash;
        $cached_posts = false;

        if ( ! is_admin() && ( ! defined( 'REST_REQUEST' ) || ! REST_REQUEST ) ) {
            $cached_posts = get_transient( $cache_key );
        }

        if ( is_archive() || false === $cached_posts ) {
            $post__not_in = [];

            if ( ! is_archive() ) {
                $post__not_in = array_merge( $latest_blocks_posts_ids, array_keys( $newspack_blocks_post_id ) );
                $post__not_in = array_unique( $post__not_in, SORT_STRING );
            }

            if ( class_exists( 'AjaxPageviews' ) && $block_model == 'most-read' ) {

                $apv_args = [
                    'post_type' => ! empty( $attributes['postType'] ) ? sanitize_text_field( $attributes['postType'] ) : null,
                    'taxonomy'  => ! empty( $attributes['taxonomy'] ) ? $attributes['taxonomy'] : null,
                    'terms'     => ! empty( $attributes['queryTerms'] ) ? array_map( function( $t ) { return $t['id']; }, $attributes['queryTerms'] ) : null
                ];

                if ( is_plugin_active( 'co-authors-plus/co-authors-plus.php' ) ) {
                    $apv_args['co_author'] = ! empty( $attributes['coAuthor'] ) ? sanitize_text_field( $attributes['coAuthor'] ) : null;
                }

                $limit = ! empty( $attributes['postsToShow'] ) ? $attributes['postsToShow'] : 10;

                $top_viewed_posts = \AjaxPageviews::get_top_viewed_by_terms( $limit , $apv_args );

                if ( $top_viewed_posts ) {
                    $top_viewed_posts = array_map( function( $item ) {
                        return $item->post_id;
                    }, $top_viewed_posts );

                    $args = [
                        'ignore_sticky_posts' => 1,
                        'no_found_rows'       => true,
                        'orderby'             => 'post__in',
                        'post__in'            => $top_viewed_posts,
                        'post_status'         => 'publish',
                        'post_type'           => $attributes['postType'],
                        'posts_per_page'      => $limit
                    ];

                    if ( ! $show_children ) {
                        $args['post_parent'] = 0;
                    }
                }
            } else {
                $args = build_posts_query( $attributes, $post__not_in );
            }

            if ( is_archive() ) {
                $queried_object = get_queried_object();
                $taxonomy = $queried_object->taxonomy;
                $term_id = $queried_object->term_id;

                $tax_query = [
                    [
                        'field'    => 'term_id',
                        'taxonomy' => $taxonomy,
                        'terms'    => [$term_id]
                    ]
                ];

                $args['tax_query'] = $tax_query;
            }

            $posts_query = new \WP_Query( $args );

            if ( false === $posts_query->have_posts() ) {
                if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
                    return '<h2>'. __( 'No content found', 'ninja' ). '</h2>';
                }

                return;
            }

            set_transient( $cache_key, $posts_query, 3600 );
        } else {
            $posts_query = $cached_posts;
        }

        $has_content = $posts_query;
    }

    if ( $block_model == 'videos' ) {
        // Vídeos
        require_once  __DIR__ . '/includes/videos.php';

        $api_key = get_option( 'youtube_key', false );
        $playlist_id = ( isset( $attributes['playlistId'] ) && ! empty( $attributes['playlistId'] ) ) ? esc_attr( $attributes['playlistId'] ) : false;

        if ( ! $api_key || ! $playlist_id ) {
            if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
                return '<h2>' . __( 'Check the API Key or playlist ID', 'ninja' ) . '</h2>';
            }
            return;
        }

        $has_content = vertical_videos_get_contents( $api_key, $playlist_id, $posts_to_show );

    }

    if ( ! $has_content ) {
        if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
            return '<h2>' . __( 'No content found', 'ninja' ) . '</h2>';
        }

        return;
    }

    ob_start();

    // Start the block structure
    echo '<div id="block__' . $block_id . '" class="' . implode( ' ', $block_classes ) . '" data-slider="vertical-posts">';

    $heading = $attributes['heading'] ?? '';

    if ( ! empty( $heading ) ) {
        echo '<div class="latest-vertical-posts-block__heading">';
            if ( ! empty( $link ) ) {
                echo '<h2><a href="' . esc_url( $link ) . '">' . $heading . '</a></h2>';
            } else {
                echo '<h2>' . $heading . '</h2>';
            }
        echo '</div>';
    }

     // List of the posts to mount slider
     echo '<div class="latest-vertical-posts-block__slides">';

     if ( $block_model == 'collection' ) {
        // Flickr
        foreach( $has_content['data'] as $photo ) :
            $counter++;

            if ( $counter == 1 ) {
                echo "<div class='slide'>";
            }

            get_template_part( 'library/blocks/src/latest-vertical-posts/template-parts/post', $block_model, [ 'photo' => $photo ] );

            if ( $counter == $posts_by_slide || $counter == count( $has_content['data'] ) ) {
                echo "</div>";
                $counter = 0;
            }
        endforeach;

        if ( $counter != 0 ) {
            echo "</div>";
        }
    }

    if ( $block_model == 'columnists' ) {
        // Co Authors
        foreach ( $has_content as $author ) :
            $counter++;

            if ( $counter == 1 ) {
                echo "<div class='slide'>";

                if ( $show_as_grid ) {
                    echo '<div class="slide-grid">';
                }
            }

            get_template_part( 'library/blocks/src/latest-vertical-posts/template-parts/co', 'author', ['author' => $author, 'attributes' => $attributes] );

            if ( $counter == $posts_by_slide || $counter == count( $has_content ) ) {
                if ( $show_as_grid ) {
                    echo '</div><!-- .slide-grid -->';
                }

                echo "</div>";
                $counter = 0;
            }
        endforeach;

        if ( $counter != 0 ) {
            if ( $show_as_grid ) {
                echo '</div><!-- .slide-grid -->';
            }

            echo "</div>";
        }
    }

    if ( $block_model == 'videos' ){
        // Youtube
        foreach( $has_content as $video ) :
            $counter++;

            if ( $counter == 1 ) {
                echo "<div class='slide'>";
            }

            get_template_part( 'library/blocks/src/latest-vertical-posts/template-parts/post', $block_model, ['video' => $video, 'attributes' => $attributes] );

            if ( $counter == $posts_by_slide || $counter == count( $has_content ) ) {
                echo "</div>";
                $counter = 0;
            }
        endforeach;

        if ( $counter != 0 ) {
            echo "</div>";
        }
    }

    if ( $block_model == 'posts' || $block_model == 'numbered' || $block_model = 'most-read' ) {
        if ( $has_content->have_posts() ) :

            $attributes['counter_posts'] = 0;

            while ( $has_content->have_posts() ) :
                $has_content->the_post();
                global $post;

                $latest_blocks_posts_ids[] = $post->ID;
                $newspack_blocks_post_id[$post->ID] = true;
                $counter++;

                if ( $counter == 1 ) {
                    echo "<div class='slide'>";

                    if ( $show_as_grid ) {
                        echo '<div class="slide-grid">';
                    }
                }

                $attributes['counter_posts']++;

                get_template_part( 'library/blocks/src/latest-vertical-posts/template-parts/post', '', ['post' => $post, 'attributes' => $attributes] );

                if ( $counter == $posts_by_slide || $counter == $has_content->post_count ) {
                    if ( $show_as_grid ) {
                        echo '</div><!-- .slide-grid -->';
                    }

                    echo "</div>";
                    $counter = 0;
                }

            endwhile;

            if ( $counter != 0 ) {
                if ( $show_as_grid ) {
                    echo '</div><!-- .slide-grid -->';
                }

                echo "</div>";
            }

        endif;

        wp_reset_postdata();
    }

    echo '</div><!-- .latest-vertical-posts-block__slides -->';

    // The footer with dots and arrows
    echo '<div class="latest-vertical-posts-block__footer">';
    echo '<div class="latest-vertical-posts-block__dots"></div>';
    echo '<div class="latest-vertical-posts-block__arrows"></div>';
    echo '</div><!-- .latest-vertical-posts-block__footer -->';

    echo '</div><!-- .latest-vertical-posts-block -->';

    $output = ob_get_clean();

    return $output;

}
