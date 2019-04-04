$(document).ready(function(){
// Фикмированная шапка при скролле
$("#cap").removeClass("default");
$(window).scroll(function(){
	if ($(this).scrollTop() > 60) {
		$("#cap").addClass("default").fadeIn('fast');
	} else {
		$("#cap").removeClass("default").fadeIn('fast');
	};
});

  // pop-up window
$('.btn-pop').click(function() {
    $('#exampleModal').arcticmodal();
    $('.close-modal').click(function() {
    $('#exampleModal').arcticmodal('close');
    });    
 });

$('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    // Функция валидации и вывода сообщений
    function valEl(el) {

        el.validate({
            rules: {
                tel: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                tel: {
                    required: 'Поле обязательно для заполнения',
                    regex: 'Телефон может содержать символы + - ()'
                },
                name: {
                    required: 'Поле обязательно для заполнения',
                },
                email: {
                    required: 'Поле обязательно для заполнения',
                    email: 'Неверный формат E-mail'
                }
            },

            // Начинаем проверку id="" формы
            submitHandler: function(form) {
                $('#loader').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    // Если у формы id="popupResult" - делаем:
                    case 'popupResult':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                setTimeout(function() {
                                    $('#loader').fadeOut();
                                }, 800);
                                setTimeout(function() {
                                    $('#overlay').fadeIn();
                                    $form.trigger('reset');
                                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                                }, 1100);
                                $('#overlay').on('click', function(e) {
                                    $(this).fadeOut();
                                });

                            });
                        break;
                }
                return false;
            }
        })
    }

    // Запускаем механизм валидации форм, если у них есть класс .js-form
    $('.js-form').each(function() {
        valEl($(this));
    });

    // // гамбургер
    $('.buttons__menu-open').click(function() {
    $('.burger-menu').toggleClass('d-block');
    $('.burger-menu__link').toggleClass('d-block2');
    $('.buttons__menu-open').hide();
    $('.close-burger').show()
    });
    $('.close-burger').click(function() {
    $('.burger-menu').toggleClass('d-block');
    $('.burger-menu__link').toggleClass('d-block2');
    $('.buttons__menu-open').show();
    $('.close-burger').hide()
    });
    $('.burger-menu__link').click(function() {
    $('.burger-menu').toggleClass('d-block');
    $('.buttons__menu-open').show();
    $('.close-burger').hide()
    });
    $('.burger-menu__link').click(function() {
    $('.burger-menu__link').toggleClass('d-block2');
    });


    // плавное перемещение страницы к нужному блоку
    $("a.go").click(function (e) {
        e.preventDefault();
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        $("body,html").animate({scrollTop: destination },1100);
    });

    // slider

    $('.slider').slick({
      infinite: false,
      slidesToShow: 1,
      dots: false,
      prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-left"></i></button>',
      slidesToScroll: 1,
      responsive: [
    {
      breakpoint: 1201,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      }
    },
    {
      breakpoint: 486,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      }
    }
  ]
    });

    $('.slider-mini').slick({
        infinite: false,
        slidesToShow: 3,
        dots: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-left"></i></button>',
        slidesToScroll: 1,
        responsive: [
      {
        breakpoint: 1201,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
      });

    // lightbox

    lightbox.option({
      'resizeDuration': 200,
      'maxWidth': 800,
      'maxHeight': 900,
      'wrapAround': true
    })

    // == Выделение текущего пункта в меню при скролле к блоку ==

    if ($(this).scrollTop() > 640) {
        $('a[href^="#privilege"]').addClass('current');
        $('#logo').css('margin','0 13px 0 0'); // немного поправляем логотип, чтобы не ерзал из-за плашки 1
        tg = 1;
    } 



});
	


