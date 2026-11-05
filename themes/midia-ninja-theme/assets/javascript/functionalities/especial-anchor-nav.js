document.addEventListener("DOMContentLoaded", function () {

    const content = document.querySelector("#single-especial .post-content")

    if (!content) {
        return
    }

    // Any heading (h1-h6) with an anchor following the pattern
    // "anchor-{number}" — HTML anchor field set in the block editor,
    // e.g. anchor-1, anchor-2, anchor-1.1 (sub-items) — becomes a
    // navigation item. The dot shows the number from the id itself,
    // so the editorial team controls both the list and the numbering
    const ANCHOR_PATTERN = /^anchor-(\d+(?:\.\d+)*)$/

    const titles = [...content.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")]
        .filter((title) => ANCHOR_PATTERN.test(title.getAttribute("id")))

    if (titles.length < 2) {
        return
    }

    // Build the side dots navigation
    const nav = document.createElement("nav")
    nav.setAttribute("class", "especial-anchor-nav")
    nav.setAttribute("aria-label", "Índice da página")

    const list = document.createElement("ul")

    titles.forEach((title) => {
        const item = document.createElement("li")
        const link = document.createElement("a")
        const number = title.getAttribute("id").match(ANCHOR_PATTERN)[1]
        const isSubItem = number.includes(".")

        link.setAttribute("href", `#${title.getAttribute("id")}`)
        link.innerHTML = `<span class="especial-anchor-nav__dot${isSubItem ? " especial-anchor-nav__dot--sub" : ""}">${number}</span><span class="especial-anchor-nav__label">${title.innerText}</span>`

        item.appendChild(link)
        list.appendChild(item)
    })

    nav.appendChild(list)
    document.body.appendChild(nav)

    // Show the navigation only after scrolling past the first fold
    const toggleVisibility = () => {
        nav.classList.toggle("especial-anchor-nav--visible", window.scrollY > window.innerHeight * 0.5)
    }

    // Track the current section: scrollspy — the active section is the last
    // heading that passed the line just below the fixed header
    const links = nav.querySelectorAll("a")
    const ACTIVE_LINE = 160 // fixed header (~150px) + margin

    const setActive = (link) => {
        links.forEach((l) => l.classList.toggle("especial-anchor-nav--active", l === link))
    }

    const updateActive = () => {
        let current = null

        titles.forEach((title) => {
            if (title.getBoundingClientRect().top <= ACTIVE_LINE) {
                current = title
            }
        })

        if (current) {
            const link = nav.querySelector(`a[href="#${current.getAttribute("id")}"]`)

            if (link) {
                setActive(link)
            }
        }
    }

    // Immediate feedback on click
    links.forEach((link) => {
        link.addEventListener("click", () => setActive(link))
    })

    let ticking = false

    const onScroll = () => {
        if (ticking) {
            return
        }

        ticking = true

        window.requestAnimationFrame(() => {
            toggleVisibility()
            updateActive()
            ticking = false
        })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    toggleVisibility()
    updateActive()

})
