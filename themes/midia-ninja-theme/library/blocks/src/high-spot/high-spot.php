<?php

namespace Ninja;

function high_spot_callback( $attributes ) {
    $block_id    = esc_attr( $attributes['blockId'] );
    $block_model = ( isset( $attributes['blockModel'] ) && ! empty( $attributes['blockModel'] ) ) ? esc_attr( $attributes['blockModel'] ) : 'manual';

    global $newspack_blocks_post_id;
    global $latest_blocks_posts_ids;

    $block_classes[] = 'high-spot-block';
    $block_classes[] = 'model-' . $block_model;
    if ( $block_model === 'post' ) {

        if(is_archive()){
            $queried_object = get_queried_object();
            $taxonomy = $queried_object->taxonomy;
            $term_id = $queried_object->term_id;

            $args = [
                'posts_per_page' => 1,
                'fields'         => 'ids',
                'tax_query'      => [
                    [
                        'taxonomy' => $taxonomy,
                        'field'    => 'term_id',
                        'terms'    => $term_id,
                    ],
                ],
            ];
            
            $post_ids = get_posts( $args );

            if ( $post_ids && is_array( $post_ids ) ) {
                $post_id = $post_ids[0];
            }  
        }

        if(!$post_id){
            $post_id = ( isset( $attributes['postId'] ) && ! empty( $attributes['postId'] ) ) ? esc_attr( $attributes['postId'] ) : false;
        }

        if ( $post_id ) {
            $latest_blocks_posts_ids[] = $post_id;
            $newspack_blocks_post_id[$post_id] = true;
        }

        $get_post = get_post( $post_id );

        if ( $get_post ) {
            $post_id          = $get_post->ID;
            $description      = isset( $get_post->post_excerpt ) ? $get_post->post_excerpt : '';
            $heading          = isset( $get_post->post_title ) ? apply_filters( 'the_title', $get_post->post_title ) : '';
            $link_url         = esc_url( get_permalink( $post_id ) );
            $image_id         = has_post_thumbnail( $post_id ) ? get_post_thumbnail_id( $post_id ) : '';
            $image_url        = has_post_thumbnail( $post_id ) ? get_the_post_thumbnail_url( $post_id, 'large' ) : get_stylesheet_directory_uri() . '/assets/images/default-image.png';
            $image_alt        = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
            $primary_category = get_post_meta( $post_id, '_yoast_wpseo_primary_category', true );

            $get_term = '';

            if ( $primary_category ) {
                $get_term = get_term( $primary_category, 'category' );
                $tag = ! empty( $get_term->name ) ? $get_term->name : '';
            } else {
                $get_terms = get_the_terms( $post_id, 'category' );
                if ( $get_terms ) {
                    $tag = ( ! empty( $get_term[0] ) && ! empty( $get_term[0]->name ) ) ? $get_term[0]->name : '';
                }
            }
        } else {
            return;
        }
    }

    if ( $block_model === 'manual' ) {
        $description = ( isset( $attributes['description'] ) && ! empty( $attributes['description'] ) ) ? $attributes['description'] : false;
        $heading     = ( isset( $attributes['heading'] ) && ! empty( $attributes['heading'] ) ) ? esc_attr( $attributes['heading'] ) : '';
        $image_id    = ( isset( $attributes['imageId'] ) && ! empty( $attributes['imageId'] ) ) ? esc_attr( $attributes['imageId'] ) : false;
        $image_alt   = ( isset( $attributes['imageAlt'] ) && ! empty( $attributes['imageAlt'] ) ) ? esc_attr( $attributes['imageAlt'] ) : '';
        $image_url   = ( isset( $attributes['imageUrl'] ) && ! empty( $attributes['imageUrl'] ) ) ? esc_attr( $attributes['imageUrl'] ) : get_stylesheet_directory_uri() . '/assets/images/default-image.png';
        $link_url    = ( isset( $attributes['linkUrl'] ) && ! empty( $attributes['linkUrl'] ) ) ? esc_url( $attributes['linkUrl'] ) : '';
        $tag         = ( isset( $attributes['tag'] ) && ! empty( $attributes['tag'] ) ) ? esc_attr( $attributes['tag'] ) : '';
    }

    ob_start();

    // Start the block structure
    echo '<div id="block__' . $block_id . '" class="' . implode( ' ', $block_classes ) . '">';
        echo '<div class="container">';

            if ( $link_url ) {
                echo '<a class="high-spot-block__link" href="'. $link_url. '">';
            }

            echo '<div class="high-spot-block__content">';
                echo '<div class="high-spot-block__info">';
                    echo '<div>';
                        if ( ! empty( $tag ) ) {
                            echo '<span class="tag">' . $tag . '</span>';
                        }

                        if ( ! empty( $heading ) ) {
                            echo '<h3>' . $heading . '</h3>';
                        }

                        if ( ! empty( $description ) ) {
                            echo apply_filters( 'the_content', $description );
                        }
                    echo '</div>';
                echo '</div>';
                echo '<img class="background-image" src="'. $image_url. '" alt="'. $image_alt. '" />';
            echo '</div><!-- .high-spot-block__content -->';

            if ( $link_url ) {
                echo '</a>';
            }

        echo '</div>';
    echo '</div><!-- .high-spot-block -->';

    $output = ob_get_clean();
    return $output;
}
