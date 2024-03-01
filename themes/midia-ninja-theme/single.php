<?php
/**
 * The template for displaying all single posts
 * 
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

gt_set_post_view();
get_header(); 
?>

<div class="container">
    <main class="content">
        <?php while ( have_posts() ) : the_post(); ?>
            <article class="post">
                <header class="post-header">
                    <div class="info">
                        <span class="category"><?php the_category( ', ' ); ?></span>
                    </div>

                    <?php the_post_thumbnail();?>
                    
                    <h1 class="title"><?php the_title(); ?></h1>

                    <h5 class="excerpt"><?php the_excerpt(); ?></h5>
                    
                </header>

                <section class="post-content">
                    <div class="content-author">
                        
                        <?php echo get_avatar( get_the_author_meta( 'ID' ), 70 );?>

                        <div class="">
                            <?php the_author(); ?>
                            <time class="date" datetime="<?php echo get_the_date( 'c' ); ?>"><?php the_date(); ?></time>
                        </div>
                        
                        <div class="page--share">
                            <?php get_template_part('template-parts/share-links'); ?>
                        </div>
                    </div>

                    <?php the_content(); ?>
                </section>

                <footer class="post-footer">
                </footer>
            </article>
        <?php endwhile; ?>
    </main>
</div>

<?php get_footer(); ?>