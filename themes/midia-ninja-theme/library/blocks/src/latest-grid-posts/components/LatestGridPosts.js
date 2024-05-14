import React, { useState, useEffect, useCallback } from 'react'

function LatestGridPosts({ compare, maxPosts, noCompare, noPostType, noQueryTerms, noTaxonomy, perPage, postNotIn, postType, taxonomy, terms, showAuthor, showChildren, showDate, showExcerpt }) {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchPosts(currentPage)
    }, [currentPage])

    const fetchPosts = useCallback(async (page) => {
        setError(null)
        const base = `/wp-json/ninja/v1/posts/${postType}`
        const urlParams = {
            compare: compare,
            taxonomy: taxonomy,
            terms: terms,
            page: page.toString(),
            per_page: perPage,
            max_posts: maxPosts,
            post_not_in: postNotIn,
            no_compare: noCompare,
            no_post_type: noPostType,
            no_query_terms: noQueryTerms,
            no_taxonomy: noTaxonomy
        }

        if (showChildren) {
            urlParams.post_parent = 1
        }

        const url = buildUrl(base, urlParams)

        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                if (data && Array.isArray(data.posts) && typeof data.totalPages === "number") {
                    if (data.totalPages > 0) {
                        setTotalPages(data.totalPages)
                    }
                    setPosts(data.posts)
                } else {
                    setError("Dados recebidos são inválidos.")
                }
            } else {
                throw new Error('Response not ok')
            }
        } catch (error) {
            console.error('Error fetching posts:', error)
            setError('Failed to load posts.')
        }
    }, [noPostType, noQueryTerms, noTaxonomy, postType, perPage, showAuthor, showDate, showExcerpt, taxonomy, terms, currentPage])

    const buildUrl = (base, params) => {
        const query = Object.entries(params)
            .filter(([key, value]) => {
                if (value == null) return false
                if (typeof value === 'string' && value.trim() === '') return false
                if (Array.isArray(value) && value.length === 0) return false
                return true
            })
            .map(([key, value]) => {
                if (Array.isArray(value) && value.some(item => typeof item === 'object')) {
                    value = value.map(item => item.id).join(',')
                } else if (Array.isArray(value)) {
                    value = value.join(',')
                }
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            })
            .join('&')
        return `${base}?${query}`
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <>
            <div className="latest-grid-posts-block__posts">
                {posts.map(post => (
                    <Post key={post.id} post={post} showAuthor={showAuthor} showDate={showDate} showExcerpt={showExcerpt} />
                ))}
                {error && <p>Erro ao carregar posts: {error}</p>}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    )
}

function Post({ post, showAuthor, showDate, showExcerpt }) {
    return (
        <a href={post.link} className="post">
            <div className="post-thumbnail">
                <div class="post-thumbnail--image">
                    <img src={post.thumbnail} alt={post.title} />
                </div>
            </div>
            <div className="post-content">
                <h2 class="post-title">{post.title}</h2>
                { showExcerpt && <div className="post-content--excerpt">{post.excerpt}</div> }

                <div class="post-meta">
                    { showAuthor && <span class="post-meta--author" dangerouslySetInnerHTML={{__html: post.author}}></span> }
                    { showDate && <span class="post-meta--date">{post.date}</span> }
                </div>
            </div>
        </a>
    )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
    const visiblePages = calculateVisiblePages(currentPage, totalPages)

    return (
        (totalPages > 1) && (
            <ul className="latest-grid-posts-block__pagination">
                {currentPage > 1 && (
                    <li
                        className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    >
                        Anterior
                    </li>
                )}
                {visiblePages.map((page, index) => (
                    <li
                        key={index}
                        className={`${typeof page === 'number' && page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
                    >
                        {page}
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li
                        className={`next ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    >
                        Próximo
                    </li>
                )}
            </ul>
        )
    )
}

function calculateVisiblePages(currentPage, totalPages) {
    let pages = [];
    const visiblePages = 3

    let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1)
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
        endPage = totalPages
        startPage = Math.max(endPage - visiblePages + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
    }

    if (startPage > 1) {
        pages.unshift('...')
        pages.unshift(1)
    }

    if (endPage < totalPages) {
        pages.push('...');
        pages.push(totalPages)
    }

    return pages
}

export default LatestGridPosts
