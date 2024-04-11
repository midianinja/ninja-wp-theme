<?php
/*
 * Template Name: Colunistas
 * Template Post Type: page
 */

get_header(); 
?>
<div class="container">
    <main class="content content-colunistas">
        <?php
        if (have_posts()) :
            while (have_posts()) : the_post();
                the_content(); 
            endwhile;
        endif;
        ?>
         <section class="post-footer">
            <div class="related-posts">
                <?php get_template_part('template-parts/content/related-posts-colunistas'); ?>
            </div>
        </section>
    </main>

</div>

<?php
get_footer();