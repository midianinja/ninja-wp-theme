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

            <main class="content col-md-3">
                <h4><?php _e('Results', 'ninja'); ?></h4>
                <p><?php _e('You can perform a new search or return to the home page', 'ninja'); ?></p>

                <div class="no-result-buttons">
                    <button class="new-search"><a href="#">New Search</a></button>
                    <button class="b-home"><a href="#">Back to home</a></button>
                </div>
            </main>

            <main class="col-md-9">
                <div>
                    <div class="search-component">
                        <?php get_search_form();?>
                    </div>
                    <div class="content">
                        <?php while (have_posts()) : the_post(); ?>
                            <?php get_template_part('template-parts/content/post-search-results'); ?>
                        <?php endwhile; ?>
                    </div>
                </div>
                
                <?php get_template_part('template-parts/content/pagination'); ?>
            </main>

        </div><!-- /.row -->
    </div><!-- /.container -->
</div><!-- /.index-wrapper -->

<?php get_footer();
