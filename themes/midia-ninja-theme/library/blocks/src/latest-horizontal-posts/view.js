import slick from 'slick-carousel'

document.addEventListener("DOMContentLoaded", function() {
    const sliders = document.querySelectorAll('[data-slider="horizontal-posts"]')

    sliders.forEach(slider => {
        const slides = slider.querySelector('.latest-horizontal-posts-block__slides')
        const arrows = slider.querySelector('.latest-horizontal-posts-block__arrows')
        const dots = slider.querySelector('.latest-horizontal-posts-block__dots')

        jQuery(slides).slick({
            appendArrows: arrows,
            appendDots: dots,
            dots: true,
            infinite: false,
            slidesToShow: 1
        })
    })
})