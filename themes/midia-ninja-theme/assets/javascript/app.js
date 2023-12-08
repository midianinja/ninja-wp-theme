import Vue from 'vue';

const app = new Vue({
    el: '#app',
})

jQuery(document).ready(function(){
    scrolledMenu();

    if(jQuery('.card-special').length > 0){
        jQuery('.main-header').removeClass('scrolled')
    }

})

jQuery(window).scroll(function(){
    scrolledMenu();
})

function scrolledMenu(){
    if(jQuery(window).scrollTop() > 0){
        jQuery('.main-header').addClass('scrolled')
    }else if(jQuery('.card-special').length > 0){
        jQuery('.main-header').removeClass('scrolled')
    }
}