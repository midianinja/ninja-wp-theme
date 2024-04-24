<?php

namespace Ninja;

function flickr_decrypt_key( $cipher ) {
	$algo = 'aes-128-gcm';
	$parts = explode( '|', $cipher );

	return openssl_decrypt( base64_decode( $parts[1] ), $algo, 'hacklab_ninja_flickr', 0, base64_decode( $parts[0] ), base64_decode( $parts[2] ) );
}

function flickr_encrypt_key( $api_key ) {
	$algo = 'aes-128-gcm';
	$iv = openssl_random_pseudo_bytes( openssl_cipher_iv_length( $algo ) );
	$tag = '';

	$cipher = openssl_encrypt( $api_key, $algo, 'hacklab_ninja_flickr', 0, $iv, $tag );
	return base64_encode( $iv ) . '|' . base64_encode( $cipher ) . '|' . base64_encode( $tag );
}

function flickr_get_albums( $api_key, $user_id = '', $per_page = 10, $page = 1 ) {
	$cache_key = 'ninja_flickr_albums_' . $user_id . '_' . $per_page . '_' . $page;
	$cached_data = get_transient( $cache_key );

    if ( false !== $cached_data ) {
        return $cached_data;
    }

    $response = [ 'data' => [], 'pages' => 1 ];
	if ( $user_id ) {
		$request_api = 'https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=' . $api_key . '&user_id=' . $user_id . '&per_page=' . $per_page . '&page=' . $page . '&format=json&nojsoncallback=1';
		$contents = json_decode( file_get_contents( $request_api ), true );

		if ( isset( $contents['photosets']['photoset'] ) ) {
			$response['data'] = $contents['photosets']['photoset'];
			$response['pages'] = $contents['photosets']['pages'];
		}
	}

	if ( is_array( $response['data'] ) && count( $response['data'] ) > 0 ) {
		set_transient( $cache_key, $response, 3600 );
		return $response;
	}

	return false;
}

function flickr_get_photos( $api_key, $flickr_by_type = 'user', $data_id = '', $per_page = 10, $page = 1 ) {
    $cache_key = 'ninja_flickr_photos_' . $flickr_by_type . '_' . $data_id . '_' . $per_page . '_' . $page;
    $cached_data = get_transient( $cache_key );

    if ( false !== $cached_data ) {
        return $cached_data;
    }

    $response = [ 'data' => [], 'pages' => 1 ];
    if ( $flickr_by_type == 'user' ) {
        $request_api = 'https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=' . $api_key . '&user_id=' . $data_id . '&extras=media,date_upload&per_page=' . $per_page . '&page=' . $page . '&format=json&nojsoncallback=1';
        $contents = json_decode( file_get_contents( $request_api ), true );

        if ( isset( $contents['photos']['photo'] ) ) {
            $response['data'] = $contents['photos']['photo'];
			$response['pages'] = $contents['photos']['pages'];
        }
    } elseif ( $data_id ) {
        $request_api = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' . $api_key . '&photoset_id=' . $data_id . '&extras=media,date_upload&per_page=' . $per_page . '&page=' . $page . '&format=json&nojsoncallback=1';
        $contents = json_decode( file_get_contents( $request_api ), true );

        if ( isset( $contents['photoset']['owner'] ) && isset( $contents['photoset']['photo'] ) ) {
            $response['data'] = $contents['photoset']['photo'];
			$response['pages'] = $contents['photoset']['pages'];

            foreach( $response['data'] as &$p ) {
                $p['owner'] = $contents['photoset']['owner'];
            }
        }
    }

	if ( is_array( $response['data'] ) && count( $response['data'] ) > 0 ) {
        set_transient( $cache_key, $response, 3600 );
        return $response;
    }

    return false;
}
