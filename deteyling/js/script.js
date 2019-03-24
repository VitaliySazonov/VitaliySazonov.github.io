$(document).ready(function() {
    console.log($('body').width());
    //Create Slider
    var swiper = new Swiper('.slider', {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    //Появление слайдера через 0.5 сек
    $('.slider').delay(500).fadeTo( 'slow', 1 );
    //Фокус на 3й слайд
    $('.swiper-slide:nth-child(3)').addClass('swiper-slide-active').siblings('.swiper-slide').removeClass('swiper-slide-active');
    $('.swiper-pagination span:nth-child(3)').addClass('swiper-pagination-bullet-active').siblings('.swiper-pagination span').removeClass('swiper-pagination-bullet-active');
    $('.swiper-wrapper').css({'transform' : 'translate3d(-193.625px, 0px, 0px)'});
    // Logo click -> scroll top
    $('.logo').click(function(e){
        e.preventDefault();
        var reqSecPos = $('.main').offset().top;
        console.log(reqSecPos);
        $('html, body').animate({scrollTop: reqSecPos}, 300);
    });
    //Menu_burger click
    $('.burger_menu').click(function(e) {
        $('.menu').toggleClass('active');
    });
    // Клики на вопросы 
    $('.questions_items li').click(function(e) {
        e.preventDefault();
        var _this = $(this);
        _this.toggleClass('active').children('p').slideToggle();
        _this.siblings('li').removeClass('active').children('p').slideUp();
        $('.questions_items li i').css({transform: 'rotate(0deg)', transition: '.5s'});
        $('.questions_items li.active i').css({transform: 'rotate(90deg)', transition: '.5s'});
    });
    
    //Курсор навести/убрать на Подробней
    $('.more_info').hover(function(e) {
        $( this ).siblings('div').children('hr').css({width: '0%'});
    }).mouseleave(function(e) {
        $( this ).siblings('div').children('hr').css({width: '100%'});
    });
    //Курсор навести/убрать на пункты Меню 
    $('.menu_item').hover(function(e) {
        $(this).find('.menu_line').css({width: '80%'});
    }).mouseleave(function(e) {
        $( this ).find('.menu_line').css({width: '0%'});
    }).click(function(e) {
        e.preventDefault();
        var _this = $(this),
            direction = _this.data('page'),
            reqSection = $('.'+direction).offset().top;
        console.log(reqSection);
        $('html, body').animate({
            scrollTop: reqSection-100
        }, 300);
        
        
        $('.'+data+'').animate({scroll: target}, 300);
        console.log(target);
    });
    //Липкое меню
    var
    $window = $(window), // Основное окно
    $target = $("#fix"), // Блок, который нужно фиксировать при прокрутке
    $h = $target.offset().top; // Определяем координаты верха нужного блока (например, с навигацией или виджетом, который надо фиксировать)
    $window.on('scroll', function() {
    // Как далеко вниз прокрутили страницу
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // Если прокрутили скролл ниже макушки нужного блока, включаем ему фиксацию
    if (scrollTop > $h) {
        $target.addClass("sheensay_fixed");
        // Иначе возвращаем всё назад
        } else {     
            $target.removeClass("sheensay_fixed");
        }
    });
    $(document).click(function (e){
        var container = $(".questions_items li");
        var menu = $('.burger_menu');
        if (!container.is(e.target)){
            $(".questions_items li").children('p').slideUp();
            $('.questions_items li i').css({transform: 'rotate(0deg)', transition: '.5s'});
        }
        if (!menu.is(e.target) && !$('.menu').is(e.target)) {
            $('.menu').removeClass('active');
        }
    });
    
});