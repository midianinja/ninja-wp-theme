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
	ToggleControl,
	PanelBody,
	PanelRow,
	QueryControls,
	SelectControl
} from '@wordpress/components'

import metadata from './block.json'
import './editor.scss'

export default function Edit( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'latest-vertical-posts-block'
	} )

	const { blockId, heading, order, orderBy, postsBySlide, postsToShow, postType, showHeading, showTaxonomy } = attributes

	const onChangeHeading = ( newHeading ) => {
		setAttributes( { heading: newHeading } )
	}

	const toggleHeading = () => {
		setAttributes( { showHeading: ! showHeading } )
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
					className="latest-vertical-posts-block-inspector-controls"
					title={ __( 'Settings', 'ninja' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<ToggleControl
							label={ __(
								'Show a heading before',
								'ninja'
							) }
							help={
								showHeading
									? __(
											'Heading displayed',
											'ninja'
										)
									: __(
											'No Heading displayed',
											'ninja'
										)
							}
							checked={ showHeading }
							onChange={ toggleHeading }
						/>
					</PanelRow>

					{ showHeading && (
						<PanelRow>
							<TextControl
								label={ __( 'Heading', 'ninja' ) }
								value={ heading }
								onChange={ onChangeHeading }
								help={ __(
									'Text to display above the alert box',
									'ninja'
								) }
							/>
						</PanelRow>
					) }

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
							label={ __( 'Posts by slide', 'ninja' ) }
							max={ 5 }
							min={ 1 }
							onChange={ ( value ) => { setAttributes( { postsBySlide: value } ) } }
							step={ 1 }
							value={ postsBySlide }
						/>
					</PanelRow>

					<PanelRow>
						<SelectPostType postType={postType} onChangePostType={onChangePostType} />
					</PanelRow>

					<PanelRow>
						<SelectControl
							label={ __( 'Exibir taxonomia', 'ninja' ) }
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
	);
}