document.addEventListener('DOMContentLoaded', () => {
    searchComponent = document.querySelectorAll('.search-component')

    if (searchComponent) {
        searchComponent.forEach((elem) => {
            input = elem.querySelector('input[type="text"]')

            input.addEventListener('focusout', (e) => {
                input.classList.toggle('open-input')
            })

            input.addEventListener('focusin', (e) => {
                input.classList.toggle('open-input')
            })
        })
    }
})
