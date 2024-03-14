<?php

function footer_custom_options($wp_customize)
{
    $prefix = 'footer';
    $section = 'footer_area';


    $wp_customize->add_section(
        $section,
        array(
            'title' => esc_html__('Footer', 'ninja'),
            'section' => $section,
        )
    );

    // Copyright
    $wp_customize->add_setting(
        $prefix . '_copyright_text',
        array(
            'sanitize_callback' => 'wp_filter_nohtml_kses',
        )
    );

    $wp_customize->add_control(
        $prefix . '_copyright_text',
        array(
            'label'       => __('Footer copyright text', 'ninja'),
            'description' => __('Leave it empty to hide all copyright info.', 'ninja'),
            'section'     => $section,
            'default'     => '',
            'type'        => 'text',
            'sanitize_callback' => 'sanitize_text_field',
        )
    );

    // Show year and name
    $wp_customize->add_setting(
        $prefix . '_show_year_and_name',
        array(
            'default'  => false,
            'sanitize_callback' => 'sanitize_checkbox',
        )
    );

    $wp_customize->add_control(
        $prefix . '_show_year_and_name',
        array(
            'type' => 'checkbox',
            'section' => $section,
            'label' => __('Display year and site name aside copyright info?', 'ninja'),
        )
    );

    // footer background color
    $wp_customize->add_setting(
        $prefix . '_background_color',
        array(
            'default' => '#035299',
            'sanitize_callback' => 'sanitize_hex_color',
        )
    );

    $wp_customize->add_control(
        new WP_Customize_Color_Control(
            $wp_customize,
            $prefix . '_background_color',
            array(
                'label' => __('Footer background', 'ninja'),
                'section' => $section,
                'settings' => $prefix . '_background_color'
            )
        )
    );


    // footer text color
    $wp_customize->add_setting(
        $prefix . '_text_color',
        array(
            'default' => '#FFFFFF',
            'sanitize_callback' => 'sanitize_hex_color',
        )
    );

    $wp_customize->add_control(
        new WP_Customize_Color_Control(
            $wp_customize,
            $prefix . '_text_color',
            array(
                'label' => __('Footer text color', 'ninja'),
                'section' => $section,
                'settings' => $prefix . '_text_color'
            )
        )
    );

}


add_action('customize_register', 'footer_custom_options', 99);


// Aplica as cores selecionadas

function footer_colors()
{

    $footer_bgcolor = get_theme_mod('footer_background_color');
    $footer_txtcolor = get_theme_mod('footer_text_color');
    ?>

    <style type="text/css" id="footer_colors">
		.main-footer {
			background-color: <?php echo $footer_bgcolor; ?> !important;
			color: <?php echo $footer_txtcolor; ?> !important;
		}   		
		.footer-menu, .footer-menu a, .footer-menu p,
		.social-networks, .social-networks a, .social-networks p,
		.copyright-area, .copyright-area a, .copyright-area p { 
			color: <?php echo $footer_txtcolor; ?> !important; 
		}  

    </style>    
 
    <?php
}

add_action('wp_head', 'footer_colors');
