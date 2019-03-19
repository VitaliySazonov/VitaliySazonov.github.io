function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.file-upload-image').attr('src', e.target.result);
            $('.image-upload-wrap').removeClass('ion-images');
//            $('.example').hide();
            $('.file-upload-image').show();
            // $('.image-title').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
    }
    else {
        $('.file-upload-image').hide();
        $('.image-upload-wrap').addClass('ion-images');
    }
}
function add_member(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.member_image').attr('src', e.target.result);
            $('.member_image').show();
        };
        reader.readAsDataURL(input.files[0]);
    }
    else {
        $('.member_image').hide();
        $('.img_wrap').addClass('ion-images');
    }
}




//function removeUpload() {
//    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
//    $('.image-upload-wrap').hide();
//    $('.image-upload-wrap img').attr('src', '');
//    $('.example').delay(100).show();
//}
$(document).ready(function() {
    const port = 3000;
    const socket = io.connect(`http://localhost:${port}`);
    $('.reg_good').on('click', e => { //add goods
        e.preventDefault();
        let newName = $('.tov_name').val();
        let newResult = $('.name_result').val();
        let newImg = $('#tov_img').text();
        let newSostav = $('#sostav').text();
        let newVyhod = $('#vyhod').text();
        let newTime = $('#time').text();
        let newCost = $('#cost').text();
        let place = $('.tov_name').attr('placeholder');
        console.log(place);
        if (newName.length > 0) {
            socket.emit('good', newName, newResult, newImg, newSostav, newVyhod, newTime, newCost);
        // $('.nick').val('');
        }
        //console.log(newName, newSostav, newVyhod, newTime, newCost);
    });
    socket.on('repeatGood', function () {
        $('.tov_name').val('');
        $('.tov_name').attr('placeholder', 'Название занято!');
    });
    socket.on('closeGood', function (name, result, img, price, dose, desc, time) {
        console.log(name, result, img, price, dose, desc, time);
        $('.tov_name, .name_result').val('');
        $('#tov_img, #sostav, #vyhod, #time, #cost').text('');
        $('.add_tov').slideUp();
        $('.img_result').fadeOut();
    });






    $('.add_ok').on('click', e => { //add members
        
        e.preventDefault();
        let memberName = $('#ai_name').text();
        let memberPos = $('#ai_pos').text();
        // let memberAva = $('#ai_ava').text();
        let memberTel = $('#ai_tel').text();
        let memberAdress = $('#ai_address').text();
        let memberPassport = $('#ai_passport').text();
        let memberIcod = $('#ai_icod').text();
        let memberViber = $('#ai_viber').text();
        let memberTelegram = $('#ai_telegram').text();
        let memberData = $('#ai_data').text();
        //console.log(memberName, memberPos, memberTel, memberAdress, memberPassport, memberIcod, memberViber, memberTelegram, memberData);
        if(memberName.length > 0) {
            socket.emit('member', memberName, memberPos, memberTel, memberAdress, memberPassport, memberIcod, memberViber, memberTelegram, memberData);
        }
    });
    socket.on('addMember', function (name, pos, ava, tel, adres, pasport, icod, viber, telegram, data) {
        console.log(name, pos, ava, tel, adres, pasport, icod, viber, telegram, data);
        $('#ai_name, #ai_pos, #ai_tel, #ai_address, #ai_passport, #ai_icod, #ai_viber, #ai_telegram, #ai_data').text('');
        $('.open_add').slideUp();
    });
    socket.on('memberList', function (memberList) {
        $('#member_list, #workers_panel').empty();
        let list = memberList;
        for(let i = 0; i < list.length; i++) {
            $('#member_list').append('<li class="team_ava " data-ava="'+list[i].id+'"><div class="ava"><img src="'+list[i].ava+'" alt=""></div><div class="team_name_work"><p>'+list[i].name+'</p><span>'+list[i].pos+'</span></div><div class="team_cont" data-ava-id="'+list[i].id+'"><div><p>Телефон:</p><span>'+list[i].tel+'</span></div><div><p>Адресс:</p><span>'+list[i].adres+'</span></div><div><p>Паспорт:</p><span>'+list[i].pasport+'</span></div><div><p>И. Код:</p><span>'+list[i].icod+'</span></div><div><p class="ion-social-whatsapp-outline"> Viber:</p><span>'+list[i].viber+'</span></div><div><p class="ion-paper-airplane"> Telegram:</p><span>'+list[i].telegram+'</span></div><div><p>Дата принятия на работу:</p><span>'+list[i].data+'</span></div><a class="off" href="#">Уволить</a></div></li>');
            $('#workers_panel').append('<li class="worker" data-id="'+list[i].id+'"><div class="worker_avatar online"><img src="'+list[i].ava+'" alt=""></div><div class="worker_content"><p class="worker_name">'+list[i].name+'</p><p class="worker_position">'+list[i].pos+'</p></div></li><li class="worker_contact" data-id="'+list[i].id+'"><span>Тел:</span><p>'+list[i].tel+'</p></li>');
        }
        console.log(list);
        //Переход по работникам на админке во вкладке
        $('.team_ava').click(function() {
            let _this = $(this);
            let id = _this.toggleClass('active').attr('data-ava');
            let elem = $('.team_cont[data-ava-id='+id+']');
            elem.slideToggle().parent('li').siblings('.team_ava').find('.team_cont').slideUp();
            _this.siblings('li.team_ava').removeClass('active');
            $('.open_add').slideUp(300);
        });
        //Переход по работникам на панели
        $('.worker').click(function() {
            let id = $(this).attr('data-id');
            var elem = $('.worker_contact[data-id='+id+']');
            elem.slideToggle().siblings('.worker_contact').slideUp();
        });
        $('.off').click(function() {
            let _this = $(this).parent('div.team_cont').attr('data-ava-id');
            socket.emit('off', _this);
            console.log(_this);
        });
    });
    



    $(".upload_image").change(function(evt) {
        var files = evt.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }
            if(files) $('#list').find('.tov_item').remove();
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    $('#list').prepend('<li class="tov_item"><img src="'+e.target.result+'" alt=""><span class="ion-android-close delete_tov_image"></span></li>');
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    });
    $('.add_item p').click(function() {
        $('.add_item p').removeClass('active');
        var data = $(this).addClass('active').attr('data-add');
        if(data=='add_cat') {
             $('.add_goods li.'+data+'').siblings('li.tov_item').slideUp();
            $('.add_goods li.'+data+'').slideToggle();
            $('.add_goods li.'+data+'').css('display','flex');
        } else {
            $('.add_goods li.'+data+'').siblings('li.tov_item').slideUp();
            $('.add_goods li.'+data+'').slideToggle();
        }
    });
    //РЕЙТИНГ ТОВАРОВ ПО ГРУППАМ ТОВАРОВ
    var $bars = $( ".bar" ),
        methods = {
            init: function() {
                // Bind events
                methods.bindEvents();
            },
            bindEvents: function() {

                // Loop through each of the bars...
                $bars.each( function() {
                    var $bar = $( this ),
                        $pct = $bar.find( ".pct" );
                    setTimeout( function() {
                        $bar.animate({
                            "width": $pct.html()
                        }, 1000);
                    });			
                });
            }
        };
    // Initialize on page load
    methods.init();	
    //ДОБАВЛЕНИЕ ТОВАРА
    //ВЫБОР КАТЕГОРИИ cat_result
    $('.cat_result').click(function() {
        $('.cat_list').slideDown();
    });
    $('.cat_item').click(function() {
        var img, cat_name;
        $('.cat_list').slideUp();
        img = $(this).children('img').attr('src');
        cat_name = $(this).children('p').text();
        $('.img_result').attr('src', img).show();
        $('.name_result').val(cat_name);
    })
    
    $('.head').on('mouseleave', function() {
        $('.worker_contact').slideUp();
    });
    //item_goods ПЕРЕХОД ПО КАТЕГОРИЯМ
    $('.part').click(function() {
        $('.content').slideUp();
        $('.goods_it_name').removeClass('active');
        let id = $(this).attr('data-item');
        let elem = $('.part_list[data-id='+id+']');
        let item = elem.closest('.goods_it');
        let aa = item.siblings('.goods_it').find('ul.part_list');
        aa.slideUp();
        elem.slideToggle().siblings(item).slideDown();
    });
    //item_goods ПЕРЕХОД ПО ТОВАРАМ КАТЕГОРИЙ
    $('.goods_it_name').click(function() {
        let _this = $(this);
        let id = $(this).toggleClass('active').attr('data-num');
        let elem = $('.content[data-cont='+id+']');
        elem.slideToggle().siblings('.content').slideUp();
        _this.siblings('li.goods_it_name').removeClass('active');
    });
    //ЕСЛИ КЛИК НЕ НА item_goods СВОРАЧИВАТЬ ВСЕ ВКЛАДКИ ТОВАРА
    $(document).click(function (e){
        let container = $(".item_goods");
        let container2 = $(".item_team");
        if (!container.is(e.target) && container.has(e.target).length === 0){
            $('.content, .part_list').slideUp();
            $('.goods_it_name').removeClass('active');
        }
        if (!container2.is(e.target) && container2.has(e.target).length === 0){
            $('.team_cont').slideUp();
            $('.team_ava').removeClass('active');
        }
    });
    $('.add_team_item_btn').click(function(e) {
        e.preventDefault();
        $('.open_add').slideToggle(300);
        $('.team_cont').slideUp(300);
        $('.team_ava').removeClass('active');
    })
    //Добавление должности работнику при принятии на работу
    $('.ai_pos').click(function(e) { 
        $('.add_head_2 ul').slideToggle(300); 
        $('.add_head_2 ul li').click(function(e) {
            let name_pos = $(this).html();
            $('.ai_pos').text(name_pos);
            $('.add_head_2 ul').slideUp(300);
            console.log(name_pos);
        });
    });
    
    // переключение между работника в развеле (Персонал)
    
//    $('.item a').on('click', function() {
//        $('.stat').hide();
//        var data = $(this).attr('href').replace('#', '');
//        $('.item').removeClass('active');
//        $(this).closest('.item').addClass('active');
//        $('.active[data-item]').hide();
//        $('[data-item="' + data  + '"]').show();
//    });
//    $('.worker_contact').css('margin-top', '-'+cl);
//    $('.worker_contact').click(function() {
//        
//    });
    //ПЕРЕХОД ПО СТРАНИЦАМ
    $('.item a').on('click', function(e) {
        e.preventDefault();
        $('.content, .part_list').slideUp();
        setTimeout(function() {$('.stat').css('display', 'none');}, 220);
        var _this = $(this),
            data = _this.attr('href').replace('#', ''),
            item = _this.closest('.item'),
            selectSection = $('.stat').filter("[data-item="+data+"]");
        item.add(selectSection).addClass('active').siblings().removeClass('active');
        setTimeout(function() {selectSection.css('display', 'block');}, 220)
    });
//    $('.btn').click(function(e) {
//        e.preventDefault();
//        var action = $(this).data("action"),
//            aValueArgument = $(this).val(),
//            aShowDefaultUI = false,
//            filter = $('.btn').filter("[data_id="+action+"]");
//        if (action == "bold" || action == "italic") document.execCommand(action, aShowDefaultUI, aValueArgument);
//        if (action == "underline") document.execCommand(action);
//        if (action == 'createLink') document.execCommand(action, true, 'http://google.com.ua');
//        if (action == 'foreColor') document.execCommand(action, true, 'red');
//        if (action == 'backColor') document.execCommand(action, 0, 'purple');
//        if (action == 'undo') document.execCommand(action);
//    });
//    $('.sub').click(function(e) {
//        e.preventDefault();
//        var name = $('.notes_title').text(),
//            content = $('.notes_cont').text(),
//            img = $('.image-upload-wrap img').attr('src');
//        var slide = $('.notes_slide');
//        var sld = $('.slide').size();
//        console.log(sld);
//        slide.prepend('<div class="slide"><div class="slide_item"><img src="'+img+'" alt=""></div><p class="slide_name">'+name+'</p></div>');
//        if (name) {
//            if (content) {
//                sendPost(name, content);
//            } else {
//                content = $('.notes_cont').text('Need content');
//            }
//            
//        } else {
//            $('.notes_title').text('Need title');
//        }
//        $('.notes_title').text('Название');
//        removeUpload();
//        $('.notes_cont').text('Описание');
//    });
//    function sendPost (name, content) {
//        $.ajax({
//            url: "../components/add.php",
//            
//        });
//    }
    var calendar = document.getElementById("calendar-table");
    var gridTable = document.getElementById("table-body");
    var currentDate = new Date();
    var selectedDate = currentDate;
    var selectedDayBlock = null;
    var globalEventObj = {};

    var sidebar = document.getElementById("sidebar");

    function createCalendar(date, side) {
        var currentDate = date;
        var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        var monthTitle = document.getElementById("month-name");
        var monthName = currentDate.toLocaleString("ru-UA", {
            month: "long"
        });
        var yearNum = currentDate.toLocaleString("ru-UA", {
            year: "numeric"
        });
        monthTitle.innerHTML = `${monthName} ${yearNum}`;

        if (side == "left") {
            gridTable.className = "animated fadeOutRight";
        } else {
            gridTable.className = "animated fadeOutLeft";
        }

        gridTable.innerHTML = "";

        var newTr = document.createElement("div");
        newTr.className = "row";
        var currentTr = gridTable.appendChild(newTr);

        for (let i = 1; i < startDate.getDay(); i++) {
            let emptyDivCol = document.createElement("div");
            emptyDivCol.className = "col empty-day";
            currentTr.appendChild(emptyDivCol);
        }

        var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        lastDay = lastDay.getDate();

        for (let i = 1; i <= lastDay; i++) {
            if (currentTr.getElementsByTagName("div").length >= 7) {
                currentTr = gridTable.appendChild(addNewRow());
            }
            let currentDay = document.createElement("div");
            currentDay.className = "col";
            //            currentDay.classList.add('border');
            if (selectedDayBlock == null && i == currentDate.getDate() || selectedDate.toDateString() == new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()) {
                selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

                document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("ru-UA", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                });
                selectedDayBlock = currentDay;
                setTimeout(() => {
                    currentDay.classList.add("blue");
                    currentDay.classList.add("lighten-3");
                }, 300);
            }
            currentDay.innerHTML = i;
            currentTr.appendChild(currentDay);
        }

        for (let i = currentTr.getElementsByTagName("div").length; i < 7; i++) {
            let emptyDivCol = document.createElement("div");
            emptyDivCol.className = "col empty-day";
            currentTr.appendChild(emptyDivCol);
        }

        function addNewRow() {
            let node = document.createElement("div");
            node.className = "row";
            return node;
        }
        function addWorker() {
            let days = $('.col').length-$('.col.empty-day').length-$('.col.day').length;
            console.log(days);
        }
        addWorker();

    }

    createCalendar(currentDate);

    var todayDayName = document.getElementById("todayDayName");
    todayDayName.innerHTML = "Сегодня: " + currentDate.toLocaleString("ru-UA", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
    var prevButton = document.getElementById("prev");
    var nextButton = document.getElementById("next");

    prevButton.onclick = changeMonthPrev;
    nextButton.onclick = changeMonthNext;

    function changeMonthPrev() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        createCalendar(currentDate, "left");
    }
    function changeMonthNext() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        createCalendar(currentDate, "right");
    }
    function showEvents() {
        let sidebarEvents = document.getElementById("sidebarEvents");
        let objWithDate = globalEventObj[selectedDate.toDateString()];

        sidebarEvents.innerHTML = "";

        if (objWithDate) {
            let eventsCount = 0;
            for (key in globalEventObj[selectedDate.toDateString()]) {
                let eventContainer = document.createElement("div");
                let eventHeader = document.createElement("div");
                eventHeader.className = "eventCard-header";

                let eventDescription = document.createElement("div");
                eventDescription.className = "eventCard-description";
                eventDescription.style.display = 'none';

                let eventTime = document.createElement("div");
                eventTime.className = "eventCard-time";
                eventTime.style.display = 'none';

                eventHeader.appendChild(document.createTextNode(key));
                eventContainer.appendChild(eventHeader);

                eventDescription.appendChild(document.createTextNode(objWithDate[key]));
                eventContainer.appendChild(eventDescription);
                eventTime.appendChild(document.createTextNode(objWithDate[key]));
                eventContainer.appendChild(eventTime);
                let markWrapper = document.createElement("div");
                markWrapper.className = "eventCard-mark-wrapper";
                let mark = document.createElement("div");
                mark.classList = "eventCard-mark";
                markWrapper.appendChild(mark);
                eventContainer.appendChild(markWrapper);
                eventContainer.className = "eventCard";
                sidebarEvents.appendChild(eventContainer);
                eventsCount++;
            }
            let emptyFormMessage = document.getElementById("emptyFormTitle");
            emptyFormMessage.innerHTML = `Забронированных столов: ${eventsCount}`;
        } else {
            let emptyMessage = document.createElement("div");
            emptyMessage.className = "empty-message";
            emptyMessage.innerHTML = "Нет забронированных столов";
            sidebarEvents.appendChild(emptyMessage);
            let emptyFormMessage = document.getElementById("emptyFormTitle");
        }
    }
    gridTable.onclick = function (e) {
        if (!e.target.classList.contains("col") || e.target.classList.contains("empty-day")) {
            return;
        }
        if (selectedDayBlock) {
            if (selectedDayBlock.classList.contains("blue") && selectedDayBlock.classList.contains("lighten-3")) {
                selectedDayBlock.classList.remove("blue");
                selectedDayBlock.classList.remove("lighten-3");
            }
        }
        selectedDayBlock = e.target;
        selectedDayBlock.classList.add("blue");
        selectedDayBlock.classList.add("lighten-3");
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.innerHTML));
        showEvents();

        document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("ru-UA", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    }







    
});