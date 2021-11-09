import { registerBlockType } from "@wordpress/blocks";
import { MediaUpload, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

const DraggableImage = ({ title, button, description, image, removeImage, setDescription, setButtons, setTitle }) => {
    return (
        <div className="slider-item-container">
            <img className='slider-item' src={image.url} key={image.id} />
            <div className="fields">
                <div className="title">
                <RichText
                    tagName="span"
                    className="title-field"
                    value={title}
                    onChange={setTitle}
                    placeholder={__('Type the title here', 'jaci')}
                />
                </div>
                
                <div className="description">
                <RichText
                    tagName="span"
                    className="description-field"
                    value={description}
                    onChange={setDescription}
                    placeholder={__('Type here your description', 'jaci')}
                />
                </div>

                <div className="featured-button">
                    <RichText
                        tagName="span"
                        className="button-field"
                        value={button}
                        onChange={setButtons}
                        placeholder={__('Type button text', 'jaci')}
                    />
                </div>
            </div>
           
            <div className="remove-item" onClick={removeImage}><span class="dashicons dashicons-trash"></span></div>
        </div>
    );
};

const ImageGallery = ({ images, imagesTitle, imagesDescriptions, imagesButtons, setAttributes }) => {
    const removeImage = (index) => {
        return () => {
            const newImages = images.filter((image, i) => {
                if (i != index) {
                    return image;
                }
            });

            imagesDescriptions.splice(index, 1);
            imagesTitle.splice(index, 1);
            imagesButtons.splice(index, 1);

            setAttributes({
                images: newImages,
                imagesDescriptions,
                imagesTitle,
                imagesButtons
            });
        }
    };

    const updateItem = (key, collection, index) => {
        return (content) => {
            setAttributes({
                [key]: collection.map((item, i) => {
                    if (i == index) {
                        return content;
                    } else {
                        return item;
                    }
                })
            });
        };
    };

    return (
        <div className="sliders-grid">
            {images.map((image, index) => {
                return (
                    <DraggableImage
                        collection={images}
                        title={imagesTitle[index]}
                        description={imagesDescriptions[index]}
                        button={imagesButtons[index]}
                        image={image}
                        index={index}
                        key={image.id}
                        removeImage={removeImage(index)}
                        setButtons={updateItem('imagesButtons', imagesButtons, index)}
                        setTitle={updateItem('imagesTitle', imagesTitle, index)}
                        setDescription={updateItem('imagesDescriptions', imagesDescriptions, index)}
                    />
                );
            })}
            <MediaUpload
                onSelect={(media) => { setAttributes({ images: [...images, ...media] }); }}
                type="image"
                multiple={true}
                value={images}
                render={({ open }) => (
                    <div className="select-images-button is-button is-default is-large" onClick={open}>
                        <span class="dashicons dashicons-plus"></span>
                    </div>
                )}
            />
        </div>
    );
};

registerBlockType('jaci/featured-slider', {
    title: __('Featured Slider', 'jaci'),
    icon: 'format-gallery',
    category: 'common',
    keywords: [
        __('materialtheme'),
        __('photos'),
        __('images')
    ],
    supports: {
        align: true,
    },
    attributes: {
        images: {
            type: 'array',
        },

        imagesTitle: {
            type: 'array',
        },

        imagesDescriptions: {
            type: 'array',
        },

        imagesButtons: {
            type: 'array',
        },
    },

    edit({ attributes, className, setAttributes }) {
        const { images = [], imagesDescriptions = [], imagesTitle = [], imagesButtons = [] } = attributes;

        images.forEach((image, index) => {
            if ( ! imagesDescriptions[index] && imagesDescriptions[index] != '' ) {
                imagesDescriptions[index] = "";
            }

            if ( ! imagesTitle[index] && imagesTitle[index] != '') {
                imagesTitle[index] = "";
            }

            if ( ! imagesButtons[index] && imagesButtons[index] != '') {
                imagesButtons[index] = "";
            }
        });


        const onSortEnd = ({ newIndex, oldIndex }) => {
            setAttributes({
                images: arrayMove(images, oldIndex, newIndex),
                imagesTitle: arrayMove(imagesTitle, oldIndex, newIndex),
                imagesDescriptions: arrayMove(imagesDescriptions, oldIndex, newIndex),
                imagesButtons: arrayMove(imagesButtons, oldIndex, newIndex),
            });
        };

        if ( imagesTitle != attributes.imagesTitle ) {
            setAttributes( { ...attributes, imagesTitle } );
        }

        if ( imagesButtons != attributes.imagesButtons ) {
            setAttributes( { ...attributes, imagesButtons } );
        }

        if ( imagesDescriptions != attributes.imagesDescriptions ) {
            setAttributes( { ...attributes, imagesDescriptions } );
        }

        return (
            <div className="slider-image-gallery">
                <ImageGallery
                    axis="xy"
                    helperClass="moving"
                    helperContainer={document.querySelector('.sliders-grid')}
                    images={images}
                    imagesTitle={imagesTitle}
                    imagesDescriptions={imagesDescriptions}
                    imagesButtons={imagesButtons}
                    onSortEnd={onSortEnd}
                    pressDelay={200}
                    setAttributes={setAttributes}
                />
            </div>
        );
    },

    save: ({ attributes }) => {
        const { images = [], imagesDescriptions = [], imagesTitle = [], imagesButtons = [] } = attributes;

        const displayImages = (images) => {
            return (
                images.map((image, index) => {

                    return (
                        <div className="slide-item-wrapper">
                            <img
                                className='gallery-item'
                                key={images.id}
                                src={image.url}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                load="lazy"
                            />
                            <div className="wrapper container">
                                <div class="image-meta row">
                                    <div className="col-md-12">
                                        <div className="slide-content">
                                            <div className="counter">
                                                { (index + 1 + '').padStart(2, '0')  + '-' + (images.length + '').padStart(2, '0') }
                                            </div>
                                            <div class="image-title"> <RichText.Content tagName="span" value={imagesTitle[index]} /></div>
                                            { imagesDescriptions[index].length > 0 && <div class="image-description"> <RichText.Content tagName="span" value={imagesDescriptions[index]} /></div> }
                                            { imagesButtons[index].length > 0 && <div class="image-button"> <RichText.Content tagName="span" value={imagesButtons[index]} /></div> }

                                            <div class="tns-controls" aria-label="Carousel Navigation"><button data-controls="prev" tabindex="-1" aria-controls="tns1"><svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M4.76837e-06 8L32 8" stroke="white" stroke-width="1.6769" stroke-miterlimit="10"></path><path d="M8 16C8 11.58 4.42 8 2.60673e-06 8C4.42 8 8 4.42 8 2.38419e-06" stroke="white" stroke-width="1.9212" stroke-miterlimit="10"></path></g><defs><clipPath id="clip0"><rect width="32" height="16" fill="white" transform="translate(32 16) rotate(-180)"></rect></clipPath></defs></svg></button><button data-controls="next" tabindex="-1" aria-controls="tns1"><svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 8L0 8" stroke="white" stroke-width="1.6769" stroke-miterlimit="10"></path><path d="M24 0C24 4.42 27.58 8 32 8C27.58 8 24 11.58 24 16" stroke="white" stroke-width="1.9212" stroke-miterlimit="10"></path></svg></button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })
            )
        }

        return (
            <div>
                <div className="featured-slider">
                    <div className="itens-wrapper">
                        {displayImages(images)}
                    </div>
                </div>
            </div>
        );

    },
});