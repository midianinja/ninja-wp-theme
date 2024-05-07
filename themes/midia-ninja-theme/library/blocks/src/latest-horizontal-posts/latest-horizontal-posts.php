<?php

namespace Ninja;

function latest_horizontal_posts_callback( $attributes ) {
    $slides_to_show = $attributes['slidesToShow'] ?? 3;

    global $newspack_blocks_post_id;
    global $latest_blocks_posts_ids;

    $block_id         = ( ! empty( $attributes['blockId'] ) ) ? esc_attr( $attributes['blockId'] ) : '';
    $block_model      = ( ! empty( $attributes['blockModel'] ) ) ? esc_attr( $attributes['blockModel'] ) : 'specials';
    $content_position = ( ! empty( $attributes['contentPosition'] ) ) ? esc_attr( $attributes['contentPosition'] ) : 'left';
    $custom_class     = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';
    $description      = ( ! empty( $attributes['description'] ) ) ? apply_filters( 'the_content', $attributes['description'] ) : false;
    $heading          = $attributes['heading'] ?? '';
    $link             = ( ! empty( $attributes['linkUrl'] ) ) ? esc_url( $attributes['linkUrl'] ) : false;
    $show_children    = ! empty( $attributes['showChildren'] );

    $block_classes[] = 'latest-horizontal-posts-block';
    $block_classes[] = $custom_class;
    $block_classes[] = 'model-' . $block_model;
    $block_classes[] = $show_children ? 'post--has-children' : '';
    $block_classes[] = 'content-' . $content_position;
    $block_classes[] = 'show-slides-' . $slides_to_show;

    if ( ! $description && ! $heading ) {
        $block_classes[] = 'without-title-description';
    }

    $block_classes = array_filter( $block_classes );

    $has_content = false;

    $attributes_hash = md5( $block_id );

    if ( $block_model == 'collection'  || $block_model == 'albums' ) {
        // Flickr
        require_once  __DIR__ . '/../shared/includes/flickr.php';

        $api_key = ( isset( $attributes['flickrAPIKey'] ) && ! empty( $attributes['flickrAPIKey'] ) ) ? esc_attr( $attributes['flickrAPIKey'] ) : false;
        $flickr_by_type = ( isset( $attributes['flickrByType'] ) && ! empty( $attributes['flickrByType'] ) ) ? esc_attr( $attributes['flickrByType'] ) : 'user';

        if ( $block_model == 'collection' && $flickr_by_type == 'album' ) {
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

		if ( $block_model == 'albums' ) {
			$has_content = flickr_get_albums( $api_key, $data_id, 10, 1 );
		} else {
			$has_content = flickr_get_photos( $api_key, $flickr_by_type, $data_id, 10, 1 );
		}
    }

    if ( $block_model == 'columnists' ) {
        // Co Authors
        require_once  __DIR__ . '../../shared/includes/columnists.php';
        $has_content = columnists_get_contents( $block_id );
    }

    if ( $block_model == 'most-read' || $block_model == 'specials' ) {
        // Posts

        $cache_key = 'ninja_horizontal_' . $attributes_hash;

        $cached_posts = false;

        if ( ! is_admin() && ( ! defined( 'REST_REQUEST' ) || ! REST_REQUEST ) ) {
            $cached_posts = get_transient( $cache_key );
        }

        if ( false === $cached_posts ) {
            if ( $block_model == 'specials' ) {
                $attributes['postType'] = 'especial';
            }

            $post__not_in = array_merge( $latest_blocks_posts_ids, array_keys( $newspack_blocks_post_id ) );
            $post__not_in = array_unique( $post__not_in, SORT_STRING );

            if ( class_exists( 'AjaxPageviews' ) ) {

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
                        'posts_per_page'      => $limit,
                    ];

                    if ( ! $show_children ) {
                        $args['post_parent'] = 0;
                    }
                }
            } else {
                $args = build_posts_query( $attributes, $post__not_in );
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

        $api_key       = get_option( 'youtube_key', false );
        $video_model   = ! empty( $attributes['videoModel'] ) ? esc_attr( $attributes['videoModel'] ) : 'playlist';
        $channel_id    = ! empty( $attributes['channelId'] ) ? esc_attr( $attributes['channelId'] ) : false;
        $playlist_id   = ! empty( $attributes['playlistId'] ) ? esc_attr( $attributes['playlistId'] ) : false;
        $posts_to_show = intval( $attributes['postsToShow'] );

        if ( ! $api_key ) {
            if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
                return '<h2>' . __( 'Check the API Key', 'ninja' ) . '</h2>';
            }
            return;
        }

        $has_content = videos_get_contents( $api_key, $video_model, $channel_id, $playlist_id, $posts_to_show );
    }

    if ( ! $has_content ) {
        if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
            return '<h2>'. __( 'No content found', 'ninja' ). '</h2>';
        }

        return;
    }

    ob_start();

    // Start the block structure
    echo '<div id="block__' . $block_id . '" class="' . implode( ' ', $block_classes ) . '" data-slider="horizontal-posts" data-slides-to-show="'. $slides_to_show . '">';
        echo '<div class="container">';
            echo '<div class="latest-horizontal-posts-block__content">';

                echo '<div class="latest-horizontal-posts-block__heading">';
                    if ( ! empty( $heading ) ) {
                        if ( ! empty( $link ) ) {
                            echo '<h2><a href="' . esc_url( $link ) . '">' . $heading . '</a></h2>';
                        } else {
                            echo '<h2>' . $heading . '</h2>';
                        }
                    } else {
                        echo '<div></div>';
                    }

                    if ( ! empty( $description ) ) {
                        echo $description;
                    }
                echo '</div>';

                if ( $block_model == 'most-read' || $content_position !== 'full' ) {
                    // The footer with dots and arrows
                    echo '<div class="latest-horizontal-posts-block__footer">';
                    echo '<div class="latest-horizontal-posts-block__dots"></div>';
                    echo '<div class="latest-horizontal-posts-block__arrows"></div>';
                    echo '</div><!-- .latest-horizontal-posts-block__footer -->';
                }

            echo '</div><!-- .latest-horizontal-posts-block__content -->';

            // List of the posts to mount slider
            echo '<div class="latest-horizontal-posts-block__slides">';

				if ( $block_model == 'albums' ) {
					// Flickr album
					foreach( $has_content['data'] as $album ) :
						get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', $block_model, [ 'album' => $album ] );
					endforeach;
				}

                if ( $block_model == 'collection' ) {
                    // Flickr photos
                    foreach( $has_content['data'] as $photo ) :
                        get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', $block_model, [ 'photo' => $photo ] );
                    endforeach;
                }

                if ( $block_model == 'columnists' ) {
                    // Co Authors
                    foreach ( $has_content as $author ) {
                        echo "<div class='slide'>";
                            get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/co', 'author', ['author' => $author] );
                        echo "</div>";
                    }
                }

                if ( $block_model == 'most-read' ) {
                    // Posts
                    while ( $has_content->have_posts() ) :
                        $has_content->the_post();
                        global $post;

                        $latest_blocks_posts_ids[] = $post->ID;
                        $newspack_blocks_post_id[$post->ID] = true;

                        echo "<div class='slide'>";
                            get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', $block_model, ['post' => $post, 'attributes' => $attributes] );
                        echo "</div>";
                    endwhile;

                    wp_reset_postdata();
                }

                if ( $block_model == 'specials' ) {
                    // Posts
                    while ( $has_content->have_posts() ) :
                        $has_content->the_post();
                        global $post;

                        $latest_blocks_posts_ids[] = $post->ID;
                        $newspack_blocks_post_id[$post->ID] = true;

                        echo "<div class='slide'>";
                            get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', $block_model, ['post' => $post, 'attributes' => $attributes] );
                        echo "</div>";
                    endwhile;

                    wp_reset_postdata();
                }

                if ( $block_model == 'videos' ) {
                    // Youtube
                    foreach( $has_content as $video ) :
                        get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', $block_model, ['video' => $video, 'attributes' => $attributes] );
                    endforeach;
                }

            echo '</div><!-- .latest-horizontal-posts-block__slides -->';

            $footer_class = 'latest-horizontal-posts-block__footer';

            if ( $content_position !== 'full' || $block_model == 'most-read' ) {
                $footer_class .= ' medium-only';
            }

            // The footer with dots and arrows on medium
            echo '<div class="' . $footer_class . '">';
                echo '<div class="latest-horizontal-posts-block__dots"></div>';
                echo '<div class="latest-horizontal-posts-block__arrows"></div>';
            echo '</div><!-- .latest-horizontal-posts-block__footer -->';
        echo '</div>';

    echo '</div><!-- .latest-horizontal-posts-block -->';

    $output = ob_get_clean();
    return $output;
}
