import { __ } from '@wordpress/i18n'

const { useEffect } = wp.element

import ServerSideRender from '@wordpress/server-side-render'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'

import {
	Disabled,
	PanelBody,
	PanelRow,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl
} from '@wordpress/components'

import metadata from './block.json'
import './editor.scss'

export default function Edit( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: 'video-gallery-block'
	} )

	const {
		autoplay,
		blockId,
		layout,
		loop,
		muted,
		numItems,
		title,
		youtubeFormat,
		youtubeId,
	} = attributes

	useEffect(() => {
		if (!blockId) {
			setAttributes( { blockId: clientId } )
		}
	})

	return (
		<>
			<InspectorControls>
				<PanelBody
					className="video-playlist-block-inspector-controls"
					title={ __( 'Settings', 'ninja' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<TextControl
							label={ __( 'Title', 'ninja' ) }
							value={ title }
							onChange={ ( title ) => setAttributes( { title } ) }
						/>
					</PanelRow>

					<PanelRow>
						<SelectControl
							label={ __( 'Source', 'ninja' ) }
							value={ youtubeFormat }
							options={ [
								{ label: __( 'Channel', 'ninja' ), value: 'channel' },
								{ label: __( 'Playlist', 'ninja' ), value: 'playlist' },
							] }
							onChange={ ( youtubeFormat ) => setAttributes( { youtubeFormat } ) }
						/>
					</PanelRow>

					<PanelRow>
						<TextControl
							label={ __( 'Channel/Playlist ID', 'ninja' ) }
							value={ youtubeId }
							onChange={ ( youtubeId ) => setAttributes( { youtubeId } ) }
						/>
					</PanelRow>

					<PanelRow>
						<RangeControl
							label={ __( 'Number of videos', 'ninja' ) }
							value={ numItems }
							onChange={ ( numItems ) => setAttributes( { numItems } ) }
							min={ 1 }
							max={ 50 }
						/>
					</PanelRow>

					<PanelRow>
						<SelectControl
							label={ __( 'Layout', 'ninja' ) }
							value={ layout }
							options={ [
								{ label: __( 'Sidebar', 'ninja' ), value: 'sidebar' },
								{ label: __( 'Block', 'ninja' ), value: 'block' },
								{ label: __( 'Grid with popup', 'ninja' ), value: 'popup' },
							] }
							onChange={ ( layout ) => setAttributes( { layout } ) }
						/>
					</PanelRow>

					{ layout === 'popup' && (
						<>
							<PanelRow>
								<ToggleControl
									label={ __( 'Autoplay', 'ninja' ) }
									checked={ autoplay }
									onChange={ ( autoplay ) => setAttributes( { autoplay } ) }
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={ __( 'Loop', 'ninja' ) }
									checked={ loop }
									onChange={ ( loop ) => setAttributes( { loop } ) }
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={ __( 'Muted', 'ninja' ) }
									checked={ muted }
									onChange={ ( muted ) => setAttributes( { muted } ) }
								/>
							</PanelRow>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<Disabled>
					<ServerSideRender
						block={ metadata.name }
						attributes={ attributes }
					/>
				</Disabled>
			</div>
		</>
	)
}
