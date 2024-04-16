<header class="c-title title-blog">
    <div class="container">
        <?php echo get_layout_header('blog'); ?>

        <h1 class="entry-title">
            <?php echo apply_filters( 'the_title' , get_the_title( get_option( 'page_for_posts' ) ) ); ?>
        </h1>

        <aside class="col-md-3">
            <?php dynamic_sidebar( 'sidebar-default' ) ?>
        </aside>
    </div>
</header><!-- /.c-title.title-blog -->