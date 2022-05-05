<?php
get_header();
?>

<div class="index-wrapper">
    <div class="container">
        <div class="row">
            <?php get_template_part( 'template-parts/title/default' ); ?>

            <main class="col-md-9">
                <div class="blog-description">
                    <h1 class="author-name">
                       <?php printf( __('Author: %s', 'base-textdomain'), get_the_author_meta('display_name', get_queried_object_id() ) );?>
                    </h1>
                    <p><?php the_author_meta( 'description', get_queried_object_id() );?></p>
                </div>
                <?php while ( have_posts() ) : the_post(); ?>
                    <?php get_template_part( 'template-parts/content/post' ); ?>
                <?php endwhile; ?>

                <?php get_template_part( 'template-parts/content/pagination' ); ?>
            </main>

            <aside class="col-md-3">
                <?php dynamic_sidebar( 'sidebar-default' ) ?>
            </aside>
        </div><!-- /.row -->
    </div><!-- /.container -->
</div><!-- /.index-wrapper -->

<?php get_footer();
