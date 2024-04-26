import { __ } from '@wordpress/i18n'

const { useEffect, useState } = wp.element

import { useSelect } from '@wordpress/data'
import { useInstanceId } from "@wordpress/compose"

import ServerSideRender from '@wordpress/server-side-render'
import apiFetch from '@wordpress/api-fetch'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import LinkSelector from '../../shared/components/LinkSelector'
import SelectPostType from "../../shared/components/SelectPostType"
import SelectTerms from "../../shared/components/SelectTerms"

import {
	__experimentalNumberControl as NumberControl,
	Disabled,
	TextControl,
	ToggleControl,
	PanelBody,
	PanelRow,
	RangeControl,
	SelectControl
} from '@wordpress/components'

import metadata from './block.json'
import './editor.scss'

export default function Edit( { attributes, setAttributes } ) {

	const currentPostId = useSelect((select) => {
		return select('core/editor').getCurrentPostId()
	}, [])

	const instanceId = useInstanceId(Edit, 'latest-horizontal-posts-' + currentPostId)

	const blockProps = useBlockProps( {
		className: 'latest-horizontal-posts-block'
	} )

	const {
		blockId,
		blockModel,
		channelId,
		contentPosition,
		description,
		flickrAlbumId,
		flickrAPIKey,
		flickrByType,
		flickrUserId,
		heading,
		playlistId,
		postsToShow,
		postType,
		queryTerms,
		showChildren,
		showTaxonomy,
		slidesToShow,
		taxonomy,
		videoModel
	} = attributes

	useEffect(() => {
		if (!blockId || blockId !== instanceId) {
			setAttributes({ blockId: instanceId })
		}
	})

	const onChangeBlockModel = ( value ) => {
		setAttributes( { blockModel: value } )
		setAttributes( { showTaxonomy: '' } )
		setAttributes( { taxonomy: '' } )
		setAttributes( { queryTerms: [] } )
	}

	const onChangeContentPosition = ( value ) => {
		setAttributes( { contentPosition: value } )
	}

	const onChangeHeading = ( newHeading ) => {
		setAttributes( { heading: newHeading } )
	}

	const onChangePostType = ( value ) => {
		setAttributes( { postType: value } )
		setAttributes( { showTaxonomy: '' } )
		setAttributes( { taxonomy: '' } )
		setAttributes( { queryTerms: [] } )
	}

	const onChangeSelectTerm = ( value ) => {
		setAttributes( { queryTerms: value.length > 0 ? value : undefined } )
	}

	const onChangeTaxonomy = ( value ) => {
		setAttributes( { taxonomy: value } )
		setAttributes( { showTaxonomy: '' } )
		setAttributes( { queryTerms: [] } )
	}

	// Get taxonomies from the post type selected
	const [taxonomies, setTaxonomies] = useState([])

	useEffect(() => {
		if (postType) {
		  apiFetch({ path: `/ninja/v1/taxonomias/${postType}` })
			.then(taxonomies => {
				setTaxonomies(taxonomies)
			})
		}
	}, [postType])

	return (
		<>
			<InspectorControls>
				<PanelBody
					className="latest-horizontal-posts-block-inspector-controls"
					title={ __( 'Layout', 'ninja' ) }
					initialOpen={ false }
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

					<PanelRow className='high-spot-block-link-selector'>
						<LinkSelector attributes={ attributes } setAttributes={ setAttributes } />
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
							value={ blockModel }
							options={ [
								{
									label: __( 'Albums (Flickr)', 'ninja' ),
									value: "albums"
								},
								{
									label: __( 'Photos (Flickr)', 'ninja' ),
									value: "collection"
								},
								{
									label: __( 'Columnists', 'ninja' ),
									value: "columnists"
								},
								{
									label: __( 'Most read (Posts)', 'ninja' ),
									value: "most-read"
								},
								{
									label: __( 'Specials', 'ninja' ),
									value: "specials"
								},
								{
									label: __( 'Videos (YouTube)', 'ninja' ),
									value: "videos"
								}
							] }
							onChange={ onChangeBlockModel }
						/>
					</PanelRow>

					<PanelRow>
						<SelectControl
							label={ __( 'Content position', 'ninja' ) }
							value={ contentPosition }
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
				</PanelBody>
				<PanelBody
					className="latest-horizontal-posts-block-inspector-controls"
					title={ __( 'Query', 'ninja' ) }
					initialOpen={ false }
				>
					{ ( blockModel === 'videos' ) && (
						<>
							<PanelRow>
								<SelectControl
									label={ __( 'Type of the video', 'ninja' ) }
									value={ videoModel }
									options={[
										{
											label: __( 'By playlist', 'ninja' ),
											value: "playlist"
										},
										{
											label: __( 'By channel', 'ninja' ),
											value: "channel"
										}
									]}
									onChange={ ( value ) => {
										setAttributes( { videoModel: value } )
									} }
								/>
							</PanelRow>

							{ ( videoModel === 'playlist' ) && (
								<PanelRow>
									<TextControl
										label={ __( 'YouTube playlist ID', 'ninja' ) }
										value={ playlistId }
										onChange={ ( value ) => { setAttributes( { playlistId: value } ) } }
									/>
								</PanelRow>
							) }

							{ ( videoModel === 'channel' ) && (
								<PanelRow>
									<TextControl
										label={ __( 'YouTube channel ID', 'ninja' ) }
										value={ channelId }
										onChange={ ( value ) => { setAttributes( { channelId: value } ) } }
									/>
								</PanelRow>
							) }
						</>
					) }

					{ ( blockModel === 'collection' || blockModel === 'albums' ) && (
						<>
							<PanelRow>
								<TextControl
									label={ __( 'Flickr API Key', 'ninja' ) }
									value={ flickrAPIKey }
									onChange={ ( value ) => { setAttributes( { flickrAPIKey: value } ) } }
								/>
							</PanelRow>

							{ ( blockModel === 'collection' ) && (
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
							) }

							<PanelRow>
								{ ( blockModel === 'collection' && flickrByType === 'album' ) ? (
									<TextControl
										label={ __( 'Album ID', 'ninja' ) }
										value={ flickrAlbumId }
										onChange={ ( value ) => {
											setAttributes( { flickrAlbumId: value } )
										} }
									/>
								) : (
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

					{ ( blockModel === 'most-read' || blockModel === 'specials' ) && (
						<>
							<PanelRow>
								<SelectPostType postType={postType} onChangePostType={onChangePostType} />
							</PanelRow>

							<PanelRow>
								<ToggleControl
									label={ __( 'Show children items (if any)?', 'ninja' ) }
									checked={ showChildren }
									onChange={ () => { setAttributes( { showChildren: ! showChildren } ) } }
								/>
							</PanelRow>

							<PanelRow>
								<SelectControl
									label={ __( 'Taxonomy to filter', 'ninja' ) }
									value={ taxonomy }
									options={ taxonomies.map( taxonomy => ( {
										label: taxonomy.label,
										value: taxonomy.value
									}))}
									onChange={ onChangeTaxonomy }
									help={ __(
										'Leave blank to not filter by taxonomy',
										'ninja'
									) }
								/>
							</PanelRow>

							{ taxonomy && (
								<PanelRow>
									<SelectTerms onChangeSelectTerm={ onChangeSelectTerm } selectedTerms={ queryTerms } taxonomy={ taxonomy } />
								</PanelRow>
							) }

							<PanelRow>
								<RangeControl
									label={ __( 'Total number of posts to display', 'ninja' ) }
									value={ postsToShow }
									onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
									min={ 2 }
									max={ 99 }
									step={ 2 }
								/>
							</PanelRow>

							<PanelRow>
								<SelectControl
									label={ __( 'Show taxonomy, which?', 'ninja' ) }
									value={ showTaxonomy }
									options={ taxonomies.map( taxonomy => ( {
										label: taxonomy.label,
										value: taxonomy.value
									} ) ) }
									onChange={ ( value ) => setAttributes( { showTaxonomy: value } ) }
									help={ __(
										'Leave blank to not display any taxonomy',
										'ninja'
									) }
								/>
							</PanelRow>
						</>
					) }

					{ ( blockModel === 'columnists' ) && (
						<PanelRow>
							<h2>{ __( 'With this configuration the block will display Co-Authors', 'ninja' ) }</h2>
						</PanelRow>
					) }
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
