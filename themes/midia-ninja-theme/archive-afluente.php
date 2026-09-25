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

        <section class="afluentes-hero">
            <img
                class="afluentes-hero__image"
                src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/afluentes-hero.png' ); ?>"
                alt="<?php esc_attr_e( 'Ilustração da frente de rios voadores da Mídia NINJA', 'ninja' ); ?>"
                loading="eager"
            >
            <span class="afluentes-hero__overlay" aria-hidden="true"></span>
            <div class="afluentes-hero__content">
                <span class="afluentes-hero__eyebrow"><?php esc_html_e( 'Afluentes', 'ninja' ); ?></span>
                <h2 class="afluentes-hero__title"><?php esc_html_e( 'Nossos rios voadores', 'ninja' ); ?></h2>
                <p class="afluentes-hero__description"><?php esc_html_e( 'As frentes temáticas da Mídia NINJA. Cada afluente é uma rede que produz cobertura própria sobre clima, cultura, esporte, feminismos, negritudes, educação, alimentação e tecnologia. Escolha um e navegue por tudo que ele já publicou.', 'ninja' ); ?></p>
            </div>
        </section>

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
