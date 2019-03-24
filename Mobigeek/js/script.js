$(document).ready(function() {
    $('.item a').on('click', function(e) {
        e.preventDefault();
        var _this = $(this),
            item = _this.closest('.item'),
            direction = _this.attr('href').replace('#', ''),
            reqSection = $('section').filter('[data-id="' + direction + '"]'),
            reqSecPos = reqSection.offset().top;
        $('html, body').animate({
            scrollTop: reqSecPos
        }, 500);
    });
    $('.top_arrow').on('click', function(e) {
        e.preventDefault();
        var _this = $('.item.active a'),
            direction = _this.attr('href').replace('#', ''),
            reqSection = $('section').filter('[data-id="' + direction + '"]'),
            id = reqSection.index()-1,
            reqItem = $('.item a').eq(id-1);
        var direction2 = reqItem.attr('href').replace('#', ''),
            reqSection2 = $('section').filter('[data-id="' + direction2 + '"]'),
            reqSecPos = reqSection2.offset().top;
        $('html, body').animate({
            scrollTop: reqSecPos
        }, 500);
        console.log(id);
    });
    $('.bot_arrow').on('click', function(e) {
        e.preventDefault();
        var _this = $('.item.active a'),
            direction = _this.attr('href').replace('#', ''),
            reqSection = $('section').filter('[data-id="' + direction + '"]'),
            id = reqSection.index()-1;
        if (id >= 4) id = -1;
        var reqItem = $('.item a').eq(id+1);
        var direction2 = reqItem.attr('href').replace('#', ''),
            reqSection2 = $('section').filter('[data-id="' + direction2 + '"]'),
            reqSecPos = reqSection2.offset().top;
        $('html, body').animate({
            scrollTop: reqSecPos
        }, 500);
        console.log(id);
    });
    $(window).on('scroll', function() {
        $('section').each(function(){
            var _this = $(this),
                topSection = _this.offset().top - 50,
                botSection = topSection + _this.height(),
                wScroll = $(window).scrollTop();
            if(topSection < wScroll && botSection > wScroll) {
                var id = _this.index()-1,
                    hf = $('.item.active a').attr('href').replace('#', ''),
                    reqItem = $('.item a').eq(id);
                reqItem.closest('.item').addClass('active').siblings().removeClass('active');
                window.location.hash = hf;
            }
        })
    })
})