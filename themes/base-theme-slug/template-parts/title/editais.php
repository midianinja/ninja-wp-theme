<?php

/**
 * Get the current post type object
 */
$post_type = get_queried_object(); ?>

<header class="c-title title-editais">
    <div class="container">
        <h1 class="entry-title">
            <?php echo apply_filters( 'the_title' , $post_type->labels->name ); ?>
        </h1>
    </div>
</header><!-- /.c-title.title-editais -->