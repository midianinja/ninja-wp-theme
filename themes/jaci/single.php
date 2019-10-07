<?php 
get_header(); 
the_post();

$authors_names = get_post_meta(get_the_ID(), 'author_names', true);
 ?>

<div class="post-content" id="postContent">
    <div class="row">
        <div id="single-the-title" class="column large-12 small-12 text-center mt-30">
            <div class="categories">
                <span class="card--category-title"><?php the_category(', ') ?></span>
            </div>
            <h1><?php the_title() ?></h1>
        </div>
    </div>
    <div class="row row-small">
        <?php if(has_excerpt()): ?>
        <div id="single-the-excerpt" class="column large-12 small-12 text-center mb-30 ">
            <div class="post-excerpt"><?php the_excerpt() ?></div>
        </div>

        <?php endif ?>
        <div class="column large-12 small-12">
            <?php if(has_post_thumbnail()): ?>
                <?= images\tag('full', 'post--image') ?>
            <?php endif; ?>
            <div class="post-info">
                <?php if(!empty($authors_names)):?>
                    <div class="author">por <?= $authors_names ?></div>
                <?php endif ?>
                <p class="date">
                    <?php _e('Publicado', 'jaci') ?> <?php the_date("d/m/Y") ?>
                    <?php if(get_the_date() != get_the_modified_date() || get_the_time() != get_the_modified_time()): ?>
                    - <?php _e('Atualizado', 'jaci') ?> <?php the_modified_date("d/m/Y") ?> 
                    <?php endif ?>
                </p>
            </div>

        </div>
        
        <div id="single-the-content" class="column large-12 small-12">
            <?php the_content(); ?>
        </div>

        <?php if(has_tag()): ?>
        <div class="column large-12 small-12">
            <div class="post-content--tags">
                <span class="post-content--section-title fz-14 mr-15">Tags:</span>
                <?php the_tags('') ?>
            </div>
        </div>
        <?php endif; ?>

        <div class="column large-12 small-12">
            <div class="post-content--subshare">
                <span>Compartilhar: </span>
                <a href="https://www.facebook.com/sharer/sharer.php?u=<?= get_the_permalink() ?>" target="_blank"><i class="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com/intent/tweet?text=<?= urlencode(get_the_title()) ?>&url=<?= get_the_permalink() ?>" target="_blank"><i class="fab fa-twitter"></i></a>
                <a href="whatsapp://send?text=<?= (get_the_title().' - '.get_the_permalink()) ?>" target="_blank" class="hide-for-large"><i class="fab fa-whatsapp"></i></a>
                <a href="https://api.whatsapp.com/send?text=<?= (get_the_title().' - '.get_the_permalink()) ?>" class="show-for-large" target="_blank"><i class="fab fa-whatsapp"></i></a>
                <a href="https://telegram.me/share/url?url=<?= get_the_title().' - '.get_the_permalink() ?>" target="_blank"><i class="fab fa-telegram"></i></a>
            </div>

            <div class="post-content--author">
                <?php if(!empty($authors_names)):?>
                    <div class="post-content--author-biography"><strong>por </strong><?= $authors_names ?></div>
                <?php endif ?>
                <a href="<?= get_the_meta_author('permalink') ?>">
                    <h4 class="post-content--author-name"> <?= get_the_meta_author('title') ?></h4>
                </a>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="column large-12 small-12">
            <?php if(get_option( 'related_posts__use' )): ?>
                <div class="post-content--related-posts">
                    <?php
                    $related_posts_query = jaci\get_related_posts(get_the_ID(), 3);
                    $related_posts = [];
                    
                    if ( $related_posts_query->have_posts() ) {
                        while( $related_posts_query->have_posts() ) {
                            $related_posts_query->the_post();
                            jaci\template_part('card');
                        } 
                    }
                    ?>
                    <?php wp_reset_postdata(); ?>
                </div>
            <?php endif; ?>

            <div class="post-content--comments">
                <?php comments_template() ?>
            </div>
        </div>
    </div>

</div>

<?php get_footer();