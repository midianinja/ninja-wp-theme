<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */
get_header();

?>

<div class="container">
    <?php echo get_layout_header('afluentes'); ?>
    <main class="content col-md-12">
        
        <div class="search">
            <?php get_template_part('template-parts/search-afluente'); ?>
        </div>
        
        <div class="posts">
            <?php while (have_posts()) : the_post(); ?>
                <?php get_template_part('template-parts/content/post'); ?>
            <?php endwhile; ?>
        </div>        
    </main>

    <?php echo get_layout_footer('afluentes'); ?>
</div>

<?php get_footer(); ?>