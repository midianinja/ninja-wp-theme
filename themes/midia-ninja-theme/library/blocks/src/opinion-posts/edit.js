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

import SelectTerms from "../../shared/components/SelectTerms"

import metadata from './block.json'
import './editor.scss'

export default function Edit( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'opinion-posts-block'
	} )

	const {
		blockId,
		heading,
		linkText,
		order,
		orderBy,
		postsToShow,
		queryTerms,
		slidesToShow,
		taxonomy,
	} = attributes

	const onChangeSelectTerm = ( value ) => {
		setAttributes( { queryTerms: value.length > 0 ? value : undefined } )
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

					<PanelRow>
                        <SelectControl
                            label={ __( 'Taxonomy to filter', 'ninja' ) }
                            value={taxonomy}
                            options={taxonomies.map(taxonomy => ({
                                label: taxonomy.label,
                                value: taxonomy.value
                            }))}
                            onChange={ ( value ) => setAttributes( { taxonomy: value } ) }
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
