<?php

extract( $args );

$title = ( ! empty( $collection['title'] ) ) ? esc_attr( $collection['title'] ) : false;
$thumbnail = ! empty( $collection['thumb_url'] ) ? esc_url( $collection['thumb_url'] ) : false ;

if ( $user_id && ! empty( $collection['id'] ) ) : ?>

<div class="slide">
    <a href="https://www.flickr.com/photos/<?php echo $owner; ?>/<?php echo $photo_id; ?>" target="_blank">
        <div class="post specials">
            <div class="post-thumbnail">
                <div class="post-thumbnail__info">
                    <?php if ( $title ) : ?>
                        <h2><?php echo apply_filters( 'the_title', $title ); ?></h2>
                    <?php endif;?>
                </div>
                <img loading="lazy" src="<?php echo $thumbnail; ?>" alt="<?php echo $title; ?>">
            </div>
        </div>
    </a>
</div>

<?php endif; ?>
