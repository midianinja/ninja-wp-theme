<?php
get_header();
?>

<div class="container">
    <?php echo get_layout_header( 'opiniao' ); ?>
    <main class="content col-md-9">
        <div class="posts">
            <?php while ( have_posts() ) : the_post(); ?>
                <?php get_template_part( 'template-parts/content/post' ); ?>
            <?php endwhile; ?>
        </div>

        <?php get_template_part( 'template-parts/content/pagination' ); ?>
    </main>
    <?php echo get_layout_footer( 'opiniao' ); ?>
</div>

<?php get_footer(); ?>
