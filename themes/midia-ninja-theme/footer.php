</div>
<?php wp_reset_postdata() ?>

<footer class="main-footer">
    <div class="container">
        
       

        <div class="row">
            <div class="col-md-12">

                <div class="row footer-menus">

                    <div class="footer-menu footer-menu-first">
                        <h6>QUEM SOMOS</h6>
                        <?= wp_nav_menu(['theme_location' => 'footer-menu-first', 'container' => 'nav', 'menu_id' => 'footer-menu-first', 'menu_class' => 'footer-menu-first', 'container_class' => 'footer-menu-first']) ?>
                    </div>

                    <div class="footer-menu footer-menu-second">
                        <h6>PROJETOS</h6>
                        <?= wp_nav_menu(['theme_location' => 'footer-menu-second', 'container' => 'nav', 'menu_id' => 'footer-menu-second', 'menu_class' => 'footer-menu-second', 'container_class' => 'footer-menu-second']) ?>
                    </div>

                    <div class="footer-menu footer-menu-third">
                        <h6>NOTÍCIAS</h6>
                        <?= wp_nav_menu(['theme_location' => 'footer-menu-third', 'container' => 'nav', 'menu_id' => 'footer-menu-third', 'menu_class' => 'footer-menu-third', 'container_class' => 'footer-menu-third']) ?>
                    </div>

                    <div class="footer-menu footer-menu-fourth">
                        <h6>PARTICIPE</h6>
                        <?= wp_nav_menu(['theme_location' => 'footer-menu-fourth', 'container' => 'nav', 'menu_id' => 'footer-menu-fourth', 'menu_class' => 'footer-menu-fourth', 'container_class' => 'footer-menu-fourth']) ?>
                    </div>

                    <!-- <div class="social-networks">
                        <?php the_social_networks_menu() ?>
                    </div> -->
                
                </div>
                
            </div>

            <div class="col-md-12 copyright-area">
                
                <?php dynamic_sidebar('footer_copyright_area') ?>

            </div>

            <!-- <div class="col-md-12 addicional-info">

                <?php 
                    $copyright_option = get_theme_mod( 'footer_copyright_text', '' );
                    $show_name_and_year = checked( 1, get_theme_mod('footer_show_year_and_name'), false );
                    if(!empty($copyright_option)): ?>

                    <div class="copyright-info">
                        <?= $copyright_option ?>
                        <?php 
                        if($show_name_and_year): 
                            echo date("Y") . " "; 
                            echo bloginfo("name");
                        endif;
                        ?>
                    </div>

                <?php
                    endif;
                ?>

            </div> -->


        </div>
    </div>
</footer>
<?php wp_footer() ?>

</body>
</html>