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

	$api_key       = flickr_get_api_key();
	$secret_is_set = flickr_api_secret_is_set();

	if ( isset( $_POST['hacklab_flickr_save_keys'] ) && check_admin_referer( 'hacklab_flickr_save_keys' ) ) {

		if ( isset( $_POST['hacklab_flickr_api_key'] ) ) {
			$new_key = sanitize_text_field( wp_unslash( $_POST['hacklab_flickr_api_key'] ) );
			flickr_set_api_key( $new_key );
			$api_key = $new_key;
		}

		if ( isset( $_POST['hacklab_flickr_api_secret'] ) ) {
			$new_secret = trim( (string) wp_unslash( $_POST['hacklab_flickr_api_secret'] ) );
			if ( $new_secret !== '' ) {
				flickr_set_api_secret( $new_secret );
				$secret_is_set = true;
			}
		}

		echo '<div class="updated"><p>Chaves atualizadas.</p></div>';
	}

	if ( isset( $_POST['hacklab_flickr_disconnect'] ) && check_admin_referer( 'hacklab_flickr_connection' ) ) {
		flickr_disconnect();
		echo '<div class="updated"><p>Desconectado do Flickr.</p></div>';
	}

	$is_connected = flickr_is_connected();
	$tokens       = flickr_get_tokens();

	if ( $is_connected && ! empty( $tokens['perm'] ) ) {
		$current_perm = $tokens['perm'];
	} else {
		$current_perm = isset( $_POST['hacklab_flickr_perm'] )
			? sanitize_text_field( wp_unslash( $_POST['hacklab_flickr_perm'] ) )
			: 'read';

		if ( ! in_array( $current_perm, [ 'read', 'write', 'delete' ], true ) ) {
			$current_perm = 'read';
		}
	}

	$can_connect = ( $api_key !== '' && $secret_is_set );

	$nonce    = wp_create_nonce( 'hacklab_flickr_auth' );
	$auth_url = add_query_arg(
		[
			'action'   => 'hacklab_flickr_auth_start',
			'perm'     => $current_perm,
			'_wpnonce' => $nonce,
		],
		admin_url( 'admin-ajax.php' )
	);
	?>

	<div class="wrap">
		<h1>Configurações do Flickr</h1>
		<i>Configurações usadas na integração do plugin Hacklab Blocks com o Flickr</i>

		<hr />

		<h2>Credenciais da API</h2>
		<form method="post" style="margin-top:12px;">
			<?php wp_nonce_field( 'hacklab_flickr_save_keys' ); ?>
			<input type="hidden" name="hacklab_flickr_save_keys" value="1" />

			<table class="form-table" role="presentation">
				<tr>
					<th scope="row">
						<label for="hacklab_flickr_api_key">Chave da API</label>
					</th>
					<td>
						<input type="text"
							   id="hacklab_flickr_api_key"
							   name="hacklab_flickr_api_key"
							   class="regular-text"
							   value="<?php echo esc_attr( $api_key ); ?>"
							   autocomplete="off" />
						<p class="description">
							Sua <em>API Key</em> pública do Flickr.
						</p>
					</td>
				</tr>

				<tr>
					<th scope="row">
						<label for="hacklab_flickr_api_secret">Segredo da API</label>
					</th>
					<td>
						<input type="password"
							   id="hacklab_flickr_api_secret"
							   name="hacklab_flickr_api_secret"
							   class="regular-text"
							   value=""
							   placeholder="<?php echo $secret_is_set ? esc_attr( '***********' ) : ''; ?>"
							   autocomplete="new-password" />
						<p class="description">
							Digite para definir/atualizar. Deixe em branco para manter o segredo atual.
							O valor não é exibido por segurança.
						</p>
					</td>
				</tr>
			</table>

			<p>
				<button class="button button-primary" type="submit">
					Salvar chaves
				</button>
			</p>
		</form>

		<hr />

		<h2>Conexão com o Flickr</h2>
		<form method="post" style="margin-top:12px;">
			<?php wp_nonce_field( 'hacklab_flickr_connection' ); ?>

			<table class="form-table" role="presentation">
				<tr>
					<th scope="row">Status de conexão</th>
					<td>
						<?php if ( $is_connected ) : ?>
							<strong>
								Conectado
								<?php if ( ! empty( $tokens['perm'] ) ) : ?>
									<code>[<?php echo esc_html( $tokens['perm'] ); ?>]</code>
								<?php endif; ?>
							</strong>
						<?php else : ?>
							<strong>Desconectado</strong>
						<?php endif; ?>
					</td>
				</tr>

				<?php if ( ! $is_connected ) : ?>
					<tr>
						<th scope="row">Permissão solicitada</th>
						<td>
							<select name="hacklab_flickr_perm">
								<option value="read"   <?php selected( $current_perm, 'read' ); ?>>read</option>
								<option value="write"  <?php selected( $current_perm, 'write' ); ?>>write</option>
								<option value="delete" <?php selected( $current_perm, 'delete' ); ?>>delete</option>
							</select>
							<p class="description">
								Escopo de permissão que será solicitado ao conectar ao Flickr.
							</p>
						</td>
					</tr>
				<?php endif; ?>
			</table>

			<?php if ( $is_connected ) : ?>

				<p>
					<button class="button button-secondary"
							type="submit"
							name="hacklab_flickr_disconnect"
							value="1">
						Desconectar
					</button>
				</p>

			<?php else : ?>

				<p>
					<a class="button button-primary <?php echo $can_connect ? '' : 'disabled'; ?>"
					   href="<?php echo esc_url( $can_connect ? $auth_url : '#' ); ?>"
					   <?php echo $can_connect ? '' : 'aria-disabled="true"'; ?>>
						Conectar ao Flickr
					</a>
				</p>

				<?php if ( ! $can_connect ) : ?>
					<p class="description">
						Defina a <strong>Chave da API</strong> e o <strong>Segredo</strong> na seção acima
						antes de tentar conectar.
					</p>
				<?php endif; ?>

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

function flickr_get_api_key(): string {
    return (string) get_option( 'hacklab_flickr_api_key', '' );
}

function flickr_set_api_key( string $key ): void {
    update_option( 'hacklab_flickr_api_key', trim( $key ), true );
}

function flickr_get_api_secret(): string {
    return (string) get_option( 'hacklab_flickr_api_secret', '' );
}

function flickr_set_api_secret( string $secret ): void {
    $secret = trim( wp_unslash( $secret ) );

    if ( false === get_option( 'hacklab_flickr_api_secret', false ) ) {
        add_option( 'hacklab_flickr_api_secret', $secret, '', 'no' );
        return;
    }

    update_option( 'hacklab_flickr_api_secret', $secret, false );
}

function flickr_api_secret_is_set(): bool {
    $s = (string) get_option( 'hacklab_flickr_api_secret', '' );
    return $s !== '';
}

// Auth
function flickr_client(): \Samwilson\PhpFlickr\PhpFlickr {
	$flickr_api_key = flickr_get_api_key();
	$flickr_api_secret = flickr_get_api_secret();

	if ( ! $flickr_api_key || ! $flickr_api_secret ) {
		wp_die( 'Adicione a chave da API e o secret no painel administrativo.' );
	}

	return new \Samwilson\PhpFlickr\PhpFlickr( $flickr_api_key, $flickr_api_secret );
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
