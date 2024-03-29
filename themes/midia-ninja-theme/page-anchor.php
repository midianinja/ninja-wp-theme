<?php
/**
 * Template Name: Página com âncoras
 */
get_header(); 

$post_id  = get_the_ID();
$subtitle = get_post_meta($post_id, 'subtitulo', true);
$titulo_tag = get_post_meta($post_id, 'titulo_tag', true);

?>

<div class="index-wrapper page-with-title">
    <div class="container">
    <?php echo get_layout_header( 'perguntas-frequentes' ); ?>
        <div class="row">
            <div class="col-md-3 sidebar-page">
                <p class="anchor-title"><?= __('What is Mídia Ninja', 'ninja') ?></p>
                <ul id="anchors"></ul>
            </div>
            <div class="col-md-9 content">
                <?php the_content() ?>
            </div>
        </div>
        <?php echo get_layout_footer( 'perguntas-frequentes' ); ?>
    </div>
</div>

<?php get_footer();
