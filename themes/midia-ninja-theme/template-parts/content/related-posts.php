<?php

$post_id = get_the_ID();
$projects = get_the_terms($post_id, 'category');
$cat = $projects[0]->term_id;

$cor_font = get_term_meta ( $cat, 'ninja_font_term_color', true ) ?: '#FFFFFF';
$cor_fundo = get_term_meta ( $cat, 'ninja_background_term_color', true ) ?: '#333333';

if ($projects && ! is_wp_error($projects)) {
    $projects = wp_list_pluck($projects, 'term_id');
}

$args = [
    'post_type'      => 'post',
    'posts_per_page' => 4,
    'post__not_in'   => [ $post_id ],
    'order'          => 'DESC',
    'cat'            => $cat
    // 'tax_query'      => [
    //     [
    //         'taxonomy' => 'category',
    //         'terms'    => $projects
    //     ]
    // ],
];

$related_posts = new WP_Query($args);

if ($related_posts->have_posts()) : ?>

    <h2><?php _e('Read too', 'ninja');?></h2>

    <div class="related">
        <?php while($related_posts->have_posts()) :
            $related_posts->the_post();

            // Thumbnail
            $thumbnail = (has_post_thumbnail()) ? get_the_post_thumbnail() : '<img src="' . get_stylesheet_directory_uri() . '/assets/images/default-image.png">'; ?>

            <div class="related-post">
                <a class="related-post-image" href="<?php the_permalink();?>"><?php echo $thumbnail;?></a>

                <div class="related-post-content">
                    <?php $term = get_the_category_by_ID($cat); ?>

                    <span class="category term-<?= $term ?>" style="color: <?= $cor_font;?>; background-color: <?= $cor_fundo;?>;">
                        <?= $term;  ?>
                    </span>

                    <div class="info">
                        <a href="<?php the_permalink();?>">
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
