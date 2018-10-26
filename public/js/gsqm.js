$(function(){
    //导航特效
    var nav = $('.nav'),
        line_w = nav.find('li.cur').outerWidth(),
        left = nav.find('li.cur').position().left
    nav.find('.line').stop(true,false).animate({width:line_w,left:left})
    nav.find('li').hover(function(){
        line_w = $(this).outerWidth()
        left = $(this).position().left;
        nav.find('.line').stop(true,false).animate({width:line_w,left:left},300)
    },function(){
        line_w = nav.find('li.cur').outerWidth(),
        left = nav.find('li.cur').position().left
        nav.find('.line').stop(true,false).animate({width:line_w,left:left},300)
    })

    // 获取浏览器滚动条宽度
    var div = $('<div id="map" style="width:100px; height:1px; overflow-y: scroll; opacity: 0;"></div>')
    $("body").append(div);
    var scrollWidth = document.getElementById('map').offsetWidth - document.getElementById('map').scrollWidth;
    if(scrollWidth == 0){
        scrollWidth = 17
    }
    div.remove();
    //
    function bestOff(a){
        var _this = $(a),
            val = _this.val()
            console.log(val,val.length)
        if(val.length <= 0 || val == ''){
            _this.parent().next().removeClass('none')
        }else{
            _this.parent().next().addClass('none')
        }
    }
    $('.area .input input,.industry .input input').focus(function(){
        bestOff(this)
        $('.menu3').addClass('none')
    }).keyup(function(){
        bestOff(this)
    }).blur(function(){
        $(this).parent().next().addClass('none')
    })
    $('.menu1 li a,.menu2 li a').mousedown(function(){
        var text = $(this).text()
        $(this).parents('.select_box').prev().find('input').val(text)
    })
    //获取填写的法人信息
    function bossUserInfo(){
        var xzq = $('.menu3'),
            boss_name = xzq.find('input[name="boss_name"]').val(),
            sex = xzq.find('input:radio[name="sex"]:checked').val(),
            birth_date = xzq.find('input[name="birth_date"]').val(),
            date_type = xzq.find('input:radio[name="date_type"]:checked').val(),
            is_leap = xzq.find('input:checkbox[name="is_leap"]:checked').val(),
            birth_area = xzq.find('input[name="birth_area"]').val(),
            zty = xzq.find('input:checkbox[name="zty"]:checked').val(),
            text = ''
        if(sex == 1){sex = '男'}else{sex = '女'}
        if(date_type == 1){date_type = '公历'}else{date_type = '农历'}
        if(is_leap == 1){is_leap = ' 闰月'}else{is_leap = ''}
        //if(zty == 1){zty = ' 校对真太阳'}else{zty = ''}
        if(boss_name != ''){
            text = boss_name+'　'+sex+'　'+birth_date+'　'+date_type+is_leap+'　'+birth_area
        }
        xzq.prev().find('input').val(text)
    }
    // 提示层
    function point(a){
        var point = $('<div class="point">'+a+'</div>')
        $("body").append(point);
        var left = ($(window).width()-point.outerWidth())/2,
            top = ($(window).height()-point.outerHeight())/2
        point.css({left:left,top:top}).addClass('show')
        setTimeout(function(){
            point.removeClass('show')
            setTimeout(function(){
                point.remove()
            },200)
        },2000)
    }
    $('.user label.input').mousedown(function(event){
        if($(this).next().hasClass('none')){
            $(this).next().removeClass('none')
        }else{
            $(this).next().addClass('none')
        }
    })
    $('input[name="boss_name"]').blur(function(){
        var val = $(this).val()
        if( val == '' ){
            point('姓名不能为空')
        }else if(!isNaN(val) || !/^[\u4e00-\u9fa5]+$/.test(val) || val.length < 2 || val.length > 4){
            point('姓名必须是2-4个汉字')
        }
    })
    $('.menu3 .sub a').click(function(){
        var boss_name = $('input[name="boss_name"]').val(),
            birth_date = $('input[name="birth_date"]').val()
        if( boss_name == '' ){
            point('姓名不能为空')
        }else if(!isNaN(boss_name) || !/^[\u4e00-\u9fa5]+$/.test(boss_name) || boss_name.length < 2 || boss_name.length > 4){
            point('姓名必须是2-4个汉字')
        }else if( birth_date == '' ){
            point('请选择出生时间')
        }else{
            $(this).parent().parent().addClass('none')
            bossUserInfo()
        }
    })
    $('.menu3 .close').click(function(){
        $(this).parent().addClass('none')
    })

    // checked单选项
    $('.checked label').click(function(){
        if($(this).find('input').is(':checked')){
            $(this).addClass('on').siblings().removeClass('on')
        }
    })
    // select下拉选项
    $('.select .s_tit').click(function(){
        if($(this).next().hasClass('none')){
            $(this).next().removeClass('none')
        }else{
            $(this).next().addClass('none')
        }
    })
    // select选中
    $('.options label').click(function(){
        var text = $(this).find('span').text()
        $(this).addClass('on').siblings().removeClass('on').parent().addClass('none').prev().find('p').text(text)
        if (text == '农历') {
            $(this).parents('.select').next().removeClass('none').parent().addClass('on');    
        }else{
            $(this).parents('.select').next().addClass('none').parent().removeClass('on');
        }
    })
    // checkbox复选项
    $('.check label').click(function(){
        if ($(this).find('input').is(':checked')) {
            $(this).find('input').attr("checked",true).prop("checked","checked").val('1')
            $(this).addClass('on')
        } else {
            $(this).removeClass('on').find('input').removeAttr('checked').val('0')
        }
    })
    //调起时间
    var datetime = $('.datetime_selector'), my_modal_bg = $('.my_modal_bg'), time_val = ''
    $('.datetime').click(function (e) {
        my_modal_bg.css({overflowY:'scroll'}).show()
        $('html').css({overflow:'hidden',paddingRight:scrollWidth})
        datetime.fadeIn(200).find('dl').each(function(){
            var top = $(this).find('label.on').index()*34;
            $(this).find('dd').animate({scrollTop:top});
        });
        n = datetime.find('label.on input[name=year]').val();
        y = datetime.find('label.on input[name=month]').val();
        r = datetime.find('label.on input[name=day]').val();
        s = datetime.find('label.on input[name=hour]').val();
        f = datetime.find('label.on input[name=minute]').val();
        time_val = n+'-'+y+'-'+r+' '+s+':'+f;
    });
    datetime.find('dd label').click(function () {
        if( $(this).find('input').is(':checked') ){
            $(this).addClass('on').siblings().removeClass('on');
            $(this).siblings().find("input").removeAttr("checked");
        }
        var top = $(this).index()*34;
        n = $(this).parents('.bd').find('label.on input[name=year]').val();
        y = $(this).parents('.bd').find('label.on input[name=month]').val();
        r = $(this).parents('.bd').find('label.on input[name=day]').val();
        s = $(this).parents('.bd').find('label.on input[name=hour]').val();
        f = $(this).parents('.bd').find('label.on input[name=minute]').val();
        time_val = n+'-'+y+'-'+r+' '+s+':'+f;
        $(this).parent().animate({scrollTop:top});
    });
    $('.btn-ok').click(function(){
        $('.datetime').val(time_val)
        my_modal_bg.css({overflowY:'scroll'}).show()
        $('html').css({overflow:'hidden',paddingRight:scrollWidth})
        datetime.fadeOut(200,function(){
            my_modal_bg.removeAttr('style')
            $('html').removeAttr('style')
        })
    })
    // 出生地
    $(".cs").click(function (e) {
        my_modal_bg.css({overflowY:'scroll'}).show()
        $('html').css({overflow:'hidden',paddingRight:scrollWidth})
        SelCity(this, e);
    });

    // 
    my_modal_bg.click(function(e){
        datetime.fadeOut(200,function(){
            my_modal_bg.removeAttr('style')
            $('html').removeAttr('style')
        })
    })


    // 悬浮客服跟随
    var right = $('.right'),
        service = $('.service')
    function ser_scroll(){
        service_t = right.offset().top
        scrollTop = $(window).scrollTop()
        if( scrollTop >= service_t ){
            service.addClass('fixed')
        }else{
            service.removeClass('fixed')
        }
    }
    ser_scroll()
    $(window).scroll(ser_scroll)

    // 法人信息分析展开
    $('.more_person').click(function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on').find('span').text('展开法人信息分析')
            $(this).next().addClass('none')
        }else{
            $(this).addClass('on').find('span').text('收起法人信息分析')
            $(this).next().removeClass('none')
        }
    }).parent().hover(function(){},function(){
        var _this = $(this)
        setTimeout(function(){
            _this.find('.con_person').addClass('none').prev().removeClass('on').find('span').text('展开法人信息分析')
        },300)
    })

    // 字数排序选择
    $('.sort li.count').hover(function(){
        $(this).addClass('cur')
    },function(){
        $(this).removeClass('cur')
    })

    // 名字分析剩余展开
    $('.add_similar').click(function(){
        $(this).addClass('none').prev().removeClass('none')
    })
})