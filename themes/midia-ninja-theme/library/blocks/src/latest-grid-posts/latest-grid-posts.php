<?php

namespace Ninja;

function latest_grid_posts_callback( $attributes ) {

    $block_id         = esc_attr( $attributes['blockId'] );
    $block_model      = ( isset( $attributes['blockModel'] ) && ! empty( $attributes['blockModel'] ) ) ? esc_attr( $attributes['blockModel'] ) : 'videos';
    $block_classes[] = 'latest-grid-posts-block';

    if ( $block_model == 'posts' ){
        $show_author = ( isset( $attributes['showAuthor'] ) && ! empty( $attributes['showAuthor'] ) ) ? true : false;
        $show_taxonomy = ( isset( $attributes['showTaxonomy'] ) && ! empty( $attributes['showTaxonomy'] ) ) ? true : false;
        $show_thumbnail = ( isset( $attributes['showThumbnail'] ) && ! empty( $attributes['showThumbnail'] ) ) ? true : false;
        $thumbnail_formtat = ( isset( $attributes['thumbnailFormat'] ) && ! empty( $attributes['thumbnailFormat'] ) ) ? true : '';
        $custom_class = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';
        $block_classes[] = $custom_class;
        $block_classes[] = $show_author ? 'post--has-author' : '';
        $block_classes[] = $show_taxonomy ? 'post--has-taxonomy' : '';
        $block_classes[] = $show_thumbnail ? 'post--has-thumbnail' : '';
        $block_classes[] = $thumbnail_formtat ? 'post--thumbnail-rounded' : '';
    }

    $block_classes[] = 'model-' . $block_model;
    $has_content = false;

    $counter = 0;

    $posts_to_show = $attributes['postsToShow'] ?? 8;

    if ( $block_model == 'videos' ) {
        
        // Vídeos
        require_once  __DIR__ . '/includes/grid.php';

        $api_key = get_option( 'youtube_key', false );
        $playlist_id = ( isset( $attributes['playlistId'] ) && ! empty( $attributes['playlistId'] ) ) ? esc_attr( $attributes['playlistId'] ) : false;

        if ( ! $api_key || ! $playlist_id ) {
            if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
                return '<h2>' . __( 'Check the API Key or playlist ID', 'ninja' ) . '</h2>';
            }
            return;
        }

        $has_content = grid_videos_get_contents( $api_key, $playlist_id, $posts_to_show, $block_id );

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
    echo '<div id="block__' . esc_attr( $attributes['blockId'] ) . '" class="' . implode( ' ', $block_classes ) . '" data-slider="grid-posts">';
    
    $heading = $attributes['heading'] ?? '';


    if ( ! empty( $heading ) ) {
        echo '<div class="latest-grid-posts-blockg"><h2>'. $heading. '</h2></div>';
    }

    if ( $block_model == 'videos' ){
        // Youtube
        foreach( $has_content as $video ) :
            $counter++;
    
            if ( $counter == 1 ) {
                echo "<div class='grid-cards'>";
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

    echo '</div><!-- .latest-grid-posts-block -->';


    // // The footer with dots and arrows
    // echo '<div class="latest-vertical-posts-block__footer">';
    // echo '<div class="latest-vertical-posts-block__dots"></div>';
    // echo '<div class="latest-vertical-posts-block__arrows"></div>';
    // echo '</div><!-- .latest-vertical-posts-block__footer -->';

    // echo '</div><!-- .latest-vertical-posts-block -->';

    $output = ob_get_clean();

    return $output;

}
