<?php
$coauthor = $args['author'];

$link = get_author_posts_url( $args['author']->ID, $args['author']->user_nicename );

$bio = '';

if ( isset( $coauthor->description ) && ! empty( $coauthor->description ) ) {
    $bio = $coauthor->description;
} elseif ( get_the_author_meta( 'description', $coauthor->ID ) ) {
    $bio = get_the_author_meta( 'description', $coauthor->ID );
}

$bio = explode( ' ', $bio, 15 );

if ( count( $bio ) >= 15 ) {
    array_pop( $bio );
    $bio = implode( ' ', $bio ) . ' ...';
} else {
    $bio = implode( ' ', $bio );
}

?>

<a href="<?php echo esc_url( $link ); ?>">
    <div class="post co-author">
        <div class="post-thumbnail">
            <?php echo coauthors_get_avatar( $coauthor, 60 ); ?>
        </div>
        <div class="post-content">
            <h2 class="post-title"><?php echo $coauthor->display_name; ?></h2>
            <?php if ( ! empty( $bio ) ) : ?>
                <?php echo apply_filters( 'the_content', $bio ); ?>
            <?php endif; ?>
        </div>
    </div>
</a>
