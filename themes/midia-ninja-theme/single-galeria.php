<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

gt_set_post_view();
get_header();
get_template_part( 'template-parts/header-especiais' );
?>

<div class="container">
    <main class="content">
        <?php while (have_posts()) : the_post(); ?>
            <article class="post">
                <header class="post-header">
                    <div class="post-thumb">
                        <?php the_post_thumbnail();?>

                        <span class="thumb-caption">
                            <?php the_post_thumbnail_caption();?>
                        </span>
                    </div>


                    <h1 class="post-title">
                        <?php the_title();?>
                    </h1>
                </header>

                <section class="post-content">
                    <?php the_content(); ?>
                </section>
            </article>
        <?php endwhile; ?>

        <section class="post-footer">
            <div class="related-posts">
                <?php get_template_part('./template-parts/content/related-posts-galeria'); ?>
            </div>
        </section>
    </main>

</div>

<?php get_footer(); ?>
