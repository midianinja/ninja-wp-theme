</div>
<?php wp_reset_postdata() ?>

<footer class="main-footer">
    <div class="container">   

        <div class="footer-widget-area">
            <?php dynamic_sidebar('footer_widgets'); ?>
        </div>
        
        <div class="footer-logo">
            <img class="logo-olhos" src="<?= get_template_directory_uri() ?>/assets/images/logo-olhos.png" alt="logo ninja">
            <img class="logo" src="<?= get_template_directory_uri() ?>/assets/images/logo-white.png" alt="logo ninja">
            <?php the_social_networks_menu(); ?>
        </div>

        <?= wp_nav_menu([
            'menu'           => 'footer',
            'container' => 'nav',
            'menu_class' => 'footer-menu'
            ]); ?> 
        
        <?php if (is_plugin_active('tutor/tutor.php')) : ?>
            <div class="tutor-header-profile-menu-items">
                <?php tutor_multi_column_dropdown(); ?>
            </div><!-- .tutor-header-profile-menu -->
        <?php endif; ?>
       
        
        <div class="footer-credit">
            <div class="content">
                <img src="<?= get_template_directory_uri() ?>/assets/images/site-por-hacklab.png" alt="site por hacklab">
            </div>
            
        </div>   
    </div>
</footer>

<?php wp_footer() ?>

</body>
</html>