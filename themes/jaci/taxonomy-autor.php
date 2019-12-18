<?php

use guaraci\authors;

get_header();

$term = $wp_query->get_queried_object();
?>
<div class="row mt-20 pt-60">
    <div class="column large-8 small-12 ">
        <div class="title-button text-center mb-20 column large-12">
            <?php $avatar = authors::get_avatar($term);
            if (!empty($avatar)) : ?>
                <div class="author-avatar column large-4" role="img" style="background-image: url(<?= $avatar ?>)"></div>
            <?php endif; ?>
            <div class="colunista-info column large-8">
                <h3><strong><?= $term->name ?></strong></h3>

                <?php if (!empty($term->description)) : ?>
                    <div class="text-left"><?= $term->description ?></div>
                <?php endif; ?>
            </div>
        </div>
        <div class="column medium-12 small-12">
            <?php guaraci\template_part('posts-list', ['title' => $title, 'hide_author' => true]); ?>
        </div>
    </div>

    <div class="column medium-4 small-12 mt-20 mb-20 archive-sidebar">
        <?php guaraci\template_part('sidebar-widgets', ['sidebar_slug' => 'autor']); ?>
    </div>
</div>

<?php get_footer();
