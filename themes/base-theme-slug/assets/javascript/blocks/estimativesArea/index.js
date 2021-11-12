import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import Editor from "./editor";

registerBlockType('jaci/estimatives-area', {
    title: __('Estimatives Area', 'jaci'),
    icon: 'visibility',
    category: 'common',
    edit: Editor,
});