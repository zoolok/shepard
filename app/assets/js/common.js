$(document).ready(function () {
    /* --------------------------------------------------------
     INPUTS
    ----------------------------------------------------------- */
    $('.main__form form input').on('keyup focus blur', function() {
        if($(this).val().length > 0){
            $(this).closest('.main__form form input').addClass('filled');
        }
        else{
            $(this).closest('.main__form form input').removeClass('filled');
        }
    });
});
