<?php
/**
 * The template for displaying the Afluentes archive
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

get_header();

global $wp_query;

$afluentes_total = (int) $wp_query->found_posts;

?>

<div class="container">
    <?php echo get_layout_header('afluentes'); ?>

    <main class="content col-md-12 archive-afluente">

        <?php get_template_part( 'template-parts/search-afluente', null, [ 'total' => $afluentes_total ] ); ?>

        <?php if ( have_posts() ) : ?>

            <div class="afluentes-grid">
                <?php while ( have_posts() ) : the_post(); ?>
                    <?php get_template_part( 'template-parts/content/card-afluente' ); ?>
                <?php endwhile; ?>
            </div>

        <?php else : ?>

            <p class="afluentes-empty"><?php esc_html_e( 'Nenhum afluente encontrado.', 'ninja' ); ?></p>

        <?php endif; ?>

    </main>

    <?php echo get_layout_footer('afluentes'); ?>
</div>

<?php get_footer();
