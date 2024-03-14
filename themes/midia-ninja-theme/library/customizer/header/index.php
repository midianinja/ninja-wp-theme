<?php

function header_custom_options($wp_customize)
{
    $prefix = 'header';
    $section = 'header_area';

    $wp_customize->add_section(
        $section,
        array(
            'title' => esc_html__('Header', 'ninja'),
            'section' => $section,
        )
    );

    // header background color
    $wp_customize->add_setting(
        $prefix . '_background_color',
        array(
            'default' => '#FFFFFF',
            'sanitize_callback' => 'sanitize_hex_color',
        )
    );

    $wp_customize->add_control(
        new WP_Customize_Color_Control(
            $wp_customize,
            $prefix . '_background_color',
            array(
                'label' => 'Header background',
                'section' => $section,
                'settings' => $prefix . '_background_color'
            )
        )
    );

    // header text color
    $wp_customize->add_setting(
        $prefix . '_text_color',
        array(
            'default' => '#333333',
            'sanitize_callback' => 'sanitize_hex_color',
        )
    );

    $wp_customize->add_control(
        new WP_Customize_Color_Control(
            $wp_customize,
            $prefix . '_text_color',
            array(
                'label' => 'Header text color',
                'section' => $section,
                'settings' => $prefix . '_text_color'
            )
        )
    );

}

add_action('customize_register', 'header_custom_options', 99);


// Aplica as cores selecionadas

function header_colors()
{

    $header_bgcolor = get_theme_mod('header_background_color', 'white');
    $header_txtcolor = get_theme_mod('header_text_color');
    ?>

    <style type="text/css" id="header_colors">
		:root{
			--header-background-color: <?php echo $header_bgcolor; ?>;
		}
		body header.main-header.active {
			background-color: var(--header-background-color);
			color: <?php echo $header_txtcolor; ?> !important;
		}   		
		.menus .primary-menu, .menus .primary-menu a, .menus .primary-menu p { 
			color: <?php echo $header_txtcolor; ?> !important; 
		}  

    </style>    
 
    <?php
}

add_action('wp_head', 'header_colors');
