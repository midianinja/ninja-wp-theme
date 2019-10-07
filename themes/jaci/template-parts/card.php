<?php
$show_image = isset($show_image) && $show_image;
$show_excerpt = isset($show_excerpt) && $show_excerpt;
$horizontal = isset($horizontal) && $horizontal;

?>
    <div class="card <?= $horizontal ? 'horizontal' : '' ?>">
        <?php if( $show_image && images\tag('card-large', 'card--image') != ''): ?>
        <a tabindex="-1" href="<?= get_the_permalink() ?>" class="card--image-wrapper">
            <?php echo images\tag('card-large', 'card--image') ?>
        </a>    
        <?php endif ?>
        
        <div class="card--info-wrapper">
            <div class="categories">
                <span class="card--category-title"><?php the_category(', ') ?></span>
            </div>
            
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
