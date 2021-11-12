import { tns } from "../../../node_modules/tiny-slider/src/tiny-slider"

window.addEventListener("load", function(event) {
		  
        document.querySelectorAll('.item-slider').forEach(slider => {
            tns({
                container: slider,
                items: 1,
                gutter: 0,
                autoplay: false,
                controlsText: ["", ""],
                responsive: {
                    640: {
                      items: 2
                    },
                    768: {
                      items: 3
                    }
                  }
            });
        });

        let dates = document.getElementsByClassName("date");
        let items = document.getElementsByClassName("tns-outer");
        
        items[0].classList.add("active");
        
        function test(date, items){
            let index = date.dataset.index;
            let itemActive = document.getElementsByClassName("active")[0];

            itemActive.classList.remove("active");
            items[index].classList.add("active");
        }
        
        for(var i = 0; i < dates.length; i++)
            dates[i].addEventListener("click", function (){
                test(this, items);
            }, false);
});
