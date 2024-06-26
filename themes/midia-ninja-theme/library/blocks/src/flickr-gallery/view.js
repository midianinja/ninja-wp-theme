import apiFetch from '@wordpress/api-fetch'
import { addQueryArgs } from '@wordpress/url'

document.addEventListener("DOMContentLoaded", function() {
	const previousArrow = `<svg width="9" height="4" viewBox="0 0 9 4" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4.41878 3.99865C4.28536 3.99891 4.15606 3.95243 4.05333 3.86729L0.627182 1.01162C0.51057 0.914678 0.437236 0.775372 0.423315 0.624349C0.409393 0.473327 0.456024 0.322958 0.552949 0.206323C0.649874 0.089688 0.789153 0.0163408 0.940147 0.00241676C1.09114 -0.0115073 1.24148 0.0351323 1.35809 0.132076L4.41878 2.69075L7.47948 0.223457C7.53788 0.176016 7.60509 0.140587 7.67723 0.119209C7.74938 0.0978302 7.82503 0.090923 7.89985 0.0988842C7.97467 0.106845 8.04718 0.129517 8.11321 0.165598C8.17925 0.201679 8.2375 0.250457 8.28462 0.309127C8.33691 0.367852 8.37652 0.436746 8.40096 0.511492C8.42539 0.586238 8.43413 0.665226 8.42662 0.743508C8.41912 0.821789 8.39553 0.897677 8.35734 0.966417C8.31915 1.03516 8.26717 1.09527 8.20468 1.14298L4.77853 3.90156C4.67284 3.97324 4.54618 4.00743 4.41878 3.99865Z" fill="#333333"></path>
	</svg>`

	const nextArrow = `<svg width="9" height="4" viewBox="0 0 9 4" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4.41878 3.99865C4.28536 3.99891 4.15606 3.95243 4.05333 3.86729L0.627182 1.01162C0.51057 0.914678 0.437236 0.775372 0.423315 0.624349C0.409393 0.473327 0.456024 0.322958 0.552949 0.206323C0.649874 0.089688 0.789153 0.0163408 0.940147 0.00241676C1.09114 -0.0115073 1.24148 0.0351323 1.35809 0.132076L4.41878 2.69075L7.47948 0.223457C7.53788 0.176016 7.60509 0.140587 7.67723 0.119209C7.74938 0.0978302 7.82503 0.090923 7.89985 0.0988842C7.97467 0.106845 8.04718 0.129517 8.11321 0.165598C8.17925 0.201679 8.2375 0.250457 8.28462 0.309127C8.33691 0.367852 8.37652 0.436746 8.40096 0.511492C8.42539 0.586238 8.43413 0.665226 8.42662 0.743508C8.41912 0.821789 8.39553 0.897677 8.35734 0.966417C8.31915 1.03516 8.26717 1.09527 8.20468 1.14298L4.77853 3.90156C4.67284 3.97324 4.54618 4.00743 4.41878 3.99865Z" fill="#333333"></path>
	</svg>`

	function range (start, end) {
		return [...Array(end - start + 1).keys()].map((index) => index + start)
	}

	function renderPagination (currentPage, totalPages) {
		if (totalPages < 2) {
			return ''
		}

		const visiblePages = 3
		let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1)
		let endPage = startPage + visiblePages - 1

		if (endPage > totalPages) {
			endPage = totalPages
			startPage = Math.max(endPage - visiblePages + 1, 1)
		}

		return `<nav class="navigation pagination">
			<div class="nav-links">
			${(currentPage > 1) ?
				`<a class="prev page-numbers" href="javascript:void(0)" data-page="${currentPage - 1}">${previousArrow}</a>`
			: ''}
			${(startPage > 1) ? (
				`<a class="page-numbers" href="javascript:void(0)" data-page="1">1</a>
				<span class="page-numbers dots">…</span>`
			) : ''}
			${range(startPage, endPage).map((page) => (
				(page === currentPage) ? (
					`<span aria-current="page" class="page-numbers current">${page}</span>`
				) : (
					`<a class="page-numbers" href="javascript:void(0)" data-page="${page}">${page}</a>`
				)
			)).join('')}
			${(endPage < totalPages) ? (
				`<span class="page-numbers dots">…</span>
				<a class="page-numbers" href="javascript:void(0)" data-page="${totalPages}">${totalPages}</a>`
			) : ''}
			${(currentPage < totalPages) ?
				`<a class="next page-numbers" href="javascript:void(0)" data-page="${currentPage + 1}">${nextArrow}</a>`
			: ''}
			</div>
		</nav>`
	}

	document.querySelectorAll('.flickr-gallery-block').forEach((block) => {
		const scrollAnchor = block.querySelector('.flickr-gallery-block__before-grid')

		const grid = block.querySelector('.flickr-gallery-block__grid')
		const flickrApiKey = grid.dataset.key
		const flickrType = grid.dataset.type
		const flickrDataId = grid.dataset.id

		const pagination = block.querySelector('.flickr-gallery-block__pagination')
		const totalPages = Number(pagination.dataset.pages)
		updatePagination(1)

		let abortController = null

		function changePage (event) {
			const currentPage = Number(event.currentTarget.dataset.page)
			updatePagination(currentPage)

			if (abortController) {
				abortController.abort()
			}
			abortController = new AbortController()

			apiFetch({
				path: addQueryArgs( '/ninja/v1/flickr_page', {
					api_key: flickrApiKey,
					data_id: flickrDataId,
					page: currentPage,
					type: flickrType,
				} ),
				signal: abortController.signal,
			}).then((res) => {
				grid.innerHTML = res.html
				if (scrollAnchor) {
					scrollAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
				}
			})
		}

		function updatePagination (currentPage) {
			pagination.querySelectorAll('a').forEach((link) => {
				link.removeEventListener('click', changePage)
			})

			pagination.innerHTML = renderPagination(currentPage, totalPages)

			pagination.querySelectorAll('a').forEach((link) => {
				link.addEventListener('click', changePage)
			})
		}
	})
})
