<?php
$coauthor = $args['author'];
$user_login = get_post_meta( $coauthor, 'cap-user_login', true );
$display_name = get_post_meta( $coauthor, 'cap-display_name', true );

$link = get_author_posts_url( $author, $user_login );

$bio = get_post_meta( $coauthor, 'cap-description', true );
$bio = explode( ' ', $bio, 15 );

if ( count( $bio ) >= 15 ) {
    array_pop( $bio );
    $bio = implode( ' ', $bio ) . ' ...';
} else {
    $bio = implode( ' ', $bio );
}

// Thumbnail
$thumbnail = ( has_post_thumbnail( $coauthor ) ) ? get_the_post_thumbnail( $coauthor ) : '<img src="' . get_stylesheet_directory_uri() . '/assets/images/default-image.png">';

?>

<a href="<?php echo esc_url( $link ); ?>">
    <div class="post co-author">
        <div class="post-thumbnail">
            <?php echo $thumbnail; ?>
        </div>
        <div class="post-content">
            <h2 class="post-title"><?php echo apply_filters( 'the_title', $display_name ); ?></h2>
            <?php if ( ! empty( $bio ) ) : ?>
                <?php echo apply_filters( 'the_content', $bio ); ?>
            <?php endif; ?>
        </div>
    </div>
</a>
