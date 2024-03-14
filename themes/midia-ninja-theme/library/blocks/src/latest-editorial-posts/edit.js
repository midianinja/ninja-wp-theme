import { __ } from '@wordpress/i18n'

const { useEffect, useState } = wp.element

import ServerSideRender from '@wordpress/server-side-render'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'

import {
	__experimentalNumberControl as NumberControl,
	Disabled,
	PanelBody,
	PanelRow,
	TextControl
} from '@wordpress/components'

import SelectCategory from './components/SelectCategory'

import metadata from './block.json'
import './editor.scss'

export default function Edit( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'latest-editorial-posts-block'
	} )

	const {
		adShortcode,
		blockId,
		termsToFilter
	} = attributes

	useEffect(() => {
		if (!blockId) {
			setAttributes( { blockId: clientId } )
		}
	})

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

					<PanelRow>
						<TextControl
							label={ __( 'Shortcode Ads', 'ninja' ) }
							value={ adShortcode }
							onChange={ ( value ) => { setAttributes( { adShortcode: value } ) } }
							help={ __(
								'Paste the shortcode of the ad you want to show.',
								'ninja'
							) }
						/>
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