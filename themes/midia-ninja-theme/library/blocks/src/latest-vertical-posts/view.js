import slick from 'slick-carousel'

document.addEventListener("DOMContentLoaded", function() {
    const sliders = document.querySelectorAll('[data-slider="vertical-posts"]')

	function initializeSlick(slider){
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
	}

    sliders.forEach(slider => {
		const options = {
			root: document.body,
			threshold: 0
		}
		const callback = (entries, observer) => {
			if(entries[0].isIntersecting){
				observer.unobserve(slider)
				initializeSlick(slider)

			}
		}
		const observer = new IntersectionObserver(callback, options)
        observer.observe(slider)
    })
})
