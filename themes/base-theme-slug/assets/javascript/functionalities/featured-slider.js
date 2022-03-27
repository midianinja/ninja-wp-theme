const slider = tns({
    container: '.featured-slider .itens-wrapper',
    items: 1,
    nav: false,
    controls: false,
    slideBy: 'page',
    mouseDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayButton: false,
    autoplayButtonOutput: false,
    // gutter: 10,

    // responsive: {
    //     "350": {
    //       "items": 1,
    //       "controls": true,
    //     },
    //     "900": {
    //       "items": 4
    //     }
    // },
});

const nextButtons = document.querySelectorAll('.tns-controls button[data-controls="next"]');
nextButtons.forEach(button => {
    button.addEventListener('click', function() {
        slider.goTo('next');
    })
})

const prevButtons = document.querySelectorAll('.tns-controls button[data-controls="prev"]');
prevButtons.forEach(button => {
    button.addEventListener('click', function() {        
        slider.goTo('prev');
    })
})
