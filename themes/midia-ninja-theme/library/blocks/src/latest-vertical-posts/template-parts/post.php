<?php
$show_author    = ! empty( $args['attributes']['showAuthor'] );
$show_excerpt   = ! empty( $args['attributes']['showExcerpt'] );
$show_taxonomy  = ! empty( $args['attributes']['showTaxonomy'] ) ? $args['attributes']['showTaxonomy'] : false;
$show_avatar    = ! empty( $args['attributes']['showAvatar'] );
$show_thumbnail = ! empty( $args['attributes']['showThumbnail'] );
$block_model    = ! empty( $args['attributes']['blockModel'] ) ? $args['attributes']['blockModel'] : 'posts';
$counter_posts  = ! empty( $args['attributes']['counter_posts'] ) ? $args['attributes']['counter_posts'] : 1;
$show_date      = isset( $args['attributes']['showDate'] ) ? $args['attributes']['showDate'] : false;

$coauthor = get_coauthors( $args['post']->ID );
?>

<a href="<?php echo get_permalink(); ?>">
    <div class="post">
        <?php if ( 'numbered' === $block_model ) : ?>
            <div class="post-number">
                <span class="number"><?php echo $counter_posts; ?></span><span class="point">.</span>
            </div>
        <?php elseif ( $show_thumbnail ) : ?>
            <div class="post-thumbnail">
                <div class="post-thumbnail--image">
                    <?php if ( $show_avatar ) {
                        $coauthor = get_coauthors( $args['post']->ID );
                        $thumbnail = get_the_post_thumbnail_url( $coauthor[0], 'medium' );
                    } else {
                        $thumbnail = get_the_post_thumbnail_url( $args['post']->ID, 'medium' );
                    }

                    $thumbnail = $thumbnail ? $thumbnail : get_stylesheet_directory_uri() . "/assets/images/default-image.png"; ?>

                    <img src="<?php echo $thumbnail; ?>">
                </div>
            </div>
        <?php endif; ?>

        <div class="post-content">
            <h2 class="post-title"><?php echo apply_filters( 'the_title', $args['post']->post_title ); ?></h2>

            <?php if ( $show_excerpt && has_excerpt() ) : ?>
                <div class="post-excerpt">
                    <?php echo get_the_excerpt(); ?>
                </div>
            <?php endif; ?>

            <div class="post-meta">
                <div class="post-meta--date">
                    <?php if ( $show_date ) : ?>
                        <span class="date"><?php echo get_the_time_ago( 'd \d\e F \d\e Y' ); ?></span>
                    <?php endif; ?>

                    <?php if ( $show_taxonomy ) : ?>
                        <?php $get_html_terms = get_html_terms( $args['post']->ID, $show_taxonomy, false, true, 1 ); ?>

                        <?php if ( $get_html_terms ) : ?>
                            <span class="post-meta--terms">
                                <span class="prefix"><?php _e( 'in', 'ninja' ); ?></span><?php echo $get_html_terms; ?>
                            </span>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>

                <?php if ( $show_author ) : ?>
                    <div class="post-author">
                        <span><?php _e( 'by', 'ninja' ); ?></span>
                        <?php echo get_the_author(); ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</a>
