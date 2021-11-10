<?php

use guaraci\authors;
use guaraci\images;

$show_image = isset($show_image) ? $show_image : true;
$show_excerpt = isset($show_excerpt) ? $show_excerpt : true;
$show_category = isset($show_category) ? $show_category : true;
$show_author = isset($show_author) ? $show_author : true;
$show_date = isset($show_date) ? $show_date : true;

$horizontal = isset($horizontal) ? $horizontal : false;
$author_taxonomy = isset($author_taxonomy) ? $author_taxonomy : 'autor';

$authors = authors::get($author_taxonomy, false);
$category_str = get_the_category_list(', ');

$image_tag = images::tag('card-large', 'card--image');

$has_image = $show_image && $image_tag;
$uses_excerpt = post_type_supports(get_post_type(), 'excerpt');

?>
<div class="card <?= $horizontal ? 'horizontal' : '' ?>">
    <?php if( $has_image ): ?>
    <a tabindex="-1" href="<?= get_the_permalink() ?>" class="card--image-wrapper">
        <?= $image_tag ?>
    </a>    
    <?php endif ?>
    
    <div class="card--info-wrapper">
        <div class="categories">
            <span class="card--category-title"><?php the_category(', ') ?></span>
        </div>
        <?php if ($show_author && $authors) : ?>
            <span class="authors">
                <?php _e('Por:', 'base-textdomain') ?>
                <strong><?php authors::display($author_taxonomy) ?></strong>
            </span>
        <?php endif; ?>
        <?php if ($show_date) : ?>
            <span class="date">
                <?php _e('publicado em', 'base-textdomain') ?>
                <?php echo get_the_date('d/m/Y'); ?>
            </span>
        <?php endif; ?>
        
        <h4 class="card--title">
            <a href="<?= get_the_permalink() ?>"><?php the_title() ?></a>
        </h4>

        <?php if($show_excerpt && has_excerpt()) : ?>
        <div class="card--excerpt">
            <a href="<?= get_the_permalink() ?>"><?php the_excerpt() ?></a>
        </div>
        <?php endif; ?>
    </div>
</div>