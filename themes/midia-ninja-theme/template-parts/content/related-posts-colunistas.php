<?php

$post_id = get_the_ID();
$projects = get_the_terms($post_id, 'category');

if ($projects && ! is_wp_error($projects)) {
    $projects = wp_list_pluck($projects, 'term_id');
}

$args = [
    'post_type'      => 'guest-author',
    'posts_per_page' => 3,
    'post__not_in'   => [ $post_id ],
    'order'          => 'DESC',
    
];

$related_posts = new WP_Query($args);

if ($related_posts->have_posts()) : ?>

    <h2>Conheça outros colunistas</h2>
    
    <div class="related">
        <?php while($related_posts->have_posts()) :
            $related_posts->the_post();

            // Thumbnail
            $thumbnail = (has_post_thumbnail()) ? get_the_post_thumbnail() : '<img src="' . get_stylesheet_directory_uri() . '/assets/images/default-image.png">'; ?>
            
            <div class="related-post-card">
                <a class="related-post-image" href="<?php the_permalink();?>"><?php echo $thumbnail;?></a>
                
                <div class="related-post-content">
            
                    <div class="info">
                        <a href="<?php the_permalink();?>">
                            <h4><?php the_title(); ?></h4>
                        </a>
                        
                            <h5><?php the_title(); ?></h5>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    </div>

<?php endif;
wp_reset_postdata(); ?>
