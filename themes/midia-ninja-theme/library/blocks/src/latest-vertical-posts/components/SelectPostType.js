const { SelectControl } = wp.components
const { useEffect, useState } = wp.element

export default function SelectPostType({ postType, onChangePostType }) {
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (window.ninja_latest_vertical_posts_editor_data && window.ninja_latest_vertical_posts_editor_data.post_types) {
            const postTypes = window.ninja_latest_vertical_posts_editor_data.post_types
            const postTypesOptions = Object.entries(postTypes).map(([value, label]) => ({
                value: value,
                label: label
            }))
            setOptions(postTypesOptions)
        }
    }, []);

    return (
        <SelectControl
            label="Selecione o tipo de post (CPT):"
            value={postType}
            options={options}
            onChange={onChangePostType}
        />
    );
}
