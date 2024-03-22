<?php
/**
 * Template Name: Página de Vídeos
 */
get_header(); 

?>

<div class="index-wrapper page-with-title">
    <div class="container">
    <?php echo get_layout_header( 'videos' ); ?>
        <div class="row">
            <div class="col-md-9 content">
                <?php the_content() ?>
            </div>
            <div class="col-md-3">
                <h3>Anuncio</h3>
            </div>
        </div>
        <?php echo get_layout_footer( 'videos' ); ?>
    </div>
</div>

<?php get_footer();