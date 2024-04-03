import { __ } from '@wordpress/i18n'
import { useState, useEffect } from '@wordpress/element'
import { FormTokenField } from '@wordpress/components'

const fetchTerms = async (searchQuery = '') => {
    const url = new URL('/wp-json/wp/v2/categories', window.location.origin)
    if (searchQuery) {
        url.searchParams.append('search', searchQuery)
    }

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

const SelectTerms = ({ onChangeSelectTerm, selectedTerms = [] }) => {
    const [tokens, setTokens] = useState(selectedTerms)
    const [input, setInput] = useState('')
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const handler = setTimeout(() => {
            if (input) {
                fetchTerms(input).then(categories => {
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

export default SelectTerms
