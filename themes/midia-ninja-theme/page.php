<?php
/**
 * The template for displaying all pages
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
                <!-- <header class="page-header">
                    <div class="info">
                        <span class="category"><?php the_category( ', ' ); ?></span>
                    </div>
                    <h1 class="title"><?php the_title(); ?></h1>
                    <time class="date" datetime="<?php echo get_the_date( 'c' ); ?>"><?php the_date(); ?></time>
                </header> -->

                <section class="page-content">
                    <?php the_content(); ?>
                </section>

                <footer class="page-footer">
                </footer>
            </article>
        <?php endwhile; ?>
    </main>
</div>

<?php get_footer(); ?>