<?php
/**
 * Template Name: Página com âncoras
 */
get_header(); ?>

<div class="index-wrapper page-with-title">
    <div class="container">
        <?php get_template_part('template-parts/title/default'); ?>
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
