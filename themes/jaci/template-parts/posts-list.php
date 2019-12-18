<?php
$show_category = isset($show_category) ? $show_category : true;
$show_image = isset($show_image) ? $show_image : true;
$show_excerpt = isset($show_excerpt) ? $show_excerpt : true;

$show_author = isset($show_author) ? $show_author : true;
$show_date = isset($show_date) ? $show_date : true;

$horizontal = isset($horizontal) ? $horizontal : true;

$card = isset($card) ? $card : 'card';

?>
<div class="search-content">
    <?php
    while (have_posts()) : the_post();
        global $post;
        guaraci\template_part($card, [
            'post' => $post,
            'horizontal' => $horizontal,
            'show_category' => $show_category,
            'show_image' => $show_image,
            'show_excerpt' => $show_excerpt,
            'show_author' => $show_author,
            'show_date' => $show_date
        ]);
    endwhile ?>
</div>
<div class="pagination-numbers">
    <?php guaraci\pagination_links(); ?>
</div>