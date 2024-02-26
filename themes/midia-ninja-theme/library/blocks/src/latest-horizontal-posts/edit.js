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
		cardFormat,
		contentPosition,
		description,
		heading,
		order,
		orderBy,
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

	const onChangeTaxonomy = ( newTaxonomy ) => {
		setAttributes( { showTaxonomy: newTaxonomy } )
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

					<QueryControls
						{ ...{ maxItems, minItems, numberOfItems, order, orderBy } }
						numberOfItems={ postsToShow }
						onOrderChange={ ( value ) =>
							setAttributes( { order: value } )
						}
						onOrderByChange={ ( value ) =>
							setAttributes( { orderBy: value } )
						}
						onNumberOfItemsChange={ ( value ) =>
							setAttributes( { postsToShow: value } )
						}
					/>

					<PanelRow>
						<NumberControl
							label={ __( 'Slides to show', 'ninja' ) }
							max={ 5 }
							min={ 3 }
							onChange={ ( value ) => { setAttributes( { slidesToShow: value } ) } }
							step={ 1 }
							value={ slidesToShow }
						/>
					</PanelRow>

					<PanelRow>
						<SelectPostType postType={postType} onChangePostType={onChangePostType} />
					</PanelRow>

					<PanelRow>
						<SelectControl
							label={ __( 'Card format', 'ninja' ) }
							value={cardFormat}
							options={[
								{
									label: __( 'Collection', 'ninja' ),
									value: "collection"
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
							onChange={ (value) => { setAttributes( { cardFormat: value } ) } }
						/>
					</PanelRow>

					{ ( cardFormat != 'specials' ) && (
						<PanelRow>
							<SelectControl
								label={ __( 'Taxonomy to display', 'ninja' ) }
								value={showTaxonomy}
								options={taxonomies.map(taxonomy => ({
									label: taxonomy.label,
									value: taxonomy.value
								}))}
								onChange={ onChangeTaxonomy }
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