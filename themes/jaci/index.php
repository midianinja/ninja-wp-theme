<?php
get_header();
$title = '';
?>
<div class="row mt-20 pt-60">
    <div class="column large-12 small-12">
        <?php guaraci\template_part('search-form') ?>
    </div>
    <?php if(is_author()): $title = sprintf(__('Conteúdo de %s', 'jaci'), $curauth->display_name) ?>
        <div class="column large-12 small-12 text-center author--info">
            <?= get_avatar($curauth->ID) ?>

            <div>
                <h2 class="author--info-name fz-30 ls-4"><strong><?= $curauth->display_name ?></strong> </h2>
                <div class="author--info-biography"><?= nl2br(get_the_author_meta('description')) ?></div>
            </div>
        </div>
    <?php elseif(is_tag() || is_category() || is_tax() || is_archive() ): ?>
        <div class="column large-12 small-12 mb-60">
            <?php guaraci\template_part('archive-title', ['title' => jaci\get_archive_title()]) ?>
        </div>
    <?php endif; ?>
    
    <div class="column medium-8 small-12">
        <?php guaraci\template_part('posts-list'); ?>
    </div>

    <div class="column medium-4 small-12 mt-20 mb-20 archive-sidebar">
        <?php guaraci\template_part('sidebar-widgets'); ?>
    </div>
    
</div>

<?php get_footer();
