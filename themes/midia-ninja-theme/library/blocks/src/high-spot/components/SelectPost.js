import { __ } from '@wordpress/i18n'
import { useState, useEffect } from '@wordpress/element'
import { ComboboxControl } from '@wordpress/components'
import apiFetch from '@wordpress/api-fetch'

const SelectPost = ({ postId, setPostId }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = (search = '') => {
        const path = `/wp/v2/search?search=${encodeURIComponent(search)}`
        apiFetch({ path }).then((items) => {
            setPosts(items.map((item) => ({ value: item.id, label: item.title })))
        })
    }

    const onChange = (value) => {
        setPostId(Number(value))
    }

    return (
        <ComboboxControl
            label={ __( 'Select a post', 'ninja' ) }
            options={ posts }
            onChange={ onChange }
            value={ Number(postId) }
            onFilterValueChange={ fetchPosts }
        />
    )
}

export default SelectPost
