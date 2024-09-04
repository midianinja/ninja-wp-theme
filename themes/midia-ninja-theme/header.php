<!DOCTYPE html>
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes();?>>
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo('charset');?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<?php wp_head()?>
	<script src="https://tpc.googlesyndication.com/sodar/sodar2.js" defer></script>
	<script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" defer></script>
	<title><?= is_front_page() ? get_bloginfo('name') : wp_title()?></title>
	<link rel="icon" href="<?= get_site_icon_url() ?>" />
	<link rel="preconnect" href="https://securepubads.g.doubleclick.net">
	<link rel="preconnect" href="https://www.googletagmanager.com">
	<link rel="preconnect" href="https://static.addtoany.com">

</head>
<body <?php body_class();?>>
    <?php
    /**
     * @link https://developer.wordpress.org/reference/hooks/wp_body_open/
     */
    if (function_exists('wp_body_open')) {
        wp_body_open();
    }
?>
    <header class="main-header">
        <div class="container">
            <div class="row">
                <div class="col-md-12 header-content">
                    <div>
                        <?php the_social_networks_menu() ?>

                        <div class="hamburger-wrapper--mobile">
                            <div class="hamburger-lines--mobile">
                                <span class="line line1"></span>
                                <span class="line line2"></span>
                                <span class="line line3"></span>
                            </div>
                        </div>

                        <div class="logo">
                            <a href="<?= home_url() ?>">
                                <img src="<?= get_template_directory_uri() ?>/assets/images/logo.png" height="63" width="104" alt="<?= get_bloginfo('name') ?>">
                            </a>
                        </div>

                        <section class="hamburguer">
                            <div class="container nav-container">

                                <div class="nav-container--buttons">
                                    <span class="search-menu" aria-label="<?php echo esc_attr__('Search') ?>"></span>

                                    <div class="hamburger-lines">
                                        <span class="line line1"></span>
                                        <span class="line line2"></span>
                                        <span class="line line3"></span>
                                    </div>
                                </div>

                                <div class="menu-items">
                                    <div class="menu-buttons">
                                        <span class="close-menu" aria-label="<?php echo esc_attr__('Close') ?>"></span>
                                    </div>
                                    <div class="search-component">
                                        <?php get_search_form(array('placeholder' => esc_attr_x('Search …', 'placeholder'))); ?>
                                    </div>

                                    <?= wp_nav_menu(['theme_location' => 'hamburguer-menu', 'container' => 'nav']); ?>

                                    <?php the_social_networks_menu(); ?>
                                </div>
                            </div>
                        </section>

                        <button menu-container-class='primary-menu' class="toggle-menu" aria-label="<?= __("Toggle menu visibility", "ninja") ?>">
                        </button>
                    </div>

                    <div class="menus">
                        <?= wp_nav_menu(['theme_location' => 'main-menu', 'container' => 'nav', 'menu_id' => 'main-menu', 'menu_class' => 'menu', 'container_class' => 'primary-menu']) ?>
                    </div>
                </div>
            </div>
        </div>

	</header>
	<div id="app">
