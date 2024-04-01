import { __ } from '@wordpress/i18n'

import { Button } from '@wordpress/components'
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'
import { useEffect, useState } from '@wordpress/element'

import './image-selector.scss'

const ImageSelector = ({ onImageSelect, selectedImage }) => {
    const [image, setImage] = useState()

    useEffect(() => {
        if (selectedImage) {
            setImage(selectedImage)
        }
    }, [selectedImage])

    const onSelectImage = (media) => {
        setImage(media)
        if (onImageSelect) {
            onImageSelect(media)
        }
    }

    return (
        <>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={['image']}
                    value={image ? image.id : ''}
                    render={({ open }) => (
                        <div className='image-selector-component'>
                            <p className='label'>{ __( 'Background image', 'ninja' ) }</p>
                            { image ? <img onClick={open} src={image.url} alt={image.alt} /> : null }
                            <Button onClick={open} variant="secondary">
                                { image?.url ? __( 'Change image', 'ninja' ) : __( 'Select a image', 'ninja' ) }
                            </Button>
                        </div>
                    )}
                />
            </MediaUploadCheck>
        </>
    )
}

export default ImageSelector
