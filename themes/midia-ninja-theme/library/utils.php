<?php
/**
 *
 * Remove recaptcha from tainacan
 *
 */
add_action('init', function () {
    wp_dequeue_script('tainacan-google-recaptcha-script');
}, 150);

/**
 *
 * Create list of the terms by taxonomy
 *
 * @param int $post_id Post ID
 * @param string $tax Slug tax to get terms
 * @param bool $use_link Define if is use link to the terms
 * @param bool $use_primary_term Define if is use primary term
 * @param int $limit_terms Limit of terms to get
 *
 * @link https://developer.wordpress.org/reference/functions/get_the_terms/
 * @link https://developer.wordpress.org/reference/functions/sanitize_title/
 * @link https://developer.wordpress.org/reference/functions/esc_url/
 * @link https://developer.wordpress.org/reference/functions/get_term_link/
 *
 * @return string $html
 *
 */
function get_html_terms(int $post_id, string $tax, bool $use_link = false, bool $use_primary_term = false, int $limit_terms = 0)
{

    $terms = [];

    if ($use_primary_term && is_plugin_active('wordpress-seo/wp-seo.php')) {
        // Get primary term using Yoast SEO plugin
        $primary_term_id = get_post_meta($post_id, '_yoast_wpseo_primary_' . sanitize_title($tax), true);

        if ($primary_term_id) {
            $terms[] = get_term($primary_term_id, sanitize_title($tax));
        } else {
            $terms = get_the_terms($post_id, sanitize_title($tax));
        }
    } else {
        $terms = get_the_terms($post_id, sanitize_title($tax));
    }

    if (! $terms || is_wp_error($terms)) {
        return false;
    }

    $html = '<ul class="list-terms tax-' . sanitize_title($tax) . '">';

    $count = 0;

    foreach ($terms as $term) {

        if ( ! $term || is_wp_error( $term ) ) {
            continue;
        }

        $count++;

        $background_term_color = get_term_meta($term->term_id, 'ninja_background_term_color', true);
        $font_term_color = get_term_meta($term->term_id, 'ninja_font_term_color', true);

        if (! $background_term_color) {
            $background_term_color = '#333333';
        }

        if (! $font_term_color) {
            $font_term_color = '#FFFFFF';
        }

        $html .= '<li class="term-' . sanitize_title($term->slug) . '" style="--background-color:'. $background_term_color. '; --color:'. $font_term_color. '">';

        if ($use_link) {
            $html .= '<a href="' . esc_url(get_term_link($term->term_id, $tax)) . '">';
        }

        $html .= esc_attr($term->name);

        if ($use_link) {
            $html .= '</a>';
        }

        $html .= '</li>';

        if ($limit_terms > 0 && $count >= $limit_terms) {
            break;
        }

    }

    $html .= '</ul>';

    return $html;

}

/**
 * Rename the defaults taxonomies
 */
function rename_taxonomies()
{

    // Tags -> Temas
    $post_tag_args = get_taxonomy('post_tag');

    $post_tag_args->label = 'Temas';
    $post_tag_args->labels->name = 'Temas';
    $post_tag_args->labels->singular_name = 'Tema';
    $post_tag_args->labels->search_items = 'Pesquisar tema';
    $post_tag_args->labels->popular_items = 'Temas populares';
    $post_tag_args->labels->all_items = 'Todos temas';
    $post_tag_args->labels->parent_item = 'Tema superior';
    $post_tag_args->labels->edit_item = 'Editar tema';
    $post_tag_args->labels->view_item = 'Ver tema';
    $post_tag_args->labels->update_item = 'Atualizar tema';
    $post_tag_args->labels->add_new_item = 'Adicionar novo tema';
    $post_tag_args->labels->new_item_name = 'Nome do novo tema';
    $post_tag_args->labels->separate_items_with_commas = 'Separe os temas com vírgulas';
    $post_tag_args->labels->add_or_remove_items = 'Adicionar ou remover temas';
    $post_tag_args->labels->choose_from_most_used = 'Escolha entre os temas mais usados';
    $post_tag_args->labels->not_found = 'Nenhum tema encontrado';
    $post_tag_args->labels->no_terms = 'Nenhum tema';
    $post_tag_args->labels->items_list_navigation = 'Navegação da lista de temas';
    $post_tag_args->labels->items_list = 'Lista de temas';
    $post_tag_args->labels->most_used = 'Temas mais utilizados';
    $post_tag_args->labels->back_to_items = '&larr; Ir para os temas';
    $post_tag_args->labels->item_link = 'Link do tema';
    $post_tag_args->labels->item_link_description = 'Um link para o tema';
    $post_tag_args->labels->menu_name = 'Temas';
    $post_tag_args->hierarchical = true;

    $object_type = array_merge($post_tag_args->object_type, ['page']);
    $object_type = array_unique($object_type);

    register_taxonomy('post_tag', $object_type, (array) $post_tag_args);

    // Category -> Projetos
    $category_args = get_taxonomy('category');

    $category_args->label = 'Projetos';
    $category_args->labels->name = 'Projetos';
    $category_args->labels->singular_name = 'Projeto';
    $category_args->labels->search_items = 'Pesquisar Projeto';
    $category_args->labels->popular_items = 'Projetos populares';
    $category_args->labels->all_items = 'Todos Projetos';
    $category_args->labels->parent_item = 'Projeto superior';
    $category_args->labels->edit_item = 'Editar Projeto';
    $category_args->labels->view_item = 'Ver Projeto';
    $category_args->labels->update_item = 'Atualizar Projeto';
    $category_args->labels->add_new_item = 'Adicionar novo Projeto';
    $category_args->labels->new_item_name = 'Nome do novo Projeto';
    $category_args->labels->separate_items_with_commas = 'Separe os Projetos com vírgulas';
    $category_args->labels->add_or_remove_items = 'Adicionar ou remover Projetos';
    $category_args->labels->choose_from_most_used = 'Escolha entre os Projetos mais usados';
    $category_args->labels->not_found = 'Nenhum Projeto encontrado';
    $category_args->labels->no_terms = 'Nenhum Projeto';
    $category_args->labels->items_list_navigation = 'Navegação da lista de Projetos';
    $category_args->labels->items_list = 'Lista de Projetos';
    $category_args->labels->most_used = 'Projetos mais utilizados';
    $category_args->labels->back_to_items = '&larr; Ir para os Projetos';
    $category_args->labels->item_link = 'Link do Projeto';
    $category_args->labels->item_link_description = 'Um link para o Projeto';
    $category_args->labels->menu_name = 'Projetos';

    $object_type = array_merge($category_args->object_type, ['page', 'perguntas_frequentes']);
    $object_type = array_unique($object_type);

    register_taxonomy('category', $object_type, (array) $category_args);

}
// Descomentar para renomear as taxonomias padrão do WP
// add_action( 'init', 'rename_taxonomies', 11 );

/**
 * Return string of the terms to use on html class
 *
 * @param int $post_id Post ID
 * @param string $tax Slug tax to get terms
 * @param string $prefix Set prefix to each term
 *
 * @link https://developer.wordpress.org/reference/functions/get_the_terms/
 * @link https://developer.wordpress.org/reference/functions/sanitize_title/
 */
function get_terms_like_class(int $post_id, string $tax, string $prefix = '')
{

    $terms = get_the_terms($post_id, sanitize_title($tax));
    $class = '';

    if ($terms && ! is_wp_error($terms)) {
        foreach ($terms as $term) {
            $class .= ($prefix) ? $prefix . $term->slug : $term->slug;
            $class .= ' ';
        }

        return sanitize_title(substr($class, 0, -1));
    }

    return '';

}


/**
 * Get terms by post type
 */
function get_terms_by_post_type($taxonomy, $post_type)
{

    // Get all terms that have posts
    $terms = get_terms([
        'hide_empty' => true,
        'taxonomy'   => $taxonomy
    ]);

    // Remove terms that don't have any posts in the current post type
    $terms = array_filter($terms, function ($term) use ($post_type, $taxonomy) {
        $posts = get_posts([
            'fields'      => 'ids',
            'numberposts' => 1,
            'post_type'   => $post_type,
            'tax_query'   => [
                [
                    'taxonomy' => $taxonomy,
                    'terms'    => $term,
                ]
            ]
        ]);

        return (count($posts) > 0);
    });

    return $terms;

}

/**
 * Returns total post views
 *
 * @link https://developer.wordpress.org/reference/functions/get_post_meta/
 * @link https://developer.wordpress.org/reference/functions/get_the_ID/
 */
function gt_get_post_view()
{
    $count = get_post_meta(get_the_ID(), 'post_views_count', true);
    $count = ($count == 1 ? $count." Visualização" : $count." Visualizações");
    return "$count";
}

/**
 * Defines total post views
 *
 * @link https://developer.wordpress.org/reference/functions/get_post_meta/
 * @link https://developer.wordpress.org/reference/functions/get_the_ID/
 * * @link https://developer.wordpress.org/reference/functions/update_post_meta/
 */
function gt_set_post_view()
{
    $key = 'post_views_count';
    $post_id = get_the_ID();
    $count = (int) get_post_meta($post_id, $key, true);
    $count++;
    update_post_meta($post_id, $key, $count);
}

function gt_posts_column_views($columns)
{
    $columns['post_views'] = 'Views';
    return $columns;
}

function gt_posts_custom_column_views($column)
{
    if ($column === 'post_views') {
        echo gt_get_post_view();
    }
}
add_filter('manage_posts_columns', 'gt_posts_column_views');
add_action('manage_posts_custom_column', 'gt_posts_custom_column_views');

function allow_svg_uploads($file_types){
	$file_types['svg'] = 'image/svg+xml';
	return $file_types;
}
add_filter('upload_mimes', 'allow_svg_uploads');

//Page Slug Body Class
function add_slug_body_class($classes)
{
    global $post;
    if (isset($post)) {
        $classes[] = $post->post_type . '-' . $post->post_name;
    }
    return $classes;
}
add_filter('body_class', 'add_slug_body_class');

/**
 * Return the structure HTML of the posts separetade by month
 *
 * @param array $args use params of the class WP_Query
 * @link https://developer.wordpress.org/reference/classes/wp_query/#parameters
 *
 * @return array months|slider
 */
function get_posts_by_month($args = [])
{

    $args['orderby'] = 'date';

    $items = new WP_Query($args);

    if($items->have_posts()) :

        $month_titles   = [];
        $close_ul       = false;
        $content_slider = '';

        while($items->have_posts()) : $items->the_post();

            $month_full = [
                'Jan' => 'Janeiro',
                'Feb' => 'Fevereiro',
                'Mar' => 'Marco',
                'Apr' => 'Abril',
                'May' => 'Maio',
                'Jun' => 'Junho',
                'Jul' => 'Julho',
                'Aug' => 'Agosto',
                'Nov' => 'Novembro',
                'Sep' => 'Setembro',
                'Oct' => 'Outubro',
                'Dec' => 'Dezembro'
            ];

            $year = date('Y', strtotime(get_the_date('Y-m-d H:i:s')));
            $month = date('M', strtotime(get_the_date('Y-m-d H:i:s')));

            $month_title = $month_full[$month] . ' ' . $year;

            if (! in_array($month_title, $month_titles)) :
                if ($close_ul) {
                    $content_slider .= '</ul>';
                }
                $content_slider .= '<ul id="items-' . sanitize_title($month_title) . '" class="item-slider">';
                $month_titles[] = $month_title;
                $close_ul = true;
            endif;

            $thumbnail = (has_post_thumbnail(get_the_ID())) ? get_the_post_thumbnail(get_the_ID()) : '<img src="' . get_stylesheet_directory_uri() . '/assets/images/default-image.png" alt="" height="600" width="800">';

            $content_slider .= sprintf(
                '<li id="item-%1$s" class="item item-month-%2$s"><a href="%3$s"><div class="thumb">%4$s</div><div class="title"><h3>%5$s</h3></div></a></li>',
                get_the_ID(),
                $month_title,
                get_permalink(get_the_ID()),
                $thumbnail,
                get_the_title(get_the_ID())
            );

        endwhile;

        if ($close_ul) {
            $content_slider .= '</ul>';
        }
    endif;

    return [
        'months' => $month_titles,
        'slider' => $content_slider
    ];

}


function archive_filter_posts($query)
{
    // Apply filter of the archives
    if ($query->is_main_query() && ! is_admin()) {

        $is_blog = false;
        $page_for_posts = get_option('page_for_posts');

        if ($query->is_home() && isset($query->get_queried_object()->ID) && $query->get_queried_object()->ID == $page_for_posts) {
            $is_blog = true;
        }

        if (is_archive() || $is_blog) {
            if (isset($_GET['filter_term']) && 'all' !== $_GET['filter_term']) {
                $term = get_term_by_slug($_GET['filter_term']);

                if ($term && ! is_wp_error($term)) {
                    $tax_query = [
                        [
                            'field'    => 'slug',
                            'taxonomy' => $term->taxonomy,
                            'terms'    => [ $term->slug ]
                        ]
                    ];

                    $query->set('tax_query', $tax_query);
                }
            }
        }
    }
}
add_action('pre_get_posts', 'archive_filter_posts');

/**
 * Get term by slug
 */
function get_term_by_slug($term_slug)
{
    $term_object = "";
    $taxonomies = get_taxonomies();
    foreach ($taxonomies as $tax_type_key => $taxonomy) {
        // If term object is returned, break out of loop. (Returns false if there's no object);
        if ($term_object = get_term_by('slug', $term_slug, $taxonomy)) {
            break;
        } else {
            $term_object = false;
        }
    }

    return $term_object;
}

/**
 * Retorna a data formatada como "x tempo atrás" ou no formato especificado
 *
 * @param string $date_format Formato da data, padrão 'd M Y'
 * @return string A data formatada
*/
function get_the_time_ago( $date_format = 'd M Y' ) {

    if ( get_the_time( 'U' ) >= strtotime( '-1 week' ) ) {
        return sprintf(
            esc_html__( '%s ago', 'ninja' ),
            human_time_diff( get_the_time( 'U' ), current_time( 'timestamp' ) )
        );
    } else {
        return get_the_date( $date_format );
    }

}

if (function_exists('get_coauthors') && ! function_exists('get_list_coauthors')) {
    /**
     * Get list of coauthors using Co Authors Plus plugin.
     */
    function get_list_coauthors( $post_id = 0 )
    {
        $all_authors = get_coauthors( $post_id );

        $output = '';

        $count_authors = count($all_authors);
        $i = 0;

        foreach ($all_authors as $author) {
            $i++;
            if (is_a($author, 'WP_User')) {
                $output .= '<span>' . $author->data->display_name . '</span>';
            } else {
                $output .= '<span>' . $author->display_name . '</span>';
            }

            if ($i < $count_authors) {
                $output .= '<span class="comma">, </span>';
            }
        }

        return $output;
    }

    /**
     * Override the default WordPress author filter to use the list of coauthors.
     */
    add_filter('the_author', 'get_list_coauthors');
}

function custom_search_filter($query)
{
    if ($query->is_search && ! is_admin() && $query->is_main_query()) {
        if (isset($_GET['filter']) && $_GET['filter'] != 'all') {
            $filter = $_GET['filter'];
            if ($filter == 'posts') {
                $query->set('post_type', 'post');
            } elseif ($filter == 'pages') {
                $query->set('post_type', 'page');
            }
            // Adicione mais condições conforme necessário
        }
    }

    return $query;
}
add_action('pre_get_posts', 'custom_search_filter');

function filter_newspack_sugestions($managed_plugins)
{
    $remove_sugestions = [
        'mailchimp-for-woocommerce',
        'woocommerce',
        'woocommerce-gateway-stripe',
        'woocommerce-name-your-price',
        'woocommerce-subscriptions'
    ];

    foreach ($remove_sugestions as $sugestion) {
        unset($managed_plugins[$sugestion]);
    }

    return $managed_plugins;
}

add_filter('newspack_managed_plugins', 'filter_newspack_sugestions');

/**
 * Add a social fields to Co-Authors Plus
 */

function add_guest_author_fields( $fields_to_return, $groups ) {

    if ( in_array( 'about', $groups ) || in_array( 'all', $groups ) ) {
        $_fields_from_user = ['avatar', 'description', 'facebook', 'instagram', 'linkedin', 'twitter', 'youtube', 'tik-tok' ];

        foreach ( $_fields_from_user as $_field ) {
            $fields_to_return[] = [
                'key'   => $_field,
                'label' => ucfirst( $_field ),
                'group' => 'about'
            ];
        }
    }

    return $fields_to_return;
}

add_filter( 'coauthors_guest_author_fields', 'add_guest_author_fields', 10, 2 );

function alterar_consulta_pesquisa_afluente($query) {
    // Verificar se a consulta está acontecendo na página de pesquisa e se é a consulta principal
    if (is_post_type_archive('afluente') && $query->is_main_query()) {
        // Definir o tipo de post como 'afluente'
        if(!empty($_GET['pesquisar'])) {
            $query->set('s', $_GET['pesquisar']);
        }
		$query->set('orderby', 'title');
		$query->set('order', 'ASC');
    }
}
add_action('pre_get_posts', 'alterar_consulta_pesquisa_afluente');

function order_category_posts($query) {
    if (is_category( ) && $query->is_main_query( )) {
       $query->set('order', 'DESC');
       $query->set('orderby', 'date');
    }
}
add_action('pre_get_posts', 'order_category_posts');

function order_search_filters($query) {
    if (is_search( ) && ! is_admin() && $query->is_main_query( )) {
        $query->set('post_type', ['post', 'opiniao']);

        if(!empty($_GET['ordem']) && $_GET['ordem'] === 'oldest'){
            $query->set('order', 'ASC');
            $query->set('orderby', 'date');
        } else{
            $query->set('order', 'DESC');
            $query->set('orderby', 'date');
        }

        if(!empty($_GET['tipo'])){
            if($_GET['tipo'] == 'opiniao'){
                $query->set('post_type', 'opiniao');
            } elseif($_GET['tipo'] == 'post'){
                $query->set('post_type', 'post');
            } else{
                $query->set('post_type', ['post', 'opiniao']);
            }
        } else{
            $query->set('post_type', ['post', 'opiniao']);
        }


    }
}
add_action('pre_get_posts', 'order_search_filters');

function change_results_quantity( $query ){
    if ( $query->is_main_query( ) && $query->is_search() ) {
        $query->set( 'posts_per_page', 12 );
    }
}

add_action('pre_get_posts', 'change_results_quantity');

function split_ninja_flickr_title( $title ) {
	$separators = [ ' • ', ' · ', ' | ' ];
	foreach ( $separators as $separator ) {
		$parts = explode( $separator, $title );
		$count = count( $parts );
		if ( $count > 3 ) {
			return [ implode( $separator, array_slice( $parts, 0, $count - 2 ) ), $parts[ $count - 2 ], $parts[ $count - 1 ] ];
		} else if ( $count === 3 ) {
			return $parts;
		} else if ( $count === 2 ) {
			return [ $parts[0], $parts[1], false ];
		}
	}
	return [ $title, false, false ]; // Name couldn't be split
}

function set_custom_post_type_archive_posts_per_page( $query ) {

    if ( $query->is_main_query() && ! is_admin() && is_post_type_archive( 'especial' ) ) {
        $query->set( 'posts_per_page', 12 );
    }
}
add_action( 'pre_get_posts', 'set_custom_post_type_archive_posts_per_page' );

function change_search_especial( $query ) {

    if (is_post_type_archive( 'especial' ) && $query->is_main_query() ) {

        if(!empty($_GET['pesquisar'])) {
            $query->set('s', $_GET['pesquisar']);
        }
    }
}
add_action('pre_get_posts', 'change_search_especial');

function add_category_class_to_blog( $classes ){
    if( !is_admin() && (is_category() || is_home())){
        $classes[] = 'generic-archive';
    }

    if(!is_admin() || is_home()){
        $classes[] = 'archive';
    }

    return $classes;

}

add_filter('body_class', 'add_category_class_to_blog');

function hide_especial_parent( $query ) {

    if ( !is_admin() && $query->is_post_type_archive( 'especial' ) ) {
        $query->set('post_parent', 0);
    }
}
add_action('pre_get_posts', 'hide_especial_parent');

/**
 * Modifies the author archive query to include both 'post' and 'opiniao' post types.
 *
 * @param WP_Query $query The current WP_Query object.
 */
function change_archive_author( $query ) {
    if ( ! is_admin() && is_author() && $query->is_main_query() ) {
        $query->set( 'post_type', ['post', 'opiniao'] );
        $query->set( 'posts_per_page', 12 );
    }
}

add_action( 'pre_get_posts', 'change_archive_author' );

function remove_secondary_category_classes( $classes ) {
	$primary_cat_id = get_post_meta( get_the_ID(), '_yoast_wpseo_primary_category', true );

	if ( ! empty( $primary_cat_id ) ) {
		$primary_cat = get_term( $primary_cat_id, 'category' );

		if ( ! empty( $primary_cat ) ) {
			$cat_class = 'category-' . $primary_cat->slug;

			$filtered_classes = [];
			foreach( $classes as $class ) {
				if ( ! str_starts_with( $class, 'category-' ) || $class === $cat_class ) {
					$filtered_classes[] = $class;
				}
			}

			return $filtered_classes;
		}
	}

	return $classes;
}
add_filter( 'newspack_blocks_term_classes', 'remove_secondary_category_classes' );
