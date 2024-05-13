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

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filters-search-form').forEach(form=>{

        form.querySelectorAll('.search-field').forEach(input=>{
            input.addEventListener('change', (e) => {
                form.submit()
            })
        })

        form.querySelectorAll('[name="tipo"]').forEach(select=>{
            select.addEventListener('change', (e) => {
                form.submit()
            })
        })

        form.querySelectorAll('[name="ordem"]').forEach(select=>{
            select.addEventListener('change', (e) => {
                form.submit()
            })
        })

    })


})

document.addEventListener('DOMContentLoaded', () => {
    let newSearchButton = document.getElementById('newSearchButton')

    if (newSearchButton) {
        newSearchButton.addEventListener('click', (e) => {
            e.preventDefault()
            let searchField = document.getElementById('searchField')

            if (searchField) {
                searchField.value = ''
                searchField.focus()
            }
        })
    }
})
