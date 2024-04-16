<?php
$show_taxonomy = isset($args['attributes']['showTaxonomy']) ? $args['attributes']['showTaxonomy'] : false;
$show_thumbnail = isset($args['attributes']['showThumbnail']) ? $args['attributes']['showThumbnail'] : false;
$show_author = isset($args['attributes']['showAuthor']) ? $args['attributes']['showAuthor'] : false;
$show_excerpt = isset($args['attributes']['showExcerpt']) ? $args['attributes']['showExcerpt'] : false;
$block_model = ! empty( $args['attributes']['blockModel'] ) ? $args['attributes']['blockModel'] : 'posts';
$counter_posts = ! empty( $args['attributes']['counter_posts'] ) ? $args['attributes']['counter_posts'] : 1;
?>

<a href="<?php echo get_permalink();?>">
    <div class="post">
        <?php if ( 'numbered' === $block_model ) : ?>
            <div class="post-number">
                <span class="number"><?php echo $counter_posts;?></span><span class="point">.</span>
        </div>
        <?php elseif ( $show_thumbnail ) : ?>
            <div class="post-thumbnail">
                <div class="post-thumbnail--image">
                    <?php if (has_post_thumbnail()) : ?>
                        <?php echo get_the_post_thumbnail($args['post']->ID, 'thumbnail'); ?>
                    <?php else : ?>
                        <img src="https://via.placeholder.com/100">
                    <?php endif; ?>
                </div>
            </div>
        <?php endif; ?>
        <div class="post-content">
            <h2 class="post-title"><?php echo apply_filters('the_title', $args['post']->post_title); ?></h2>
            
            <div class="post-meta">
                <div class="post-meta--date">
                    <span><?php echo get_the_time_ago(); ?></span>

                    <?php if ($show_taxonomy) : ?>
                        <?php $get_html_terms = get_html_terms($args['post']->ID, $args['attributes']['showTaxonomy'], false, true, 1); ?>
                        <?php if ($get_html_terms) : ?>
                            <span class="post-meta--terms">
                                <span><?php _e('in', 'ninja'); ?></span>
                                <?php echo $get_html_terms; ?>
                            </span>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>

                <?php if ($show_author) : ?>
                    <div class="post-author">
                        <span><?php _e('by', 'ninja');?></span>
                        <?php echo get_the_author(); ?>
                    </div>
                <?php endif; ?>

                <?php if ($show_excerpt) : ?>
                    <div class="post-excerpt">
                        <?php echo get_the_excerpt(); ?>
                    </div>
                <?php endif; ?>
            </div>
            
            
        </div>
    </div>
</a>