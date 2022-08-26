document.addEventListener('DOMContentLoaded', function() {
    const tnsSliders = document.querySelectorAll('.query-slider .wp-block-post-template');
        tnsSliders.forEach(slider => {
            const tnsSlider = tns({
            container: slider,
            mode: 'gallery',
            items: 1,
            nav: false,
            controls: true,
            controlsPosition: 'bottom',
            swipeAngle: false,
            mouseDrag: true,
            autoplay: false
        });
    });
})