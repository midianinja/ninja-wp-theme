<a class="post-card post-card-opiniao" href="<?php the_permalink(); ?>">

    <div class="post-card--thumb post-opiniao">


        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('medium'); ?>
        <?php else : ?>
            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/default-image.png" alt="<?php the_title(); ?>">
        <?php endif; ?>


    </div><!-- /.post-card--thumb -->

    <div class="post-card--content">
        <h5 class="entry-title"><?php the_title(); ?></h5>

        <div class="card-author">
            <?php the_author();?>
        </div>
    </div><!-- /.post-card--content -->


</a>
