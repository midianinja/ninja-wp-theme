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

    function promoteSubmenus() {
        const parents = mainMenu.querySelectorAll(':scope > li.menu-item-has-children');
        parents.forEach(parent => {
            if (!parent.dataset.pid) parent.dataset.pid = (++pidCounter).toString();
            const submenu = parent.querySelector(':scope > .sub-menu');
            if (!submenu) return;

            const children = Array.from(submenu.children);
            children.forEach(child => {
                if (child.dataset.promoted === '1') return;
                child.dataset.promoted = '1';
                child.dataset.parentPid = parent.dataset.pid;
                child.classList.add('promoted-subitem');
                parent.after(child);
            });

            submenu.style.display = 'none';
            parent.classList.remove('active');
        });
    }

    function restoreSubmenus() {
        const promoted = Array.from(mainMenu.querySelectorAll(':scope > li.promoted-subitem[data-promoted="1"]'));
        promoted.forEach(item => {
            const pid = item.dataset.parentPid;
            const parent = mainMenu.querySelector(':scope > li.menu-item-has-children[data-pid="'+pid+'"]');
            if (!parent) return;
            const submenu = parent.querySelector(':scope > .sub-menu');
            if (!submenu) return;
            submenu.appendChild(item);
            item.classList.remove('promoted-subitem');
            delete item.dataset.promoted;
            delete item.dataset.parentPid;
        });
        const submenus = mainMenu.querySelectorAll(':scope > li.menu-item-has-children > .sub-menu');
        submenus.forEach(sm => { sm.style.display = ''; });
    }

    function handleLayout() {
        if (mq.matches) {
            restoreSubmenus();
            setupDesktopEvents();
        } else {
            promoteSubmenus();
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
        const a = item.querySelector(':scope > a');
        if (!a) return;
        a.addEventListener('click', function (e) {
            e.preventDefault();
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

    const scrollContainer = document.querySelector('.menu-especial__links ul');
    const scrollLeftBtn = document.querySelector('.menu-especial__scroll-btn--left');
    const scrollRightBtn = document.querySelector('.menu-especial__scroll-btn--right');

    if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
        const scrollAmount = 150;
        scrollLeftBtn.addEventListener('click', function () {
            scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        scrollRightBtn.addEventListener('click', function () {
            scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    handleLayout();
    mq.addEventListener('change', handleLayout);
});
