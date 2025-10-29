import { __ } from '@wordpress/i18n'

import { useEffect, useState } from 'react'

import { useSelect } from '@wordpress/data'
import { useInstanceId } from "@wordpress/compose"

import apiFetch from '@wordpress/api-fetch'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import SelectPostType from "../../shared/components/SelectPostType"
import SelectLanguages from "../../shared/components/SelectLanguages"
import SelectTerms from "../../shared/components/SelectTerms"
import LatestGridPosts from "./components/LatestGridPosts"

import {
    Disabled,
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    ToggleControl
} from '@wordpress/components'

import metadata from './block.json'
import './editor.scss'

export default function Edit( { attributes, setAttributes } ) {
    const currentPostId = useSelect((select) => {
        return select('core/editor').getCurrentPostId()
    }, [])

    const instanceId = useInstanceId(Edit, 'latest-grid-posts-' + currentPostId)

    const blockProps = useBlockProps( {
        className: 'latest-grid-posts-block'
    } )


    const {
        blockId,
        compare,
		localeCode,
        noCompare,
        noPostType,
        noQueryTerms,
        noTaxonomy,
        postType,
        postsPerPage,
        postsToShow,
        showAuthor,
        showChildren,
        showDate,
        showExcerpt,
        taxonomy,
        queryTerms
    } = attributes

    useEffect(() => {
        if (!blockId || blockId !== instanceId) {
            setAttributes({ blockId: instanceId })
        }
    })

    const onChangePostType = ( value ) => {
        setAttributes({ postType: value })
        setAttributes({ queryTerms: [] })
    }

	const onChangeLanguage = ( value ) => {
		setAttributes( { localeCode: value } )
        setAttributes({ queryTerms: [] })
        setAttributes({ noQueryTerms: [] })
	}

    const onChangeSelectTerm = (value) => {
        setAttributes({ queryTerms: value.length > 0 ? value : undefined })
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

    const onChangeCompare = ( value ) => {
        setAttributes( { compare: value == 'OR' ? 'OR' : 'AND' } )
    }

    // No
    const onChangeNoPostType = ( value ) => {
        setAttributes( { noPostType: value } )
        setAttributes({ noQueryTerms: [] })
    }

    const onChangeNoSelectTerm = ( value ) => {
        setAttributes( { noQueryTerms: value.length > 0 ? value : undefined } )
    }

    const onChangeNoCompare = ( value ) => {
        setAttributes( { noCompare: value == 'OR' ? 'OR' : 'AND' } )
    }

    // Get taxonomies from the post type selected
    const [noTaxonomies, setNoTaxonomies] = useState([])

    useEffect(() => {
        if(noPostType) {
            apiFetch({ path: `/ninja/v1/taxonomias/${noPostType}` })
                .then((noTaxonomies) => {
                    setNoTaxonomies(noTaxonomies)
                })
        }
    }, [noPostType])

    return (
        <>
            <InspectorControls>
                <PanelBody
                    className="latest-vertical-posts-block-inspector-controls"
                    title={ __( 'Layout', 'ninja' ) }
                    initialOpen={ false }
                >
                    <PanelRow>
                        <RangeControl
                            label={ __( 'Qtd. total de posts para exibir', 'ninja' ) }
                            value={ postsToShow }
                            onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
                            min={ 2 }
                            max={ 999 }
                            step={ 2 }
                        />
                    </PanelRow>

                    <PanelRow>
                        <RangeControl
                            label={ __( 'Qtd. de posts por página', 'ninja' ) }
                            value={ postsPerPage }
                            onChange={ ( value ) => setAttributes( { postsPerPage: value } ) }
                            min={ 2 }
                            max={ 999 }
                            step={ 2 }
                        />
                    </PanelRow>

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

                    <PanelRow>
                        <ToggleControl
                            label={ __( 'Show the post excerpt?', 'ninja' ) }
                            checked={ showExcerpt }
                            onChange={ () => { setAttributes( { showExcerpt: ! showExcerpt } ) } }
                        />
                    </PanelRow>
                </PanelBody>

                <PanelBody
                    className="latest-grid-posts-block-inspector-controls"
                    title={ __( 'Query', 'ninja' ) }
                    initialOpen={ false }
                >
					<PanelRow>
						<SelectLanguages language={localeCode} onChangeLanguage={onChangeLanguage} />
					</PanelRow>

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

                    { queryTerms?.length > 1 && (
                        <PanelRow>
                            <SelectControl
                                label={ __( 'Compare terms', 'ninja' ) }
                                value={ compare }
                                options={ [
                                    {
                                        label: __( 'OR', 'ninja' ),
                                        value: "or"
                                    },
                                    {
                                        label: __( 'AND', 'ninja' ),
                                        value: "and"
                                    }
                                ]}
                                onChange={ onChangeCompare }
                            />
                        </PanelRow>
                    ) }

                    <PanelRow>
                        <h2>{ __( 'Filter posts to not display', 'ninja' ) }</h2>
                    </PanelRow>

                    <PanelRow>
                        <SelectPostType postType={ noPostType } onChangePostType={ onChangeNoPostType } />
                    </PanelRow>

                    { noPostType && (
                        <PanelRow>
                            <SelectControl
                                label={ __( 'Taxonomy to filter', 'ninja' ) }
                                value={ noTaxonomy }
                                options={ noTaxonomies.map( noTaxonomy => ( {
                                    label: noTaxonomy.label,
                                    value: noTaxonomy.value
                                }))}
                                onChange={ ( value ) => setAttributes( { noTaxonomy: value } ) }
                                help={ __(
                                    'Leave blank to not filter by taxonomy',
                                    'ninja'
                                ) }
                            />
                        </PanelRow>
                    ) }

                    { noTaxonomy && (
                        <PanelRow>
                            <SelectTerms onChangeSelectTerm={ onChangeNoSelectTerm } selectedTerms={ noQueryTerms } taxonomy={ noTaxonomy } />
                        </PanelRow>
                    ) }

                    { noQueryTerms?.length > 1 && (
                        <PanelRow>
                            <SelectControl
                                label={ __( 'Compare terms', 'ninja' ) }
                                value={ noCompare }
                                options={ [
                                    {
                                        label: __( 'OR', 'ninja' ),
                                        value: "or"
                                    },
                                    {
                                        label: __( 'AND', 'ninja' ),
                                        value: "and"
                                    }

                                ]}
                                onChange={ onChangeNoCompare }
                            />
                        </PanelRow>
                    ) }
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <Disabled>
                    <LatestGridPosts
						localeCode={localeCode}
                        postType={postType}
                        perPage={postsPerPage}
                        showAuthor={showAuthor}
                        showDate={showDate}
                        showExcerpt={showExcerpt}
                        taxonomy={taxonomy}
                        terms={queryTerms}
                    />
                </Disabled>
            </div>
        </>
    )
}
