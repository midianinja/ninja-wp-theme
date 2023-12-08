export class Filter {

    constructor() {
        this.init();
    }

    init() {
        const filter      = document.getElementById('filter-perguntas-frequentes');
        const items       = document.querySelectorAll('.each-subject li');
        const filterClear = document.querySelector('.filter-clear');

        // Filter by search input on load
        if (filter.value.length >= 1) {
            this.fadeIn(filterClear);
            const term = filter.value.toLowerCase();

            Array.from(items).forEach((item) => {
                const title = item.firstElementChild.textContent;
                const content = item.querySelector('.content');
                item.classList.remove('active');
                if (title.toLowerCase().indexOf(term) != -1) {
                    this.fadeIn(content);
                    item.classList.add('active');
                } else {
                    this.fadeOut(content)
                }
            })
        }

        // Filter by the characters typed in the field
        filter.addEventListener('keyup', this.delay((e) => {

            if (filter.value.length >= 1) {
                this.fadeIn(filterClear)
            } else {
                this.fadeOut(filterClear)
            }

            const term = e.target.value.toLowerCase();

            Array.from(items).forEach((item) => {
                const title = item.firstElementChild.textContent;
                const content = item.querySelector('.content');
                item.classList.remove('active');
                if (title.toLowerCase().indexOf(term) != -1) {
                    this.fadeIn(content);
                    item.classList.add('active');
                } else {
                    this.fadeOut(content)
                }
            })
        }, 500));

        // Open and close items by click
        items.forEach((item) => {
            item.addEventListener('click', (e) => {
                const content = item.querySelector('.content');

                if (item.classList.contains('active')) {
                    this.fadeOut(content);
                    item.classList.remove('active');
                } else {
                    this.fadeIn(content)
                    item.classList.add('active');
                }
            })
        });

        // Clear filter by click
        filterClear.addEventListener('click', (e) => {
            filter.value = '';
            this.fadeOut(filterClear);

            Array.from(items).forEach((item) => {
                const content = item.querySelector('.content');
                this.fadeIn(content)
                item.classList.add('active');
            })
        });
    }

    delay(callback, ms) {
        let timer = 0;
        return function() {
            var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                callback.apply(context, args);
            }, ms || 0);
        };
    }

    fadeOut(el) {
        el.style.opacity = 1;
        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    };

    fadeIn(el, display) {
        el.style.opacity = 0;
        el.style.display = display || "block";
        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    };

}

document.defaultView.document.addEventListener('DOMContentLoaded', () => {
	new Filter();
});