</div>
<?php wp_reset_postdata() ?>

<footer class="main-footer">
    <div class="container">   
        <div class="row">
            <div class="col-md-12 footer-widgets-area">
                <?php dynamic_sidebar('footer_widgets') ?>
                <div class="footer-logo">
                    <img src="<?= get_template_directory_uri() ?>/assets/images/site-por-hacklab.png" alt="site por hacklab">
                </div>
            </div>
                
        </div>
    </div>
</footer>

<?php wp_footer() ?>

</body>
</html>