import 'slick-carousel'

document.addEventListener("DOMContentLoaded", function() {
	if (window.matchMedia('(max-width: 782px)').matches) {
		const sliders = document.querySelectorAll('[data-slider="opinion-posts"]')

		function initializeSlick(slider){
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
	}
})
