<?php

$post_id = get_the_ID();

$projects = get_the_terms( $post_id, 'category' );

if ( $projects && ! is_wp_error( $projects ) ) {
    $projects = wp_list_pluck( $projects, 'term_id' );
}

$args = [
    'post_type'      => 'post',
    'posts_per_page' => 3,
    'post__not_in'   => [ $post_id ],
    'order'          => 'DESC',
    'tax_query'      => [
        [
            'taxonomy' => 'category',
            'terms'    => $projects
        ]
    ],
];

$related_posts = new WP_Query( $args );

if ( $related_posts->have_posts() ) : ?>

<div class="related">
    <h2>Notícias Relacionadas</h2>
        <?php while( $related_posts->have_posts() ) :
            $related_posts->the_post();

            // Thumbnail
            $thumbnail = ( has_post_thumbnail() ) ? get_the_post_thumbnail() : '<img src="' . get_stylesheet_directory_uri() . '/assets/images/default-aedas.png">'; ?>
            <a href="<?php the_permalink(); ?>">
                <div class="related-post">
                    <div class="related-post-image"><?php echo $thumbnail; ?></div>
                    <div class="related-post-content">
                        <span class="category"><p><?php echo get_html_terms( get_the_ID(), 'category' ); ?></p></span>
                        <div class="title">
                            <h6><?php the_title(); ?></h6>
                        </div>
                    </div>
                </div>
            </a>
        <?php endwhile; ?>
    </div>

<?php endif;
wp_reset_postdata(); ?>