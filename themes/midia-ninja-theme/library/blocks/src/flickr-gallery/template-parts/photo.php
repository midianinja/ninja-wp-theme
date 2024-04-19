<?php
$photo = $args['photo'];

$title = ( ! empty( $photo['title'] ) ) ? esc_attr( $photo['title'] ) : false;
$date = ( ! empty( $photo['dateupload'] ) ) ? esc_attr( $photo['dateupload'] ) : false;
$owner    = ( ! empty( $photo['owner'] ) ) ? esc_attr( $photo['owner'] ) : false;
$photo_id = ( ! empty( $photo['id'] ) ) ? esc_attr( $photo['id'] ) : false;
$thumb    = ( ! empty( $photo['url_z'] ) ) ? esc_url( $photo['url_z'] ) : false;

$tags = ( ! empty( $photo['tags'] ) ) ? esc_attr( $photo['tags'] ) : false;
$tag = '';
if ( $tags ) {
    $tags = explode( ' ', $tags );
    $tag = $tags[0];
}

if ( $thumb && $photo_id && $owner ) : ?>

<div class="flickr-photo">
    <a href="https://www.flickr.com/photos/<?php echo $owner; ?>/<?php echo $photo_id; ?>" target="_blank">
        <div class="post specials">
            <div class="post-thumbnail">
                <div class="post-thumbnail__info">
                    <?php if ( $title ) : ?>
                        <h2><?php echo apply_filters( 'the_title', $title ); ?></h2>
                    <?php endif;?>

                    <div class="post-thumbnail__meta">
                        <?php if ( $tag ) : ?>
                            <span class="tag"><?php echo esc_html( $tag ); ?></span>
                        <?php endif;?>

                        <?php if ( $date ) : ?>
                            <span class="date"><?php echo date_i18n( 'd/m/Y', esc_attr( $date ) ); ?></span>
                        <?php endif; ?>
                    </div>
                </div>
                <img src="<?php echo $thumb; ?>">
            </div>
        </div>
    </a>
</div>

<?php endif; ?>
