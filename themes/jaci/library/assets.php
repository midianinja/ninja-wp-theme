<?php

namespace jaci;

function enqueue_assets()
{
    wp_enqueue_style('foundation', get_template_directory_uri() . '/dist/foundation.min.css');
    wp_enqueue_style('app', get_template_directory_uri() . '/dist/app.css', [], filemtime(THEME_DIR . '/dist/app.css'));

    wp_enqueue_script('main-app', get_template_directory_uri() . '/dist/app.js', ['jquery'], filemtime(THEME_DIR . '/dist/app.js'), true);
    wp_enqueue_script('cookie', get_template_directory_uri() . '/assets/javascript/js.cookie.js', ['jquery'], false, true);
    wp_enqueue_script('acessibilidade', get_template_directory_uri() . '/assets/javascript/acessibilidade.js', ['jquery', 'cookie'], false, true);
    wp_enqueue_script('youtube-plataform', 'https://apis.google.com/js/platform.js');
}

add_action('wp_enqueue_scripts', 'jaci\\enqueue_assets');
