<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

gt_set_post_view();
get_header();

$category = get_the_terms($post->ID, 'category');
?>

<div class="container">
    <main class="content">
        <?php while (have_posts()) : the_post(); ?>
            <article class="post">
                <header class="post-header">
                    <div>
                        <div class="info">
                            <span class="term-<?= $category[0]->slug; ?>">
                                <?php the_category(' '); ?>
                            </span> 
                        </div>

                        <?php the_post_thumbnail();?>
                    </div>
                    
                    <h2 class="title"><?php the_title(); ?></h2>

                    <h5 class="excerpt"><?php the_excerpt(); ?></h5>

                    <div class="content-author">
                        
                        <?php echo get_avatar(get_the_author_meta('ID'), 70);?>

                        <div class="author">
                            <?php the_author(); ?>
                            <time class="date" datetime="<?php echo get_the_date('c'); ?>">
                                <span>
                                    <?php the_date();?>
                                </span> 
                                <span class="clock"></span>
                                <span>
                                    <?php the_time('G:i');?>
                                </span>
                            </time>
                        </div>
                        
                        <div class="page-share">
                            <?php echo do_shortcode('[addtoany]'); ?>
                            <?php the_social_networks_menu() ?>
                        </div>
                    </div>
                    
                </header>

                <section class="post-content">
                    <?php the_content(); ?>

                    <div class="page-share">
                        <?php echo do_shortcode('[addtoany]'); ?>
                        <?php the_social_networks_menu() ?>
                    </div>

                    <div class="comments">

                    </div>
                </section>
            </article>
        <?php endwhile; ?>

        <section class="post-footer">
            <div class="related-posts">
                <?php get_template_part('./template-parts/content/related-posts'); ?>
            </div>
        </section>
    </main>

</div>

<?php get_footer(); ?>