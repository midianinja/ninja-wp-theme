<?php
get_header();
$category = get_the_terms($post->ID, 'category');

$cat_id = $category[0]->term_id;
$cor_font = get_term_meta ( $cat_id, 'ninja_font_term_color', true ) ?: '#FFFFFF';
$cor_fundo = get_term_meta ( $cat_id, 'ninja_background_term_color', true ) ?: '#333333';
?>

<div class="index-wrapper">
    <div class="container">
    <?php echo get_layout_header('blog'); ?>

        <div class="row">
            <?php if ( is_home() ) : ?>

                <?php get_template_part( 'template-parts/title/blog' ); ?>

                <div class="infos">
                    <?php get_template_part( 'template-parts/filter', 'posts', ['taxonomy' => 'category'] ); ?>
                    <div class="info">
                                <span class="term-<?= $category[0]->slug; ?>">
                                    <?php
                                    $categories = get_the_category();

                                    foreach ($categories as $category){
                                    echo '<a style="color:' .  $cor_font . '; background-color:' .  $cor_fundo . ';" href="' . get_category_link($category->term_id) . '">' . $category->cat_name . '</a>';

                                    }; ?>
                                </span>
                            </div>
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
