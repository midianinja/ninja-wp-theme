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

document.addEventListener('DOMContentLoaded', () => {
    const filterType = document.querySelector('#tipo');
    let isStyleAlteredType = false;

    function applyAlteredStyle() {
        filterType.style.borderRadius = '8px 8px 0 0';
        isStyleAlteredType = true;
    }

    function restoreDefaultStyle() {
        filterType.style.borderRadius = '8px';
        isStyleAlteredType = false;
    }

    filterType.addEventListener('focus', function () {
        if (!isStyleAlteredType) {
            applyAlteredStyle();
        }
    });

    document.addEventListener('click', function (event) {
        if (!filterType.contains(event.target)) {
            restoreDefaultStyle();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
	const filterOrder = document.querySelector('#ordem');
	let isStyleAlteredOrder = false;


    function applyAlteredStyle() {
		filterOrder.style.borderRadius = '8px 8px 0 0';
		isStyleAlteredOrder = true;
    }

    function restoreDefaultStyle() {
		filterOrder.style.borderRadius = '8px';
		isStyleAlteredOrder = false;
    }

	filterOrder.addEventListener('focus', function () {
		if (!isStyleAlteredOrder) {
            applyAlteredStyle();
        }
    });

    document.addEventListener('click', function (event) {
		if (!filterOrder.contains(event.target)) {
            restoreDefaultStyle();
        }
    });
});
