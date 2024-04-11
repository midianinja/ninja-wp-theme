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
    </main>
</div>

<?php
get_footer();