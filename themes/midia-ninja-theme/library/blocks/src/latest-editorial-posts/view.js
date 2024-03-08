document.addEventListener('DOMContentLoaded', function() {
    const filtersWrap = document.querySelectorAll('.latest-editorial-posts-block__filter')
    const filters = document.querySelectorAll('.latest-editorial-posts-block__filter [data-term-id]')

    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            filters.forEach(filter => filter.classList.remove('active'))
            filtersWrap.forEach(filter => filter.classList.remove('active'))
            this.classList.add('active')
            this.closest('.latest-editorial-posts-block__filter').classList.add('active')
            const termId = this.getAttribute('data-term-id')
            fetchPostsByCategoryId(termId)
        })
    })

    function fetchPostsByCategoryId(categoryId) {
        const postsDiv = document.querySelector('.latest-editorial-posts-block__posts')
        postsDiv.innerHTML = '<div class="loading">Loading...</div>'

        fetch(`/wp-json/wp/v2/posts?categories=${categoryId}&_embed`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(posts => {
                if (posts.length > 0) {
                    updatePostsDiv(posts)
                } else {
                    postsDiv.innerHTML = '<div class="not-found">Not Found</div>'
                }
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                postsDiv.innerHTML = '<div class="error">Error loading posts.</div>'
            })
    }

    function updatePostsDiv(posts) {
        const postsDiv = document.querySelector('.latest-editorial-posts-block__posts')
        postsDiv.innerHTML = ''

        posts.forEach(post => {
            const postElement = document.createElement('a')
            postElement.href = post.link
            const imageUrl = post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : 'https://via.placeholder.com/400';
            postElement.innerHTML = `
                <div class="post">
                    <div class="post-thumbnail">
                        <div class="post-thumbnail--image">
                            <img src="${imageUrl}" alt="${post.title.rendered}">
                        </div>
                    </div>
                    <div class="post-content">
                        <h2 class="post-title">${post.title.rendered}</h2>
                        <div class="post-meta">
                            <span class="post-meta--date">${new Date(post.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            `
            document.querySelector('.latest-editorial-posts-block__posts').appendChild(postElement)
        })
    }
})
