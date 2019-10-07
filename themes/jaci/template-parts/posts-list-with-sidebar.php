<?php
$widget_id = rand(0, 10000);
?>

<div class="column large-8 small-12">
    <div class="search-content">
        <?php 
        while(have_posts()): the_post();
            global $post;
            jaci\template_part($card, [ $post, 'show_image' => true, 'horizontal' => true ]);
        endwhile ?>
    </div>

    <div class="pagination-numbers">
        <?php pagination(); ?>
    </div>
</div>

<?php
global $post;
$post = get_page_by_path($slug.'-sidebar', OBJECT, 'layout_parts');

if($post){
    setup_postdata($post);
    ?>
    <div class="column large-4 small-12">
        <?php the_content();?>
    </div>
<?php 
}
wp_reset_postdata();
?>

<div class="column large-12 small-12 mt-60">
<?php
    global $post;
    $post = get_page_by_path($slug.'-footer', OBJECT, 'layout_parts');
    
    if($post){
        setup_postdata($post);
        the_content();
    }

    wp_reset_postdata();
?>
</div>