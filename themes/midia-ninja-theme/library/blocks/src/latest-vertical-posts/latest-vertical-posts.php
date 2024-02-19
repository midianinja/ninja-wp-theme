<?php

namespace Ninja;

function latest_vertical_posts_callback( $attributes ) {

    global $latest_vertical_posts_ids;

    if ( ! $latest_vertical_posts_ids ) {
        $latest_vertical_posts_ids = [];
    }

    $args = build_posts_query( $attributes );

    $posts_query = new \WP_Query( $args );
    $posts = [];

    if ( false === $posts_query->have_posts() ) {
        return;
    }

    $counter = 0;

    // Determina quando posts serão exibidos em cada slide
    $posts_by_slide = $attributes['postsBySlide'] ?? 1;

    ob_start();
    if ( $posts_query->have_posts() ) :

        // Start the block structure
        echo '<div id="block__' . esc_attr( $attributes['blockId'] ) . '" class="latest-vertical-posts-block" data-slider="vertical-posts">';

            if ( isset( $attributes['showHeading'] ) && $attributes['showHeading'] ) {
                $heading = $attributes['heading'] ?? '';

                if ( ! empty( $heading ) ) {
                    echo '<div class="latest-vertical-posts-block__heading"><h2>'. $heading. '</h2></div>';
                }
            }

            // List of the posts to mount slider
            echo '<div class="latest-vertical-posts-block__slides">';

                while ( $posts_query->have_posts() ) :
                    $posts_query->the_post();
                    global $post;

                    $latest_vertical_posts_ids[] = $post->ID;
                    $counter++;

                    if ( $counter == 1 ) {
                        echo "<div class='slide'>";
                    }

                    get_template_part( 'library/blocks/src/latest-vertical-posts/template-parts/post', '', ['post' => $post, 'attributes' => $attributes] );

                    if ( $counter == $posts_by_slide || $counter == $posts_query->post_count ) {
                        echo "</div>";
                        $counter = 0;
                    }

                endwhile;

                if ( $counter != 0 ) {
                    echo "</div>";
                }

                echo '</div><!-- .latest-vertical-posts-block__slides -->';

            // The footer with dots and arrows
            echo '<div class="latest-vertical-posts-block__footer">';
                echo '<div class="latest-vertical-posts-block__dots"></div>';
                echo '<div class="latest-vertical-posts-block__arrows"></div>';
            echo '</div><!-- .latest-vertical-posts-block__footer -->';

        echo '</div><!-- .latest-vertical-posts-block -->';

    endif;

    wp_reset_postdata();

    $output = ob_get_clean();

    return $output;

}

function enqueue_scripts() {
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

    $post_types = apply_filters( 'ninja/latest_vertical_posts/post_types', $post_types );

    wp_localize_script( 'ninja-latest-vertical-posts-editor-script', 'ninja_latest_vertical_posts_editor_data',
        [
            'post_types' => $post_types
        ]
    );
}

add_action( 'admin_enqueue_scripts', 'Ninja\\enqueue_scripts' );

function build_posts_query( $attributes ) {

    global $latest_vertical_posts_ids;

    if ( ! is_array( $latest_vertical_posts_ids ) ) {
        $latest_vertical_posts_ids = [];
    }

    $post_type = isset( $attributes['postType'] ) ? $attributes['postType'] : [ 'post' ];
    $posts_to_show = intval( $attributes['postsToShow'] );

    $order = isset( $attributes['order'] ) ? $attributes['order'] : 'desc';
    $order_by = isset( $attributes['orderBy'] ) ? $attributes['orderBy'] : 'date';

    $args = [
        'ignore_sticky_posts' => true,
        'order'               => $order,
        'orderby'             => $order_by,
        'post_type'           => $post_type,
        'posts_per_page'      => $posts_to_show
    ];

    $args['post__not_in'] = array_merge(
        $latest_vertical_posts_ids,
        get_the_ID() ? [ get_the_ID() ] : []
    );

    return $args;

}