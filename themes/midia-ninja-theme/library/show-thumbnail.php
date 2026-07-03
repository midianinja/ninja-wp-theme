<?php
namespace hacklabTema;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Persistência defensiva do campo "show_thumbnail" (post type: opiniao).
 *
 * O Pods grava o checkbox corretamente, porém sincronizadores multilíngues
 * (WPML) e outros hooks de save_post podem sobrescrever o valor depois do
 * salvamento do Pods. Este hook roda em prioridade alta (1000) para garantir
 * a "última palavra" no valor do meta, tratando explicitamente o estado
 * desmarcado ('0') — caso que checkboxes HTML não enviam no POST.
 */
function persist_show_thumbnail( $post_id, $post, $update ) {
	if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( wp_doing_ajax() ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	// Bloqueia Quick Edit / Bulk Edit.
	if ( isset( $_POST['action'] ) && 'inline-save' === sanitize_text_field( wp_unslash( $_POST['action'] ) ) ) {
		return;
	}

	// Apenas salvamentos via editor clássico (meta box do Pods).
	// O nonce confirma que o formulário de edição foi submetido.
	$nonce = isset( $_POST['pods_meta'] ) ? sanitize_text_field( wp_unslash( $_POST['pods_meta'] ) ) : '';

	if ( ! $nonce || ! wp_verify_nonce( $nonce, 'pods_meta_post' ) ) {
		return;
	}

	// Checkbox marcado envia a chave no POST; desmarcado não envia (HTML padrão).
	$value = isset( $_POST['pods_meta_show_thumbnail'] ) ? '1' : '0';

	update_post_meta( $post_id, 'show_thumbnail', $value );

	// Invalida caches para o post (core + W3 Total Cache, se ativo).
	clean_post_cache( $post_id );

	if ( function_exists( 'w3tc_flush_post' ) ) {
		w3tc_flush_post( $post_id );
	}
}

add_action( 'save_post_opiniao', 'hacklabTema\\persist_show_thumbnail', 1000, 3 );
