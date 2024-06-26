<article id="post-ID-<?php the_ID(); ?>" class="post">
    <div class="post-card">
        <div class="post-card--thumb">
            <a href="<?php the_permalink(); ?>">
                <div class="aspect-ratio">
                    <?php if ( has_post_thumbnail() ) : ?>
						<?php if ( get_post_type() === 'especial' ): ?>
                        	<?php the_post_thumbnail( 'medium_large' ); ?>
						<?php else: ?>
							<?php the_post_thumbnail( 'medium' ); ?>
						<?php endif; ?>
                    <?php else : ?>
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/default-image.png" alt="<?php the_title(); ?>">
                    <?php endif; ?>
                </div><!-- /.aspect-ratio -->
            </a>
        </div><!-- /.post-card--thumb -->

        <div class="post-card--content">
            <div class="entry-meta"><?php echo get_html_terms( get_the_ID(), 'category', true, true, 1 ); ?></div>
            <div class="entry-date"><?php echo get_the_date(); ?></div>
            <a href="<?php the_permalink(); ?>"><h5 class="entry-title"><?php the_title(); ?></h5></a>
            <div class="entry-excerpt">
                <?php echo custom_excerpt( ( str_word_count( get_the_title() ) <= 10 ) ? 100 : 100 ); ?>
            </div>
        </div><!-- /.post-card--content -->
    </div><!-- /.post-card -->
</article><!-- /.post -->
