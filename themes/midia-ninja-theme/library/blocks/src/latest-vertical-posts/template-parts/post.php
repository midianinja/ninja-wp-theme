<?php
$show_taxonomy = isset( $args['attributes']['showTaxonomy'] ) ? $args['attributes']['showTaxonomy'] : false;
?>

<a href="<?php echo get_permalink();?>">
    <div class="post">
        <h2 class="post-title"><?php echo apply_filters( 'the_title', $args['post']->post_title ); ?></h2>
        <div class="post-meta">
            <span class="post-meta--date"><?php echo get_the_time_ago(); ?></span>

            <?php if ( $show_taxonomy ) : ?>
                <?php $get_html_terms = get_html_terms( $args['post']->ID, $args['attributes']['showTaxonomy'], false ); ?>
                <?php if ( $get_html_terms ) : ?>
                    <span class="post-meta--terms">
                        <span><?php _e( 'in', 'ninja' ); ?></span>
                        <?php echo $get_html_terms; ?>
                    </span>
                <?php endif; ?>
            <?php endif; ?>
        </div>
    </div>
</a>