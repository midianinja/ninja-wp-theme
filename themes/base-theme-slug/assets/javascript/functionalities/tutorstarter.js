document.addEventListener('DOMContentLoaded', () => {
    var menuItems = document.querySelector(".tutor-header-profile-menu-items");

    if (null !== menuItems) {
        menuItems.addEventListener("click", function () {
            menuItems.classList.toggle("active");
        });
    }
})