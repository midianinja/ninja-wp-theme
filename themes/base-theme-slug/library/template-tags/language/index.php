<?php 

function wpml_language_menu() {
    if( !class_exists( 'SitePress' ) ) {
        echo __("Please activate WPML to enable the language menu");
        return;
    }

    $languages = icl_get_languages('skip_missing=0&orderby=code');
    if(!empty($languages)){
        echo '<div class="wpml-language-menu-list"><ul>';
        foreach($languages as $l){
            $cclass = $l['active']? "active" : "";
            echo '<li class=' . '"' . $cclass . '">';
            echo '<a href="'.$l['url'].'">';
            if(strlen($l['code']) > 2) {
                echo substr($l['code'], 0, 2);
            } else {
                echo $l['code'];
            }
            echo '</a>';
            echo '</li>';
        }
        echo '</ul></div>';
    }

}