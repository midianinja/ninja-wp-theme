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

import SelectUserAlbum from './components/SelectUserAlbum'

import metadata from './block.json'
import './editor.scss'

export default function Edit( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'flickr-gallery-block'
	} )

	const {
		blockId,
		flickrAlbumId,
		flickrByType,
		flickrCollectionId,
		flickrUserId,
	} = attributes

	const onSelectUserAlbum = ( flickrAlbumId ) => {
		setAttributes({ flickrByType: 'album', flickrAlbumId });
	}

	useEffect(() => {
		if (!blockId) {
			setAttributes( { blockId: clientId } )
		}
	})

	return (
		<>
			<InspectorControls>
				<PanelBody
					className="flickr-gallery-block-inspector-controls"
					title={ __( 'Settings', 'ninja' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<SelectControl
							label={ __( 'Type of the content', 'ninja' ) }
							value={ flickrByType }
							options={[
								{
									label: __( 'Albums per user', 'ninja' ),
									value: "albums",
								},
								{
									label: __( 'Collection from user', 'ninja' ),
									value: "collection",
								},
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
						{ ( flickrByType === 'album' ) && (
							<TextControl
								label={ __( 'Album ID', 'ninja' ) }
								value={ flickrAlbumId }
								onChange={ ( value ) => {
									setAttributes( { flickrAlbumId: value } )
								} }
							/>
						) }

						{ ( flickrByType !== 'album' ) && (
							<TextControl
								label={ __( 'User ID', 'ninja' ) }
								value={ flickrUserId }
								onChange={ ( value ) => {
									setAttributes( { flickrUserId: value } )
								} }
							/>
						) }
					</PanelRow>

					<PanelRow>
						{ ( flickrByType === 'collection' ) && (
							<TextControl
								label={ __( 'Collection ID', 'ninja' ) }
								value={ flickrCollectionId }
								onChange={ ( value ) => {
									setAttributes( { flickrCollectionId: value } )
								} }
							/>
						) }
					</PanelRow>

					{ ( flickrByType === 'user' && flickrUserId ) ? (
						<PanelRow>
							<SelectUserAlbum
								flickrUserId={ flickrUserId }
								onChange={ onSelectUserAlbum }
							/>
						</PanelRow>
					) : null }
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
