<?php

namespace Ninja;

function latest_vertical_posts_callback( $attributes ) {

    $block_id        = esc_attr( $attributes['blockId'] );
    $block_model     = ( isset( $attributes['blockModel'] ) && ! empty( $attributes['blockModel'] ) ) ? esc_attr( $attributes['blockModel'] ) : 'posts';
    $block_classes[] = 'latest-vertical-posts-block';

    if ( $block_model == 'posts' ){
        $show_author       = ( isset( $attributes['showAuthor'] ) && ! empty( $attributes['showAuthor'] ) ) ? true : false;
        $show_excerpt      = ( isset( $attributes['showExcerpt '] ) && ! empty( $attributes['showExcerpt '] ) ) ? true : false;
        $show_taxonomy     = ( isset( $attributes['showTaxonomy'] ) && ! empty( $attributes['showTaxonomy'] ) ) ? true : false;
        $show_thumbnail    = ( isset( $attributes['showThumbnail'] ) && ! empty( $attributes['showThumbnail'] ) ) ? true : false;
        $thumbnail_formtat = ( isset( $attributes['thumbnailFormat'] ) && ! empty( $attributes['thumbnailFormat'] ) ) ? true : '';
        $custom_class      = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';
        $block_classes[]   = $custom_class;
        $block_classes[]   = $show_author ? 'post--has-author' : '';
        $block_classes[]   = $show_excerpt ? 'post--has-excerpt' : '';
        $block_classes[]   = $show_taxonomy ? 'post--has-taxonomy' : '';
        $block_classes[]   = $show_thumbnail ? 'post--has-thumbnail' : '';
        $block_classes[]   = $thumbnail_formtat ? 'post--thumbnail-rounded' : '';
    }

    $block_classes[] = 'model-' . $block_model;
    $has_content = false;

    $counter = 0;

    // Determina quando posts serão exibidos em cada slide
    $posts_by_slide = $attributes['postsBySlide'] ?? 2;
    $posts_to_show = $attributes['postsToShow'] ?? 8;

    if ( $block_model == 'posts' || $block_model == 'numbered' ) {
        // Posts
        global $latest_vertical_posts_ids;

        if ( ! is_array( $latest_vertical_posts_ids ) ) {
            $latest_vertical_posts_ids = [];
        }

        $attributes_hash = md5( serialize( $attributes ) );

        $cache_key = 'ninja_vertical_' . $attributes_hash;
        $cached_posts = get_transient( $cache_key );

        if ( false !== $cached_posts ) {
            $posts_query = $cached_posts;
        } else {

            $args = build_posts_query( $attributes, $latest_vertical_posts_ids );
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

        if ( ! $api_key || ! $playlist_id ) {
            if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
                return '<h2>' . __( 'Check the API Key or playlist ID', 'ninja' ) . '</h2>';
            }
            return;
        }

        $has_content = vertical_videos_get_contents( $api_key, $playlist_id, $posts_to_show, $block_id );

    }

    if ( ! $has_content ) {
        if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
            return '<h2>'. __( 'No content found', 'ninja' ). '</h2>';
        }

        return;
    }

    ob_start();

    $block_classes = array_filter( $block_classes );

    // Start the block structure
    echo '<div id="block__' . esc_attr( $attributes['blockId'] ) . '" class="' . implode( ' ', $block_classes ) . '" data-slider="vertical-posts">';

    $heading = $attributes['heading'] ?? '';

    if ( ! empty( $heading ) ) {
        echo '<div class="latest-vertical-posts-block__heading"><h2>'. $heading. '</h2></div>';
    }

     // List of the posts to mount slider
     echo '<div class="latest-vertical-posts-block__slides">';

    if ( $block_model == 'videos' ){
        // Youtube
        foreach( $has_content as $video ) :
            $counter++;

            if ( $counter == 1 ) {
                echo "<div class='slide'>";
            }

            get_template_part( 'library/blocks/src/latest-horizontal-posts/template-parts/post', $block_model, ['video' => $video, 'attributes' => $attributes] );
            
            if ( $counter == $posts_by_slide || $counter == $has_content->post_count ) {
                echo "</div>";
                $counter = 0;
            }
        endforeach;

        if ( $counter != 0 ) {
            echo "</div>";
        }
    }

    if ( $block_model == 'posts' || $block_model == 'numbered' ) {
        if ( $has_content->have_posts() ) :

            $attributes['counter_posts'] = 0;

            while ( $has_content->have_posts() ) :
                $has_content->the_post();
                global $post;

                $latest_vertical_posts_ids[] = $post->ID;
                $counter++;

                if ( $counter == 1 ) {
                    echo "<div class='slide'>";
                }

                $attributes['counter_posts']++;

                get_template_part( 'library/blocks/src/latest-vertical-posts/template-parts/post', '', ['post' => $post, 'attributes' => $attributes] );

                if ( $counter == $posts_by_slide || $counter == $has_content->post_count ) {
                    echo "</div>";
                    $counter = 0;
                }

            endwhile;

            if ( $counter != 0 ) {
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
