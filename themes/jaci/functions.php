<?php
namespace jaci;

require __DIR__ . '/library/settings.php';
require __DIR__ . '/library/images.php';
require __DIR__ . '/library/menus.php';
require __DIR__ . '/library/assets.php';
require __DIR__ . '/library/pagebuilder/index.php';
// descomentar se for um multisite e for utilizar o plugin de sincronização de posts
// require __DIR__ . '/library/mssync.php';

add_theme_support( 'align-wide' );
add_theme_support( 'custom-logo' );
add_theme_support( 'post-thumbnails' );

// descomentar para importar conteúdo
// add_filter( 'force_filtered_html_on_import' , '__return_false' );

// removemos a barra de admin para não cachear no cache de borda 
add_filter( 'show_admin_bar', '__return_false' );

// usamos uma taxonomia autor criada com o plugin Pods
add_action( 'init',  function () {
	remove_post_type_support( 'post', 'author' );
});

// filtro para adicionar mais classes de título
add_filter('widgets\\SectionTitle:css_classes', function($css_classes){
	$css_classes['title-jaci'] = __('Título Jaci', 'jaci');
	return $css_classes;
});

function get_archive_title () {
	$s = isset($_GET['s']) ? trim($_GET['s']) : '';

	if($s){
		if (is_tag()) {
			$title = sprintf(__('Busca por "%s" na tag "%s"', 'jaci'), $s, single_tag_title('',false));
		} elseif (is_category()) {
			$title = sprintf(__('Busca por "%s" na categoria "%s"', 'jaci'), $s, single_cat_title('',false));
		} elseif (is_tax()) {
			$title = sprintf(__('Busca por "%s" em "%s"', 'jaci'), $s, single_term_title('',false));
		} else {
			if(is_archive()){
				$title = sprintf(__('Busca por "%s" em "%s"', 'jaci'), $s, post_type_archive_title());
			} else {
				$title = sprintf(__('Resultado da busca por "%s"', 'jaci'), $s);
			}
		}
	} else {
		if (is_tag()) {
			$title = single_tag_title('Tag: ',false);
		} elseif (is_category()) {
			$title = single_cat_title('Categoria: ',false);
		} elseif (is_tax()) {
			$title = single_term_title('',false);
		} else {
			$title = post_type_archive_title();
		}
	}

	return $title;
}

function get_sidebar_page () {
    $page = null;
	if (is_archive()) {
        $object = get_queried_object();
        if ($object instanceof \WP_Term) {
            if ($object->taxonomy == 'post_tag') {
                $object->taxonomy = 'tag';
            }
            if (!($page = get_page_by_path("sidebar-{$object->taxonomy}-{$object->slug}", OBJECT))) {
                $page = get_page_by_path("sidebar-{$object->taxonomy}", OBJECT);
            }

        }
    } else if (is_search()) {
        $page = get_page_by_path("sidebar-search", OBJECT);

    } else if (is_singular()) {
        $object = get_queried_object();
        
        if (!($page = get_page_by_path("sidebar-{$object->post_type}-{$object->post_name}", OBJECT))) {
            $page = get_page_by_path("sidebar-{$object->post_type}", OBJECT);
        }
    }
   
    if (!$page) {
        $page = get_page_by_path("sidebar", OBJECT);
    }

	return $page;
}