$(document).ready(function(){

    $('.carousel__inner').slick({
        speed: 1200,
/*
        adaptiveHeight: true,
*/
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/chevron-right-solid.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
/*
                    dots: true,
*/
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: false
                }
            }
        ]
    });



    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });





    function toggleSlide (item) {
        $(item).each(function (i){
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    }

    toggleSlide('.catalog-item__back');
    toggleSlide('.catalog-item__link');


    //Modal

    $('[data-modal=consultation]').on('click', function (){
        $('.overly, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function (){
        $('.overly, #consultation, #order, #order').fadeOut('slow');
    });

   /* $('.button_mini').on('click', function (){
        $('.overly, #order').fadeIn('slow');
    });*/

    $('.button_mini').each(function (i){
        $(this).on('click', function (){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overly, #order').fadeIn('slow');
        })
    })



    function validateForms(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста введите имя",
                phone: "Пожалуйста введите свой телефон",
                email: {
                    required: 'Пожалуйста введите свою почту',
                    email: "Неправильно введен адрес"
                }
            }
        });
    }


    validateForms('#order form');
    validateForms('#consultation form');
    validateForms('#consultation-form');


    $('.feed-form' ).submit(function(e) {
        alert("YYYYY");
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        })
        return false;
    });


    //Scroll pagr up

    $(window).scroll(function(){
        if($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        }
        else {
            $('.pageup').fadeOut();
        }
    })


    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });


    new WOW().init();
});
