/**
 * Query Loop block: multi post type selection.
 *
 * Adds a `ninjaPostTypes` attribute to the core Query Loop block
 * (`core/query`) and an inspector control to select more than one post type,
 * so the loop can render a mixed feed (e.g. news + columns + galleries).
 *
 * The control complements the native "Post type" dropdown: when it has
 * values it overrides the loop's post type on the front-end; when empty the
 * loop keeps its native behavior. The front-end render is handled in PHP
 * (`Ninja\apply_query_loop_post_type_override`).
 *
 * @see library/query-loop.php
 */

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { CheckboxControl, PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Post types selectable in the mixed feed.
 *
 * "Colunas" and "Galerias" are post types (`opiniao` and `galeria`), not
 * taxonomy terms.
 *
 * @type {string[]}
 */
const QUERY_POST_TYPES = [ 'post', 'opiniao', 'galeria' ];

/**
 * Registers the `ninjaPostTypes` attribute on the Query Loop block.
 *
 * @param {Object} settings Block type settings.
 * @param {string} name     Block type name.
 * @return {Object} Updated settings.
 */
const addNinjaPostTypesAttribute = ( settings, name ) => {
	if ( name !== 'core/query' ) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			ninjaPostTypes: {
				type: 'array',
				default: [],
			},
		},
	};
};

addFilter(
	'blocks.registerBlockType',
	'ninja/query-post-types/attribute',
	addNinjaPostTypesAttribute
);

/**
 * Adds the multi post type control to the Query Loop block inspector.
 */
const withQueryPostTypes = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const postTypes = useSelect( ( select ) => {
			return select( 'core' ).getPostTypes( { per_page: -1 } ) ?? [];
		}, [] );

		if ( props.name !== 'core/query' ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;
		const selected = Array.isArray( attributes.ninjaPostTypes )
			? attributes.ninjaPostTypes
			: [];

		const options = ( postTypes || [] )
			.filter( ( postType ) => QUERY_POST_TYPES.includes( postType.slug ) )
			.map( ( postType ) => ( {
				slug: postType.slug,
				label: postType.labels?.singular_name || postType.name || postType.slug,
			} ) );

		const togglePostType = ( slug ) => {
			const next = selected.includes( slug )
				? selected.filter( ( item ) => item !== slug )
				: [ ...selected, slug ];

			setAttributes( { ninjaPostTypes: next } );
		};

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Tipos de postagem (feed misto)', 'ninja' ) }
						initialOpen={ false }
					>
						<p>
							{ __(
								'Selecione mais de um tipo de postagem para exibir um feed misto. ' +
									'Quando vazio, o tipo escolhido no dropdown "Tipo de postagem" acima é usado.',
								'ninja'
							) }
						</p>
						{ options.map( ( option ) => (
							<CheckboxControl
								key={ option.slug }
								label={ option.label }
								checked={ selected.includes( option.slug ) }
								onChange={ () => togglePostType( option.slug ) }
							/>
						) ) }
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withQueryPostTypes' );

addFilter( 'editor.BlockEdit', 'ninja/query-post-types/editor', withQueryPostTypes );
