document.addEventListener("DOMContentLoaded", function() {
    
    const menuIcons = document.querySelectorAll('button.toggle-menu');
    menuIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            var width = window.matchMedia("(max-width: 768px)");
            if (width.matches) {
                document.getElementsByTagName("body").item(0).classList.toggle('menu-active');
            }
            
            this.classList.toggle('active');
            this.parentNode.classList.toggle('active');
            this.closest('header').classList.toggle('active');
            var menuContainerClass =this.getAttribute('menu-container-class')
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

            const arrowIcon = this.parentElement.getElementsByTagName("i").item(0);
            arrowIcon.classList.toggle('up');

            const subMenu = this.parentElement.querySelector('.sub-menu');
            subMenu.classList.toggle('active');
            subMenu.parentNode.classList.toggle('active');
        });
    })

    //Hamburguer Menu
    const menuItens = document.querySelector(".menu-items");
    const menuButton = document.querySelector("#burguer-checkbox");
    const buttonMais = document.querySelector(".mais");

    menuButton.addEventListener ("click", function(ev) {
            ev.preventDefault();
    
            if (menuButton.classList.contains("checked")) {
                menuButton.classList.remove("checked");
            } else {
                menuButton.classList.add("checked");
            }
        })

    buttonMais.addEventListener ("click", function(ev) {
        ev.preventDefault();

        if (menuButton.classList.contains("checked")) {
            menuButton.classList.remove("checked");
        } else {
            menuButton.classList.add("checked");
        }
    })

    const burguerMenu = document.querySelector('.hamburguer #menu-hamburguer');
    const burguerWithChild = burguerMenu.querySelectorAll('#menu-hamburguer li.menu-item-has-children');
    
    burguerWithChild.forEach(item => {

        if (item.parentElement.classList.contains('sub-menu')){
            return;
        }

        item.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();

            const subMenu = this.parentElement.querySelector('.sub-menu');
            
            subMenu.classList.toggle('active');
            subMenu.parentNode.classList.toggle('active');
        });
    })
})
