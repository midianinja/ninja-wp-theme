<?php

namespace Ninja;

function latest_editorial_posts_callback( $attributes ) {
    ob_start();

    // Start the block structure
    echo '<div id="block__' . esc_attr( $attributes['blockId'] ) . '" class="">';
        echo '<div class="container">';
            echo '<div class="latest-editorial-posts-block__header">';
                echo '<h2>'. __( 'Filter by editorial', 'ninja' ). '</h2>';
                echo '<div class="latest-editorial-posts-block__filter">';
                echo '</div>';
            echo '</div><!-- .latest-editorial-posts-block__header -->';
            echo '<div class="latest-editorial-posts-block__content">';
                echo '<div class="latest-editorial-posts-block__sidebar">';
                echo '</div><!-- .latest-editorial-posts-block__sidebar -->';
                echo '<div class="latest-editorial-posts-block__posts">';
                echo '</div><!-- .latest-editorial-posts-block__posts -->';
            echo '</div><!-- .latest-editorial-posts-block__content -->';
        echo '</div>';
    echo '</div><!-- .latest-editorial-posts-block -->';

    $output = ob_get_clean();
    return $output;
}
