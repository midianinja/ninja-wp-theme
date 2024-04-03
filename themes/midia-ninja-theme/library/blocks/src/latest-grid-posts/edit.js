import { __ } from '@wordpress/i18n';

import ServerSideRender from '@wordpress/server-side-render';
const { useEffect, useState } = wp.element


import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import {
	Disabled,
	TextControl,
	ToggleControl,
	PanelBody,
	PanelRow,
	QueryControls,
	SelectControl
} from '@wordpress/components';

import metadata from './block.json';
import './editor.scss';

export default function Edit( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'latest-grid-posts-block',
	} );

	const { 
		blockId,
		blockModel,
		heading,
		order,
		orderBy,
		postsToShow,
		playlistId,
		showAuthor,
		showThumbnail,
		thumbnailFormat
	} = attributes

	const onChangeHeading = ( newHeading ) => {
		setAttributes( { heading: newHeading } );
	};

	useEffect(() => {
		if (!blockId) {
			setAttributes( { blockId: clientId } )
		}
	})

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
					className="latest-grid-posts-block-inspector-controls"
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
						<SelectControl
							label={ __( 'Block model', 'ninja' ) }
							value={blockModel}
							options={[
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
						<ToggleControl
							label={ __( 'Show the post thumbnail?', 'ninja' ) }
							checked={ showThumbnail }
							onChange={ () => { setAttributes( { showThumbnail: ! showThumbnail } ) } }
						/>
					</PanelRow>

					{ showThumbnail && (
						<PanelRow>
							<ToggleControl
								label={ __( 'Use rounded thumbnail?', 'ninja' ) }
								checked={ thumbnailFormat }
								onChange={ () => { setAttributes( { thumbnailFormat: ! thumbnailFormat } ) } }
							/>
						</PanelRow>
					) }

					<PanelRow>
						<ToggleControl
							label={ __( 'Show the post author?', 'ninja' ) }
							checked={ showAuthor }
							onChange={ () => { setAttributes( { showAuthor: ! showAuthor } ) } }
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