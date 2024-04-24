<a href="<?php echo get_permalink();?>">
    <div class="post specials">
        <div class="post-thumbnail">
            <?php if ( has_post_thumbnail() ) : ?>
                <?php echo get_the_post_thumbnail( $args['post']->ID, 'medium_large' ); ?>
            <?php else : ?>
                <img src="<?php echo get_stylesheet_directory_uri() ?>/assets/images/default-image.png" alt="" height="600" width="800">
            <?php endif; ?>
        </div>
    </div>
</a>
