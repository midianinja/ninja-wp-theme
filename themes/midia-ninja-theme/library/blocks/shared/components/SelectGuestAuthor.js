import { __ } from '@wordpress/i18n'
import { SelectControl } from '@wordpress/components'
import { useEffect, useState } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch'

export default function SelectGuestAuthor( { coAuthor, onChangeCoAuthor } ) {
    const [ options, setOptions ] = useState( [] );

    useEffect( () => {
        const fetchCoAuthors = async () => {
            const path = '/ninja/v1/coauthors';

            try {
                const coAuthors = await apiFetch( { path } )
                const coAuthorsOptions = coAuthors.map( ( author ) => ( {
                    label: author.display_name,
                    value: author.user_nicename
                } ) )

                setOptions( coAuthorsOptions )
            } catch ( error ) {
                console.error( 'Error fetching coauthors:', error )
            }
        }

        fetchCoAuthors()
    }, [] )

    return (
        <SelectControl
            label={ __( 'Select author', 'ninja' ) }
            value={ coAuthor }
            options={ options }
            onChange={ onChangeCoAuthor }
        />
    )
}
