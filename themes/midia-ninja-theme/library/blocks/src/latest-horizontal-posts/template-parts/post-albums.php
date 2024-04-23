<?php
$album = $args['album'];

$title = ( ! empty( $album['title']['_content'] ) ) ? esc_attr( $album['title']['_content'] ) : false;
$owner    = ( ! empty( $album['owner'] ) ) ? esc_attr( $album['owner'] ) : false;
$album_id = ( ! empty( $album['id'] ) ) ? esc_attr( $album['id'] ) : false;

if ( $title ) {
	list( $title, $date, $location ) = split_ninja_flickr_title( $title );
}

$thumbnail = 'https://live.staticflickr.com/' . $album['server'] . '/' . $album['primary'] . '_' . $album['secret'] . '.jpg';

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
						<?php if ( $location ) : ?>
                            <span class="tag"><?php echo $location; ?></span>
                        <?php endif;?>

                        <?php if ( $date ) : ?>
                            <span class="date"><?php echo $date; ?></span>
                        <?php endif; ?>
                    </div>
                </div>
                <img src="<?php echo $thumbnail; ?>" alt="<?php echo esc_attr( $title ); ?>">
            </div>
        </div>
    </a>
</div>
<?php endif; ?>
