<?php

namespace jaci;

class API {
    /**
     * Dumps error
     *
     * @param array $message error message. default "Message not suplied"
     * @return array
     */
    private static function dump_error($message = "Message not suplied") {
        return ['error' => $message];
    }

    static function get_time($params) {
        return time();
    }

    static function construct_endpoints() {
        add_action( 'rest_api_init', function () {
            register_rest_route( 'api', '/time', array(
                'methods' => 'GET',
                'callback' => 'jaci\API::get_time',
                'permission_callback' => function() {
                    return true;
                },
            ) );
        } );
    }

}

API::construct_endpoints();