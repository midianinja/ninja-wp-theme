<?php get_header(); ?>

<div class="page-content" id="pageContent">
    <?php the_post(); ?>

    <div class="row row-small">
        <div class="column large-12 small-12 text-center mt-40 mb-30">
            <div id="single-the-title">
                <h1 ><?php the_title() ?></h1>
            </div>
        </div>
        <div class="column large-12 small-12 mb-30">
            <?php the_content(); ?>
        </div>
    </div>
</div>

<?php get_footer();