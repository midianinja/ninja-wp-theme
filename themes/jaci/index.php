<?php
get_header();

if(is_author()){
    $curauth = $wp_query->get_queried_object();
    $sidebar_slug = 'autor'; 
} else if(is_tag() || is_category() || is_tax()) {
    $sidebar_slug = 'categoria'; 
} else {
    $sidebar_slug = 'busca'; 
}

$card = is_archive() && post_type_archive_title( '', false ) == 'Vídeos' ? 'video-card' : 'card';

$archive = $wp_query->get('archive');
$title = '';
?>
<div class="row mt-20 pt-60">
    <?php if(is_author()): $title = 'Conteúdo de '.$curauth->display_name ?>
        <div class="column large-12 small-12 text-center author--info">
            <?= get_avatar($curauth->ID) ?>

            <div>
                <h2 class="author--info-name fz-30 ls-4"><strong><?= $curauth->display_name ?></strong> </h2>
                <div class="author--info-biography"><?= nl2br(get_the_author_meta('description')) ?></div>
            </div>
        </div>
    <?php elseif(is_tag() || is_category() || is_tax() || is_archive() ): ?>
        <div class="column large-12 small-12 text-center">
            <div class="title-button text-left mb-20">
                <h3> <?php echo is_tag() ? "Tag:" : (is_category() || is_tax() ? "Categoria:" : post_type_archive_title( '', false ) ) ?> <strong><?= single_cat_title( '', false ) ?></strong>  </h3>
            </div>
        </div>
    <?php elseif(is_search()): $title = 'Resultados da Busca' ?>
        <div class="column large-12 small-12 mb-60 mt-60">
            <form action="" class="advanced-search">
                <div class="title-button text-left mb-20">
                    <h3> Busca Avançada </h3>
                </div>
                <div class="input-search">
                    <input type="text" name="s" value="<?= $_GET['s'] ?>">
                    <i class="fas fa-search"></i>
                </div>
            </form>


            <div class="title-button text-left">
                <h3 class="mt-20 mb-20 "> <?php _e('Resultado da Busca', 'jaci') ?> </h3>
                <small class="mt-20"><?php global $wp_query; echo $wp_query->post_count ?> <?php _e('resultados encontrados', 'jaci') ?></small>
            </div>
        </div>
    <?php endif; ?>

    <?php jaci\template_part('posts-list-with-sidebar', [  'title' => $title, 'slug' => $sidebar_slug, 'card' => $card ]); ?>
    
</div>

<?php get_footer();
