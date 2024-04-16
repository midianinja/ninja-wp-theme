<?php
get_header();
?>

<div class="index-wrapper">
    <div class="container">
    <?php echo get_layout_header('blog'); ?>

        <div class="row">
            <?php if ( is_home() ) : ?>

                <?php get_template_part( 'template-parts/title/blog' ); ?>

                <div class="infos">
                    <?php get_template_part( 'template-parts/filter', 'posts', ['taxonomy' => 'category'] ); ?>
                </div><!-- .infos -->

                <main class="content col-md-9">
                    <div class="posts">
                        <?php while ( have_posts() ) : the_post(); ?>
                            <?php get_template_part( 'template-parts/content/post' ); ?>
                        <?php endwhile; ?>
                    </div>
                    <?php get_template_part( 'template-parts/content/pagination' ); ?>
                </main>

                <aside class="col-md-3">
                    <?php dynamic_sidebar( 'sidebar-posts' ) ?>
                </aside>

            <?php else : ?>
                <div class="col-md-12">
                    <?php the_content() ?>
                </div>
            <?php endif; ?>
        </div><!-- /.row -->
    </div><!-- /.container -->
</div><!-- /.index-wrapper -->

<?php get_footer();
