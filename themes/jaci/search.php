<?php
get_header();
?>

<div class="row mt-20 pt-60">
    <div class="column large-12 small-12">
        <?php guaraci\template_part('search-form') ?>
    </div>

    <div class="column large-12 small-12 mb-60">
        <?php guaraci\template_part('archive-title', ['title' => jaci\get_archive_title()]) ?>
    </div>
    
    <div class="column medium-8 small-12">
        <?php guaraci\template_part('posts-list'); ?>
    </div>

    <div class="column medium-4 small-12 mt-20 mb-20 archive-sidebar">
        <?php guaraci\template_part('sidebar-widgets'); ?>
    </div>
</div>

<?php get_footer();
