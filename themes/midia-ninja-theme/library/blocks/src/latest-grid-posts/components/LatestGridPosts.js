import React, { useState, useEffect, useCallback } from 'react'

function LatestGridPosts({
    compare,
    localeCode,
    maxPosts,
    noCompare,
    noPostType,
    noQueryTerms,
    noTaxonomy,
    perPage,
    postNotIn,
    postType,
    taxonomy,
    terms,
    showAuthor,
    showChildren,
    showDate,
    showExcerpt
}) {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [error, setError] = useState(null)

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

    const fetchPosts = useCallback(
        async (page) => {
            setError(null)

            const base = `/wp-json/ninja/v1/posts/${postType}`

			const urlParams = {
				compare: compare,
				locale_code: localeCode,
				lang: localeCode, // adiciona isso
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

            let url = buildUrl(base, urlParams)

            // cache-buster simples pra evitar qualquer cache teimoso respeitando locale
            url += (url.includes('?') ? '&' : '?') + `_cb=${Date.now()}`

            try {
                const response = await fetch(url, { cache: 'no-store' })

                if (!response.ok) {
                    throw new Error('Response not ok')
                }

                const data = await response.json()

                if (data && Array.isArray(data.posts) && typeof data.totalPages === 'number') {
                    setTotalPages(data.totalPages)
                    setPosts(data.posts)

                    if (data.posts.length === 0) {
                        setError(null)
                    }
                } else {
                    setError('Dados recebidos são inválidos.')
                }
            } catch (error) {
                console.error('Error fetching posts:', error)

                if (!posts.length) {
                    setError(null)
                } else {
                    setError('Failed to load posts.')
                }
            }
        },
        [
            compare,
            localeCode,
            taxonomy,
            terms,
            perPage,
            maxPosts,
            postNotIn,
            noCompare,
            noPostType,
            noQueryTerms,
            noTaxonomy,
            postType,
            showChildren
        ]
    )

    // Sempre que algum parâmetro “de filtro” muda, volta pra página 1
    useEffect(() => {
        setCurrentPage(1)
    }, [
        compare,
        localeCode,
        taxonomy,
        terms,
        perPage,
        maxPosts,
        postNotIn,
        noCompare,
        noPostType,
        noQueryTerms,
        noTaxonomy,
        postType,
        showChildren
    ])

    // Faz o fetch quando o postType estiver definido e currentPage mudar
    useEffect(() => {
        if (!postType) return
        fetchPosts(currentPage)
    }, [fetchPosts, currentPage, postType])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <>
            <div className="latest-grid-posts-block__posts">
                {error && <p className="error-message">Erro ao carregar posts: {error}</p>}
                {!error && posts.length === 0 && <p className="no-posts-message"></p>}
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                        showAuthor={showAuthor}
                        showDate={showDate}
                        showExcerpt={showExcerpt}
                    />
                ))}
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
                <div className="post-thumbnail--image">
                    <img src={post.thumbnail} alt={post.title} />
                </div>
            </div>
            <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                {showExcerpt && (
                    <div className="post-content--excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                )}

                <div className="post-meta">
                    {showAuthor && (
                        <span
                            className="post-meta--author"
                            dangerouslySetInnerHTML={{ __html: post.author }}
                        ></span>
                    )}
                    {showDate && <span className="post-meta--date">{post.date}</span>}
                </div>
            </div>
        </a>
    )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
    const visiblePages = calculateVisiblePages(currentPage, totalPages)

    return (
        totalPages > 1 && (
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
                        className={`${typeof page === 'number' && page === currentPage ? 'active' : ''} ${
                            page === '...' ? 'dots' : ''
                        }`}
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
    let pages = []
    const visiblePages = 3

    let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1)
    let endPage = startPage + visiblePages - 1

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
        pages.push('...')
        pages.push(totalPages)
    }

    return pages
}

export default LatestGridPosts
