<?php

$post_id = get_the_ID();

$args = [
    'post_type'      => 'guest-author',
    'posts_per_page' => 3,
    'order'          => 'DESC',
    'meta_query'     => [
        [
            'key'     => 'colunista',
            'value'   => 1,
            'compare' => '=',
        ],
    ]
    
];

$related_posts = new WP_Query($args);

if ($related_posts->have_posts()) : ?>

    <h2>Conheça outros colunistas</h2>
    
    <div class="related">
        <?php while($related_posts->have_posts()) :
            $related_posts->the_post();

            $co_authors_args = [
                'post_type'      => 'opiniao',
                'posts_per_page' => 1,
                'post__not_in'   => [ $post_id ],
                'author_name'       => $post->post_name,
                'order'          => 'DESC',
                'fields' => 'ids',
            ];

            $co_authors_posts = new WP_Query($co_authors_args);
            if($co_authors_posts->have_posts()) {
                $co_authors_post_id = $co_authors_posts->posts[0];
            }
           
            // Thumbnail
            $thumbnail = (has_post_thumbnail()) ? get_the_post_thumbnail() : '<img src="' . get_stylesheet_directory_uri() . '/assets/images/default-image.png">'; ?>
            
            <div class="related-post-card">
                <a class="related-post-image" href="<?php the_permalink();?>"><?php echo $thumbnail;?></a>
                
                <div class="related-post-content">
            
                    <div class="info">
                        <a href="<?php echo get_the_permalink($co_authors_post_id);?>">
                        <h4><?php echo get_the_title($co_authors_post_id) ?></h4>
                        </a>
                        
                            <h5><?php the_title(); ?></h5>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    </div>

<?php endif;
wp_reset_postdata(); ?>
