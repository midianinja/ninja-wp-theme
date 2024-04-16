import { __ } from '@wordpress/i18n'
import { useSelect } from '@wordpress/data';
import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor'

import {
	ColorPalette,
	PanelBody,
	PanelRow
} from '@wordpress/components'

export default function Edit( { attributes, setAttributes } ) {
	const {
		blockId,
		borderColor,
		linkUrl,
	} = attributes

	const blockProps = useBlockProps( { style: { borderColor: borderColor } } )

	const ALLOWED_BLOCKS = [
		"core/group",
		"core/image",
		"core/heading",
		"core/paragraph",
		"core/buttons",
		"core/button"
	]

	const BLOCK_TEMPLATE = [
		['core/group', { className: 'wrapper-image' }, [
			[ 'core/image', {} ],
		]],
		['core/group', { className: 'wrapper-content', templateLock: false, allowedBlocks: ALLOWED_BLOCKS }, [
			[ 'core/heading', { placeholder: __( 'Title', 'ninja' ) } ],
			[ 'core/paragraph', { placeholder: __( 'Summary', 'ninja' ) } ],
			[ 'core/buttons', { templateLock: false }, [
				[ 'core/button', { url: linkUrl, text: 'Read more'} ]
			] ]
		]]
	]

	const colors = useSelect((select) => {
		return select('core/block-editor').getSettings().colors
	}, [])

	const onChangeColor = (value) => {
		setAttributes({ borderColor: value })
	}

	return (
		<>
			<div { ...blockProps }>
				<InnerBlocks
					template={ BLOCK_TEMPLATE }
					templateLock="all"
				/>

				<InspectorControls>
					<PanelBody
						className="iamge-card-block-inspector-controls"
						title={ __( 'Border color', 'ninja' ) }
						initialOpen={ false }
					>
						<ColorPalette
							colors={ colors }
							onChange={ onChangeColor }
							clearable={ false }
							value={ borderColor }
						/>
					</PanelBody>
				</InspectorControls>
			</div>
		</>
	)
}
