<?php
get_header();

global $wp_query;
$total_results = $wp_query->found_posts;
$singular = $wp_query->found_posts > 1 ? 'results' : 'result';

?>

<div class="index-wrapper">
    <div class="container">
        <form role="search" method="get" class="row filters-search-form" action="<?= esc_url( home_url( '/' ) ) ?>">
            <div class="title">
                <h1><?php _e('Search Results', 'ninja'); ?></h1>
                <p>(<?= $total_results . " $singular";?>)</p>
            </div>

            <div class="content col-md-3">
             
                <h4><?php _e('Results', 'ninja'); ?></h4>
                <p><?php _e('You can perform a new search or return to the home page', 'ninja'); ?></p>

                <div class="no-result-buttons">
                    <button id="newSearchButton" class="new-search"><a href="#"><?php _e('New Search', 'ninja'); ?></a></button>
                    <button class="b-home"><a href="https://midia.ninja"><?php _e('Back to home', 'ninja'); ?></a></button>
                </div>
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
<script>
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('newSearchButton').addEventListener('click', () => {
            const searchInput = document.getElementById('searchField');
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });
</script>
