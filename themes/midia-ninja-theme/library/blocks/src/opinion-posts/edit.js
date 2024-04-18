import { __ } from '@wordpress/i18n'

const { useEffect, useState } = wp.element

import ServerSideRender from '@wordpress/server-side-render'
import apiFetch from '@wordpress/api-fetch'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'

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
		className: 'opinion-posts-block'
	} )

	const {
		blockId,
		contentPosition,
		heading,
		linkText,
		order,
		orderBy,
		postsToShow,
		slidesToShow,
	} = attributes

	const onChangeContentPosition = ( value ) => {
		setAttributes( { contentPosition: value } )
	}

	const onChangeHeading = ( newHeading ) => {
		setAttributes( { heading: newHeading } )
	}

	useEffect(() => {
		if (!blockId) {
			setAttributes( { blockId: clientId } )
		}
	})

	// Get taxonomies from the post type selected
	const [taxonomies, setTaxonomies] = useState([])

	useEffect(() => {
		apiFetch({ path: `/ninja/v1/taxonomias/opiniao` }).then((taxonomies) => {
			setTaxonomies(taxonomies)
		})
	}, [])

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
					className="opinion-posts-block-inspector-controls"
					title={ __( 'Settings', 'ninja' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<TextControl
							label={ __( 'Heading', 'ninja' ) }
							value={ heading }
							onChange={ onChangeHeading }
						/>
					</PanelRow>

					<PanelRow>
						<TextControl
							label={ __( 'Link text', 'ninja' ) }
							value={ linkText }
							onChange={ ( value ) => { setAttributes( { linkText: value } ) } }
						/>
					</PanelRow>

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
