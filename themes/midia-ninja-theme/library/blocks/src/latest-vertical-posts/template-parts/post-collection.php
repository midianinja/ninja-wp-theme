<?php
$photo = $args['photo'];

$title = ( ! empty( $photo['title'] ) ) ? esc_attr( $photo['title'] ) : false;
$owner     = ( ! empty( $photo['owner'] ) ) ? esc_attr( $photo['owner'] ) : false;
$photo_id  = ( ! empty( $photo['id'] ) ) ? esc_attr( $photo['id'] ) : false;
$thumbnail = ( ! empty( $photo['url_z'] ) ) ? esc_url( $photo['url_z'] ) : false;

if ( $title ) {
	list( $title, $date, $location ) = split_ninja_flickr_title( $title );
}

if ( $thumbnail && $photo_id && $owner ) : ?>
    <a href="https://www.flickr.com/photos/<?php echo $owner; ?>/<?php echo $photo_id; ?>" target="_blank">
        <div class="post collection">
            <div class="post-thumbnail">
                <div class="post-thumbnail--image">
                    <img src="<?php echo $thumbnail; ?>">
                </div>
            </div>

            <div class="post-content">
                <?php if ( $title ) : ?>
                    <h2 class="post-title"><?php echo apply_filters( 'the_title', $title ); ?></h2>
                <?php endif;?>

                <div class="post-meta">
                    <?php if ( $location ) : ?>
                        <span class="post-meta--terms">
                            <span class="tag"><?php echo $location; ?></span>
                        </span>
                    <?php endif;?>

                    <?php if ( $date ) : ?>
                        <span class="post-meta--date">
                            <span class="date"><?php echo $date; ?></span>
                        </span>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </a>
<?php endif; ?>
