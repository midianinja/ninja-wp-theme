<?php

namespace Ninja;

function latest_editorial_posts_callback( $attributes ) {

    global $latest_editorial_posts_ids;

    if ( ! is_array( $latest_editorial_posts_ids ) ) {
        $latest_editorial_posts_ids = [];
    }

    $attributes['postsToShow'] = 9;

    $args = build_posts_query( $attributes, $latest_editorial_posts_ids );

    $posts_query = new \WP_Query( $args );
    $posts = [];

    if ( false === $posts_query->have_posts() ) {
        if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
            return '<h2>'. __( 'No content found', 'ninja' ). '</h2>';
        }

        return;
    }

    ob_start();

    if ( $posts_query->have_posts() ) :

        $terms_to_filter = ( isset( $attributes['termsToFilter'] ) && ! empty( $attributes['termsToFilter'] ) ) ? $attributes['termsToFilter'] : [];

        // Start the block structure
        echo '<div id="block__' . esc_attr( $attributes['blockId'] ) . '" class="latest-editorial-posts-block">';
            echo '<div class="container">';

                if ( $terms_to_filter && is_array( $terms_to_filter ) ) :
                    echo '<div class="latest-editorial-posts-block__header">';
                        echo '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M8.90822 7.5L23.0918 7.50001C24.1457 7.50001 25 8.35435 25 9.40823C25 9.89532 24.8137 10.364 24.4794 10.7182L18.0769 17.5L18.0769 22.3173C18.0769 23.791 16.5371 24.7586 15.2093 24.1193L15.0554 24.0452C14.3632 23.7119 13.9231 23.0115 13.9231 22.2432L13.9231 17.5L7.52065 10.7182C7.18627 10.364 7 9.89532 7 9.40822C7 8.35434 7.85434 7.5 8.90822 7.5Z" stroke="black"/>
                            </svg>';
                        echo '<h2>'. __( 'Filter by editorial', 'ninja' ). '</h2>';
                        echo '<div class="latest-editorial-posts-block__filter list-terms">';
                            foreach ( $terms_to_filter as $term ) :
                                if ( isset( $term['name'] ) && isset( $term['id'] ) ) {
                                    $background_term_color = get_term_meta( $term['id'], 'ninja_background_term_color', true );
                                    $font_term_color = get_term_meta( $term['id'], 'ninja_font_term_color', true );

                                    if ( ! $background_term_color ) {
                                        $background_term_color = '#333333';
                                    }

                                    if ( ! $font_term_color ) {
                                        $font_term_color = '#FFFFFF';
                                    }

                                    echo '<span class="term term-' . sanitize_title( $term['name'] ) . '" data-term-id="' . $term['id'] . '" style="background-color:'. $background_term_color. '; color:'. $font_term_color. '">'. $term['name'] . '</span>';
                                }
                            endforeach;
                        echo '</div>';
                    echo '</div><!-- .latest-editorial-posts-block__header -->';
                endif;

                echo '<div class="latest-editorial-posts-block__content">';

                    $ad_shortcode_raw = ( isset( $attributes['adShortcode'] ) && ! empty( $attributes['adShortcode'] ) ) ? $attributes['adShortcode'] : false;
                    $ad_shortcode = '';

                    preg_match( '/^\[([^\]\s]+)/', $ad_shortcode_raw, $matches );
                    $shortcode_name = $matches[1] ?? '';

                    if ( ! empty( $shortcode_name ) && shortcode_exists( $shortcode_name ) ) {
                        $ad_shortcode = $ad_shortcode_raw;
                    }

                    if ( $ad_shortcode ) {
                        echo '<div class="latest-editorial-posts-block__sidebar">';
                            echo do_shortcode( $ad_shortcode );
                        echo '</div><!-- .latest-editorial-posts-block__sidebar -->';
                    }

                    echo '<div class="latest-editorial-posts-block__posts">';
                        while ( $posts_query->have_posts() ) :
                            $posts_query->the_post();
                            global $post;
                            $latest_editorial_posts_ids[] = $post->ID;

                            get_template_part( 'library/blocks/src/latest-editorial-posts/template-parts/post', '', ['post' => $post, 'attributes' => $attributes] );
                        endwhile;
                    echo '</div><!-- .latest-editorial-posts-block__posts -->';

                    echo '</div><!-- .latest-editorial-posts-block__content -->';
            echo '</div>';
        echo '</div><!-- .latest-editorial-posts-block -->';

    endif;

    wp_reset_postdata();

    $output = ob_get_clean();

    return $output;

}
