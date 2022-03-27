export class Search {

    constructor() {
        this.searchState = false;
        this.main_header = document.getElementsByClassName('main-header')[0];
        this.search_overlay_offset = this.main_header.getBoundingClientRect();
        this.search_overlay = document.getElementById('search-overlay');

        this.init();
    }

    init() {
        window.addEventListener('resize', () => {
            this.search_overlay_offset = this.main_header.getBoundingClientRect();
        })

        let search_btn = document.getElementsByClassName('search-toggle')[0];

        search_btn.addEventListener('click', () => {
            search_btn.classList.toggle('active');
            this.toggle();
        })
    }

    toggle() {
        if (!this.searchState) {
            if (! this.main_header.classList.contains('active')) {
                this.search_overlay.style.top = this.search_overlay_offset.bottom + 'px';
                this.search_overlay.style.height = 'calc(100vh - ' + this.search_overlay_offset.bottom + 'px)';
            }
        } else {
            if (! this.main_header.classList.contains('active')) {
                this.search_overlay.style.top = '0';
                this.search_overlay.style.height = '0';
            }
        }

        this.search_overlay.classList.toggle('search-active');
        this.searchState = !this.searchState;
    }

}

document.defaultView.document.addEventListener('DOMContentLoaded', () => {
	new Search();
});