$(document).ready(function () {
    /* --------------------------------------------------------
     INPUTS
    ----------------------------------------------------------- */
    $('.input-group input, .input-group label').on('keyup focus blur', function() {
        if($(this).val().length > 0){
            $(this).next().addClass('filled');
            $(this).css("border-bottom","3px solid #ef2203");
        }
        else{
            $(this).next().removeClass('filled');
            $(this).css("border-bottom","1px solid #000");
        }
    });
    /* --------------------------------------------------------
 SCROLL DOWN
----------------------------------------------------------- */
    $(function () {
        "use strict";
        $(".down").on('click', function (event) {
            event.preventDefault();
            var hash = '#program';

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000);
        });
    });

    /* --------------------------------------------------------
     INDEX  SLIDERS
----------------------------------------------------------- */
    $(function () {
        "use strict";
        if ($(".main-slider").length > 0) {

            $('.main-slider').owlCarousel({
                items: 4,
                nav: true,
                navText: ["", ""],
                dots: false,
                loop: true,
                margin:24,
                center: false,
                autoplay: true
            });
        }
    });
    $(function () {
        "use strict";
        if ($(".rew-slider").length > 0) {

            $('.rew-slider').owlCarousel({
                items: 1,
                nav: true,
                navText: ["", ""],
                dots: false,
                loop: true,
                center: true,
                autoplay:false
            });
        }
    });
    $(function () {
        "use strict";
        if ($(".client-slider").length > 0) {

            $('.client-slider').owlCarousel({
                items: 1,
                nav: true,
                navText: ["", ""],
                dots: false,
                loop: true,
                center: true,
                autoplay:false
            });
        }
    });
    /* --------------------------------------------------------
SERVICE PAGE LIST ITEMS
----------------------------------------------------------- */
    $(function() {
        "use strict";
        if ( $( ".events-wrap" ).length > 0 ) {

            var items =$('.event-item'),
                per = 6,
                i = 1,
                total = 0;

            $('.more-events').on('click', function(){
                total = per * (i++);
                items.slice(0, total).show();
                console.log(items.length);
                $(this)[total >= items.length ? 'hide' : 'show']();
            }).click();

        }
    });
});
