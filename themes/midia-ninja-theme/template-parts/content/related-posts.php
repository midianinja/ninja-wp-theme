<?php

$post_id = get_the_ID();

$category = 'category';
$term = get_primary_term( $post_id, $category );

$args = [
    'post_type'      => 'post',
    'posts_per_page' => 4,
    'post__not_in'   => [ $post_id ],
    'order'          => 'DESC'
];

if ( $term ) {
    $args['cat'] = $term->term_id;
}

$related_posts = new WP_Query( $args );

if ( $related_posts->have_posts() ) : ?>

    <h2><?php _e( 'Read too', 'ninja' ); ?></h2>

    <div class="related">
        <?php while( $related_posts->have_posts() ) :
            $related_posts->the_post();

            // Thumbnail
            $thumbnail = ( has_post_thumbnail() ) ? get_the_post_thumbnail() : '<img src="' . get_stylesheet_directory_uri() . '/assets/images/default-image.png">'; ?>

            <div class="related-post">
                <a class="related-post-image" href="<?php the_permalink(); ?>"><?php echo $thumbnail; ?></a>

                <div class="related-post-content">
                    <?php if ( $term ) : ?>
                        <span class="category category-<?= $term->slug ?>">
                            <?= $term->name; ?>
                        </span>
                    <?php endif; ?>

                    <div class="info">
                        <a href="<?php the_permalink(); ?>">
                            <h5><?php the_title(); ?></h5>
                        </a>

                        <time><?php echo get_the_date(); ?></time>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    </div>

<?php endif;
wp_reset_postdata(); ?>
