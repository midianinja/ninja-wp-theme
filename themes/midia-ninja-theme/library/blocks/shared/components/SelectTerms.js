import { __ } from '@wordpress/i18n'
import { useState, useEffect } from '@wordpress/element'
import { FormTokenField } from '@wordpress/components'

const fetchTerms = async (searchQuery = '', taxonomy = 'category') => {
    const url = new URL('/wp-json/wp/v2/' + taxToEndpoint(taxonomy), window.location.origin)

    if (searchQuery) {
        url.searchParams.append('search', searchQuery)
    }

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

const SelectTerms = ({ onChangeSelectTerm, selectedTerms = [], taxonomy }) => {
    const [tokens, setTokens] = useState(selectedTerms)
    const [input, setInput] = useState('')
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const handler = setTimeout(() => {
            if (input) {
                fetchTerms(input, taxonomy).then(categories => {
                    setSuggestions(categories.map(category => ({ id: category.id, name: category.name })))
                })
            }
        }, 300)

        return () => {
            clearTimeout(handler)
        }
    }, [input])

    useEffect(() => {
        setTokens(selectedTerms)
    }, [selectedTerms])

    const handleTokensChange = (newTokenNames) => {
        const newTokens = newTokenNames.map(tokenName => {
            return tokens.find(token => token.name === tokenName) ||
                suggestions.find(suggestion => suggestion.name === tokenName)
        }).filter(token => token !== undefined)
        setTokens(newTokens)
        onChangeSelectTerm(newTokens)
    }

    return (
        <FormTokenField
            label={ __( 'Filter posts by terms', 'ninja' ) }
            value={tokens.map(token => token.name)}
            suggestions={suggestions.map(suggestion => suggestion.name)}
            onChange={handleTokensChange}
            onInputChange={(inputValue) => setInput(inputValue)}
        />
    )
}

const taxToEndpoint = (taxonomy) => {
    switch (taxonomy) {
        case 'category':
            return 'categories';
        case 'post_tag':
            return 'tags';
        case 'marcador_especial':
            return 'marcador_especial';
        case 'marcador_afluente':
            return 'marcador_afluente';
        default:
            return 'categories';
    }
}

export default SelectTerms
