document.addEventListener("DOMContentLoaded", function() {
    const mainMenu = document.querySelector('.main-header #main-menu');
    const itensWithChild = mainMenu.querySelectorAll('li.menu-item-has-children');

    //Hamburguer Menu Open/Close
    const menuItens = document.querySelector(".menu-items");
    const menuButton = document.querySelector("#burguer-checkbox");
    const buttonMais = document.querySelector(".mais");
    const searchMenu = document.querySelector(".search-menu");
    const hamburgerLines = document.querySelector(".hamburger-lines")
    const hamburgerLinesMobile = document.querySelector(".hamburger-lines--mobile")
    const closeMenu = document.querySelector(".close-menu")

    hamburgerLines.addEventListener('click', function(ev) {
        ev.preventDefault()

        if (menuItens.classList.contains('open')) {
            menuItens.classList.remove('open')
        } else {
            menuItens.classList.add('open')
            searchFieldFocus('#searchform .search-field')
        }
    })

    hamburgerLinesMobile.addEventListener('click', function(ev) {
        ev.preventDefault()

        if (menuItens.classList.contains('open')) {
            menuItens.classList.remove('open')
        } else {
            menuItens.classList.add('open')
            searchFieldFocus('#searchform .search-field')
        }
    })

    closeMenu.addEventListener('click', function(ev) {
        ev.preventDefault()
        menuItens.classList.remove('open')
    })

    searchMenu.addEventListener("click", function(ev) {
        console.log(searchMenu);
        console.log('clicquei');


        if (menuItens.classList.contains("open")) {
            menuItens.classList.remove("open");
        } else {
            menuItens.classList.add("open")
            searchFieldFocus('#searchform .search-field')
        }
    })

    buttonMais.addEventListener ("click", function(ev) {
        ev.preventDefault();

        if (menuItens.classList.contains('open')) {
            menuItens.classList.remove('open')
        } else {
            menuItens.classList.add('open')
            searchFieldFocus('#searchform .search-field')
        }
    })

    //Hamburger Menu Itens
    const burguerMenu = document.querySelector('.hamburguer #menu-hamburguer');
    const burguerWithChild = burguerMenu.querySelectorAll('#menu-hamburguer li.menu-item-has-children');

    burguerWithChild.forEach(item => {

        if (item.parentElement.classList.contains('sub-menu')){
            return;
        }

        item.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();

            item.classList.toggle('active');

        });


    })

    document.addEventListener('click', function(e) {
        if ( e.target.closest('.primary-menu') === null ) {
            let allItens = mainMenu.querySelectorAll('.active');

            allItens.forEach ( function(item) {
                item.classList.remove('active');
            });
        }
    })

    function throttle(func, delay) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= delay) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, delay - (Date.now() - lastRan));
            }
        }
    }

    const header = document.querySelector(".main-header")
    let isScrolled = false

    const detectScroll = throttle(function() {
        const scroll = window.scrollY || document.documentElement.scrollTop;
        const threshold = 100
        const returnPoint = 50

        if (scroll > threshold && !isScrolled) {
            header.classList.add("scrolado")
            isScrolled = true
        } else if (scroll < returnPoint && isScrolled) {
            header.classList.remove("scrolado")
            isScrolled = false
        }
        closeSubmenus()
    }, 200)

    document.addEventListener('wheel', detectScroll, { passive: true });
    document.addEventListener('touchmove', detectScroll, { passive: true });
    document.addEventListener('scroll', detectScroll, { passive: true });

    // Helper functions
    function searchFieldFocus(element) {
        let searchField = document.querySelector(element)
        if(searchField) {
            setTimeout(function() {
                searchField.focus()
            }, 100)
        }
    }

    function closeSubmenus() {
        const mainMenu = document.querySelector('.main-header #main-menu')
        const itensWithChild = mainMenu.querySelectorAll('#main-menu li.menu-item-has-children')

        itensWithChild.forEach(item => {
            if (item.parentElement.classList.contains('sub-menu')) {
                return
            }

            item.classList.remove('active')
        })
    }
})
