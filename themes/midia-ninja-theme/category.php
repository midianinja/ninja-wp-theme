<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

get_header();

?>

<div class="container">
    
    <?php
        if( is_category() ){
            $category_slug = get_queried_object();
            $category = $category_slug->slug;

            if ( $category === 'cultura' ){
                echo get_layout_header( 'cultura' );
            } elseif ( $category === 'alimentacao' ){
                echo get_layout_header( 'alimentacao' );
            } elseif ( $category === 'educacao' ){
                echo get_layout_header( 'educacao' );
            } elseif ( $category === 'esportes' ){
                echo get_layout_header( 'esportes' );
            } elseif ( $category === 'direitos-humanos' ){
                echo get_layout_header( 'direitos_humanos' );
            } elseif ( $category === 'internacional' ){
                echo get_layout_header( 'internacional' );
            } elseif ( $category === 'meio-ambiente' ){
                echo get_layout_header( 'meio_ambiente' );
            } elseif ( $category === 'politica' ){
                echo get_layout_header( 'politica' );
            } elseif ( $category === 'tecnologia' ){
                echo get_layout_header( 'tecnologia' );
            } elseif ( $category === 'economia' ){
                echo get_layout_header( 'economia' );
            } elseif ( $category == 'saude'){
                echo get_layout_header( 'saude' );
            }
        }
    ?>

    <main class="content col-md-9">
        <div class="posts">
            <?php while ( have_posts() ) : the_post(); ?>
                <?php get_template_part( 'template-parts/content/post' ); ?>
            <?php endwhile; ?>
        </div>

        <?php get_template_part( 'template-parts/content/pagination' ); ?>
    </main>

    <aside class="col-md-3">
        <?php dynamic_sidebar( 'sidebar-default' ) ?>
    </aside>
</div>

<?php get_footer(); ?>
