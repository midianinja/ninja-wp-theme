<?php
$flickr_by_type = ( isset( $args['attributes']['flickrByType'] ) && ! empty( $args['attributes']['flickrByType'] ) ) ? esc_attr( $args['attributes']['flickrByType'] ) : 'user';
$title = ( isset( $args['photo']['title'] ) && ! empty( $args['photo']['title'] ) ) ? esc_attr( $args['photo']['title'] ) : false;

// Tags
$tags = ( isset( $args['photo']['tags'] ) && ! empty( $args['photo']['tags'] ) ) ? esc_attr( $args['photo']['tags'] ) : false;
$tag = '';

if ( $tags ) {
    $tags = explode( ' ', $tags );
    $tag = $tags[0];
}

// Date
$date = ( isset( $args['photo']->dateupload ) && ! empty( $args['photo']->dateupload ) ) ? esc_attr( $args['photo']->dateupload ) : false;

if ( $flickr_by_type == 'album' ) {
    $data_id  = ( isset( $attributes['flickrAlbumId'] ) && ! empty( $attributes['flickrAlbumId'] ) ) ? esc_attr( $attributes['flickrAlbumId'] ) : false;
    $owner    = ( isset( $args['photo']['owner'] ) && ! empty( $args['photo']['owner'] ) ) ? esc_attr( $args['photo']['owner'] ) : false;
    $photo_id = ( isset( $args['photo']['id'] ) && ! empty( $args['photo']['id'] ) ) ? esc_attr( $args['photo']['id'] ) : false;
    $thumb    = ( isset( $args['photo']['url_z'] ) && ! empty( $args['photo']['url_z'] ) ) ? esc_url( $args['photo']['url_z'] ) : false;
} else {
    $owner    = ( isset( $args['photo']['owner'] ) && ! empty( $args['photo']['owner'] ) ) ? esc_attr( $args['photo']['owner'] ) : false;
    $photo_id = ( isset( $args['photo']['id'] ) && ! empty( $args['photo']['id'] ) ) ? esc_attr( $args['photo']['id'] ) : false;
    $thumb    = ( isset( $args['photo']['url_z'] ) && ! empty( $args['photo']['url_z'] ) ) ? esc_url( $args['photo']['url_z'] ) : false;
}

if ( $thumb && $photo_id && $owner ) : ?>

<div class='slide'>
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