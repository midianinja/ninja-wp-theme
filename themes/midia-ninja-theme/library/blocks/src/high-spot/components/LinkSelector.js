import { __ } from '@wordpress/i18n'
import {
	useBlockProps,
	__experimentalLinkControlSearchInput as LinkControlSearchInput
} from '@wordpress/block-editor'

const LinkSelector = ({ attributes, setAttributes }) => {
    const { linkUrl } = attributes

    const suggestionsRender = (props) => (
        <div className="components-dropdown-menu__menu">
            { props.suggestions.map( ( suggestion, index ) => {
                    return (
                        <div onClick={ () => props.handleSuggestionClick( suggestion ) } className="components-button components-dropdown-menu__menu-item is-active has-text has-icon">
                            {suggestion.title}
                        </div>
                    )
                } )
            }
        </div>
    )

    return (
        <div { ...useBlockProps() }>
            <LinkControlSearchInput
                placeholder="Search here..."
                renderSuggestions={ ( props ) => suggestionsRender(props) }
                allowDirectEntry={false}
                withURLSuggestion={false}
                value={ linkUrl }
                onChange={ ( newURL ) => setAttributes( { linkUrl: newURL } ) }
                withCreateSuggestion={false}
            />
        </div>
    )
}

export default LinkSelector