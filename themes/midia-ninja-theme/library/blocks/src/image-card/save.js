import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

export default function save( { attributes } ) {

	const blockProps = useBlockProps.save( { style: { borderColor: attributes.borderColor } } )

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	)
}
