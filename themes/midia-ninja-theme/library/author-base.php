<?php
/**
 * Base do archive de autores: /coluna/ no lugar de /author/
 *
 * Troca a base do permalink de autor do WordPress de /author/{nicename}/
 * para /coluna/{nicename}/, usada como "single" dos colunistas.
 *
 * Notas de compatibilidade:
 * - Co-Authors Plus monta as URLs de guest authors a partir de
 *   WP_Rewrite::get_author_permastruct() (filter_author_link), então os
 *   guest authors seguem a nova base automaticamente.
 * - WPML apenas converte a URL final (SitePress::author_link -> convert_url)
 *   prefixando o diretório do idioma: /coluna/{nome} (pt-br, default sem
 *   prefixo), /es/coluna/{nome} e /en/coluna/{nome}.
 * - O slug da base NÃO é traduzido por idioma (decisão de produto aceita).
 * - URLs antigas /author/{nome} recebem redirect 301 para /coluna/{nome},
 *   preservando idioma, feed e paginação.
 *
 * @package hacklabTema
 */

namespace hacklabTema;

const NINJA_AUTHOR_BASE = 'coluna';

/**
 * Troca a base de autor no init.
 *
 * WP_Rewrite::init() roda antes da ação 'init' e get_author_permastruct()
 * é lazy: o unset() força o recálculo da estrutura com a nova base mesmo
 * que algo já a tenha resolvido durante o carregamento dos plugins.
 */
add_action( 'init', function () {
	global $wp_rewrite;

	if ( $wp_rewrite->author_base !== NINJA_AUTHOR_BASE ) {
		$wp_rewrite->author_base = NINJA_AUTHOR_BASE;
		unset( $wp_rewrite->author_structure );
	}

	// Flush único: grava as novas regras no banco sem custar a cada request.
	if ( get_option( 'ninja_author_base_flushed' ) !== NINJA_AUTHOR_BASE ) {
		flush_rewrite_rules();
		update_option( 'ninja_author_base_flushed', NINJA_AUTHOR_BASE );
	}
} );

/**
 * Flush adicional ao (re)ativar o tema.
 */
add_action( 'after_switch_theme', function () {
	global $wp_rewrite;

	$wp_rewrite->author_base = NINJA_AUTHOR_BASE;
	unset( $wp_rewrite->author_structure );
	flush_rewrite_rules();
	update_option( 'ninja_author_base_flushed', NINJA_AUTHOR_BASE );
} );

/**
 * Redirect 301 das URLs antigas /author/{nome} para /coluna/{nome}.
 *
 * Só executa em 404: após a troca da base, /author/... não casa mais com
 * nenhuma rewrite rule. O diretório de idioma (ex.: /es) é descartado no
 * parse e re-adicionado pelo home_url() — o WPML já detectou o idioma da
 * URL bruta, então o destino fica correto em qualquer idioma. Sufixos de
 * feed e paginação são preservados como estão.
 *
 * Roda com prioridade 1 para vencer o redirect_canonical do core (também
 * em template_redirect, prioridade 10): sem isso, o "chute" de permalink
 * do WP pode mandar /author/{nome} para um post com slug igual (ex.:
 * existe post opiniao com slug "amandagondim") em vez da página do autor.
 */
add_action( 'template_redirect', function () {
	if ( ! is_404() ) {
		return;
	}

	$request = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '';
	$path    = (string) wp_parse_url( $request, PHP_URL_PATH );

	if ( '' === $path ) {
		return;
	}

	// Captura o que vier depois de /author/, incluindo /feed/, /page/2/ etc.
	if ( ! preg_match( '#^(.*?)/author/([^/]+)(/.*)?$#', $path, $matches ) ) {
		return;
	}

	$slug        = $matches[2];
	$rest        = isset( $matches[3] ) ? $matches[3] : '';
	$destination = home_url( user_trailingslashit( '/coluna/' . $slug . $rest ) );

	if ( ! empty( $_SERVER['QUERY_STRING'] ) ) {
		$destination .= '?' . $_SERVER['QUERY_STRING'];
	}

	wp_redirect( $destination, 301 );
	exit;
}, 1 );
