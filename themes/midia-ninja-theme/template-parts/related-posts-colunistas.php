<?php
$args = array(
    'post_type' => 'colunistas', // Substitua 'colunistas' pelo slug do seu CPT
    'posts_per_page' => 3, // Número de posts para exibir
    'post_status' => 'publish', // Apenas posts publicados
    'post__not_in' => array($post_id), // Excluir o post atual
);

$related_posts_query = new WP_Query($args);

if ($related_posts_query->have_posts()) {
    while ($related_posts_query->have_posts()) {
        $related_posts_query->the_post();
        the_title();
        the_content();
    }
    wp_reset_postdata();
}
?>