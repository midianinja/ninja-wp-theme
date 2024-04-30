import { __ } from '@wordpress/i18n'

const { useEffect, useState } = wp.element

import { useSelect } from '@wordpress/data'
import { useInstanceId } from "@wordpress/compose"

import ServerSideRender from '@wordpress/server-side-render'
import apiFetch from '@wordpress/api-fetch'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
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

export default function Edit( { attributes, clientId, setAttributes } ) {

	const currentPostId = useSelect((select) => {
		return select('core/editor').getCurrentPostId()
	}, [])

	const instanceId = useInstanceId(Edit, 'latest-vertical-posts-' + currentPostId)

	const blockProps = useBlockProps( {
		className: 'latest-vertical-posts-block'
	} )

	const { 
		blockId,
		blockModel,
		columns,
		contentBelow,
		flickrAlbumId,
		flickrAPIKey,
		flickrByType,
		flickrUserId,
		gridFormat,
		heading,
		playlistId,
		postsBySlide,
		postsToShow,
		postType,
		queryTerms,
		showAsGrid,
		showAuthor,
		showAvatar,
		showChildren,
		showDate,
		showExcerpt,
		showTaxonomy,
		showThumbnail,
		taxonomy,
		thumbnailFormat
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
		if(postType) {
			apiFetch({ path: `/ninja/v1/taxonomias/${postType}` })
				.then((taxonomies) => {
					setTaxonomies(taxonomies)
				})
		}
	}, [postType])

	return (
		<>
			<InspectorControls>
				<PanelBody
					className="latest-vertical-posts-block-inspector-controls"
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

					<PanelRow>
						<SelectControl
							label={ __( 'Block model', 'ninja' ) }
							value={ blockModel }
							options={ [
								{
									label: __( 'Collection', 'ninja' ),
									value: "collection"
								},
								{
									label: __( 'Columnists', 'ninja' ),
									value: "columnists"
								},
								{
									label: __( 'Numbered posts', 'ninja' ),
									value: "numbered"
								},
								{
									label: __( 'Posts', 'ninja' ),
									value: "posts"
								},
								{
									label: __( 'Videos', 'ninja' ),
									value: "videos"
								}
							]}
							onChange={ onChangeBlockModel }
						/>
					</PanelRow>

					{ ( blockModel !== 'numbered' ) && (
						<PanelRow>
							<ToggleControl
								label={ __( 'Show the post thumbnail?', 'ninja' ) }
								checked={ showThumbnail }
								onChange={ () => { setAttributes( { showThumbnail: ! showThumbnail } ) } }
							/>
						</PanelRow>
					) }

					{ ( showThumbnail && blockModel !== 'numbered' ) && (
						<PanelRow>
							<ToggleControl
								label={ __( 'Use rounded thumbnail?', 'ninja' ) }
								checked={ thumbnailFormat }
								onChange={ () => { setAttributes( { thumbnailFormat: ! thumbnailFormat } ) } }
							/>
						</PanelRow>
					) }

					{ ( showThumbnail && blockModel == 'posts' ) && (
						<PanelRow>
							<ToggleControl
								label={ __( 'Use avatar as thumbnail?', 'ninja' ) }
								checked={ showAvatar }
								onChange={ () => { setAttributes( { showAvatar: ! showAvatar } ) } }
							/>
						</PanelRow>
					) }

					{ ( blockModel == 'posts' || blockModel == 'numbered' || blockModel == 'columnists' ) && (
						<>
							<PanelRow>
								<ToggleControl
									label={ __( 'Show as a Grid?', 'ninja' ) }
									checked={ showAsGrid }
									onChange={ () => { setAttributes( { showAsGrid: ! showAsGrid } ) } }
								/>
							</PanelRow>

							{ ( showAsGrid ) && (
								<>
									<PanelRow>
										<SelectControl
											label={ __( 'Grid format', 'ninja' ) }
											value={ gridFormat }
											options={ [
												{
													label: __( 'Columns', 'ninja' ),
													value: "columns"
												},
												{
													label: __( 'Row', 'ninja' ),
													value: "row"
												}
											]}
											onChange={ ( value ) => { setAttributes( { gridFormat:  gridFormat === 'columns' ? 'row' : 'columns' } ) } }
										/>
									</PanelRow>

									<PanelRow>
										<NumberControl
											label={ __( 'Columns', 'ninja' ) }
											value={ columns }
											onChange={ ( value ) => { setAttributes( { columns: value } ) } }
											min={ 1 }
											max={ 4 }
										/>
									</PanelRow>
								</>
							) }
							
							<PanelRow>
								<ToggleControl
									label={ __( 'Show the excerpt?', 'ninja' ) }
									checked={ showExcerpt }
									onChange={ () => { setAttributes( { showExcerpt: ! showExcerpt } ) } }
								/>
							</PanelRow>
						</>
					) }

					{ ( blockModel == 'posts' || blockModel == 'numbered' ) && (
						<>
							<PanelRow>
								<ToggleControl
									label={ __( 'Show the post author?', 'ninja' ) }
									checked={ showAuthor }
									onChange={ () => { setAttributes( { showAuthor: ! showAuthor } ) } }
								/>
							</PanelRow>

							<PanelRow>
								<ToggleControl
									label={ __( 'Show the post date?', 'ninja' ) }
									checked={ showDate }
									onChange={ () => { setAttributes( { showDate: ! showDate } ) } }
								/>
							</PanelRow>
						</>
					) }

					<PanelRow>
						<ToggleControl
							label={ __( 'Show content below?', 'ninja' ) }
							checked={ contentBelow }
							onChange={ () => { setAttributes( { contentBelow: ! contentBelow } ) } }
						/>
					</PanelRow>

					<PanelRow>
						<NumberControl
							label={ __( 'Posts by slide', 'ninja' ) }
							max={ showAsGrid? 16 : 5 }
							min={ 1 }
							onChange={ ( value ) => { setAttributes( { postsBySlide: value } ) } }
							step={ 1 }
							value={ postsBySlide }
						/>
					</PanelRow>
				</PanelBody>

				<PanelBody
					className="latest-vertical-posts-block-inspector-controls"
					title={ __( 'Query', 'ninja' ) }
					initialOpen={ false }
				>
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

					{ ( blockModel == 'posts' || blockModel == 'numbered' ) && (
						<>
							<PanelRow>
								<SelectPostType postType={ postType } onChangePostType={ onChangePostType } />
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

					{ ( blockModel == 'columnists' ) && (
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