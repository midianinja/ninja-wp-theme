import { __ } from '@wordpress/i18n'
import { SelectControl } from '@wordpress/components'
import { useEffect, useState } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch'

export default function SelectPostType({ postType, onChangePostType }) {
    const [options, setOptions] = useState([])

    useEffect(() => {
        const fetchPostTypes = async () => {
            const path = '/ninja/v1/posttypes'
            try {
                const postTypes = await apiFetch({ path });
                const postTypesOptions = Object.entries(postTypes).map(([value, label]) => ({
                    value,
                    label
                }))
                setOptions(postTypesOptions)
            } catch (error) {
                console.error('Error fetching post types:', error)
            }
        };

        fetchPostTypes()
    }, []);

    return (
        <SelectControl
            label={ __( 'Select post type', 'ninja' ) }
            value={postType}
            options={options}
            onChange={onChangePostType}
        />
    )
}
