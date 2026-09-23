<?php

namespace Ninja;

function video_playlist_embed_url( array $video ) {
    $home_url = get_home_url();
    $video_id = rawurlencode( $video['id'] );

    return "https://www.youtube-nocookie.com/embed/$video_id?origin=$home_url&showinfo=0&video-id=$video_id&modestbranding=1&rel=0";
}

function video_playlist_player_html( array $video ) {
    $video_id    = esc_attr( $video['id'] );
    $video_title = esc_html( $video['title'] );
    $embed_url   = esc_url( video_playlist_embed_url( $video ) );

    $html = '<div class="video-gallery-block__player" data-video-id="' . $video_id . '" data-title="' . esc_attr( $video['title'] ) . '">
                <p class="video-gallery-block__player-title"><strong>' . $video_title . '</strong></p>
                <figure class="wp-block-embed is-type-video is-provider-youtube">
                    <div class="wp-block-embed__wrapper">
                        <iframe class="lazy-loaded"
                            loading="lazy"
                            title="' . $video_title . '"
                            data-lazy-type="iframe"
                            data-src="' . $embed_url . '"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen=""
                            src="' . $embed_url . '"
                            width="1200" height="675" frameborder="0"></iframe>

                        <noscript>
                            <iframe loading="lazy"
                                title="' . $video_title . '"
                                width="1200"
                                height="675"
                                src="' . $embed_url . '" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                            </iframe>
                        </noscript>
                    </div>
                </figure>
            </div>';

    return $html;
}

function video_playlist_item_html( array $video, $is_active = false ) {
    $video_id  = esc_attr( $video['id'] );
    $title     = $video['title'];
    $thumbnail = esc_url( $video['thumbnail'] );
    $classes   = 'video-gallery-block__item';

    if ( $is_active ) {
        $classes .= ' is-active';
    }

    return '<button class="' . $classes . '" type="button" data-video-id="' . $video_id . '" data-title="' . esc_attr( $title ) . '" aria-label="' . esc_attr( $title ) . '">
                <span class="video-gallery-block__thumb">
                    <img src="' . $thumbnail . '" alt="' . esc_attr( $title ) . '" loading="lazy" width="120" height="67" />
                </span>
                <span class="video-gallery-block__item-title">' . esc_html( $title ) . '</span>
            </button>';
}

function video_playlist_complianz_active() {
    if ( defined( 'CMPLZ_VERSION' ) || class_exists( 'COMPLIANZ' ) ) {
        return true;
    }

    if ( ! function_exists( 'is_plugin_active' ) ) {
        include_once ABSPATH . 'wp-admin/includes/plugin.php';
    }

    return is_plugin_active( 'complianz-gdpr/complianz-gpdr.php' );
}

function video_playlist_localize_script() {
    wp_localize_script( 'ninja-video-playlist-view-script', 'videoPlaylistArgs', [
        'complianzActive' => video_playlist_complianz_active(),
    ] );
}
add_action( 'wp_enqueue_scripts', 'Ninja\\video_playlist_localize_script', 20 );

function video_playlist_callback( $attributes ) {
    $custom_class    = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';
    $block_classes   = array_filter( [ 'video-gallery-block', $custom_class ] );

    $api_key        = get_option( 'youtube_key', false );
    $youtube_id     = ! empty( $attributes['youtubeId'] ) ? esc_attr( $attributes['youtubeId'] ) : false;
    $youtube_format = ( isset( $attributes['youtubeFormat'] ) && in_array( $attributes['youtubeFormat'], [ 'channel', 'playlist' ], true ) ) ? $attributes['youtubeFormat'] : 'channel';

    if ( ! $api_key || ! $youtube_id ) {
        if ( is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
            return '<h2>' . __( 'Configure a YouTube API Key e o ID do canal/playlist para usar o bloco Video Playlist', 'ninja' ) . '</h2>';
        }

        return;
    }

    require_once get_template_directory() . '/library/blocks/src/latest-horizontal-posts/includes/videos.php';

    $max_results = min( 50, max( 1, intval( $attributes['numItems'] ?? 5 ) ) );
    $channel_id  = ( $youtube_format === 'channel' ) ? $youtube_id : '';
    $playlist_id = ( $youtube_format === 'playlist' ) ? $youtube_id : '';

    $videos = videos_get_contents( $api_key, $youtube_format, $channel_id, $playlist_id, $max_results );

    if ( ! is_array( $videos ) || empty( $videos ) ) {
        if ( is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
            return '<h2>' . __( 'No content found', 'ninja' ) . '</h2>';
        }

        return;
    }

    $layout = ( isset( $attributes['layout'] ) && in_array( $attributes['layout'], [ 'sidebar', 'block', 'popup' ], true ) ) ? $attributes['layout'] : 'sidebar';

    $block_id     = ! empty( $attributes['blockId'] ) ? esc_attr( $attributes['blockId'] ) : uniqid( 'video-playlist-' );
    $title        = ! empty( $attributes['title'] ) ? esc_html( $attributes['title'] ) : '';
    $player_attrs = sprintf(
        'data-autoplay="%s" data-loop="%s" data-muted="%s"',
        ! empty( $attributes['autoplay'] ) ? '1' : '0',
        ! empty( $attributes['loop'] ) ? '1' : '0',
        ! empty( $attributes['muted'] ) ? '1' : '0'
    );

    ob_start();
    ?>

    <div id="block__<?= $block_id ?>" class="<?= implode( ' ', $block_classes ) ?> video-gallery--<?= $layout ?>" <?= $player_attrs ?>>
        <?php if ( $title ) : ?>
            <div class="video-gallery-block__title">
                <h2><?= $title ?></h2>
                <div class="title-line"></div>
            </div>
        <?php endif; ?>

        <?php if ( $layout === 'popup' ) : ?>
            <div class="video-gallery-grid">
                <?php foreach ( $videos as $video ) :
                    echo video_playlist_item_html( $video );
                endforeach; ?>
            </div>
        <?php else : ?>
            <?php $first = array_shift( $videos ); ?>
            <div class="video-gallery-wrapper<?= empty( $videos ) ? ' video-gallery-wrapper--single' : '' ?>">
                <?php echo video_playlist_player_html( $first ); ?>
                <?php if ( ! empty( $videos ) ) : ?>
                    <div class="video-gallery-list">
                        <?php foreach ( $videos as $index => $video ) :
                            echo video_playlist_item_html( $video, $index === 0 );
                        endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div><!-- .video-gallery-block -->

    <?php
    $output = ob_get_clean();
    return $output;
}
