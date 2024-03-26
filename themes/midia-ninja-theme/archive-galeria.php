<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */
get_header();

?>

<div class="container">
    <main class="content col-md-12">
    <?php echo get_layout_header('galeria'); ?>
        
        <div class="posts">
            <?php while (have_posts()) : the_post(); ?>
                <?php get_template_part('template-parts/content/post'); ?>
            <?php endwhile; ?>
        </div>
        <?php echo get_layout_footer('galeria'); ?>

        <?php get_template_part('template-parts/content/pagination'); ?>
    </main>
</div>

<?php get_footer(); ?>