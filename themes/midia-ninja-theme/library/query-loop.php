<?php
/**
 * Query Loop block multi post type support.
 *
 * The site's "Colunas" and "Galerias" sections are not terms of the
 * `category` taxonomy ("Editorials"): "Colunas" maps to the `opiniao` post
 * type and "Galerias" maps to the `galeria` post type.
 *
 * The Query Loop block (`core/query`) only allows a single post type
 * through its native "Post type" dropdown, so this module registers a
 * `ninjaPostTypes` attribute on the block (multi-select, added in the
 * editor) and applies it on the front-end: when the attribute has values,
 * the loop renders a mixed feed of the selected post types (e.g.
 * `post` + `opiniao` + `galeria`). When it is empty, the loop keeps its
 * native post type behavior.
 *
 * The editor script that adds the attribute and the inspector control is
 * built from `library/blocks/src/query-post-types/` and enqueued below.
 *
 * @package Ninja
 */

namespace Ninja;

/**
 * Stores the multi post type selection of each Query Loop block, keyed by
 * its `queryId`, so it can be read while the loop's post template renders.
 */
final class Query_Loop_Post_Types {
	/**
	 * Selected post types per Query Loop block `queryId`.
	 *
	 * @var array
	 */
	private static $overrides = [];

	/**
	 * Store the selection of a Query Loop block.
	 *
	 * @param int|string|null $query_id   Query Loop block `queryId` attribute.
	 * @param array           $post_types Selected post type slugs.
	 */
	public static function set( $query_id, $post_types ) {
		self::$overrides[ $query_id ] = $post_types;
	}

	/**
	 * Get the stored selection of a Query Loop block.
	 *
	 * @param int|string|null $query_id Query Loop block `queryId` attribute.
	 * @return array Selected post type slugs.
	 */
	public static function get( $query_id ) {
		return isset( self::$overrides[ $query_id ] ) ? self::$overrides[ $query_id ] : [];
	}
}

/**
 * Capture the `ninjaPostTypes` attribute of each Query Loop block before it
 * renders, keyed by the block's `queryId`.
 *
 * The `query_loop_block_query_vars` filter receives the `core/post-template`
 * block, whose context only carries the core `query` object — not custom
 * attributes of the `core/query` block. The selection is captured here via
 * `render_block_data` (which runs before the inner blocks render) and read
 * later using the shared `queryId`.
 *
 * @param array $parsed_block The block being rendered.
 * @return array The unchanged parsed block.
 */
function capture_query_loop_post_type_override( $parsed_block ) {
	if ( ! isset( $parsed_block['blockName'] ) || 'core/query' !== $parsed_block['blockName'] ) {
		return $parsed_block;
	}

	$attrs      = isset( $parsed_block['attrs'] ) ? $parsed_block['attrs'] : [];
	$query_id   = isset( $attrs['queryId'] ) ? $attrs['queryId'] : null;
	$post_types = isset( $attrs['ninjaPostTypes'] ) && is_array( $attrs['ninjaPostTypes'] )
		? $attrs['ninjaPostTypes']
		: [];

	Query_Loop_Post_Types::set( $query_id, $post_types );

	return $parsed_block;
}
add_filter( 'render_block_data', 'Ninja\\capture_query_loop_post_type_override', 10, 1 );

/**
 * Apply the multi post type selection of a Query Loop block to the rendered
 * query.
 *
 * When `ninjaPostTypes` has values, the loop's `post_type` becomes the
 * deduplicated list of the selected post types (a string when only one is
 * selected). When empty, the query is left untouched so the loop keeps its
 * native post type behavior.
 *
 * @param array    $query WP_Query arguments built from the block.
 * @param WP_Block $block The block being rendered.
 * @param int      $page  Current query page.
 * @return array Updated WP_Query arguments.
 */
function apply_query_loop_post_type_override( $query, $block, $page ) {
	$query_id = isset( $block->context['queryId'] ) ? $block->context['queryId'] : null;
	$selected = Query_Loop_Post_Types::get( $query_id );

	if ( empty( $selected ) || ! is_array( $selected ) ) {
		return $query;
	}

	$post_types = array_values(
		array_filter(
			array_unique( array_map( 'sanitize_key', $selected ) ),
			'post_type_exists'
		)
	);

	if ( empty( $post_types ) ) {
		return $query;
	}

	$query['post_type'] = 1 === count( $post_types ) ? $post_types[0] : $post_types;

	return $query;
}
add_filter( 'query_loop_block_query_vars', 'Ninja\\apply_query_loop_post_type_override', 10, 3 );

/**
 * Enqueue the editor script that adds the multi post type control to the
 * Query Loop block inspector.
 *
 * Only the block editor needs this script; the front-end render is handled
 * by `apply_query_loop_post_type_override()`.
 */
function enqueue_query_loop_post_types_editor_script() {
	$asset_file = get_template_directory() . '/library/blocks/build/query-post-types/index.asset.php';

	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = require $asset_file;

	wp_enqueue_script(
		'ninja-query-post-types',
		get_template_directory_uri() . '/library/blocks/build/query-post-types/index.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'Ninja\\enqueue_query_loop_post_types_editor_script' );
