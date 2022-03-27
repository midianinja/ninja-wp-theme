<?php
get_header();
?>

<div class="index-wrapper">
    <div class="container">
        <div class="row">

            <?php get_template_part( 'template-parts/title/search' ); ?>

            <main class="col-md-9">
                <?php while ( have_posts() ) : the_post(); ?>
                    <?php get_template_part( 'template-parts/content/post' ); ?>
                <?php endwhile; ?>

                <?php get_template_part( 'template-parts/content/pagination' ); ?>
            </main>

            <aside class="col-md-3">
                <?php dynamic_sidebar( 'sidebar-search' ) ?>
            </aside>

        </div><!-- /.row -->
    </div><!-- /.container -->
</div><!-- /.index-wrapper -->

<?php get_footer();
