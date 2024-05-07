<a href="<?php echo get_permalink(); ?>">
    <div class="post">
        <div class="post-content">
            <?php $get_html_terms = get_html_terms( $args['post']->ID, 'category', false, true, 1 ); ?>

            <?php if ( $get_html_terms ) : ?>
                <div class="post-meta">
                    <span class="post-meta--terms">
                        <?php echo $get_html_terms; ?>
                    </span>
                </div>
            <?php endif; ?>

            <h2 class="post-title"><?php echo apply_filters( 'the_title', $args['post']->post_title ); ?></h2>
        </div>
    </div>
</a>