<?php
/**
 * The template for displaying front page
 * 
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

gt_set_post_view();
get_header(); 
?>

<div class="container">
    <main class="content">
        <?php while ( have_posts() ) : the_post(); ?>
            <article class="page">
                <section class="page-content">
                    <?php the_content(); ?>
                </section>
            </article>
        <?php endwhile; ?>
    </main>
</div>

<?php get_footer(); ?>