<?php

$post_id = get_the_ID();

$args = [
    'post_type'      => 'guest-author',
    'posts_per_page' => 12,
    'order'          => 'DESC',
    'meta_query'     => [
        [
            'key'     => 'colunista',
            'value'   => 1,
            'compare' => '=',
        ],
    ]
];

$related_posts = get_posts( $args );
$count = 0;
$limit = 3;

if ( $related_posts ) : ?>

    <h2><?php _e( 'Conheça outros colunistas', 'ninja' ); ?></h2>

    <div class="related">
        <?php foreach( $related_posts as $related_post ) :

            $co_authors_args = [
                'post_type'      => 'opiniao',
                'posts_per_page' => 1,
                'post__not_in'   => [ $post_id ],
                'author_name'    => $related_post->post_name,
                'order'          => 'DESC',
                'fields'         => 'ids'
            ];

            $co_authors_posts = new WP_Query( $co_authors_args );

            if ( $co_authors_posts->found_posts ) {
                $co_authors_post_id = $co_authors_posts->posts[0];
                $count++;
            } else {
                // Exit if no posts found that match the author name
                continue;
            }

            // Thumbnail
            $thumbnail = has_post_thumbnail( $related_post->ID ) ? get_the_post_thumbnail( $related_post->ID ) : '<img src="' . get_stylesheet_directory_uri() . '/assets/images/default-image.png">'; ?>

            <div class="related-post-card">
                <a class="related-post-image" href="<?php the_permalink();?>"><?php echo $thumbnail; ?></a>

                <div class="related-post-content">
                    <div class="info">
                        <a href="<?php echo get_the_permalink( $co_authors_post_id );?>">
                            <h4><?php echo get_the_title( $co_authors_post_id ); ?></h4>
                        </a>
                        <h5><?php echo get_the_title( $related_post->ID ); ?></h5>
                    </div>
                </div>
            </div>

            <?php if ( $count == $limit ) {
                break;
            }

            wp_reset_postdata();
        endforeach; ?>
    </div>

<?php endif; ?>