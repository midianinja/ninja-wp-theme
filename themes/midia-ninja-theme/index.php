<?php
get_header();
$categories = get_the_terms( $post->ID, 'category' );
$main_category = get_primary_term( $post->ID, 'category' );
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
						<?php if ( $main_category ): ?>
							<span class="category-<?= $main_category->slug ?>">
								<a href="<?= get_category_link( $main_category->term_id ) ?>"><?= $main_category->name ?></a>
							</span>
						<?php endif; ?>
						<?php foreach ( $categories as $category ): ?>
							<?php if ( $category->term_id !== $main_category->term_id ): ?>
								<span class="category-<?= $category->slug ?>">
									<a href="<?= get_category_link( $category->term_id ) ?>"><?= $category->name ?></a>
								</span>
							<?php endif; ?>
						<?php endforeach; ?>
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
