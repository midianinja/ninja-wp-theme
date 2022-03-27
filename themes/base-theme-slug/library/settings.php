<?php

namespace jaci;

function custom_excerpt_length()
{
    return get_option('excerpt_size', '30');
}
add_filter('excerpt_length', 'jaci\\custom_excerpt_length');

function settings_register_fields()
{
    register_setting('general', 'contact', 'esc_attr');
    add_settings_field('contact', '<label for="contact">' . __('Endereço', 'base-textdomain') . '</label>', 'jaci\\settings_contact_html', 'general');

    register_setting('reading', 'excerpt_size', 'esc_attr');
    add_settings_field('excerpt_size', '<label for="excerpt_size">' . __('Número de palavras do resumo automático (excerpt)', 'base-textdomain') . '</label>', 'jaci\\settings_excerpt_size_html', 'reading');
}
add_filter('admin_init', 'jaci\\settings_register_fields');

function settings_contact_html()
{
    $value = get_option('contact', '');
    echo '<div><textarea style="width: 500px" type="text" id="contact" name="contact" />' . $value . '</textarea></div>';
}

function settings_excerpt_size_html()
{
    $value = get_option('excerpt_size', '30');
    echo '<div><input type="number" step="1" id="excerpt_size" name="excerpt_size" value="' . $value . '" /></div>';
}
