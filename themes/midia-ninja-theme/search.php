<?php
get_header();

global $wp_query;
$total_results = $wp_query->found_posts;
$singular = $wp_query->found_posts > 1 ? __('results', 'ninja') : __('result', 'ninja');

$is_content_opiniao = false;


if( isset( $wp_query->query_vars['post_type'] ) && $wp_query->query_vars['post_type'] == 'opiniao' ){
    $is_content_opiniao = true;
}

$container_class = $is_content_opiniao ? 'container is-content-opiniao' : 'container';

?>

<div class="index-wrapper">
	<div class="<?php echo $container_class ?>">
        <form role="search" method="get" class="row filters-search-form" action="<?= esc_url( home_url( '/' ) ) ?>">
            <div class="title">
                <h1><?php _e('Search Results', 'ninja'); ?></h1>
                <p>(<?= $total_results . " $singular";?>)</p>
            </div>

            <div class="content col-md-3">

                <h4><?php _e('Results', 'ninja'); ?></h4>
                <?php if ( ! $wp_query->found_posts ) : ?>
                    <p><?php _e('You can perform a new search or return to the home page', 'ninja'); ?></p>

                    <div class="no-result-buttons">
                        <button id="newSearchButton" class="new-search"><a href="#"><?php _e('New Search', 'ninja'); ?></a></button>
                        <button class="b-home"><a href="<?php echo esc_url( home_url() ); ?>"><?php _e('Back to home', 'ninja'); ?></a></button>
                    </div>
                <?php endif; ?>
            </div>

            <div class="col-md-9">
                    <div class="filter-wrapper search-result-main">

                        <div class="search-component">
                            <label class="label-search">
                                <span class="screen-reader-text"><?= _x( 'Search for:', 'label' ) ?></span>
                                <input type="search" class="search-field" placeholder="<?= esc_attr_x( 'Search &hellip;', 'placeholder' ) ?>" value="<?= get_search_query() ?>" name="s" id="searchField" />
                            </label>
                            <button type="submit" style="display: none">Enviar</button>
                        </div>

                        <div class="filter-opinion">
                            <label for="tipo"><?php _e('', 'ninja'); ?></label>
                            <div class="custom-select-wrapper-opinion">
                                <select name="tipo" id="tipo">
                                    <option value="all" <?php selected($_GET['tipo'], 'all') ?>><?php _e('Filter by All', 'ninja'); ?></option>
                                    <option value="opiniao" <?php selected($_GET['tipo'], 'opiniao') ?>><?php _e('Opinion', 'ninja'); ?></option>
                                    <option value="post" <?php selected($_GET['tipo'], 'post') ?>><?php _e('News', 'ninja'); ?></option>
                                </select>
                                <div class="select-icon-opinion"></div>
                            </div>
                        </div>

                        <div class="filter">
                            <label for="ordem"><?php _e('', 'ninja'); ?></label>
                            <div class="custom-select-wrapper">
                                <select name="ordem" id="ordem" class="custom-select">
                                    <option value="date" <?php selected($_GET['ordem'], 'date') ?>><?php _e('Order Most Recent', 'ninja'); ?></option>
                                    <option value="oldest" <?php selected($_GET['ordem'], 'oldest') ?>><?php _e('Oldest', 'ninja'); ?></option>
                                </select>
                                <div class="select-icon"></div>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <?php while (have_posts()) : the_post(); ?>
                            <?php if (get_post_type() === 'opiniao') {
                                get_template_part('template-parts/content/post-opiniao');
                            } else {
                                get_template_part('template-parts/content/post-search-results');
                            } ?>
                        <?php endwhile; ?>
                    </div>

                <?php get_template_part('template-parts/content/pagination'); ?>
            </div>
        </form><!-- /.form -->
    </div><!-- /.container -->
</div><!-- /.index-wrapper -->

<?php get_footer(); ?>
