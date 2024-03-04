<?php

namespace Ninja;

function videos_get_contents( $youtube_key, $playlist_id, $max_results ) {
    $cache_key = 'youtube_videos_' . md5( $playlist_id . '_' . $max_results );
    $cached_data = get_transient( $cache_key );

    if ( false !== $cached_data ) {
        return $cached_data;
    }

    $url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=$playlist_id&maxResults=$max_results&key=$youtube_key";

    $curl = curl_init();
    curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $curl, CURLOPT_URL, $url );
    curl_setopt( $curl, CURLOPT_REFERER, get_site_url() );

    $response = curl_exec( $curl );

    curl_close( $curl );

    $videos = json_decode( $response );

    if ( ! isset( $videos ) || ! isset( $videos->items ) ) {
        return;
    }

    $data = [];

    foreach ( $videos->items as $item ) {
        $video_id  = ( isset( $item->snippet->resourceId->videoId ) && ! empty( $item->snippet->resourceId->videoId ) ) ? esc_attr( $item->snippet->resourceId->videoId ) : false;
        $video_url = ( isset( $video_id ) && ! empty( $video_id ) ) ? "https://www.youtube.com/watch?v=$video_id" : false;
        $thumbnail = ( isset( $item->snippet->thumbnails->medium->url ) && ! empty( $item->snippet->thumbnails->medium->url ) ) ? esc_url( $item->snippet->thumbnails->medium->url ) : false;
        $title     = ( isset( $item->snippet->title ) && ! empty( $item->snippet->title ) ) ? esc_attr( $item->snippet->title ) : false;

        if ( ! $video_id || ! $video_url || ! $thumbnail || ! $title ) {
            continue;
        }

        $data[] = [
            'id'        => $video_id,
            'title'     => $title,
            'thumbnail' => $thumbnail,
            'video_url' => $video_url
        ];
    }

    if ( is_array( $data ) && count( $data ) > 0 ) {
        set_transient( $cache_key, $data, 3600 );
        return $data;
    }

    return false;
}
