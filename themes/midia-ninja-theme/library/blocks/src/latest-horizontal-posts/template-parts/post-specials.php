<a href="<?php echo get_permalink();?>">
    <div class="post specials">
        <div class="post-thumbnail">
            <?php if ( has_post_thumbnail() ) : ?>
                <?php echo get_the_post_thumbnail( $args['post']->ID, 'medium' ); ?>
            <?php else : ?>
                <img src="https://via.placeholder.com/400" alt="" height="400" width="400">
            <?php endif; ?>
        </div>
    </div>
</a>
