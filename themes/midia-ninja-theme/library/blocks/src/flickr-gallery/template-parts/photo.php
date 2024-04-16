<?php
$attributes = $args['attributes'];
$photo = $args['photo'];

$flickr_by_type = ( isset( $attributes['flickrByType'] ) && ! empty( $attributes['flickrByType'] ) ) ? esc_attr( $attributes['flickrByType'] ) : 'user';
$title = ( isset( $photo['title'] ) && ! empty( $photo['title'] ) ) ? esc_attr( $photo['title'] ) : false;

// Tags
$tags = ( isset( $photo['tags'] ) && ! empty( $photo['tags'] ) ) ? esc_attr( $photo['tags'] ) : false;
$tag = '';

if ( $tags ) {
    $tags = explode( ' ', $tags );
    $tag = $tags[0];
}

// Date
$date = ( isset( $photo['dateupload'] ) && ! empty( $photo['dateupload'] ) ) ? esc_attr( $photo['dateupload'] ) : false;

if ( $flickr_by_type == 'album' ) {
    $data_id  = ( isset( $attributes['flickrAlbumId'] ) && ! empty( $attributes['flickrAlbumId'] ) ) ? esc_attr( $attributes['flickrAlbumId'] ) : false;
    $owner    = ( isset( $photo['owner'] ) && ! empty( $photo['owner'] ) ) ? esc_attr( $photo['owner'] ) : false;
    $photo_id = ( isset( $photo['id'] ) && ! empty( $photo['id'] ) ) ? esc_attr( $photo['id'] ) : false;
    $thumb    = ( isset( $photo['url_z'] ) && ! empty( $photo['url_z'] ) ) ? esc_url( $photo['url_z'] ) : false;
} else {
    $owner    = ( isset( $photo['owner'] ) && ! empty( $photo['owner'] ) ) ? esc_attr( $photo['owner'] ) : false;
    $photo_id = ( isset( $photo['id'] ) && ! empty( $photo['id'] ) ) ? esc_attr( $photo['id'] ) : false;
    $thumb    = ( isset( $photo['url_z'] ) && ! empty( $photo['url_z'] ) ) ? esc_url( $photo['url_z'] ) : false;
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
