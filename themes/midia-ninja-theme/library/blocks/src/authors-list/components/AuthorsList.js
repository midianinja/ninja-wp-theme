import React, { useState, useEffect, useCallback } from "react";

function AuthorsList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    /* -------------------------
       Escuta o input externo
    -------------------------- */
    useEffect(() => {
        const input = document.getElementById("authors-search-input");
        if (!input) return;

        let debounce;

        const handleInput = (e) => {
            const value = e.target.value;

            clearTimeout(debounce);

            debounce = setTimeout(() => {
                setCurrentPage(1); // sempre volta para página 1
                setSearch(value.trim());
            }, 400);
        };

        input.addEventListener("input", handleInput);

        return () => {
            input.removeEventListener("input", handleInput);
        };
    }, []);

    /* -------------------------
       Busca dados na API
    -------------------------- */
    const fetchPosts = useCallback(async (page, searchTerm) => {
        setError(null);
        setLoading(true);

        const base = "/wp-json/ninja/v1/posts/guest-author";

        const params = {
            page: page,
            per_page: 30,
            max_posts: 300,
            only_columnist: 1,
            search: searchTerm || undefined,
        };

        const url = buildUrl(base, params);

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erro na requisição");

            const data = await response.json();

            if (data && Array.isArray(data.posts)) {
                setPosts(data.posts);
                setTotalPages(data.totalPages || 0);
            } else {
                setError("Dados inválidos recebidos.");
            }
        } catch (err) {
            console.error(err);
            setError("Erro ao buscar colunistas.");
        } finally {
            setLoading(false);
        }
    }, []);

    /* -------------------------
       Atualiza quando muda página ou busca
    -------------------------- */
    useEffect(() => {
        fetchPosts(currentPage, search);
    }, [currentPage, search, fetchPosts]);

    /* -------------------------
       Monta URL
    -------------------------- */
    const buildUrl = (base, params) => {
        const query = Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null && value !== "")
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join("&");

        return `${base}?${query}`;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <div className="other-authors-card">

                {loading && <p>Carregando...</p>}

                {!loading && posts.length === 0 && (
                    <p>Nenhum colunista encontrado.</p>
                )}

                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}

                {error && <p>{error}</p>}
            </div>

            {/* 🔥 Paginação só aparece se NÃO estiver buscando */}
            {!search && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
}

/* ============================= */

function Post({ post }) {
    return (
        <a href={post.link} className="authors-list-block__author">
            <img src={post.thumbnail} alt={post.title} />
            <p className="post-title">{post.title}</p>
        </a>
    );
}

/* ============================= */

function Pagination({ currentPage, totalPages, onPageChange }) {
    const visiblePages = calculateVisiblePages(currentPage, totalPages);

    return (
        totalPages > 1 && (
            <ul className="latest-grid-posts-block__pagination">

                {currentPage > 1 && (
                    <li
                        className="prev"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Anterior
                    </li>
                )}

                {visiblePages.map((page, index) => (
                    <li
                        key={index}
                        className={
                            typeof page === "number" && page === currentPage
                                ? "active"
                                : page === "..."
                                ? "dots"
                                : ""
                        }
                        onClick={() =>
                            typeof page === "number" && onPageChange(page)
                        }
                    >
                        {page}
                    </li>
                ))}

                {currentPage < totalPages && (
                    <li
                        className="next"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Próximo
                    </li>
                )}
            </ul>
        )
    );
}

/* ============================= */

function calculateVisiblePages(currentPage, totalPages) {
    let pages = [];
    const visibleCount = 3;

    let startPage = Math.max(currentPage - Math.floor(visibleCount / 2), 1);
    let endPage = startPage + visibleCount - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - visibleCount + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
    }

    if (endPage < totalPages) {
        pages.push("...");
        pages.push(totalPages);
    }

    return pages;
}

export default AuthorsList;
