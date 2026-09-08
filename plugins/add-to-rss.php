<?php
/*
Plugin Name: hacklab/ add-to-rss
Description: Inclui o CPT "opiniao" no feed RSS principal do site
Version: 1.0
Author: hacklab/
Author URI: https://hacklab.com.br/
Text Domain: add-to-rss
*/

add_action('pre_get_posts', function ($query) {
    if ($query->is_main_query() && $query->is_feed() && !isset($query->query_vars['post_type'])) {
        $query->set('post_type', ['post', 'opiniao']);
    }
});
