$(document).ready(function () {
//    var slider1 = new Swiper('.slider1', { //swiper
//        slidesPerView: 1,
//        spaceBetween: 0,
//        loop: true,
//        mousewheel: true,
//        pagination: {
//            el: '.swiper-pagination',
//            clickable: true,
//            dynamicBullets: true,
//        },
//    });
    var slider2 = new Swiper('.slider2', {
        slidesPerView: 15,
        spaceBetween: 5,
        freeMode: true,
    });
//    var slider3 = new Swiper('.slider3', {
//        direction: 'vertical',
//        slidesPerView: 9,
//        spaceBetween: 5,
//        freeMode: true,
//        scrollbar: {
//            el: '.swiper-scrollbar',
//        },
//        mousewheel: true
//    });
    var num_kich = $('.kich_item').length;
    var num_bar = $('.bar_item').length;
    $('.span_menu').text(num_kich+' блюд(а)');
    $('.span_bar').text(num_bar+' напитков');
    var num_poz = $('.z_items li').length;
    $('#zakaz span').text(num_poz+" поз / 0 грн.");
    console.log("Кухня-"+num_kich+" Бар-"+num_bar);
    $('.goto').fadeOut(10);
    
    
    
    var show_id = $('.slider2 .swiper-slide.active').attr('data-tov'); //взять атт меню
    var show_name = $('.slider2 .swiper-slide.active').attr('data-name'); //имя
    $('.ofec h1').text(show_name); //название категории
    $('.slider3 .swiper-slide').fadeOut(1);
    $('.slider3 .swiper-slide.'+show_id).fadeIn(100);
    $('.slider3 .swiper-slide.'+show_id+':first').addClass('active');
    var img_id = $('.slider3 .swiper-slide.'+show_id+':first').attr('data-tov-id');
    $('.slider1 .img_tov').fadeOut(1);
    $('.slider1 .img_tov.'+img_id).fadeIn(100);
//    $('.slider1 .img_tov.'+img_id).addClass('active');
    var tov_item = $('.slider3 .swiper-slide.active'),
        data_name = tov_item.attr('data-name'),
        data_desc = tov_item.attr('data-desc'),
        data_time = tov_item.attr('data-time'),
        data_dose = tov_item.attr('data-dose'),
        data_price = tov_item.attr('data-price');
    $('.tovar_right h2').text(data_name);
    $('.tovar_desc').html('<li class="title"><span>Состав:</span><p>'+data_desc+'</p></li><li class="time"><span>Время приготовления:</span><p>'+data_time+' мин.</p></li><li class="dose"><span>Выход:</span><p>'+data_dose+' г.</p></li><li class="comment"><span>Комментарий:</span><textarea class="input_comment" name="comment" type="text" placeholder="Комментарий к блюду..."></textarea></li><li class="price"><span>Цена:</span><p>'+data_price+' грн.</p></li>')
    
    
    
    
    $('.logo').on('click', function(e) {
        e.preventDefault();
        $('.main_m, .main_b').fadeOut(300);
        $('.main_first').delay(310).fadeIn(1000);
        $('.progress li').empty();
        $('.tovat_item').empty();
    });
    
    
    $('.menu_click').on('click', function(e) {
        e.preventDefault();
        var tab_id = $(this).attr('data-tab');
        $('.menu_click').removeClass('active');
        $('.main_menu .swiper-wrapper').fadeOut(1);
        $(this).addClass('active');
        $('#'+tab_id).fadeIn(100);
        $('.slider2 .swiper-slide').removeClass('active');
        $('#'+tab_id+' .swiper-slide:first').addClass('active'); // Добавляет актив в первую подгруппу
        var name_grp = $('#'+tab_id+' .swiper-slide:first').attr('data-name'); // атт по name  подгруппы
        $('.ofec h1').text(name_grp); //Название группы
        
        var tab_tov = $('#'+tab_id+' .swiper-slide.active').attr('data-tov');
        var tab_item = $('.slider3 .swiper-slide.'+tab_tov+':first').addClass('active');
        
        $('.slider3 .swiper-slide').fadeOut(1);
        $('.slider3 .swiper-slide.'+tab_tov).fadeIn(100);
        var att = $('.slider3 .swiper-slide.'+tab_tov).attr('data-tov-id');
        
        $('.slider1 .img_tov').fadeOut(1);// изменение картинки при переключении
        $('.slider1 .'+att).fadeIn(100);
        var tov_desc = tab_item.attr('data-desc');
        var tov_dose = tab_item.attr('data-dose');
        var tov_time = tab_item.attr('data-time');
        var tov_name = tab_item.attr('data-name');
        var tov_price = tab_item.attr('data-price');
        $('.tovar_right h2').text(tov_name); // Название описания товара
        $('.tovar_desc').html('<li class="title"><span>Состав:</span><p>'+tov_desc+'</p></li><li class="time"><span>Время приготовления:</span><p>'+tov_time+' мин.</p></li><li class="dose"><span>Выход:</span><p>'+tov_dose+' г.</p></li><li class="comment"><span>Комментарий:</span><textarea class="input_comment" name="comment" type="text" placeholder="Комментарий к блюду..."></textarea></li><li class="price"><span>Цена:</span><p>'+tov_price+' грн.</p></li>'); // инфа о товаре
    });
    
    
    $('.slider2 .swiper-slide').on('click', function(e) {
        e.preventDefault();
        var tab_id = $(this).attr('data-tov');
        var tab_name = $(this).attr('data-name');
        $('.ofec h1').text(tab_name);
        $('.slider2 .swiper-slide').removeClass('active');
        $('.slider3 .swiper-slide').fadeOut(1);
        $(this).addClass('active');
        $('.slider3 .swiper-slide.'+tab_id).fadeIn(100);
        $('.slider3 .swiper-slide.'+tab_id+':first').addClass('active');
        var img_id = $('.slider3 .swiper-slide.'+tab_id+':first').attr('data-tov-id');
        var tab_item = $('.slider3 .swiper-slide.'+tab_id+':first');
        var tov_desc = tab_item.attr('data-desc');
        var tov_dose = tab_item.attr('data-dose');
        var tov_time = tab_item.attr('data-time');
        var tov_name = tab_item.attr('data-name');
        var tov_price = tab_item.attr('data-price');
        $('.tovar_right h2').text(tov_name);
        $('.tovar_desc').html('<li class="title"><span>Состав:</span><p>'+tov_desc+'</p></li><li class="time"><span>Время приготовления:</span><p>'+tov_time+' мин.</p></li><li class="dose"><span>Выход:</span><p>'+tov_dose+' г.</p></li><li class="comment"><span>Комментарий:</span><textarea class="input_comment" name="comment" type="text" placeholder="Комментарий к блюду..."></textarea></li><li class="price"><span>Цена:</span><p>'+tov_price+' грн.</p></li>');
        $('.slider1 .img_tov').fadeOut(1);
        $('.slider1 .img_tov.'+img_id).fadeIn(100);
    });
    
    
    $('.slider3 .swiper-slide').click(function(e) {
        e.preventDefault();
        var tov_id = $(this).attr('data-tov-id');
        var tov_desc = $(this).attr('data-desc');
        var tov_dose = $(this).attr('data-dose');
        var tov_time = $(this).attr('data-time');
        var tov_name = $(this).attr('data-name');
        var tov_price = $(this).attr('data-price');
        $('.slider3 .swiper-slide').removeClass('active');
        $('.slider1 .img_tov').fadeOut(1);
        $(this).addClass('active');
        $('.slider1 .img_tov.'+tov_id).fadeIn(100);
        $('.slider1 .img_tov.'+tov_id).addClass('active');
        $('.tovar_right h2').text(tov_name);
        $('.tovar_desc').html('<li class="title"><span>Состав:</span><p>'+tov_desc+'</p></li><li class="time"><span>Время приготовления:</span><p>'+tov_time+' мин.</p></li><li class="dose"><span>Выход:</span><p>'+tov_dose+' г.</p></li><li class="comment"><span>Комментарий:</span><textarea class="input_comment" name="comment" type="text" placeholder="Комментарий к блюду..."></textarea></li><li class="price"><span>Цена:</span><p>'+tov_price+' грн.</p></li>');
    });
    
    $('#order_btn p').click(function(e) {
        e.preventDefault();
        $('.z_list').addClass('active');
        $('.menu_btn').addClass('menu_btn_color');
        
        var nazvanie = $('.tovar_right h2').text(),
            vremya = $('.tovar_desc .time p').text(),
            cena = $('.tovar_desc .price p').text(),
            comment = ' ('+$('.input_comment').val()+')';
        if($('.input_comment').val() == false) comment = '';
        vremya = parseInt(vremya);
        cena = parseInt(cena);
        $('.z_items').append('<li><div class="z_item_name"><span>'+nazvanie+'<span class="z_item_comm">'+comment+'</span><i class="ion-checkmark"></i></span><p>'+cena+' грн. <a class="d_i" data-del="delete" href="#">X</a></p></div><p>Время приготовоения : '+vremya+' мин.</p><div class="progress on" data-time="'+vremya+'" data-progress="1"><div class="dynamic progress-bar progress-bar-success active"  style="width: 0%"><span id="current-progress"></span></div></div></li>');
        var num_poz = $('.z_items .z_item_name p').length;
        $('.goto').fadeIn(10);
        $('.input_comment').val('');
        
        var cena_vsego = 0;
        $('.z_items .z_item_name').each(function(){
            cena_vsego += parseInt($('p', this).text());
        });
        console.log(cena_vsego);
        
        $('.vsego').html('<span>Всего:</span><p>'+cena_vsego+' грн.</p>');
        $('#zakaz span').text(num_poz+" поз / "+cena_vsego+" грн.");
//        var new_cena = cena_vsego;
        $('.d_i').click(function(e) {
            e.preventDefault();
            num_poz--;
            var del_price = $(this).closest('p').text();
            del_price = parseInt(del_price); //цена товара
            cena_vsego -= del_price;
            $('.vsego').html('<span>Всего:</span><p>'+cena_vsego+' грн.</p>');
            $('#zakaz span').text(num_poz+" поз / "+cena_vsego+" грн.");
            var _this = $(this).closest('li');
            _this.remove();
            var on_items = $('.progress.on').length;
            if (num_poz == 0 || on_items == 0) {
                $('.goto').fadeOut(10);
            } else {$('.goto').fadeIn(10);}
        });
        
    });
    
    
    
    $('#zakaz').on('click', function (e) {
        
        $('.z_list').toggleClass('active');
        $(this).toggleClass('menu_btn_color');
    });
    $(".waiter").click(function(){
        $(".waiter_avatar").toggleClass('active');
    });
    
    
    
    $('.goto').on('click', function(e) {
        e.preventDefault();
        $(this).fadeOut(300);
        $('.z_item_name a').fadeOut(300);
        $('.progress').fadeIn(10);
        $('.progress').each(function() {
            var _this = $(this),
                data_time = _this.attr('data-time'),
                data_progress = _this.attr('data-progress'),
                find_dynamic = _this.find('.dynamic');
            var loop_time = data_time*60000/100;
            _this.removeClass('on');
            console.log(data_progress);
            
            if (data_progress == 1) {
                setTimeout( function() {
                    data_progress = 2;
                    _this.attr('data-progress', data_progress);
                    var current_progress = 0;
                    var interval = setInterval(function() {
                        current_progress += 1;
                        find_dynamic
                            .css("width", current_progress + "%")
                            .text(current_progress + "%");
                        if (current_progress >= 100){
                            clearInterval(interval);
                            find_dynamic.text("Готово");
                            _this.delay(500).fadeOut(300);
                            _this.siblings('p').delay(500).fadeOut(300);
                            _this.siblings('.z_item_name').find('i').delay(800).fadeIn(300);
                        }

                    }, loop_time);
                });
            }
            
            
        });
    });
    
    $('.center, .tovar_desc, textarea, .tovar_left, .main_menu, .menu_click, .ofec, .menu_item_name').click(function(e) {
        e.preventDefault();
        $('.z_list').removeClass('active');
    });
    
    
    
});
