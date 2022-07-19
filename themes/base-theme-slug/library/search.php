<?php
namespace hacklabTema;

function join_meta_table( $join ) {
    global $wpdb;

    if ( is_search() ) {
        $join .=' LEFT JOIN '.$wpdb->postmeta. ' hl_meta ON '. $wpdb->posts . '.ID = hl_meta.post_id ';
    }

    return $join;
}
add_filter( 'posts_join', 'hacklabTema\\join_meta_table' );

function modify_where_clause( $where ) {
    global $pagenow, $wpdb;

    if ( is_search() ) {
        $where = preg_replace(
            "/\(\s*".$wpdb->posts.".post_title\s+LIKE\s*(\'[^\']+\')\s*\)/",
            "(".$wpdb->posts.".post_title LIKE $1) OR (hl_meta.meta_value LIKE $1)", $where );
    }
    return $where;
}
add_filter( 'posts_where', 'hacklabTema\\modify_where_clause' );

function prevent_duplicates( $where ) {
    global $wpdb;

    if ( is_search() ) {
        return "DISTINCT";
    }
    return $where;
}
add_filter( 'posts_distinct', 'hacklabTema\\prevent_duplicates' );

function post_types_in_search_results( $query ) {
    if ( $query->is_main_query() && $query->is_search() && ! is_admin() ) {

        $post_types = apply_filters( 'post_types_in_search_results', ['post', 'page'] );
        $query->set( 'post_type', $post_types );

    }
}
add_action( 'pre_get_posts', 'hacklabTema\\post_types_in_search_results' );