import { __ } from '@wordpress/i18n'

const { useEffect, useState } = wp.element

import ServerSideRender from '@wordpress/server-side-render'
import apiFetch from '@wordpress/api-fetch'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import ImageSelector from './components/ImageSelector'
import LinkSelector from './components/LinkSelector'
import SelectPostType from "../../shared/components/SelectPostType"
import SelectTerms from "../../shared/components/SelectTerms"
import SelectPost from './components/SelectPost'

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
		className: 'high-spot-block'
	} )

	const handleImageSelect = (media) => {
		setAttributes({ imageUrl: media.url, imageId: media.id, imageAlt: media.alt })
	}

	const {
		blockId,
		blockModel,
		description,
		heading,
		imageAlt,
		imageId,
		imageUrl,
		postId,
		postType,
		queryTerms,
		tag,
		taxonomy
	} = attributes

	useEffect(() => {
		if (!blockId) {
			setAttributes( { blockId: clientId } )
		}
	})

	const setPostId = (value) => {
		setAttributes({ postId: value })
	}

	const onChangePostType = ( value ) => {
		setAttributes( { postType: value } )
		setAttributes( { taxonomy: '' } )
		setAttributes( { queryTerms: [] } )
	}

	const onChangeSelectTerm = ( value ) => {
		setAttributes( { queryTerms: value.length > 0 ? value : undefined } )
	}

	const onChangeTaxonomy = ( value ) => {
		setAttributes( { taxonomy: value } )
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
					className="high-spot-block-inspector-controls"
					title={ __( 'Settings', 'ninja' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<SelectControl
							label={ __( 'Block model', 'ninja' ) }
							value={blockModel}
							options={[
								{
									label: __( 'Specific post', 'ninja' ),
									value: "post"
								},
								{
									label: __( 'Latest post', 'ninja' ),
									value: "latest"
								},
								{
									label: __( 'Manual', 'ninja' ),
									value: "manual"
								}
							]}
							onChange={ ( value ) => { setAttributes( { blockModel: value } ) } }
						/>
					</PanelRow>

					{ ( blockModel === 'post' )  && (
						<>
							<PanelRow className='high-spot-block-post-selector'>
								<SelectPost postId={ postId } setPostId={ setPostId } />
							</PanelRow>
						</>
					) }

					{ ( blockModel === 'latest' )  && (
						<>
							<PanelRow>
								<SelectPostType postType={postType} onChangePostType={onChangePostType} />
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
						</>
					) }

					{ ( blockModel ==='manual' )  && (
						<>
							<PanelRow>
								<ImageSelector onImageSelect={ handleImageSelect } selectedImage={{ id: imageId, url: imageUrl, alt: imageAlt }} />
							</PanelRow>

							{ ( imageUrl ) && (
								<>
									<PanelRow>
										<TextControl
											label={ __( 'Tag', 'ninja' ) }
											value={ tag }
											onChange={ ( value ) => setAttributes( { tag: value } ) }
										/>
									</PanelRow>

									<PanelRow>
										<TextControl
											label={ __( 'Heading', 'ninja' ) }
											value={ heading }
											onChange={ ( value ) => setAttributes( { heading: value } ) }
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
											onChange={ ( value ) => setAttributes( { description: value } ) }
										/>
									</PanelRow>

									<PanelRow className='high-spot-block-link-selector'>
										<LinkSelector attributes={ attributes } setAttributes={ setAttributes } />
									</PanelRow>
								</>
							) }
						</>
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