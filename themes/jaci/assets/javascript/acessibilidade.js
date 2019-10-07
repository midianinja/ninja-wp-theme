(function($){
    var cookies = Cookies.get();
    var singleFontSize = cookies.singleFontSize ? parseFloat(cookies.singleFontSize) : 1;
    
    function setSingleFontSize(){
        $('#single-the-content').css('font-size', singleFontSize + 'em');
    }

    $('.js-font-size').click(function(e){
        e.preventDefault();
        singleFontSize += parseFloat($(this).data('step'));
        setSingleFontSize();

        Cookies.set('singleFontSize', singleFontSize);
    });


    setSingleFontSize();
})(jQuery);