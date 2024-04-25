document.addEventListener("DOMContentLoaded", function () {
	const filtersWrap = document.querySelectorAll(
		".latest-editorial-posts-block__filter",
	);
	const filters = document.querySelectorAll(
		".latest-editorial-posts-block__filter [data-term-id]",
	);

	filters.forEach((filter) => {
		filter.addEventListener("click", function () {
			filters.forEach((filter) => filter.classList.remove("active"));
			filtersWrap.forEach((filter) => filter.classList.remove("active"));
			this.classList.add("active");
			this.closest(".latest-editorial-posts-block__filter").classList.add(
				"active",
			);
			const termId = this.getAttribute("data-term-id");
			fetchPostsByCategoryId(termId);
		});
	});

	function fetchPostsByCategoryId(categoryId) {
		const postsDiv = document.querySelector(
			".latest-editorial-posts-block__posts",
		);
		postsDiv.innerHTML = '<div class="loading">Loading...</div>';

		let url = "/wp-json/wp/v2/posts?_embed&per_page=9";
		if (categoryId) {
			url = `/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=9`;
		}

		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((posts) => {
				if (posts.length > 0) {
					updatePostsDiv(posts);
				} else {
					postsDiv.innerHTML = '<div class="not-found">Not Found</div>';
				}
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
				postsDiv.innerHTML = '<div class="error">Error loading posts.</div>';
			});
	}

	function updatePostsDiv(posts) {
		const postsDiv = document.querySelector(
			".latest-editorial-posts-block__posts",
		);
		postsDiv.innerHTML = "";

		posts.forEach((post) => {
			const postElement = document.createElement("a");
			postElement.href = post.link;
			const imageUrl = post._embedded["wp:featuredmedia"]
				? post._embedded["wp:featuredmedia"][0].source_url
				: "https://via.placeholder.com/400";

			let termsHtml = "";
			if (post.main_category) {
				termsHtml = `
                <div class="post-thumbnail">
                    <span class="post--terms">
                        <ul class="list-terms tax-category">
                            <li class="category-${post.main_category.slug}">${post.main_category.name}</li>
                        </ul>
                    </span>
                    <img src="${imageUrl}" alt="${post.title.rendered}">
                </div>
                `;
			} else {
				termsHtml = `
                <div class="post-thumbnail">
                    <img src="${imageUrl}" alt="${post.title.rendered}">
                </div>
                `;
			}

			postElement.innerHTML = `
                <div class="post">
                    ${termsHtml}
                    <div class="post-content">
                        <h2 class="post-title">${post.title.rendered}</h2>
                        <div class="post-meta">
                            <span class="post-meta--date">${new Date(post.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            `;
			postsDiv.appendChild(postElement);
		});
	}

	document.querySelectorAll(".clear-filter").forEach((item) => {
		item.addEventListener("click", function () {
			document
				.querySelectorAll(
					".latest-editorial-posts-block__filter [data-term-id]",
				)
				.forEach((filter) => filter.classList.remove("active"));
			document
				.querySelectorAll(".latest-editorial-posts-block__filter")
				.forEach((filter) => filter.classList.remove("active"));
			fetchPostsByCategoryId("");
		});
	});
});
