import { __ } from '@wordpress/i18n'

const { useEffect, useState } = wp.element

import ServerSideRender from '@wordpress/server-side-render'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'

import {
	Disabled,
	TextControl,
	PanelBody,
	PanelRow,
	SelectControl
} from '@wordpress/components'

import metadata from './block.json'
import './editor.scss'

export default function Edit( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'flickr-gallery-block'
	} )

	const [albums, setAlbums] = useState([])

	const {
		blockId,
		description,
		flickrAPIKey,
		flickrByType,
		flickrUserId,
		flickrAlbumId,
		heading,
	} = attributes

	const onChangeHeading = ( newHeading ) => {
		setAttributes( { heading: newHeading } )
	}

	useEffect(() => {
		if (!blockId) {
			setAttributes( { blockId: clientId } )
		}
	})

	useEffect(() => {
		if (flickrAPIKey && flickrUserId && !albums) {
			console.log('Need to fetch albums')
		}
	}, [albums, flickrAPIKey, flickrUserId, setAlbums])

	return (
		<>
			<InspectorControls>
				<PanelBody
					className="flickr-gallery-block-inspector-controls"
					title={ __( 'Settings', 'ninja' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<TextControl
							label={ __( 'Heading', 'ninja' ) }
							value={ heading }
							onChange={ onChangeHeading }
							help={ __(
								'The block title. Leave blank to not display',
								'ninja'
							) }
						/>
					</PanelRow>

					<PanelRow>
						<TextControl
							label={ __( 'Description', 'ninja' ) }
							value={ description }
							onChange={ ( value ) => { setAttributes( { description: value } ) } }
							help={ __(
								'The block description. Leave blank to not display',
								'ninja'
							) }
						/>
					</PanelRow>

					<PanelRow>
						<TextControl
							label={ __( 'Flickr API Key', 'ninja' ) }
							value={ flickrAPIKey }
							onChange={ ( value ) => { setAttributes( { flickrAPIKey: value } ) } }
						/>
					</PanelRow>

					<PanelRow>
						<SelectControl
							label={ __( 'Type of the content', 'ninja' ) }
							value={ flickrByType }
							options={[
								{
									label: __( 'Images by user', 'ninja' ),
									value: "user"
								},
								{
									label: __( 'Images by album', 'ninja' ),
									value: "album"
								}
							]}
							onChange={ ( value ) => {
								setAttributes( { flickrByType: value } )
							} }
						/>
					</PanelRow>

					<PanelRow>
						{ ( flickrByType == 'album' ) && (
							<TextControl
								label={ __( 'Album ID', 'ninja' ) }
								value={ flickrAlbumId }
								onChange={ ( value ) => {
									setAttributes( { flickrAlbumId: value } )
								} }
							/>
						) }

						{ ( flickrByType == 'user' ) && (
							<TextControl
								label={ __( 'User ID', 'ninja' ) }
								value={ flickrUserId }
								onChange={ ( value ) => {
									setAttributes( { flickrUserId: value } )
								} }
							/>
						) }
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
