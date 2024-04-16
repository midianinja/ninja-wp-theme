import { __ } from '@wordpress/i18n'

import { useEffect, useState } from 'react'

import apiFetch from '@wordpress/api-fetch'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import SelectPostType from "../../shared/components/SelectPostType"
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

export default function Edit( { attributes, clientId, setAttributes } ) {

    const blockProps = useBlockProps( {
        className: 'latest-grid-posts-block'
    } )

    const { 
        blockId,
        postType,
        postsPerPage,
        postsToShow,
        showAuthor,
        showDate,
        showExcerpt,
        taxonomy,
        queryTerms
    } = attributes

    useEffect(() => {
        if (!blockId) {
            setAttributes( { blockId: clientId } )
        }
    })

    const onChangePostType = ( value ) => {
        setAttributes({ postType: value })
        setAttributes({ queryTerms: [] })
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

    return (
        <>
            <InspectorControls>
                <PanelBody
                    className="latest-grid-posts-block-inspector-controls"
                    title={ __( 'Settings', 'ninja' ) }
                    initialOpen={ true }
                >
                    <PanelRow>
                        <SelectPostType postType={postType} onChangePostType={onChangePostType} />
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

                    <PanelRow>
                        <RangeControl
                            label={ __( 'Qtd. total de posts para exibir', 'ninja' ) }
                            value={ postsToShow }
                            onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
                            min={ 2 }
                            max={ 99 }
                            step={ 2 }
                        />
                    </PanelRow>

                    <PanelRow>
                        <RangeControl
                            label={ __( 'Qtd. de posts por página', 'ninja' ) }
                            value={ postsPerPage }
                            onChange={ ( value ) => setAttributes( { postsPerPage: value } ) }
                            min={ 2 }
                            max={ 99 }
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
            </InspectorControls>

            <div { ...blockProps }>
                <Disabled>
                    <LatestGridPosts
                        postType={postType}
                        perPage={postsPerPage}
                        showAuthor={showAuthor}
                        showDate={showDate}
                        showExcerpt={showExcerpt}
                        taxonomy={taxonomy}
                        terms={queryTerms}
                        isEditor={true}
                    />
                </Disabled>
            </div>
        </>
    )
}