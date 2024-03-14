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
        <div class="header-faq col-md-12" >
            <div class="aspect-ratio">
                <figure class="post-thumbnail">
                    <?php if ( has_post_thumbnail() ) : ?>
                        <?php the_post_thumbnail( 'medium_large' ); ?>
                    <?php endif; ?>
                </figure>
                <div class="entry-wrapper">
                    <?php if ($titulo_tag) : ?>
                        <span class="titulo-tag">
                            <?php echo apply_filters('the_content', $titulo_tag); ?>
                        </span>
                    <?php endif; ?>
                    <h2 class="entry-title">
                        <?php wp_title(); ?>
                    </h2>
                    <?php if ($subtitle) : ?>
                        <span class="meta-subtitle">
                            <?php echo apply_filters('the_content', $subtitle); ?>
                        </span>
                    <?php endif; ?>
                </div>     
            </div><!-- /.aspect-ratio -->
        </div>
        <div class="row">
            <div class="col-md-3 sidebar-page">
                <p class="anchor-title"><?= __('What is Mídia Ninja', 'ninja') ?></p>
                <ul id="anchors"></ul>
            </div>
            <div class="col-md-9 content">
                <?php the_content() ?>
            </div>
        </div>
        <div class="col-md-12 content-bottom">
            <?php the_content() ?>
        </div>
    </div>
</div>

<?php get_footer();
