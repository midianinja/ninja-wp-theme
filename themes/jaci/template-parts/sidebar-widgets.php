<?php
global $post;
if (isset($sidebar_slug) && ($sidebar = get_page_by_path('sidebar-' . $sidebar_slug, OBJECT))) {
    $post = $sidebar;
} else {
    $post = get_page_by_path('sidebar', OBJECT);
}
if ($post) {
    setup_postdata($post);
    the_content(); 
}
wp_reset_postdata();
