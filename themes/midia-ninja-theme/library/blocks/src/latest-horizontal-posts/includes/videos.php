<?php

namespace Ninja;

function videos_get_contents( $youtube_key, $video_model, $channel_id, $playlist_id, $max_results ) {
    $cache_key = 'ninja_youtube_' . md5("$youtube_key:$video_model:$channel_id:$playlist_id:$max_results");
    $cached_data = get_transient( $cache_key );

    if ( false !== $cached_data ) {
        return $cached_data;
    }

    if ( $video_model == 'shorts' ) {
        $data = videos_get_shorts( $youtube_key, $channel_id, $max_results );

        if ( is_array( $data ) && count( $data ) > 0 ) {
            set_transient( $cache_key, $data, get_option( 'youtube_api_cache_ttl', 3600 ) );
            return $data;
        }

        return false;
    }

    if ( $video_model == 'channel' ) {
        $base_url = "https://www.googleapis.com/youtube/v3/channels";
        $params = [
            'part' => 'contentDetails',
            'id'   => $channel_id,
            'key'  => $youtube_key
        ];

        $query_string     = http_build_query( $params );
        $url              = $base_url . '?' . $query_string;
        $context          = stream_context_create( ['http' => ['ignore_errors' => true] ] );
        $channel_response = file_get_contents( $url, false, $context );

        if ( $channel_response === false ) {
            error_log( "Erro to access URL: $url" );
            $url = '';
        } else {
            $channel_data = json_decode( $channel_response, true );
            if ( isset( $channel_data['items'][0]['contentDetails']['relatedPlaylists']['uploads'] ) ) {
                $uploads_playlist_id = $channel_data['items'][0]['contentDetails']['relatedPlaylists']['uploads'];

                $url = "https://www.googleapis.com/youtube/v3/playlistItems";
                $params = [
                    'part'       => 'snippet',
                    'playlistId' => $uploads_playlist_id,
                    'maxResults' => $max_results,
                    'key'        => $youtube_key
                ];

                $query_string = http_build_query( $params );
                $url = $url . '?' . $query_string;
            } else {
                error_log( "Not fount playlist uploads on channel: $channel_id" );
                $url = '';
            }
        }
    } else {
        $url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=$playlist_id&maxResults=$max_results&key=$youtube_key";
    }

    if ( empty( $url ) ) {
        return;
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
        set_transient( $cache_key, $data, get_option('youtube_api_cache_ttl', 3600) );
        return $data;
    }

    return false;
}

/**
 * Fetch the real Shorts of a YouTube channel.
 *
 * Flow: resolve the channel uploads playlist, list up to 50 recent uploads,
 * pre-filter by duration (<= 180s) via videos.list contentDetails and then
 * validate each candidate against youtube.com/shorts/{id} (YouTube replies
 * 303 -> /watch for non-shorts).
 *
 * @param string $youtube_key YouTube API key.
 * @param string $channel_id  YouTube channel ID.
 * @param int    $max_results Maximum number of shorts to return.
 * @return array|false List of shorts (id, title, thumbnail, video_url) or false on failure.
 */
function videos_get_shorts( $youtube_key, $channel_id, $max_results ) {
    $uploads_playlist_id = videos_get_uploads_playlist_id( $youtube_key, $channel_id );

    if ( ! $uploads_playlist_id ) {
        return false;
    }

    $url = 'https://www.googleapis.com/youtube/v3/playlistItems?' . http_build_query( [
        'part'       => 'snippet',
        'playlistId' => $uploads_playlist_id,
        'maxResults' => 50,
        'key'        => $youtube_key
    ] );

    $playlist_items = videos_youtube_api_get( $url );

    if ( ! $playlist_items || empty( $playlist_items->items ) ) {
        error_log( "Could not fetch playlist items for uploads playlist: $uploads_playlist_id" );
        return false;
    }

    // Collect the candidates preserving the upload order
    $candidates = [];

    foreach ( $playlist_items->items as $item ) {
        if ( isset( $item->snippet->resourceId->videoId ) && ! empty( $item->snippet->resourceId->videoId ) ) {
            $candidates[ esc_attr( $item->snippet->resourceId->videoId ) ] = $item->snippet;
        }
    }

    if ( empty( $candidates ) ) {
        return false;
    }

    // Fetch the duration (ISO 8601) of every candidate in a single request
    $url = 'https://www.googleapis.com/youtube/v3/videos?' . http_build_query( [
        'part' => 'contentDetails',
        'id'   => implode( ',', array_keys( $candidates ) ),
        'key'  => $youtube_key
    ] );

    $videos_details = videos_youtube_api_get( $url );

    if ( ! $videos_details || empty( $videos_details->items ) ) {
        error_log( 'Could not fetch videos contentDetails for shorts candidates' );
        return false;
    }

    $durations = [];

    foreach ( $videos_details->items as $item ) {
        if ( isset( $item->id, $item->contentDetails->duration ) ) {
            $durations[ $item->id ] = videos_parse_duration_seconds( $item->contentDetails->duration );
        }
    }

    // Shorts can be up to 3 minutes long since October/2024
    $max_duration = 180;

    $data = [];

    foreach ( $candidates as $video_id => $snippet ) {
        // Pre-filter: discard videos longer than a short (or without duration info)
        if ( ! isset( $durations[ $video_id ] ) || false === $durations[ $video_id ] || $durations[ $video_id ] > $max_duration ) {
            continue;
        }

        // Authoritative validation: youtube.com/shorts/{id} redirects to /watch for non-shorts
        if ( ! videos_is_short( $video_id ) ) {
            continue;
        }

        $title     = ( isset( $snippet->title ) && ! empty( $snippet->title ) ) ? esc_attr( $snippet->title ) : false;
        $thumbnail = ( isset( $snippet->thumbnails->medium->url ) && ! empty( $snippet->thumbnails->medium->url ) ) ? esc_url( $snippet->thumbnails->medium->url ) : false;

        if ( ! $title ) {
            continue;
        }

        $data[] = [
            'id'        => $video_id,
            'title'     => $title,
            'thumbnail' => videos_get_short_thumbnail( $video_id, $thumbnail ),
            'video_url' => "https://www.youtube.com/shorts/$video_id"
        ];

        if ( count( $data ) >= $max_results ) {
            break;
        }
    }

    if ( count( $data ) > 0 ) {
        return $data;
    }

    return false;
}

/**
 * Resolve the uploads playlist ID of a YouTube channel.
 *
 * @param string $youtube_key YouTube API key.
 * @param string $channel_id  YouTube channel ID.
 * @return string|false Uploads playlist ID or false on failure.
 */
function videos_get_uploads_playlist_id( $youtube_key, $channel_id ) {
    $url = 'https://www.googleapis.com/youtube/v3/channels?' . http_build_query( [
        'part' => 'contentDetails',
        'id'   => $channel_id,
        'key'  => $youtube_key
    ] );

    $channel_data = videos_youtube_api_get( $url );

    if ( ! $channel_data || ! isset( $channel_data->items[0]->contentDetails->relatedPlaylists->uploads ) ) {
        error_log( "Not found playlist uploads on channel: $channel_id" );
        return false;
    }

    return $channel_data->items[0]->contentDetails->relatedPlaylists->uploads;
}

/**
 * Perform a GET request against the YouTube API and decode the JSON response.
 *
 * @param string $url Request URL.
 * @return object|false Decoded response or false on failure.
 */
function videos_youtube_api_get( $url ) {
    $curl = curl_init();
    curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $curl, CURLOPT_URL, $url );
    curl_setopt( $curl, CURLOPT_REFERER, get_site_url() );

    $response = curl_exec( $curl );

    if ( $response === false ) {
        error_log( "Error to access URL: $url" );
        curl_close( $curl );
        return false;
    }

    curl_close( $curl );

    $data = json_decode( $response );

    if ( ! isset( $data ) ) {
        return false;
    }

    return $data;
}

/**
 * Parse an ISO 8601 duration string (ex.: PT1M30S) into seconds.
 *
 * @param string $duration ISO 8601 duration.
 * @return int|false Duration in seconds or false when unparseable.
 */
function videos_parse_duration_seconds( $duration ) {
    try {
        $interval = new \DateInterval( $duration );
    } catch ( \Exception $e ) {
        return false;
    }

    return $interval->s
        + $interval->i * MINUTE_IN_SECONDS
        + $interval->h * HOUR_IN_SECONDS
        + $interval->d * DAY_IN_SECONDS
        + $interval->m * MONTH_IN_SECONDS
        + $interval->y * YEAR_IN_SECONDS;
}

/**
 * Check whether a video is a real Short.
 *
 * YouTube answers youtube.com/shorts/{id} with 303 -> /watch for regular
 * videos, so a 2xx response without redirect means it is a short.
 *
 * @param string $video_id YouTube video ID.
 * @return bool Whether the video is a short.
 */
function videos_is_short( $video_id ) {
    $status = videos_head_request_status( "https://www.youtube.com/shorts/$video_id" );

    // Any redirect (3xx) means YouTube sent us to /watch: not a short
    return $status >= 200 && $status < 300;
}

/**
 * Get the best thumbnail for a short.
 *
 * Prefers the official vertical shorts thumbnail (oar2.jpg); falls back to
 * the snippet medium thumbnail when it is not available.
 *
 * @param string $video_id YouTube video ID.
 * @param string $fallback Fallback thumbnail URL.
 * @return string Thumbnail URL.
 */
function videos_get_short_thumbnail( $video_id, $fallback ) {
    $shorts_thumbnail = "https://i.ytimg.com/vi/$video_id/oar2.jpg";

    if ( 200 === videos_head_request_status( $shorts_thumbnail ) ) {
        return esc_url( $shorts_thumbnail );
    }

    return $fallback ? $fallback : esc_url( "https://i.ytimg.com/vi/$video_id/hqdefault.jpg" );
}

/**
 * Perform a HEAD request and return the HTTP status code.
 *
 * @param string $url Request URL.
 * @return int HTTP status code (0 on request failure).
 */
function videos_head_request_status( $url ) {
    $curl = curl_init();
    curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $curl, CURLOPT_URL, $url );
    curl_setopt( $curl, CURLOPT_NOBODY, true );
    curl_setopt( $curl, CURLOPT_FOLLOWLOCATION, false );
    curl_setopt( $curl, CURLOPT_REFERER, get_site_url() );
    curl_setopt( $curl, CURLOPT_TIMEOUT, 10 );

    curl_exec( $curl );

    $status = curl_getinfo( $curl, CURLINFO_RESPONSE_CODE );

    curl_close( $curl );

    return intval( $status );
}
