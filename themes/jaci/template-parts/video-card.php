<?php
$show_category = isset($show_category) && $show_category;
$show_author = isset($show_author) && $show_author;
?>
    <div class="card video">
        <?php if(guaraci\images::tag('card-small', 'card--image') != ''): ?>
        <a tabindex="-1" href="<?= get_the_permalink() ?>">
            <div class="card--image" style="background-image: url('<?= guaraci\images::url('card-small') ?>')">
                <div class="card--excerpt">
                    <?php the_excerpt() ?>
                </div>
            </div>
        </a>    
        <?php endif ?>
        
        <h4 class="card--title">
            <a href="<?= get_the_permalink() ?>"><?php the_title() ?></a>
        </h4>
        

        <?php if($show_category): ?>
        <div class="card--category">
            <?php if($show_category): ?><span class="card--category-title"><?php the_category(', ') ?></span><?php endif ?>
            <?php if($show_author && $show_category): ?> | <?php endif ?>
            <?php if($show_author): ?> <?php _e('por', 'jaci') ?> <?php the_author_posts_link(); ?><?php endif ?>
        </div>
        <?php endif; ?>

        <?php if(!$show_category && $show_author): ?>
            <div class="card--author"><?php _e('por', 'jaci') ?> <?php the_author_posts_link(); ?></div>
        <?php endif; ?>
    </div>
