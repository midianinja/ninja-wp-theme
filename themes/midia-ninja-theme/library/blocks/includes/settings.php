<?php

namespace Ninja;

add_action( 'admin_init', 'Ninja\\register_settings_fields' );

function register_settings_fields() {
    register_setting(
        'general',
        'youtube_key',
        'esc_attr'
    );

    add_settings_field(
        'youtube_key',
        '<label for="youtube_key">' . __( 'YouTube API Key', 'ninja' ) . '</label>',
        'Ninja\\youtube_key_html',
        'general'
    );
}

function youtube_key_html() {
    $youtube_key_option = get_option( 'youtube_key', '' );
    echo '<input type="text" name="youtube_key" id="youtube_key" value="' . $youtube_key_option . '" autocomplete="off">';
    echo '<p><i>Crie uma chave de API do YouTube em <a href="https://console.cloud.google.com/apis/credentials">https://console.cloud.google.com/apis/credentials</a></i></p>';
}