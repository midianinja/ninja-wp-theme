<?php

/**
 * Get the search string
 */
$search_query = get_search_query( false );

if ( ! empty( $search_query ) ) {
    $title = 'Você pesquisou por: <span class="highlighted">' . esc_attr( $search_query  ) . '</span>';
} else {
    $title = 'Pesquisar';
} ?>

<header class="c-title title-search">
    <div class="container">
        <h1 class="entry-title">
            <?php echo apply_filters( 'the_title' , $title ); ?>
        </h1>
    </div>
</header><!-- /.c-title.title-search -->