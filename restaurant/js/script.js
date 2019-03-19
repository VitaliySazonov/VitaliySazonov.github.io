$(document).ready(function() {
    var itemFlip = $('.menu_item');
    var topItem = $('top_memu a');
    //Анимация бургера
    $('.logo').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
        $('.menu_button').click(function() {
        $(this).toggleClass('open');
        //Анимация итемов меню бургера
        if ($(this).attr('data-click') == 0) {
            $(this).attr('data-click', 1);
            $('.menu_item').each(function(i) {
                var self = $(this);
                setTimeout(function () {
                    self.hide(200);
                }, i * 100);
            });
        } else {
            $(this).attr('data-click', 0);
            $('.menu_item').each(function(i) {
                var self = $(this);
                console.log(self);
                setTimeout(function () {
                    self.show(200);
                }, i * 100);
            });
        }
    });
    $('.menu_item a').click(function (e) {
        e.preventDefault();
        var _this = $(this),
            href = _this.attr('href').replace('#', ''),
            sect = $('.main').filter('[data-target="'+href+'"]');
        sect.siblings('.main').fadeOut(500);
        sect.delay(350).fadeIn(500);
        $('.menu_button').toggleClass('open');
            //Анимация итемов меню бургера
        if ($('.menu_button').attr('data-click') == 0) {
            $('.menu_button').attr('data-click', 1);
            $('.menu_item').each(function(i) {
                var self = $('.menu_item');
                setTimeout(function () {
                    self.hide(200);
                }, i * 200);
            });
        }
    });
    scrollMenu($('.item a'), '.item');
    scrollMenu($('.item_bar a'), '.item_bar');
    function scrollMenu (item_a, item) {
        //Click and animation top menu
        item_a.on('click', function(e) {
            e.preventDefault();
            var _this = $(this),
                item = _this.closest(item),
                direction = _this.attr('href').replace('#', ''),
                reqSection = $('.all').filter('[data-target="' + direction + '"]'),
                reqSecPos = reqSection.offset().top;
            $('html, body').animate({
                scrollTop: reqSecPos
            }, 500);
        })
        $(window).on('scroll', function() {
            $('.all').each(function(){
                var _this = $(this),
                    topSection = _this.offset().top,
                    botSection = topSection + _this.height(),
                    wScroll = $(window).scrollTop(),
                    wHeight = $(window).height()/2
                if((topSection - wHeight < wScroll) && (botSection - wHeight > wScroll)) {
                    var id = _this.index()-1,
                        stroka = _this.attr('data-target'),
                        reqItem = item_a.eq(id);
                    reqItem.closest(item).addClass('active').siblings().removeClass('active');
                    window.location.hash = stroka;
                }
            });
        });
    }
    $( ".call" ).mouseenter(function() {
        $( '.message' ).fadeTo(300, 1);
        console.log($( '.message' ));
    }).mouseleave(function() {
        $( '.message' ).fadeTo(300, 0);
    });
})