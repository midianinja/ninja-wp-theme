import { registerBlockType } from "@wordpress/blocks";
import { ServerSideRender, Disabled } from '@wordpress/components';
import { __ } from "@wordpress/i18n";

registerBlockType('jaci/timeline', {
    title: __('Timeline', 'jaci'),
    icon: 'clock',
    category: 'common',
    keywords: [
        __('timeline'),
        __('time'),
        __('line')
    ],
    supports: {
        align: true,
    },
    attributes: {
        images: {///
            type: 'array',
        },

        imagesTitle: {
            type: 'array',
        },

        imagesDescriptions: {
            type: 'array',
        },

        imagesButtons: {
            type: 'array',
        },
    },

    edit: (props) => {
        return  (<Disabled>
                    <ServerSideRender
                        block="jaci/timeline"
                        attributes={props.attributes}
                    />
                </Disabled>)
    },

    save: ({ attributes }) => {
        return null;
    },
});