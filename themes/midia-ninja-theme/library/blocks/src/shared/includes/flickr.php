<?php

namespace Ninja;

function flickr_get_albums( $api_key, $user_id = '', $per_page = 10, $page = 1 ) {
	$cache_key = 'ninja_flickr_albums_' . $user_id . '_' . $per_page . '_' . $page;
	$cached_data = get_transient( $cache_key );

    if ( false !== $cached_data ) {
        return $cached_data;
    }

	$data = [];
	if ( $user_id ) {
		$request_api = 'https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=' . $api_key . '&user_id=' . $user_id . '&per_page=' . $per_page . '&page=' . $page . '&format=json&nojsoncallback=1';
		$file_get_contents = json_decode( file_get_contents( $request_api ), true );

		if ( isset( $file_get_contents['photosets']['photoset'] ) ) {
			$data = $file_get_contents['photosets']['photoset'];
		}
	}

	if ( is_array( $data ) && count( $data ) > 0 ) {
		set_transient( $cache_key, $data, 3600 );
		return $data;
	}

	return false;
}

function flickr_get_photos( $api_key, $flickr_by_type = 'user', $data_id = '', $per_page = 10, $page = 1 ) {
    $cache_key = 'ninja_flickr_photos_' . $flickr_by_type . '_' . $data_id . '_' . $per_page . '_' . $page;
    $cached_data = get_transient( $cache_key );

    if ( false !== $cached_data ) {
        return $cached_data;
    }

    $data = [];
    if ( $flickr_by_type == 'user' ) {
        $request_api = 'https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=' . $api_key . '&user_id=' . $data_id . '&extras=url_l,url_z,tags,machine_tags,media,date_upload&per_page=' . $per_page . '&page=' . $page . '&format=json&nojsoncallback=1';
        $file_get_contents = json_decode( file_get_contents( $request_api ), true );

        if ( isset( $file_get_contents['photos']['photo'] ) ) {
            $data = $file_get_contents['photos']['photo'];
        }
    } elseif ( $data_id ) {
        $request_api = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' . $api_key . '&photoset_id=' . $data_id . '&extras=url_l,url_z,tags,machine_tags,media,date_upload&per_page=' . $per_page . '&page=' . $page . '&format=json&nojsoncallback=1';
        $file_get_contents = json_decode( file_get_contents( $request_api ), true );

        if ( isset( $file_get_contents['photoset']['owner'] ) && isset( $file_get_contents['photoset']['photo'] ) ) {
            $data = $file_get_contents['photoset']['photo'];

            foreach( $data as &$p ) {
                $p['owner'] = $file_get_contents['photoset']['owner'];
            }
        }
    }

    if ( is_array( $data ) && count( $data ) > 0 ) {
        set_transient( $cache_key, $data, 3600 );
        return $data;
    }

    return false;
}
