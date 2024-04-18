<?php
get_header();

global $wp_query;
$total_results = $wp_query->found_posts;
$singular = $wp_query->found_posts > 1 ? 'results' : 'result';

?>

<div class="index-wrapper">
    <div class="container">
        <div class="row">
            <div class="title">
                <h1><?php _e('Search Results', 'ninja'); ?></h1>
                <p>(<?= $total_results . " $singular";?>)</p>
            </div>

            <div class="content col-md-3">
                <div class="filter-wrapper">
                    <div class="search-component">
                        <?php get_search_form();?>
                    </div>

                    <div class="filter-opinion">
                        <label for="opinion"><?php _e('', 'ninja'); ?></label>
                        <div class="custom-select-wrapper-opinion">
                            <select name="opinion" id="opinion">
                                <option value="all"><?php _e('Filter by opinion', 'ninja'); ?></option>
                                <option value="positive"><?php _e('Positive', 'ninja'); ?></option>
                                <option value="negative"><?php _e('Negative', 'ninja'); ?></option>
                            </select>
                            <div class="select-icon-opinion"></div>
                        </div>
                    </div>

                    <div class="filter">
                        <label for="orderby"><?php _e('', 'ninja'); ?></label>
                        <div class="custom-select-wrapper">
                            <select name="orderby" id="orderby" class="custom-select">
                                <option value="date"><?php _e('Order Most Recent', 'ninja'); ?></option>
                                <option value="oldest"><?php _e('Oldest', 'ninja'); ?></option>
                            </select>
                            <div class="select-icon"></div>
                        </div>
                    </div>
                </div>

                    <h4><?php _e('Results', 'ninja'); ?></h4>
                    <p><?php _e('You can perform a new search or return to the home page', 'ninja'); ?></p>

                    <div class="no-result-buttons">
                        <button class="new-search"><a href="#">New Search</a></button>
                        <button class="b-home"><a href="<?php home_url() ?>">Back to home</a></button>
                    </div>
            </div>

            <main class="col-md-9">
                    <div class="filter-wrapper search-result-main">
                        <div class="search-component">
                            <?php get_search_form();?>
                        </div>

                        <div class="filter-opinion">
                            <label for="opinion"><?php _e('', 'ninja'); ?></label>
                            <div class="custom-select-wrapper-opinion">
                                <select name="opinion" id="opinion">
                                    <option value="all"><?php _e('Filter by opinion', 'ninja'); ?></option>
                                    <option value="positive"><?php _e('Positive', 'ninja'); ?></option>
                                    <option value="negative"><?php _e('Negative', 'ninja'); ?></option>
                                </select>
                                <div class="select-icon-opinion"></div>
                            </div>
                        </div>

                        <div class="filter">
                            <label for="orderby"><?php _e('', 'ninja'); ?></label>
                            <div class="custom-select-wrapper">
                                <select name="orderby" id="orderby" class="custom-select">
                                    <option value="date"><?php _e('Order Most Recent', 'ninja'); ?></option>
                                    <option value="oldest"><?php _e('Oldest', 'ninja'); ?></option>
                                </select>
                                <div class="select-icon"></div>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <?php while (have_posts()) : the_post(); ?>
                            <?php get_template_part('template-parts/content/post-search-results'); ?>
                        <?php endwhile; ?>
                    </div>
                
                <?php get_template_part('template-parts/content/pagination'); ?>
            </main>

        </div><!-- /.row -->
    </div><!-- /.container -->
</div><!-- /.index-wrapper -->

<?php get_footer();
