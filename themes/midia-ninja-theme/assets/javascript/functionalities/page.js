document.addEventListener("DOMContentLoaded", function () {

    var Slider = document.getElementById("main-slider");

    if (Slider && Slider != 'null') {
        Slider.querySelector("div.cwp_block_slider").onmouseover = function(e){
            imgs = Slider.querySelectorAll("div.ultp-block-image");
            imgs.forEach(el => {
                el.style.transition = "opacity 0.3s linear 0s";
                el.style.opacity = 0.7;
            });
        }
    
        Slider.querySelector("div.cwp_block_slider").onmouseout = function(e){
            imgs = Slider.querySelectorAll("div.ultp-block-image");
            imgs.forEach(el => {
                el.style.transition = "opacity 0.3s linear 0s";
                el.style.opacity = 1;
            });
        }
    }

});

