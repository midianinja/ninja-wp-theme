import { __ } from '@wordpress/i18n'

const { useEffect, useState } = wp.element

import ServerSideRender from '@wordpress/server-side-render'
import apiFetch from '@wordpress/api-fetch'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'

import {
	__experimentalNumberControl as NumberControl,
	Disabled,
	TextControl,
	PanelBody,
	PanelRow,
	QueryControls,
	SelectControl
} from '@wordpress/components'

import SelectCategory from './components/SelectCategory'

import metadata from './block.json'
import './editor.scss'

export default function Edit( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'latest-editorial-posts-block'
	} )

	const { 
		blockId,
		termsToFilter
	} = attributes

	useEffect(() => {
		if (!blockId) {
			setAttributes( { blockId: clientId } )
		}
	})

	// Init query args
	const [ query ] = useState( {
		maxItems: 10,
		minItems: 1,
		numberOfItems: 10
	} )

	const { maxItems, minItems, numberOfItems } = query

	const onChangeSelectCategory = (value) => {
		setAttributes({ termsToFilter: value })
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					className="latest-horizontal-posts-block-inspector-controls"
					title={ __( 'Settings', 'ninja' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<SelectCategory onChangeSelectCategory={ onChangeSelectCategory } selectedCategories={ termsToFilter } />
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<Disabled>
					<ServerSideRender
						block={ metadata.name }
						skipBlockSupportAttributes
						attributes={ attributes }
					/>
				</Disabled>
			</div>
		</>
	)
}