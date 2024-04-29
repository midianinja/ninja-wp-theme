</div>
<?php wp_reset_postdata() ?>

<footer class="main-footer">
    <div class="container">

        <div class="footer-widget-area">
            <?php dynamic_sidebar('footer_widgets'); ?>
        </div>

        <div class="footer-logo">
            <img loading="lazy" class="logo-olhos" src="<?= get_template_directory_uri() ?>/assets/images/logo-olhos.png" alt="logo ninja" height="90" width="170">
            <img loading="lazy" class="logo" src="<?= get_template_directory_uri() ?>/assets/images/logo-white.png" alt="logo ninja" height="64" width="104">
            <?php the_social_networks_menu(); ?>
        </div>

        <?= wp_nav_menu([
            'menu'           => 'footer',
            'container' => 'nav',
            'menu_class' => 'footer-menu'
            ]); ?>

        <div class="footer-credit">
            <div class="content">
                <img loading="lazy" src="<?= get_template_directory_uri() ?>/assets/images/site-por-hacklab.png" alt="site por hacklab" height="15" width="103">
            </div>

        </div>
    </div>
</footer>

<?php wp_footer() ?>

</body>
</html>
