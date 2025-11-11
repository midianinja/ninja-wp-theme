<?php

namespace Ninja;

use Throwable;

add_action( 'init', function () {
	if ( ! headers_sent() && ! session_id() ) {
		session_start();
	}
}, 1 );

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

/**
 * Busca a árvore de coleções do Flickr (collections.getTree).
 *
 * @param string $user_id        ID do usuário (ex.: "123@N01"). Se vazio, tenta usar token (conta conectada).
 * @param string $collection_id  Opcional: ID de uma coleção específica para começar a partir dela.
 * @param int    $cache_ttl      TTL do cache em segundos (default: 3600).
 *
 * @return array|false           ['data' => <array>, 'pages' => 1] em caso de sucesso; false se vazio/erro.
 */
function flickr_get_collections( string $user_id = '', string $collection_id = '', int $cache_ttl = 3600 ) {
    $cache_key = 'ninja_flickr_collections_' . md5( $user_id . '|' . $collection_id );
    $cached = get_transient( $cache_key );
    if ( false !== $cached ) {
        return $cached;
    }

    try {
        $flickr = flickr_client();

        if ( $storage = flickr_storage_from_options() ) {
            $flickr->setOauthStorage( $storage );
        }

        $params = [];
        if ( $user_id !== '' )       $params['user_id']       = $user_id;
        if ( $collection_id !== '' ) $params['collection_id'] = $collection_id;

        $resp = $flickr->collections()->getTree( $params );

        $data = [];
        if ( is_array( $resp ) && ! empty( $resp['collections'] ) ) {
            $data = $resp['collections']['collection'] ?? [];
            if ( ! is_array( $data ) ) $data = [];
        }

        $out = ['data' => $data, 'pages' => 1];

        if ( !empty($out['data'] ) ) {
            set_transient( $cache_key, $out, $cache_ttl );
            return $out;
        }

        return false;

    } catch (Throwable $e) {
        return false;
    }
}


// Options page
function flickr_register_options_page() {
	add_options_page(
		'Flickr',
		'Flickr',
		'manage_options',
		'hacklab-flickr',
		'Ninja\\flickr_render_settings_page'
	);
}

add_action( 'admin_menu', 'Ninja\\flickr_register_options_page' );

function flickr_render_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	if ( isset( $_POST['hacklab_flickr_disconnect'] ) && check_admin_referer( 'hacklab_flickr_disconnect' ) ) {
		flickr_disconnect();
		echo '<div class="updated"><p>Desconectado do Flickr.</p></div>';
	}

	$is_connected = flickr_is_connected();
	$tokens = flickr_get_tokens();

	$perm = isset( $_POST['hacklab_flickr_perm'] ) ? sanitize_text_field( $_POST['hacklab_flickr_perm']) : $tokens['perm'];
	if ( ! in_array( $perm, ['read', 'write', 'delete'], true ) ) {
		$perm = 'read';
	}

	$nonce = wp_create_nonce( 'hacklab_flickr_auth' );
	$auth_url_base = add_query_arg( [
		'action'   => 'hacklab_flickr_auth_start',
		'perm'     => $perm,
		'_wpnonce' => $nonce
	], admin_url( 'admin-ajax.php' ) );

	$auth_url = add_query_arg( 'perm', $perm, $auth_url_base );

	?>

	<div class="wrap">
		<h1>Configurações do Flickr</h1>
		<i>Configurações usadas na integração do plugin Hacklab Blocks com o Flickr</i>

		<form method="post">
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row">Status</th>
					<td>
						<?php if ( $is_connected ) : ?>
							<strong>Conectado <code>[<?php echo esc_html( $tokens['perm'] ); ?>]</code></strong><br>
						<?php else: ?>
							<strong>Desconectado</strong>
						<?php endif; ?>
					</td>
				</tr>
				<?php if ( ! $is_connected ) : ?>
					<tr>
						<th scope="row">Permissão</th>
						<td>
							<select name="hacklab_flickr_perm">
								<option value="read"   <?php selected( $perm, 'read' ); ?>>read</option>
								<option value="write"  <?php selected( $perm,'write' ); ?>>write</option>
								<option value="delete" <?php selected( $perm,'delete' ); ?>>delete</option>
							</select>
							<p class="description">Escolha o escopo antes de conectar.</p>
						</td>
					</tr>
				<?php endif; ?>
			</table>

			<?php if ( $is_connected ): ?>
				<?php wp_nonce_field('hacklab_flickr_disconnect'); ?>
				<p>
					<button class="button button-secondary" name="hacklab_flickr_disconnect" value="1">Desconectar</button>
				</p>
			<?php else: ?>
				<p>
					<a class="button button-primary" href="<?php echo esc_url( $auth_url ); ?>">Conectar ao Flickr</a>
				</p>
			<?php endif; ?>
		</form>
	</div>
	<?php
}

// Helpers
function flickr_storage_from_options(): ?\OAuth\Common\Storage\Memory {
	$t = flickr_get_tokens();
	if ( ! $t['access'] || !$t['secret'] ) return null;

	$token = new \OAuth\OAuth1\Token\StdOAuth1Token();
	$token->setAccessToken( $t['access'] );
	$token->setAccessTokenSecret( $t['secret'] );

	$storage = new \OAuth\Common\Storage\Memory();
	$storage->storeAccessToken( 'Flickr', $token );
	return $storage;
}

function flickr_disconnect(): void {
	delete_option( 'hacklab_flickr_access_token' );
	delete_option( 'hacklab_flickr_access_secret' );
}

function flickr_is_connected(): bool {
	$t = flickr_get_tokens();
	return (bool)( $t['access'] && $t['secret'] );
}

function flickr_get_tokens(): array {
	return [
		'access' => get_option( 'hacklab_flickr_access_token' ) ?: '',
		'secret' => get_option( 'hacklab_flickr_access_secret' ) ?: '',
		'perm'   => get_option( 'hacklab_flickr_perm' ) ?: 'read',
	];
}

function flickr_set_tokens( string $access, string $secret, string $perm ): void {
	update_option( 'hacklab_flickr_access_token',  $access );
	update_option( 'hacklab_flickr_access_secret', $secret );
	update_option( 'hacklab_flickr_perm',          $perm );
}


// Auth
function flickr_client(): \Samwilson\PhpFlickr\PhpFlickr {
	if ( ! defined('FLICKR_API_KEY') || ! defined( 'FLICKR_API_SECRET' ) ) {
		wp_die('Defina FLICKR_API_KEY e FLICKR_API_SECRET no wp-config.php');
	}
	return new \Samwilson\PhpFlickr\PhpFlickr( FLICKR_API_KEY, FLICKR_API_SECRET );
}

function flickr_auth_start() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( "Sem permissão", 403 );
	}

	check_admin_referer( 'hacklab_flickr_auth' );

	$perm = isset( $_GET['perm'] ) ? sanitize_text_field( $_GET['perm'] ) : 'read';
	if ( ! in_array( $perm, ['read','write','delete'], true ) ) {
		$perm = 'read';
	}

	$flickr = flickr_client();
	$storage = new \OAuth\Common\Storage\Session();
	$flickr->setOauthStorage( $storage );

	update_option( 'hacklab_flickr_perm', $perm );

	$callback = add_query_arg([
		'action' => 'hacklab_flickr_auth_callback'
	], admin_url( 'admin-ajax.php' ) );

	try {
		$url = $flickr->getAuthUrl( $perm, $callback );
		wp_redirect( $url );
		exit;
	} catch ( Throwable $e ) {
		wp_die( 'Erro ao iniciar OAuth :' . esc_html( $e->getMessage() ) );
	}
}

add_action( 'wp_ajax_hacklab_flickr_auth_start', 'Ninja\\flickr_auth_start' );

function flickr_auth_callback() {
	$is_admin = is_user_logged_in() && current_user_can( 'manage_options' );

	if ( empty( $_GET['oauth_verifier'] ) || empty( $_GET['oauth_token'] ) ) {
		wp_die( 'Callback inválido.' );
	}

	$flickr  = flickr_client();
	$storage = new \OAuth\Common\Storage\Session();
	$flickr->setOauthStorage( $storage );

	try {
		$accessObj = $flickr->retrieveAccessToken(
			sanitize_text_field( $_GET['oauth_verifier'] ),
			sanitize_text_field( $_GET['oauth_token'] )
		);

		$perm   = get_option( 'hacklab_flickr_perm', 'read' );
		$access = $accessObj->getAccessToken();
		$secret = $accessObj->getAccessTokenSecret();

		flickr_set_tokens( $access, $secret, $perm );

		$target = $is_admin
			? admin_url( 'options-general.php?page=hacklab-flickr&flickr_connected=1' )
			: home_url( '/?flickr_connected=1' );

		wp_safe_redirect( $target );
		exit;

	} catch ( Throwable $e ) {
		wp_die( 'Erro no callback OAuth: ' . esc_html( $e->getMessage() ) );
	}
}

add_action( 'wp_ajax_hacklab_flickr_auth_callback',      'Ninja\\flickr_auth_callback' );
add_action( 'wp_ajax_nopriv_hacklab_flickr_auth_callback','Ninja\\flickr_auth_callback' );
