$(document).ready(function() {
    var swiper = new Swiper('.slider', {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    $('.swiper-slide:nth-child(3)').addClass('swiper-slide-active').siblings('.swiper-slide').removeClass('swiper-slide-active');
    $('.swiper-pagination span:nth-child(3)').addClass('swiper-pagination-bullet-active').siblings('.swiper-pagination span').removeClass('swiper-pagination-bullet-active');
    $('.swiper-wrapper').css({'transform' : 'translate3d(-193.625px, 0px, 0px)'});
});