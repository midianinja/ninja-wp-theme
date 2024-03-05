import { __ } from '@wordpress/i18n'

const { useEffect, useState } = wp.element

import ServerSideRender from '@wordpress/server-side-render'
import apiFetch from '@wordpress/api-fetch'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import SelectPostType from "./components/SelectPostType"

import {
	__experimentalNumberControl as NumberControl,
	Disabled,
	TextControl,
	PanelBody,
	PanelRow,
	QueryControls,
	SelectControl
} from '@wordpress/components'

import metadata from './block.json'
import './editor.scss'

export default function Edit( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'latest-horizontal-posts-block'
	} )

	const { 
		blockId,
		blockModel,
		contentPosition,
		description,
		flickrAPIKey,
		flickrByType,
		flickrUserId,
		flickrAlbumId,
		heading,
		order,
		orderBy,
		playlistId,
		postsToShow,
		postType,
		showTaxonomy,
		slidesToShow,
	} = attributes

	const onChangeContentPosition = ( value ) => {
		setAttributes( { contentPosition: value } )
	}

	const onChangeHeading = ( newHeading ) => {
		setAttributes( { heading: newHeading } )
	}

	const onChangePostType = ( value ) => {
		setAttributes( { postType: value } )
		setAttributes( { showTaxonomy: '' } )
	}

	useEffect(() => {
		if (!blockId) {
			setAttributes( { blockId: clientId } )
		}
	})

	// Get taxonomies from the post type selected
	const [taxonomies, setTaxonomies] = useState([])

	useEffect(() => {
		if(postType) {
			apiFetch({ path: `/ninja/v1/taxonomias/${postType}` })
				.then((taxonomies) => {
					setTaxonomies(taxonomies)
				})
		}
	}, [postType])

	// Init query args
	const [ query ] = useState( {
		maxItems: 10,
		minItems: 1,
		numberOfItems: 10
	} )

	const { maxItems, minItems, numberOfItems } = query

	return (
		<>
			<InspectorControls>
				<PanelBody
					className="latest-horizontal-posts-block-inspector-controls"
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
						<SelectControl
							label={ __( 'Block model', 'ninja' ) }
							value={blockModel}
							options={[
								{
									label: __( 'Collection', 'ninja' ),
									value: "collection"
								},
								{
									label: __( 'Most read', 'ninja' ),
									value: "most-read"
								},
								{
									label: __( 'Specials', 'ninja' ),
									value: "specials"
								},
								{
									label: __( 'Videos', 'ninja' ),
									value: "videos"
								}
							]}
							onChange={ ( value ) => { setAttributes( { blockModel: value } ) } }
						/>
					</PanelRow>

					{ ( blockModel == 'videos' ) && (
						<PanelRow>
							<TextControl
								label={ __( 'YouTube Playlist ID', 'ninja' ) }
								value={ playlistId }
								onChange={ ( value ) => { setAttributes( { playlistId: value } ) } }
							/>
						</PanelRow>
					) }

					{ ( blockModel == 'collection' ) && (
						<>
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
						</>
					) }

					{ ( blockModel != 'collection' && blockModel != 'videos' ) && (
						<QueryControls
							{ ...{ maxItems, minItems, numberOfItems, order, orderBy } }
							numberOfItems={ parseInt(postsToShow) }
							onOrderChange={ ( value ) =>
								setAttributes( { order: value } )
							}
							onOrderByChange={ ( value ) =>
								setAttributes( { orderBy: value } )
							}
							onNumberOfItemsChange={ ( value ) =>
								setAttributes( { postsToShow: parseInt(value) } )
							}
						/>
					) }

					<PanelRow>
						<NumberControl
							label={ __( 'Slides to show', 'ninja' ) }
							max={ 5 }
							min={ 3 }
							onChange={ ( value ) => { setAttributes( { slidesToShow: parseInt(value) } ) } }
							step={ 1 }
							value={ slidesToShow }
						/>
					</PanelRow>

					{ ( blockModel != 'collection' && blockModel != 'videos' ) && (
						<PanelRow>
							<SelectPostType postType={postType} onChangePostType={onChangePostType} />
						</PanelRow>
					) }

					{ ( blockModel =='most-read' ) && (
						<PanelRow>
							<SelectControl
								label={ __( 'Taxonomy to display', 'ninja' ) }
								value={showTaxonomy}
								options={taxonomies.map(taxonomy => ({
									label: taxonomy.label,
									value: taxonomy.value
								}))}
								onChange={ ( value ) => setAttributes( { showTaxonomy: value } ) }
								help={ __(
									'Leave blank to not display any taxonomy',
									'ninja'
								) }
							/>
						</PanelRow>
					) }

					<PanelRow>
						<SelectControl
							label={ __( 'Content position', 'ninja' ) }
							value={contentPosition}
							options={[
								{
									label: __( 'Left', 'ninja' ),
									value: "left"
								},
								{
									label: __( 'Right', 'ninja' ),
									value: "right"
								},
								{
									label: __( 'Full width', 'ninja' ),
									value: "full"
								}
							]}
							onChange={ onChangeContentPosition }
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