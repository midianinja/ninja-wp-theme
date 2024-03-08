<a href="<?php echo get_permalink();?>">
    <div class="post">
        <div class="post-thumbnail">
            <?php $get_html_terms = get_html_terms( $args['post']->ID, 'category', false ); ?>
            <?php if ( $get_html_terms ) : ?>
                <span class="post--terms">
                    <?php echo $get_html_terms; ?>
                </span>
            <?php endif; ?>
            <?php if ( has_post_thumbnail() ) : ?>
                <?php echo get_the_post_thumbnail( $args['post']->ID, 'thumbnail' ); ?>
            <?php else : ?>
                <img src="https://via.placeholder.com/100">
            <?php endif; ?>
        </div>
        <div class="post-content">
            <h2 class="post-title"><?php echo apply_filters( 'the_title', $args['post']->post_title ); ?></h2>

            <div class="post-meta">
                <span class="post-meta--date"><?php echo get_the_date(); ?></span>
            </div>
        </div>
    </div>
</a>