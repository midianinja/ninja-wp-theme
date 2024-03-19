<?php
get_header();

global $wp_query;
$total_results = $wp_query->found_posts;
// Refactor to count all contents
$singular = $wp_query->found_posts > 1 ? _x( 'results', 'Count results on search page', 'ninja' ) : _x( 'result', 'Count results on search page', 'ninja' );

$show_contents = [
    'all'         => __( 'All', 'ninja' ),
    'post'        => __( 'News', 'ninja' ),
    'opiniao'     => __( 'Opinion', 'ninja' ),
    'especiais'   => __( 'Especials', 'ninja' ),
    'videos'      => __( 'Videos', 'ninja' ),
    'fotografias' => __( 'Photographs', 'ninja' )
];

$filtered_contents = isset( $_GET['content'] ) ? $_GET['content'] : ['all' => 'on'];

if ( key_exists( 'all', $filtered_contents ) ) {
    foreach ( $show_contents as $key => $value ) {
        $filtered_contents[$key] = "on";
    }
}

$content_class = array_map( function( $content ) {
    return 'show-'. $content;
}, $filtered_contents );

?>


<div class="container <?php echo implode( ' ', $content_class ); ?> ">
    <aside class="sidebar">
        <div class="rersults-filters">
            <h2><?php _x( 'Results', 'Sidebar title on search page', 'ninja' ); ?></h2>
            <p><?php __( 'Click below on what types of results you would like for your search', 'ninja' ); ?>
            <form method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
                <input type="hidden" name="s" value="<?php echo get_search_query(); ?>">
                <?php foreach( $show_contents as $key => $value ) : ?>
                    <?php $checked = ( key_exists( 'all', $filtered_contents ) || key_exists( $key, $filtered_contents ) ) ? 'checked' : ''; ?>
                    <label>
                        <?php echo $value; ?>
                        <input type="checkbox" name="content[<?php echo $key; ?>]" <?php echo $checked; ?>></input>
                    </label>
                <?php endforeach; ?>
                <input type="submit" value="<?php _e( 'Filter', 'ninja' ); ?>">
                <input type="reset" value="<?php _e( 'Clear', 'ninja' ); ?>">
            </form>
        </div>
    </aside>
    <main class="content">
        <div class="results-title">
            <p>(<?= $total_results . " $singular";?>)</p>
        </div>
        <div class="results-search">
            <div class="search-component">
                <?php get_search_form();?>
            </div>
            <!-- // Ordering -->
        </div>
        <div class="results-content">
            <?php if ( key_exists( 'post', $filtered_contents ) ) : ?>
                <h2><?php _e( 'News', 'ninja' ); ?></h2>
                <?php
                    $args_posts = [
                        'post_type' => 'post',
                        'posts_per_page' => get_option( 'posts_per_page' ), // -1 para trazer todos os resultados
                        's' => get_search_query(),
                    ];
                    $query_posts = new WP_Query( $args_posts );
                
                    if ( $query_posts->have_posts() ) {
                        while ( $query_posts->have_posts() ) {
                            $query_posts->the_post();
                            get_template_part( 'template-parts/search/post' );
                        }
                    } else {
                        echo '<p>Nenhum post encontrado.</p>';
                    }
                ?>
                <?php wp_reset_postdata(); ?>
            <?php endif; ?>
        </div>
    </main>
</div>

<?php get_footer();
