<?php
get_header(); 
the_post();

$post_type = get_post_type();

$author_type = 'autor';

// se por ventura um post type tiver uma taxonomia diferente de autor para representar o autor
// if ($post_type == 'coluna') {
//     $author_type = 'colunista';
// }

$authors = guaraci\authors::get($author_type);

$uses_excerpt = post_type_supports(get_post_type(), 'excerpt');

// o "&& has_excerpt()" faz com que o resumo só seja exibido
// quando o campo do excerpt estiver preenchido, se não o
// resumo automático será utilizado.
$show_excerpt = $uses_excerpt /* && has_excerpt() */;

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
        <?php if($show_excerpt): ?>
        <div id="single-the-excerpt" class="column large-12 small-12 text-center mb-30 ">
            <div class="post-excerpt"><?php the_excerpt() ?></div>
        </div>
        <?php endif ?>
        
        <div class="column large-12 small-12">
            <?php if(has_post_thumbnail()): ?>
                <?= guaraci\images::tag('full', 'post--image') ?>
            <?php endif; ?>
            <div class="post-info">
                <?php if(!empty($authors)):?>
                    <div class="author">por <?php guaraci\authors::display($author_type) ?></div>
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
            <?php guaraci\template_part('share-links') ?>
        </div>
    </div>

    <div class="row row-small">
        <div class="column large-12 small-12">
            <?php guaraci\template_part('authors-list', ['authors' => $authors]) ?>
        </div>
    </div>

    <div class="row row-small mt-40">
        <div class="column large-12 small-12">
            <?php guaraci\template_part('related-posts') ?>
        </div>
    </div>

    <div class="row row-small mt-40">
        <div class="column large-12 small-12">
            <div class="post-content--comments">
                <?php comments_template() ?>
            </div>
        </div>
    </div>
</div>

<?php get_footer();