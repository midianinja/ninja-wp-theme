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


document.addEventListener('DOMContentLoaded', function() {
    var checkboxAll = document.querySelector('input[name="content[all]"]')

    checkboxAll.addEventListener('change', function() {
        var otherCheckboxes = document.querySelectorAll('input[type="checkbox"]:not([name="content[all]"])')

        otherCheckboxes.forEach(function(checkbox) {
            checkbox.checked = checkboxAll.checked
        })
    })

    var otherCheckboxes = document.querySelectorAll('input[type="checkbox"]:not([name="content[all]"])')

    otherCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (!this.checked) {
                checkboxAll.checked = false
            }
            else {
                const areAllChecked = Array.from(otherCheckboxes).every((checkbox) => checkbox.checked)
                checkboxAll.checked = areAllChecked
            }
        })
    })
})
