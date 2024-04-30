<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

get_header();
?>

<div class="container">
    <main class="content col-md-9">
        <div class="posts">
            <?php while ( have_posts() ) : the_post(); ?>
                <?php get_template_part( 'template-parts/content/post' ); ?>
            <?php endwhile; ?>
        </div>

        <?php get_template_part( 'template-parts/content/pagination' ); ?>
    </main>

    <aside class="col-md-3">
        <?php dynamic_sidebar( 'sidebar-default' ) ?>
    </aside>
</div>

<?php get_footer(); ?>
