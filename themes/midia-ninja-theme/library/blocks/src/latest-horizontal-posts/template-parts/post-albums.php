<?php
$album = $args['album'];

$title = ( ! empty( $album['title']['_content'] ) ) ? esc_attr( $album['title']['_content'] ) : false;
$owner    = ( ! empty( $album['owner'] ) ) ? esc_attr( $album['owner'] ) : false;
$album_id = ( ! empty( $album['id'] ) ) ? esc_attr( $album['id'] ) : false;
$date = ( ! empty( $album['date_create'] ) ) ? esc_attr( $album['date_create'] ) : false;

$thumb = 'https://live.staticflickr.com/' . $album['server'] . '/' . $album['primary'] . '_' . $album['secret'] . '_z.jpg';

if ( $album_id && $owner ) : ?>
<div class="slide">
    <a href="https://www.flickr.com/photos/<?php echo $owner; ?>/albums/<?php echo $album_id; ?>" target="_blank">
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
