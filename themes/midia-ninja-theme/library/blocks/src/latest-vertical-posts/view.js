import slick from 'slick-carousel'

document.addEventListener("DOMContentLoaded", function() {
    const sliders = document.querySelectorAll('[data-slider="vertical-posts"]')

    sliders.forEach(slider => {
        const slides = slider.querySelector('.latest-vertical-posts-block__slides')
        const arrows = slider.querySelector('.latest-vertical-posts-block__arrows')
        const dots = slider.querySelector('.latest-vertical-posts-block__dots')

        jQuery(slides).slick({
            appendArrows: arrows,
            appendDots: dots,
            dots: true,
            infinite: false,
            slidesToShow: 1
        })
    })
})