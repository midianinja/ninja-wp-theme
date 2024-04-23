<?php
$photo = $args['photo'];

$title     = ( ! empty( $photo['title'] ) ) ? esc_attr( $photo['title'] ) : false;
$owner     = ( ! empty( $photo['owner'] ) ) ? esc_attr( $photo['owner'] ) : false;
$photo_id  = ( ! empty( $photo['id'] ) ) ? esc_attr( $photo['id'] ) : false;

if ( $title ) {
	list( $title, $date, $location ) = split_ninja_flickr_title( $title );
}

if ( $photo_id && $owner ) :

$thumbnail = 'https://live.staticflickr.com/' . $photo['server'] . '/' . $photo_id . '_' . $photo['secret'] . '.jpg'; ?>

<div class="slide">
    <a href="https://www.flickr.com/photos/<?php echo $owner; ?>/<?php echo $photo_id; ?>" target="_blank">
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
