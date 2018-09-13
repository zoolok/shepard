$(document).ready(function () {
    /* --------------------------------------------------------
     INPUTS
    ----------------------------------------------------------- */
    $('.input-group input').on('keyup focus blur', function() {
        if($(this).val().length > 0){
            $(this).addClass('filled');
        }
        else{
            $(this).removeClass('filled');
        }
    });
});
