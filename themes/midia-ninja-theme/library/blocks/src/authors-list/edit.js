import { __ } from '@wordpress/i18n'

import ServerSideRender from '@wordpress/server-side-render'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'

import {
	__experimentalNumberControl as NumberControl,
	Disabled,
	TextControl,
	PanelBody,
	PanelRow,
} from '@wordpress/components'

import metadata from './block.json'
import './editor.scss'

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'authors-list-block'
	} )

	const {
		featuredAuthorsToShow,
		subheading,
	} = attributes

	return (
		<>
			<InspectorControls>
				<PanelBody
					className="authors-list-block-inspector-controls"
					title={ __( 'Settings', 'ninja' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<TextControl
							label={ __( 'Subheading', 'ninja' ) }
							value={ subheading }
							onChange={ (subheading) => setAttributes({ subheading }) }
						/>
					</PanelRow>

					<PanelRow>
						<NumberControl
							label={ __( 'Featured authors to show', 'ninja' ) }
							max={ 8 }
							min={ 3 }
							step={ 1 }
							value={ featuredAuthorsToShow }
							onChange={ ( value ) => { setAttributes( { featuredAuthorsToShow: parseInt(value) } ) } }
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
