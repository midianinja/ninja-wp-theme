<?php
/**
 * The template for displaying Afluente single post
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

gt_set_post_view();
get_header();
get_template_part( 'template-parts/header-especiais' );
?>

<div class="container">
    <main class="content content-afluente">
        <?php while ( have_posts() ) : the_post(); ?>
            <article class="post">
                <section class="post-content">
                    <?php the_content(); ?>
                </section>
            </article>
        <?php endwhile; ?>
    </main>
</div>

<?php get_footer(); ?>
