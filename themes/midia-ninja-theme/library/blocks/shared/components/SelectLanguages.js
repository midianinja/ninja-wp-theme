import { __ } from '@wordpress/i18n'
import { SelectControl } from '@wordpress/components'
import { useEffect, useState } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch'

export default function SelectLanguage({ language, onChangeLanguage }) {
    const [options, setOptions] = useState([])

    useEffect(() => {
        const fetchLanguages = async () => {
			const path = '/wpml/v1/languages';
			try {
				const languages = await apiFetch({ path });
				const languagesOptions = languages.flatMap(langObj =>
					Object.entries(langObj).map(([value, label]) => ({ value, label }))
				);
				setOptions(languagesOptions);
			} catch (error) {
				console.error('Error fetching languages:', error);
			}
		};

        fetchLanguages()
    }, [])

    return (
        <SelectControl
            label={ __( 'Select language', 'ninja' ) }
            value={language}
            options={options}
            onChange={onChangeLanguage}
        />
    )
}
