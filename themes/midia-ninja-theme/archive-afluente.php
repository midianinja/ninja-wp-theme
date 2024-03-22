<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */
get_header();
/* if (isset($attributes) && is_array($attributes)) {
    $coluna_direita = Ninja\latest_vertical_posts_callback($attributes);
    foreach ($attributes as $coluna) {
        echo $coluna;
    }
} else {
     echo "A variável \$attributes não está definida ou não é um array.";
} */
?>

<div class="container">
    <main class="content col-md-9">
        <div class="search">
            <h2>Buscar por: </h2>
            <?php get_template_part( 'template-parts/search-form' ); ?>
        </div>
        <div class="posts">
            <?php while ( have_posts() ) : the_post(); ?>
                <?php get_template_part( 'template-parts/content/post' ); ?>
            <?php endwhile; ?>
        </div>
        <?php get_template_part( 'template-parts/content/pagination' ); ?>
    </main>
</div>

<?php get_footer(); ?>