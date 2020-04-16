<?php
global $post;
if ($post = jaci\get_sidebar_page()) {
    setup_postdata($post);
    the_content(); 
}
wp_reset_postdata();
