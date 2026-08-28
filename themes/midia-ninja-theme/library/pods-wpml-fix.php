<?php
/**
 * Fix one-shot: WPML x Pods CPTs internos (campos do marcador especial somem em ES).
 *
 * PRODUCTION-SAFE (por design):
 *  - O FIX one-shot roda em qualquer ambiente (prod inclusive), uma unica vez por admin.
 *  - Rotas de DEBUG e FLUSH REDIS so existem em AMBIENTES DE DEV:
 *      * exige WP_DEBUG === true  E  hostname em whitelist de dev
 *    Fora disso, esses endpoints nao sao registrados -> seguros em producao.
 *
 * Seguranca do fix: roda apenas no admin, apenas para quem tem manage_options,
 * uma unica vez (flag). Para forcar nova execucao sem CLI:
 *   ?ninja_fix_re=1
 */

namespace hacklabTema;

/**
 * Detecta se estamos em ambiente de desenvolvimento seguro.
 * Usado para liberar apenas as rotas de debug/flush (proibidas em prod).
 */
function ninja_is_dev_env() {
	// WP_DEBUG deve estar ligado (ou constante de dev definida).
	if ( ! ( defined( 'WP_DEBUG' ) && WP_DEBUG ) && ! ( defined( 'NINJA_DEV_ENV' ) && NINJA_DEV_ENV ) ) {
		return false;
	}

	$host = isset( $_SERVER['HTTP_HOST'] ) ? strtolower( $_SERVER['HTTP_HOST'] ) : '';
	if ( '' === $host ) {
		return false;
	}

	// Whitelist EXATA de hosts de dev (sem strpos, sem substring).
	$dev_hosts = array( 'dev.midianinja.org', 'localhost', '127.0.0.1' );
	return in_array( $host, $dev_hosts, true );
}

// ---- 1) FIX one-shot ------------------------------------------------------
// Roda em qualquer ambiente (prod inclusive). Protegido por manage_options + flag.
add_action( 'admin_init', function () {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$force = ! empty( $_GET['ninja_fix_re'] );

	if ( ! $force && get_option( 'ninja_pods_wpml_fix_done' ) ) {
		return;
	}

	// (a) WPML: marca os CPTs internos do Pods como NAO traduziveis.
	$s = get_option( 'icl_sitepress_settings', array() );
	if ( ! is_array( $s ) ) {
		$s = array();
	}
	if ( ! isset( $s['custom_posts_sync_option'] ) || ! is_array( $s['custom_posts_sync_option'] ) ) {
		$s['custom_posts_sync_option'] = array();
	}
	foreach ( array( '_pods_pod', '_pods_group', '_pods_field', '_pods_template', '_pods_page' ) as $pt ) {
		$s['custom_posts_sync_option'][ $pt ] = 0;
	}
	update_option( 'icl_sitepress_settings', $s );

	// (b) Limpa os transients do Pods (DB) — inclusive os vazios cacheados por idioma.
	if ( function_exists( 'pods_transient_clear' ) ) {
		pods_transient_clear();
	}
	global $wpdb;
	$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_pods%' OR option_name LIKE '_transient_timeout_pods%'" );

	// (c) Limpa o object cache do Pods.
	if ( function_exists( 'pods_cache_clear' ) ) {
		pods_cache_clear();
	}

	// (d) Se existir object cache externo (Redis/Memcached via W3TC/Redis), flush one-shot.
	if ( wp_using_ext_object_cache() && function_exists( 'wp_cache_flush' ) ) {
		wp_cache_flush();
	}

	update_option( 'ninja_pods_wpml_fix_done', time() );
}, 1 );

// ---------------------------------------------------------------------------
// FERRAMENTAS DE DIAGNÓSTICO E MANUTENÇÃO — SOMENTE AMBIENTES DE DEV
// ---------------------------------------------------------------------------
// Estas rotas (probe de verificação + flush Redis forçado) expõem informação
// interna e realizam flush completo de cache. POR ISSO só são registradas quando
// ninja_is_dev_env() retorna true (WP_DEBUG + hostname na whitelist).
// Em produção estas rotas NÃO EXISTEM — o código nem é registrado.
//
// ===== SÓ DEV =====
if ( ninja_is_dev_env() ) {

	// ---- 2) PROBE de verificacao (sem CLI) -------------------------------------
	// DUAS rotas pra contornar redirect de plugins de segurança:
	//
	//   Rota A (original, via admin_init):
	//     /wp-admin/index.php?ninja_dbg_pods=1&lang=es
	//
	//   Rota B (alternativa, via init — precede redirects):
	//     Qualquer URL com ?ninja_wpml_debug=1&lang=es
	//     Ex: https://dev.midianinja.org/?ninja_wpml_debug=1&lang=es
	//         https://dev.midianinja.org/wp-admin/?ninja_wpml_debug=1&lang=es
	//

	/**
	 * Helper: monta e retorna o array de diagnóstico.
	 */
	function ninja_wpml_pods_debug_data() {
		$lang = function_exists( 'wpml_get_current_language' ) ? wpml_get_current_language() : 'n/a';

		$on = get_posts( array(
			'post_type'        => '_pods_pod',
			'posts_per_page'   => -1,
			'post_status'      => array( 'publish', 'draft' ),
			'suppress_filters' => false,
			'fields'           => 'ids',
		) );
		$off = get_posts( array(
			'post_type'        => '_pods_pod',
			'posts_per_page'   => -1,
			'post_status'      => array( 'publish', 'draft' ),
			'suppress_filters' => true,
			'fields'           => 'ids',
		) );

		$s    = get_option( 'icl_sitepress_settings', array() );
		$sync = array();
		foreach ( array( '_pods_pod', '_pods_group', '_pods_field', '_pods_template', '_pods_page' ) as $pt ) {
			$sync[ $pt ] = isset( $s['custom_posts_sync_option'][ $pt ] ) ? $s['custom_posts_sync_option'][ $pt ] : '?';
		}

		$pod    = false;
		$groups = 'n/a';
		if ( function_exists( 'pods_api' ) ) {
			$pod = pods_api()->load_pod( array( 'name' => 'marcador_especial' ) );
		}
		if ( function_exists( 'pods_meta' ) ) {
			$grp    = pods_meta()->groups_get( 'taxonomy', 'marcador_especial' );
			$groups = is_array( $grp ) ? count( $grp ) : var_export( $grp, true );
		}

		return array(
			'lang'                 => $lang,
			'fix_done'             => get_option( 'ninja_pods_wpml_fix_done' ),
			'ext_object_cache'     => wp_using_ext_object_cache(),
			'sync_option'          => $sync,
			'wpml_translates_pods' => function_exists( 'wpml_is_translated_post_type' ) ? wpml_is_translated_post_type( '_pods_pod' ) : 'n/a',
			'wp_query_pods_on'     => count( $on ),
			'wp_query_pods_off'    => count( $off ),
			'load_pod_normal'      => is_object( $pod ) ? get_class( $pod ) : var_export( $pod, true ),
			'groups_get_count'     => $groups,
		);
	}

	/**
	 * Rota B — Alternativa que NÃO usa admin_init.
	 * Hook em 'init' prioridade 1 (executa antes de qualquer redirect).
	 * Segurança: exige usuário logado + manage_options.
	 * Uso: /?ninja_wpml_debug=1&lang=es
	 */
	add_action( 'init', function () {
		if ( empty( $_GET['ninja_wpml_debug'] ) ) {
			return;
		}

		// Segurança: só admins logados
		if ( ! is_user_logged_in() || ! current_user_can( 'manage_options' ) ) {
			return;
		}

		// Se pediu um idioma específico, força antes de coletar dados
		$lang_req = isset( $_GET['lang'] ) ? sanitize_text_field( wp_unslash( $_GET['lang'] ) ) : '';
		if ( $lang_req && function_exists( 'wpml_switch_language' ) ) {
			wpml_switch_language( $lang_req );
		}

		$data = ninja_wpml_pods_debug_data();

		status_header( 200 );
		header( 'Content-Type: application/json' );
		echo wp_json_encode( $data, JSON_PRETTY_PRINT );
		exit;
	}, 1 );

	// Rota A — original (mantida pra retrocompatibilidade)
	add_action( 'admin_init', function () {
		if ( ! current_user_can( 'manage_options' ) || empty( $_GET['ninja_dbg_pods'] ) ) {
			return;
		}

		$data = ninja_wpml_pods_debug_data();

		status_header( 200 );
		header( 'Content-Type: application/json' );
		echo wp_json_encode( $data, JSON_PRETTY_PRINT );
		exit;
	}, 20 );

	// ---- 3) FLUSH REDIS FORÇADO (dev-only, one-shot, com log) -------------------
	// Uso: /?ninja_flush_redis=1
	// Proteções:
	//   - Só registrado em dev (ninja_is_dev_env) + WP_DEBUG
	//   - Só admins logados
	//   - One-shot: registra log e pode ser re-executado com ?ninja_flush_redis=1&force=1
	//
	add_action( 'init', function () {
		if ( empty( $_GET['ninja_flush_redis'] ) ) {
			return;
		}

		$host = isset( $_SERVER['HTTP_HOST'] ) ? strtolower( $_SERVER['HTTP_HOST'] ) : '';

		// Segurança: só dev + admins logados
		if ( ! ninja_is_dev_env() || ! is_user_logged_in() || ! current_user_can( 'manage_options' ) ) {
			status_header( 403 );
			header( 'Content-Type: application/json' );
			echo wp_json_encode( array( 'error' => 'unauthorized' ) );
			exit;
		}

		$force = ! empty( $_GET['force'] );
		$log   = get_option( 'ninja_redis_flush_log', array() );

		// One-shot: já executou antes?
		if ( ! $force && ! empty( $log ) ) {
			$last = end( $log );
			status_header( 200 );
			header( 'Content-Type: application/json' );
			echo wp_json_encode( array(
				'status'  => 'already_flushed',
				'message' => 'Flush já foi executado anteriormente. Use ?ninja_flush_redis=1&force=1 para re-executar.',
				'last'    => $last,
			) );
			exit;
		}

		// --- EXECUTA O FLUSH ---
		$started = microtime( true );
		$cleared = array();

		// 1. Flush completo do object cache (Redis/Memcached)
		if ( wp_using_ext_object_cache() && function_exists( 'wp_cache_flush' ) ) {
			wp_cache_flush();
			$cleared[] = 'wp_cache_flush';
		}

		// 2. Limpa transients do Pods no banco
		if ( function_exists( 'pods_transient_clear' ) ) {
			pods_transient_clear();
			$cleared[] = 'pods_transient_clear';
		}
		global $wpdb;
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_pods%' OR option_name LIKE '_transient_timeout_pods%'" );
		$cleared[] = 'wpdb_transients_pods';

		// 3. Limpa object cache do Pods
		if ( function_exists( 'pods_cache_clear' ) ) {
			pods_cache_clear();
			$cleared[] = 'pods_cache_clear';
		}

		// 4. Limpa cache de termos do marcador_especial
		if ( taxonomy_exists( 'marcador_especial' ) ) {
			clean_taxonomy_cache( 'marcador_especial' );
			$cleared[] = 'clean_taxonomy_cache';
		}

		// 5. Limpa cache de options relevantes
		wp_cache_delete( 'icl_sitepress_settings', 'options' );
		wp_cache_delete( 'alloptions', 'options' );
		$cleared[] = 'options_cache';

		$elapsed = round( ( microtime( true) - $started ) * 1000, 2 );

		// --- LOG ---
		$entry = array(
			'timestamp'  => current_time( 'mysql' ),
			'user_id'    => get_current_user_id(),
			'user_login' => wp_get_current_user()->user_login,
			'host'       => $host,
			'cleared'    => $cleared,
			'elapsed_ms' => $elapsed,
			'force'      => $force,
		);
		$log[] = $entry;
		// Mantém só os últimos 20 registros
		if ( count( $log ) > 20 ) {
			$log = array_slice( $log, -20 );
		}
		update_option( 'ninja_redis_flush_log', $log );

		status_header( 200 );
		header( 'Content-Type: application/json' );
		echo wp_json_encode( array(
			'status'    => 'flushed',
			'message'   => 'Redis cache limpo com sucesso.',
			'cleared'   => $cleared,
			'elapsed'   => $elapsed . 'ms',
			'log_index' => count( $log ),
		), JSON_PRETTY_PRINT );
		exit;
	}, 1 );
} // fim do bloco dev-only