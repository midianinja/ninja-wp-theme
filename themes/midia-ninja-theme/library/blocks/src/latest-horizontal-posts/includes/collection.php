<?php

namespace Ninja;

function flickr_get_contents( $api_key, $flickr_by_type = 'user', $data_id = '' ) {
    $data = [];
    if ( $flickr_by_type == 'user' ) {
        $request_api = 'https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=' . $api_key . '&user_id=' . $data_id . '&extras=url_l,url_z,tags,machine_tags,media,date_upload&per_page=10&format=json&nojsoncallback=1';
        $file_get_contents = json_decode( file_get_contents( $request_api ), true );

        if ( isset( $file_get_contents['photos']['photo'] ) ) {
            $data = $file_get_contents['photos']['photo'];
        }
    } elseif ( $data_id ) {
        $request_api = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' . $api_key . '&photoset_id=' . $data_id . '&extras=url_l,url_z,tags,machine_tags,media,date_upload&per_page=10&format=json&nojsoncallback=1';
        $file_get_contents = json_decode( file_get_contents( $request_api ), true );

        if ( isset( $file_get_contents['photoset']['owner'] ) && isset( $file_get_contents['photoset']['photo'] ) ) {
            $data = $file_get_contents['photoset']['photo'];

            foreach( $data as &$p ) {
                $p['owner'] = $file_get_contents['photoset']['owner'];
            }
        }
    }

    if ( is_array( $data ) && count( $data ) > 0 ) {
        return $data;
    }

    return false;
}