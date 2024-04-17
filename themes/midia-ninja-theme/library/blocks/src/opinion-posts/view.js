import slick from 'slick-carousel'

document.addEventListener("DOMContentLoaded", function() {
    const horizontalSliders = document.querySelectorAll('[data-slider="horizontal-posts"]')

    horizontalSliders.forEach(slider => {
        const slides = slider.querySelector('.opinion-posts-block__slides')
        const arrows = slider.querySelector('.opinion-posts-block__arrows')
        const dots = slider.querySelector('.opinion-posts-block__dots')
        const slidesToShow = slider.dataset.slidesToShow || 3

        // Mobile
        const arrowsMobile = slider.querySelector('.medium-only .opinion-posts-block__arrows')
        const dotsMobile = slider.querySelector('.medium-only .opinion-posts-block__dots')

        jQuery(slides).slick({
            appendArrows: arrows,
            appendDots: dots,
            dots: true,
            infinite: false,
            slidesToShow: parseInt(slidesToShow),
            responsive: [
                {
                    breakpoint: 783,
                    settings: {
                        appendArrows: arrowsMobile,
                        appendDots: dotsMobile,
                        slidesToShow: 1
                    }
                }
            ]
        })
    })
})
