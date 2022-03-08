<?php

/**
 *
 * Create list of the terms by taxonomy
 *
 * @param int $post_id Post ID
 * @param string $tax Slug tax to get terms
 * @param bool $use_link Define if is use link to the terms
 *
 * @link https://developer.wordpress.org/reference/functions/get_the_terms/
 * @link https://developer.wordpress.org/reference/functions/sanitize_title/
 * @link https://developer.wordpress.org/reference/functions/esc_url/
 * @link https://developer.wordpress.org/reference/functions/get_term_link/
 *
 * @return string $html
 *
 */
function get_html_terms( int $post_id, string $tax, bool $use_link = false ) {

    $terms = get_the_terms( $post_id, sanitize_title( $tax ) );

    if ( ! $terms || is_wp_error( $terms ) ) {
        return false;
    }

    $html = '<ul class="list-terms tax-' . sanitize_title( $tax ) . '">';

    foreach ( $terms as $term ) {

        $html .= '<li class="term-' . sanitize_title( $term->slug ) . '">';

        if ( $use_link ) {
            $html .= '<a href="' . esc_url( get_term_link( $term->term_id, $tax ) ) . '">';
        }

        $html .= esc_attr( $term->name );

        if ( $use_link ) {
            $html .= '</a>';
        }

        $html .= '</li>';

    }

    $html .= '</ul>';

    return $html;

}

/**
 * Rename the defaults taxonomies
 */
function rename_taxonomies() {

    // Tags -> Temas
    $post_tag_args = get_taxonomy( 'post_tag' );

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

    $object_type = array_merge( $post_tag_args->object_type, ['page'] );
    $object_type = array_unique( $object_type );

    register_taxonomy( 'post_tag', $object_type, (array) $post_tag_args );

    // Category -> Projetos
    $category_args = get_taxonomy( 'category' );

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

    $object_type = array_merge( $category_args->object_type, ['page', 'perguntas_frequentes'] );
    $object_type = array_unique( $object_type );

    register_taxonomy( 'category', $object_type, (array) $category_args );

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
function get_terms_like_class( int $post_id, string $tax, string $prefix = '' ) {

    $terms = get_the_terms( $post_id, sanitize_title( $tax ) );
    $class = '';

    if ( $terms && ! is_wp_error( $terms ) ) {
        foreach ( $terms as $term ) {
            $class .= ( $prefix ) ? $prefix . $term->slug : $term->slug;
            $class .= ' ';
        }

        return sanitize_title( substr( $class, 0, -1 ) );
    }

    return '';

}


/**
 * Get terms by post type
 */
function get_terms_by_post_type( $taxonomy, $post_type ) {

    // Get all terms that have posts
    $terms = get_terms([
        'hide_empty' => true,
        'taxonomy'   => $taxonomy
    ]);

    // Remove terms that don't have any posts in the current post type
    $terms = array_filter( $terms, function ( $term ) use ( $post_type, $taxonomy ) {
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

        return ( count( $posts ) > 0 );
    });

    return $terms;

}

/**
 * Returns total post views
 *
 * @link https://developer.wordpress.org/reference/functions/get_post_meta/
 * @link https://developer.wordpress.org/reference/functions/get_the_ID/
 */
function gt_get_post_view() {
    $count = get_post_meta( get_the_ID(), 'post_views_count', true );
    $count = ($count == 1 ? $count." Visualização" : $count." Visualizações" );
    return "$count";
}

/**
 * Defines total post views
 *
 * @link https://developer.wordpress.org/reference/functions/get_post_meta/
 * @link https://developer.wordpress.org/reference/functions/get_the_ID/
 * * @link https://developer.wordpress.org/reference/functions/update_post_meta/
 */
function gt_set_post_view() {
    $key = 'post_views_count';
    $post_id = get_the_ID();
    $count = (int) get_post_meta( $post_id, $key, true );
    $count++;
    update_post_meta( $post_id, $key, $count );
}

function gt_posts_column_views( $columns ) {
    $columns['post_views'] = 'Views';
    return $columns;
}

function gt_posts_custom_column_views( $column ) {
    if ( $column === 'post_views') {
        echo gt_get_post_view();
    }
}
add_filter( 'manage_posts_columns', 'gt_posts_column_views' );
add_action( 'manage_posts_custom_column', 'gt_posts_custom_column_views' );

//Page Slug Body Class
function add_slug_body_class( $classes ) {
    global $post;
    if ( isset( $post ) ) {
    $classes[] = $post->post_type . '-' . $post->post_name;
    }
    return $classes;
}
add_filter( 'body_class', 'add_slug_body_class' );

/**
 * Return the structure HTML of the posts separetade by month
 *
 * @param array $args use params of the class WP_Query
 * @link https://developer.wordpress.org/reference/classes/wp_query/#parameters
 *
 * @return array months|slider
 */
function get_posts_by_month( $args = [] ) {

    $args['orderby'] = 'date';

    $items = new WP_Query( $args );

    if( $items->have_posts() ) :

        $month_titles   = [];
        $close_ul       = false;
        $content_slider = '';

        while( $items->have_posts() ) : $items->the_post();

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

            $year = date( 'Y', strtotime( get_the_date( 'Y-m-d H:i:s' ) ) );
            $month = date( 'M', strtotime( get_the_date( 'Y-m-d H:i:s' ) ) );

            $month_title = $month_full[$month] . ' ' . $year;

            if ( ! in_array( $month_title, $month_titles ) ) :
                if ( $close_ul ) $content_slider .= '</ul>';
                $content_slider .= '<ul id="items-' . sanitize_title( $month_title ) . '" class="item-slider">';
                $month_titles[] = $month_title;
                $close_ul = true;
            endif;

            $thumbnail = ( has_post_thumbnail( get_the_ID() ) ) ? get_the_post_thumbnail( get_the_ID() ) : '<img src="' . get_stylesheet_directory_uri() . '/assets/images/default-image.png">';

            $content_slider .= sprintf(
                '<li id="item-%1$s" class="item item-month-%2$s"><a href="%3$s"><div class="thumb">%4$s</div><div class="title"><h3>%5$s</h3></div></a></li>',
                get_the_ID(),
                $month_title,
                get_permalink( get_the_ID() ),
                $thumbnail,
                get_the_title( get_the_ID() )
            );

        endwhile;

        if ( $close_ul ) $content_slider .= '</ul>';
    endif;

    return [
        'months' => $month_titles,
        'slider' => $content_slider
    ];

}
