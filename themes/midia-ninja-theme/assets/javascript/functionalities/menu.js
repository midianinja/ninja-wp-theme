document.addEventListener("DOMContentLoaded", function () {
    const mainMenu = document.querySelector('.main-header #main-menu');
    if (!mainMenu) return;

    const mq = window.matchMedia("(min-width: 768px)");
    let pidCounter = 0;

    function throttle(func, delay) {
        let lastFunc;
        let lastRan;
        return function () {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if ((Date.now() - lastRan) >= delay) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, delay - (Date.now() - lastRan));
            }
        }
    }

    function openDesktop(li) {
        if (!li || li.parentElement !== mainMenu) return;
        const current = mainMenu.querySelector(':scope > li.menu-item-has-children.active');
        if (current && current !== li) {
            current.classList.remove('active');
            const sm = current.querySelector(':scope > .sub-menu');
            if (sm) sm.style.display = '';
        }
        li.classList.add('active');
        const submenu = li.querySelector(':scope > .sub-menu');
        if (submenu) submenu.style.display = 'block';
    }

    function closeAllDesktop() {
        const actives = mainMenu.querySelectorAll(':scope > li.menu-item-has-children.active');
        actives.forEach(li => {
            li.classList.remove('active');
            const submenu = li.querySelector(':scope > .sub-menu');
            if (submenu) submenu.style.display = '';
        });
    }

    function setupDesktopEvents() {
        const parents = mainMenu.querySelectorAll(':scope > li.menu-item-has-children');
        parents.forEach(li => {
            li.addEventListener('mouseenter', () => {
                if (mq.matches) openDesktop(li);
            });

            li.addEventListener('mouseleave', () => {
                if (mq.matches) closeAllDesktop();
            });
        });
    }

    function handleLayout() {
        if (mq.matches) {
            setupDesktopEvents();
        }
        closeAllDesktop();
    }

    mainMenu.addEventListener('focusin', (e) => {
        if (!mq.matches) return;
        const li = e.target.closest('li.menu-item-has-children');
        if (li && li.parentElement === mainMenu) openDesktop(li);
    });

    document.addEventListener('click', function (e) {
        if (!mq.matches) return;
        if (e.target.closest('.main-header') === null) closeAllDesktop();
    });

    const closeOnScroll = throttle(function() {
        if (mq.matches) closeAllDesktop();
    }, 150);

    window.addEventListener('scroll', closeOnScroll, { passive: true });

    const menuItens = document.querySelector(".menu-items");
    const buttonMais = document.querySelector(".mais");
    const searchMenu = document.querySelector(".search-menu");
    const hamburgerLines = document.querySelector(".hamburger-lines");
    const hamburgerLinesMobile = document.querySelector(".hamburger-lines--mobile");
    const closeMenu = document.querySelector(".close-menu");

    function searchFieldFocus(element) {
        const searchField = document.querySelector(element);
        if (searchField) {
            setTimeout(function () { searchField.focus(); }, 100);
        }
    }

    function toggleMenu(ev) {
        if (ev) ev.preventDefault();
        if (!menuItens) return;
        if (menuItens.classList.contains('open')) {
            menuItens.classList.remove('open');
        } else {
            menuItens.classList.add('open');
            searchFieldFocus('#searchform .search-field');
        }
    }

    hamburgerLines && hamburgerLines.addEventListener('click', toggleMenu);
    hamburgerLinesMobile && hamburgerLinesMobile.addEventListener('click', toggleMenu);
    searchMenu && searchMenu.addEventListener("click", toggleMenu);
    buttonMais && buttonMais.addEventListener("click", toggleMenu);

    closeMenu && closeMenu.addEventListener('click', function (ev) {
        ev.preventDefault();
        if (!menuItens) return;
        menuItens.classList.remove('open');
    });

    const burguerMenu = document.querySelector('.hamburguer nav > ul');
    const burguerWithChild = burguerMenu ? burguerMenu.querySelectorAll('li.menu-item-has-children') : [];

    burguerWithChild.forEach(item => {
        const toggle = item.querySelector(':scope > i');
        if (!toggle) return;

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            item.classList.toggle('active');
        });
    });

    const header = document.querySelector(".main-header");
    let isScrolled = false;

    const detectScroll = throttle(function () {
        if (!header) return;
        const scroll = window.scrollY || document.documentElement.scrollTop;
        if (scroll > 100 && !isScrolled) {
            header.classList.add("scrolado");
            isScrolled = true;
        } else if (scroll < 50 && isScrolled) {
            header.classList.remove("scrolado");
            isScrolled = false;
        }
    }, 200);

    window.addEventListener('scroll', detectScroll, { passive: true });

    const langSelect = document.getElementById('lang-switcher-especial');
    if (langSelect) {
        langSelect.addEventListener('change', function() {
            if (this.value) {
                window.location.href = this.value;
            }
        });
    }

    handleLayout();
    mq.addEventListener('change', handleLayout);
});

// Bloco independente para setas de navegação do menu especial
// Roda em qualquer página (single especial) — não depende do #main-menu
document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.querySelector('.menu-especial__links ul');
    const scrollLeftBtn   = document.querySelector('.menu-especial__scroll-btn--left');
    const scrollRightBtn  = document.querySelector('.menu-especial__scroll-btn--right');

    if (!scrollContainer || !scrollLeftBtn || !scrollRightBtn) return;

    let scrollTicking = false;
    function updateScrollButtons() {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (maxScroll <= 1) {
            scrollLeftBtn.classList.add('is-hidden');
            scrollRightBtn.classList.add('is-hidden');
            return;
        }
        scrollLeftBtn.classList.toggle('is-hidden', scrollContainer.scrollLeft <= 0);
        scrollRightBtn.classList.toggle(
            'is-hidden',
            scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1
        );
    }

    let resizeTicking = false;
    function onResize() {
        if (resizeTicking) return;
        resizeTicking = true;
        requestAnimationFrame(function () {
            updateScrollButtons();
            resizeTicking = false;
        });
    }

    function onScroll() {
        if (scrollTicking) return;
        scrollTicking = true;
        requestAnimationFrame(function () {
            updateScrollButtons();
            scrollTicking = false;
        });
    }

    const scrollAmount = 150;
    scrollLeftBtn.addEventListener('click', function () {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    scrollRightBtn.addEventListener('click', function () {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    updateScrollButtons();
});
