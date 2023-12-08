<?php

/**
 * Mount the title
 */
$title = '';

if ( is_category() ) {
    $title = single_cat_title( '', false );
} else {
    $title = get_the_title();
} ?>

<header class="c-title title-default">
    <div class="container">
        <h1 class="entry-title">
            <?php echo apply_filters( 'the_title' , $title ); ?>
        </h1>
    </div>
</header><!-- /.c-title.title-default -->