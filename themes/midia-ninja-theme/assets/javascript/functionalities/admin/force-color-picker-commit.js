(function ($) {
    $(function () {
        // Forçar iris/wpColorPicker a commitar o valor no input antes do submit.
        // Resolve: cor reverte quando salva sozinha (iris não dispara change sem blur).
        $('form#edittag, form#addtag, form#post').on('submit', function () {
            $('.wp-color-picker').each(function () {
                $(this).trigger('change').trigger('blur');
            });
        });
    });
})(jQuery);
