import { RichText, InnerBlocks } from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import { Button, SelectControl, TextControl } from "@wordpress/components";

wp.blocks.registerBlockType("jaci/embed-template", {
	title: "Vídeo da Galeria",
	icon: "format-video",
	category: "common",
	supports: {
		align: false,
	},
	attributes: {
	},

	edit: (props) => {
		const {
			className,
			isSelected,
			attributes: {
			},
			setAttributes,
		} = props;

		const TEMPLATE = [ [ 'core/columns', {}, [
			[ 'core/column', {}, [
				[ 'core/embed' ],
			] ],
			[ 'core/column', {}, [
				[ 'core/paragraph', { placeholder: 'Título do vídeo' } ],
				[ 'core/paragraph', { placeholder: 'Autor do vídeo' } ]
			] ],
		] ] ];

		return (
			<>
				<div className="embed-item-template" key="container">
					<div>
						<InnerBlocks
							allowedBlocks={[ 'core/embed', 'core/paragraph' ]}
							template={TEMPLATE}
							templateLock="all"
						/>
					</div>
				</div>
			</>
		);
	},

	save: (props) => {
		const {
			className,
			isSelected,
			attributes: {
			  title,
			},
			setAttributes,
		  } = props;

		return (
			<>	
				<div className="embed-template-block">
					<InnerBlocks.Content/>
				</div>
			</>
		);
	},
});