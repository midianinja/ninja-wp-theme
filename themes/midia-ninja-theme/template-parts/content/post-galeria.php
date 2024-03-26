<a class="post-card" href="<?php the_permalink(); ?>">
   
    <div class="post-card--thumb">
        
        
        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('medium_large'); ?>
        <?php else : ?>
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/default-image.png" alt="<?php the_title(); ?>">
        <?php endif; ?>
        
        
    </div><!-- /.post-card--thumb -->

    <div class="post-card--content">
        <h5 class="entry-title"><?php the_title(); ?></h5>
    </div><!-- /.post-card--content -->
   

</a>
