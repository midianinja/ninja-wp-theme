import 'slick-carousel'

document.addEventListener("DOMContentLoaded", function() {
	if (window.matchMedia('(max-width: 782px)').matches) {
		const sliders = document.querySelectorAll('[data-slider="opinion-posts"]')

		sliders.forEach(slider => {
			const slides = slider.querySelector('.opinion-posts-block__slides')
			const arrows = slider.querySelector('.opinion-posts-block__arrows')
			const dots = slider.querySelector('.opinion-posts-block__dots')

			jQuery(slides).slick({
				appendArrows: arrows,
				appendDots: dots,
				dots: true,
				infinite: false,
				slidesToShow: 1
			})
		})
	}
})
