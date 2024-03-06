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
                        echo '<h2>'. __( 'Filter by editorial', 'ninja' ). '</h2>';
                        echo '<div class="latest-editorial-posts-block__filter">';
                            foreach ( $terms_to_filter as $term ) :
                                echo '<span class="term term-' . sanitize_title( $term['name'] ) . '" data-term-id="' . $term['id'] . '">'. $term['name'] . '</span>';
                            endforeach;
                        echo '</div>';
                    echo '</div><!-- .latest-editorial-posts-block__header -->';
                endif;

                echo '<div class="latest-editorial-posts-block__content">';
                    echo '<div class="latest-editorial-posts-block__sidebar">';
                    echo '<h2>'. __( 'Anúncio', 'ninja' ). '</h2>';
                    echo '</div><!-- .latest-editorial-posts-block__sidebar -->';

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
