<?php
if(!get_option('related_posts__use')) {
    return;
}
if(empty($post_id)) {
    $post_id = get_the_ID();
}
?>
<div class="post-content--section-title">
    <?php _e('Leia Também', 'ninja'); ?>
</div>
<div class="post-content--related-posts">
    <?php
    $related_posts_query = guaraci\related_posts::get_posts($post_id, 3);
$related_posts = [];

if ($related_posts_query->have_posts()) {
    while($related_posts_query->have_posts()) {
        $related_posts_query->the_post();
        guaraci\template_part('card', ['show_category' => true, 'show_image' => true]);
    }
}
?>
    <?php wp_reset_postdata(); ?>
</div>

