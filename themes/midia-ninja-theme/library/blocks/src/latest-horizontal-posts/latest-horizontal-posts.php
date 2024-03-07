<?php

namespace Ninja;

function latest_horizontal_posts_callback( $attributes ) {
    $slides_to_show = $attributes['slidesToShow'] ?? 3;

    $block_id         = esc_attr( $attributes['blockId'] );
    $block_model      = ( isset( $attributes['blockModel'] ) && ! empty( $attributes['blockModel'] ) ) ? esc_attr( $attributes['blockModel'] ) : 'specials';
    $content_position = ( isset( $attributes['contentPosition'] ) && ! empty( $attributes['contentPosition'] ) ) ? esc_attr( $attributes['contentPosition'] ) : 'left';
    $custom_class     = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';
    $description      = ( isset( $attributes['description'] ) && ! empty( $attributes['description'] ) ) ? apply_filters( 'the_content', $attributes['description'] ) : false;

    $block_classes[] = 'latest-horizontal-posts-block';
    $block_classes[] = $custom_class;
    $block_classes[] = 'model-' . $block_model;
    $block_classes[] = 'content-' . $content_position;
    $block_classes[] = 'show-slides-' . $slides_to_show;

    $block_classes = array_filter( $block_classes );

    $has_content = false;

    if ( $block_model == 'collection' ) {
        // Flickr
        require_once  __DIR__ . '/includes/collection.php';

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

        $has_content = flickr_get_contents( $api_key, $flickr_by_type, $data_id );
    }

    if ( $block_model == 'columnists' ) {
        // Co Authors
        require_once  __DIR__ . '/includes/columnists.php';
        $has_content = columnists_get_contents( $block_id );
    }

    if ( $block_model == 'most-read' || $block_model == 'specials' ) {
        // Posts
        global $latest_horizontal_posts_ids;

        if ( ! is_array( $latest_horizontal_posts_ids ) ) {
            $latest_horizontal_posts_ids = [];
        }

        $cache_key = 'horizontal_posts_' . md5(serialize($attributes) . serialize($latest_horizontal_posts_ids));
        $cached_posts = get_transient( $cache_key );

        if ( false !== $cached_posts ) {
            $posts_query = $cached_posts;
        } else {
            $args = build_posts_query( $attributes, $latest_horizontal_posts_ids );
            $posts_query = new \WP_Query( $args );

            if ( false === $posts_query->have_posts() ) {
                if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
                    return '<h2>'. __( 'No content found', 'ninja' ). '</h2>';
                }

                return;
            }

            set_transient( $cache_key, $posts_query, 3600 );
        }

        $has_content = $posts_query;
    }

    if ( $block_model == 'videos' ) {
        // Vídeos
        require_once  __DIR__ . '/includes/videos.php';

        $api_key = get_option( 'youtube_key', false );
        $playlist_id = ( isset( $attributes['playlistId'] ) && ! empty( $attributes['playlistId'] ) ) ? esc_attr( $attributes['playlistId'] ) : false;
        $posts_to_show = intval( $attributes['postsToShow'] );

        if ( ! $api_key || ! $playlist_id ) {
            if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
                return '<h2>' . __( 'Check the API Key or playlist ID', 'ninja' ) . '</h2>';
            }
            return;
        }

        $has_content = videos_get_contents( $api_key, $playlist_id, $posts_to_show );
    }

    if ( ! $has_content ) {
        if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
            return '<h2>'. __( 'No content found', 'ninja' ). '</h2>';
        }

        return;
    }

    ob_start();

    // Start the block structure
    echo '<div id="block__' . esc_attr( $attributes['blockId'] ) . '" class="' . implode( ' ', $block_classes ) . '" data-slider="horizontal-posts" data-slides-to-show="'. $slides_to_show . '">';
        echo '<div class="container">';
            echo '<div class="latest-horizontal-posts-block__content">';
                $heading = $attributes['heading'] ?? '';

                if ( $heading || $description ) {
                    echo '<div class="latest-horizontal-posts-block__heading">';
                        if ( ! empty( $heading ) ) {
                            echo '<h2>' . $heading . '</h2>';
                        }

                        if ( ! empty( $description ) ) {
                            echo $description;
                        }
                    echo '</div>';
                }

                if ( $content_position !== 'full' ) {
                    // The footer with dots and arrows
                    echo '<div class="latest-horizontal-posts-block__footer">';
                    echo '<div class="latest-horizontal-posts-block__dots"></div>';
                    echo '<div class="latest-horizontal-posts-block__arrows"></div>';
                    echo '</div><!-- .latest-horizontal-posts-block__footer -->';
                }

            echo '</div><!-- .latest-horizontal-posts-block__content -->';

            // List of the posts to mount slider
            echo '<div class="latest-horizontal-posts-block__slides">';

                if ( $block_model == 'collection' ) {
                    // Flickr
                    foreach( $has_content as $photo ) :
                        get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', $block_model, ['photo' => $photo, 'attributes' => $attributes] );
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

                        $latest_horizontal_posts_ids[] = $post->ID;

                        echo "<div class='slide'>";
                            get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', $block_model, ['post' => $post, 'attributes' => $attributes] );
                        echo "</div>";
                    endwhile;
                }

                if ( $block_model == 'specials' ) {
                    // Posts
                    while ( $has_content->have_posts() ) :
                        $has_content->the_post();
                        global $post;

                        $latest_horizontal_posts_ids[] = $post->ID;

                        echo "<div class='slide'>";
                            get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', $block_model, ['post' => $post, 'attributes' => $attributes] );
                        echo "</div>";
                    endwhile;
                }

                if ( $block_model == 'videos' ) {
                    // Youtube
                    foreach( $has_content as $video ) :
                        get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', $block_model, ['video' => $video, 'attributes' => $attributes] );
                    endforeach;
                }

            echo '</div><!-- .latest-horizontal-posts-block__slides -->';

            $footer_class = ( $content_position === 'full') ? 'latest-horizontal-posts-block__footer' : 'latest-horizontal-posts-block__footer medium-only';

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
