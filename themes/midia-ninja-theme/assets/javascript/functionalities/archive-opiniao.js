document.addEventListener("DOMContentLoaded", function() {
    const containerPost = document.querySelector(".post-type-archive-opiniao .posts");
    const buttonLoadMore = document.querySelector(".post-type-archive-opiniao .load-more");
    
    let currentPage = 1;
    let postsPerPage = 8;

    buttonLoadMore.addEventListener('click', function() {
        fetchPosts(currentPage, postsPerPage);
    })

    function fetchPosts(page = 1, per_page = 8) {
        const postsDiv = document.querySelector('.post-type-archive-opiniao .posts')
        //postsDiv.innerHTML = '<div class="loading">Loading...</div>'
    
        let url = `/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${per_page}`       
    
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(posts => {
                if (posts.length > 0) {
                    updatePostsDiv(posts)
                    currentPage++
                } else {
                    console.log('No posts found')
                }
            })
            .catch(error => {
                console.error('Error fetching posts:', error)
            })
    }
    
    function updatePostsDiv(posts) {
        const postsDiv = document.querySelector('.post-type-archive-opiniao .posts')
        //postsDiv.innerHTML = ''
    
        posts.forEach(post => {
            const postElement = document.createElement('a')
            postElement.classList.add ('post-card')
            postElement.href = post.link
            const imageUrl = post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : 'https://via.placeholder.com/400'
            const getAuthor = post._embedded['author'][0].name
        
            postElement.innerHTML = `
                <div class="post-card--thumb">
                    <img src="${imageUrl}" alt="${post.title.rendered}">
                </div>
                <div class="post-card--content">
                    <h5 class="entry-title">${post.title.rendered}</h5>
                    
                    <div class="card-author">
                        <span>${getAuthor}</span>
                    </div>
            `
            postsDiv.appendChild(postElement)
        })
    }
})