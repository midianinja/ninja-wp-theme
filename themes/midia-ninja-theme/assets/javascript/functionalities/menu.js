document.addEventListener("DOMContentLoaded", function() {
    
    const menuIcons = document.querySelectorAll('button.toggle-menu');
   
    menuIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const width = window.matchMedia("(max-width: 768px)");
            if (width.matches) {
                document.getElementsByTagName("body").item(0).classList.toggle('menu-active');
            }
            
            this.classList.toggle('active');
            this.parentNode.classList.toggle('active');
            this.closest('header').classList.toggle('active');
            const menuContainerClass =this.getAttribute('menu-container-class')
            document.querySelector('.'+ menuContainerClass).classList.toggle('active');
            searchButton = document.querySelector('.search-toggle');
            searchButton.disabled = ( searchButton.disabled ? false : true );

        })
    });

    const mainMenu = document.querySelector('.main-header #main-menu');
    const itensWithChild = mainMenu.querySelectorAll('#main-menu li.menu-item-has-children');
    
    itensWithChild.forEach(item => {

        if (item.parentElement.classList.contains('sub-menu')){
            return;
        }

        item.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();

            let allItens = mainMenu.querySelectorAll('.active');
            
            allItens.forEach ( function(item) {
                item.classList.remove('active');
            });

            const arrowIcon = this.parentElement.getElementsByTagName("i").item(0);
            arrowIcon.classList.toggle('up');

            const subMenu = this.parentElement.querySelector('.sub-menu');
            subMenu.classList.toggle('active');
            subMenu.parentNode.classList.toggle('active');
        });
    })

    //Hamburguer Menu Open/Close
    const menuItens = document.querySelector(".menu-items");
    const menuButton = document.querySelector("#burguer-checkbox");
    const buttonMais = document.querySelector(".mais");
    const searchMenu = document.querySelector(".search-menu");

    menuButton.addEventListener ("click", function(ev) {
        ev.preventDefault()

        if (menuButton.classList.contains("checked")) {
            menuButton.classList.remove("checked");
        } else {
            menuButton.classList.add("checked")
            searchFieldFocus('#searchform .search-field')
        }
    })

    searchMenu.addEventListener ("click", function(ev) {
        ev.preventDefault()

        if (menuButton.classList.contains("checked")) {
            menuButton.classList.remove("checked");
        } else {
            menuButton.classList.add("checked")
            searchFieldFocus('#searchform .search-field')
        }
    })

    buttonMais.addEventListener ("click", function(ev) {
        ev.preventDefault();

        if (menuButton.classList.contains("checked")) {
            menuButton.classList.remove("checked");
        } else {
            menuButton.classList.add("checked")
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

    // window.addEventListener("wheel", throttle(function() {
    //     const scroll = window.scrollY || document.documentElement.scrollTop;
    //     const mainHeader = document.querySelector(".main-header");
        
    //     if (scroll > 0) {
    //         if ( ! mainHeader.classList.contains("scrolado") ) {
    //             mainHeader.classList.add("scrolado");
    //         }
            
    //     } else if ( mainHeader.classList.contains("scrolado") ) {
    //         mainHeader.classList.remove("scrolado");
    //     }
    // }, 50), { passive: true });

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
})
