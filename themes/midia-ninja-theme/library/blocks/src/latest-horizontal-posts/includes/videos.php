<?php

namespace Ninja;

function videos_get_contents( $youtube_key, $video_model, $channel_id, $playlist_id, $max_results ) {
    $cache_key = 'ninja_youtube_' . md5("$youtube_key:$video_model:$channel_id:$playlist_id:$max_results");
    $cached_data = get_transient( $cache_key );

    if ( false !== $cached_data ) {
        return $cached_data;
    }

    if ( $video_model == 'channel' ) {
        $base_url = "https://www.googleapis.com/youtube/v3/search";
        $params = array(
            'part'       => 'snippet',
            'channelId'  => $channel_id,
            'maxResults' => $max_results,
            'order'      => 'date',
            'key'        => $youtube_key
        );
        $query_string = http_build_query( $params );
        $url = $base_url . '?' . $query_string;
    } else {
        $url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=$playlist_id&maxResults=$max_results&key=$youtube_key";
    }

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

        $video_id  = false;
        $video_url = false;
        $thumbnail = false;
        $title     = false;

        if ( isset( $item->snippet->resourceId->videoId ) ) {
            $video_id  = ( isset( $item->snippet->resourceId->videoId ) && ! empty( $item->snippet->resourceId->videoId ) ) ? esc_attr( $item->snippet->resourceId->videoId ) : false;
            $video_url = ( isset( $video_id ) && ! empty( $video_id ) ) ? "https://www.youtube.com/watch?v=$video_id" : false;
            $thumbnail = ( isset( $item->snippet->thumbnails->medium->url ) && ! empty( $item->snippet->thumbnails->medium->url ) ) ? esc_url( $item->snippet->thumbnails->medium->url ) : false;
            $title     = ( isset( $item->snippet->title ) && ! empty( $item->snippet->title ) ) ? esc_attr( $item->snippet->title ) : false;
        } elseif( isset( $item->id->videoId ) ) {
            $video_id  = ( isset( $item->id->videoId ) && ! empty( $item->id->videoId ) ) ? esc_attr( $item->id->videoId ) : false;
            $video_url = ( isset( $video_id ) && ! empty( $video_id ) ) ? "https://www.youtube.com/watch?v=$video_id" : false;
            $thumbnail = ( isset( $item->snippet->thumbnails->medium->url ) && ! empty( $item->snippet->thumbnails->medium->url ) ) ? esc_url( $item->snippet->thumbnails->medium->url ) : false;
            $title     = ( isset( $item->snippet->title ) && ! empty( $item->snippet->title ) ) ? esc_attr( $item->snippet->title ) : false;
        }

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
