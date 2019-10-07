<?php

namespace images;

add_theme_support( 'post-thumbnails' );

// Add additional image sizes
add_image_size('card-large', 700, 387, true);
add_image_size('card-medium', 300, 166, true);
add_image_size('card-small', 219, 121, true);


function url($size, $class = '', $image_id = null) {
    if (is_null($image_id)) {
        $image_id = \get_post_thumbnail_id();
    }

    $url =  get_stylesheet_directory_uri() . '/assets/images/img_default.png';
    $thumb = \wp_get_attachment_image_src($image_id, $size, false);
    if ($thumb) {
        $url = $thumb[0];
    }
    return $url;
}
function size($url = null){
    
    $attachment_url = get_attached_file(attachment_url_to_postid($url));
    
    $bytes = filesize($attachment_url);
    $s = array('b', 'Kb', 'Mb', 'Gb');
    $e = floor(log($bytes)/log(1024));
    return sprintf('%.2f '.$s[$e], ($bytes/pow(1024, floor($e))));
}

function tag($size, $class = '', $image_id = null, $img_props = []) {
    // @TODO: gerar tag alt
    $output = '';
    if ($url = url($size, $class, $image_id)) {
        $props = "";
        foreach ($img_props as $key => $val) {
            $val = htmlentities($val);
            $props .= " {$key}=\"{$val}\"";
        }
        $output = "<img src='{$url}' class='{$class}' {$props}/>";
    }
    return $output;
}
