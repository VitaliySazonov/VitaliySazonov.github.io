$(document).ready(function () {
    $('.item').first().fadeIn(100);
    $('.navigation li').click(function(e) {
        e.preventDefault();
        var _this = $(this).attr('class');
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        
        var sect = $('.item').filter('[data-item="'+_this+'"]');
        sect.siblings('.item').fadeOut(350);
        sect.delay(350).fadeIn(500);
        console.log(sect);
        if(_this == 'skills') {
            $(".bar").each(function() {

                var $bar = $(this),
                    $pct = $bar.find(".pct"),
                    data = $bar.data("bar");
                $bar.css({'width': 0});
                $pct.css({'opacity': 0});
                setTimeout(function() {

                    $bar
                        .css("background-color", data.color)
                        .animate({
                        "width": $pct.html()
                    }, data.speed || 1000, function() {

                        $pct.css({
                            "color": data.color,
                            "opacity": 1
                        });

                    });

                }, data.delay || 0);

            });
        }
    })
    
});


//# sourceURL=coffeescript