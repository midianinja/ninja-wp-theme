<?php
/**
 * Template Name: Página com âncoras
 */
get_header(); ?>

<div class="index-wrapper page-with-title">
    <div class="container">
        <?php get_template_part( 'template-parts/title/default' ); ?>
        <div class="row">
            <div class="col-md-3 sidebar-page">
                <p class="anchor-title"><?= __( 'Sections', 'base-textdomain' ) ?></p>
                <ul id="anchors"></ul>
            </div>
            <div class="col-md-9 content">
                <?php the_content() ?>
            </div>
        </div>
    </div>
</div>

<?php get_footer();