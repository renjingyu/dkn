/**
 * Created by yu on 2016/9/12.
 */
$(function () {

	//初始化 加载数据
	addData()
	$('#add_more').click(function(){
    	addData()

    })


	//顶部关闭功能
	$('#top_close').click(function(){
		$('.top_banner').hide();
	})
	
    //滚轮滑动满一屏时 导航栏固定
    $(window).scroll(function () {
        var iScrollT = $(window).scrollTop();
        if(iScrollT>500){
            		$('.header').css({'position':'fixed','top':0,'left':0,'z-index':100,'width':'100%'});
        
		//商品列表部分标题固定
        $('#inner_bot_title').addClass('inner_bot_title_fixed');

        }else {
            $('.header').css({'position':'relative','top':0,'left':0,'z-index':5});
            $('#inner_bot_title').removeClass('inner_bot_title_fixed');
        }
    });

    //屏幕缩到最小时 点击左上角小菜单 大导航菜单显示
    $('.small_menu').click(function () {
        console.log(1)
        $('#nav_left').css({'display': 'block','width':'90%'});
        $('.header').css({'width':'90%','margin':0})
        $('.nav_skew').css({'transform': 'skew(0deg)','width':'99%'});
        $('.nav_cont').css({'width':'100%','height':'100%'})
        $('#left_mainBox').css({'width':'100%'})
        $('#left_content').css({'width':'100%'})
        $('.small_close').show();
    })

    $('.nav_left_close').click(function () {
        $('#nav_left').hide();
        $('.small_close').hide();
        $('.header').css({'width':'100%'})
    })

    
	//运动建议 轮播切换   有问题
	//大轮播
	var iNow = 0
    $('.inner_top_right_prev').click(function(){
    	if(iNow <= 0){
    		iNow = 1;
    		$(this).css({'border-right-color': '#ccc'})
    	}else{
    		$(this).css({'border-right-color': '#0082c3'})
    	}
    	iNow--;
    	$('.pro_price_box').animate({left:-(iNow*100)+'%'})
    	$('.inner_top_right_next').css({'border-left-color': '#0082c3'})
    	
    })
    $('.inner_top_right_next').click(function(){
    	if(iNow >= 2){
    		iNow = 1;
    		$(this).css({'border-left-color': '#ccc'})
    	}else{
    		$(this).css({'border-left-color': '#0082c3'})
    	}
    	iNow++;
    	$('.pro_price_box').animate({left:(-iNow*100)+'%'});
    	$('.inner_top_right_prev').css({'border-right-color': '#0082c3'})
    	
    })
    //小轮播
    slidePic({
    	wrap:$('.pro_price_cont .pro_img'),
        list:$('.pro_price_cont .pro_img').find(".pro_img_big"),
        btn: $('.pro_price_cont .pro_img').find(".pro_img_small img")
    })
	
	//选择排序方式部分点击展开选择列表
	$('.inner_bot_title_right').click(function(){
		$(this).find('ul').toggle();
	})
	
	


	var index=24;
    
	
    function addData(){

    	var $proList = $('.inner_bot_cont');
  		//ajax读取商品信息
    	var proData = [];
    	$.get("json/product.json",function (data) {
        	proData = data; //所有的商品

			var len=proData.length;
			index=index>=len?len:index;
            var str = "";
            for(var i=index-24;i<index;i++){
				if(index >= len){

					index = len;
					$('#add_more').unbind("click");
					$('#add_more').addClass('hint');
					$('#hintLastDate').show();
				}
                str+='<div class="col-lg-3 ">'+
					'<div class="inner_bot_box">'+
						'<ul>'+
		                    
		                        '<li class="pro_price">'+
		                        	
		                            '<div class="pro_price_right">'+
		                                '<b>￥'+data[i].price+'</b>'+
		                                '<span>.00</span>'+
		                            '</div>'+
		                        '</li>'+
		                        '<li class="pro_img">'+
		                        	'<div class="pro_img_big">'+
		                        		'<img src="'+data[i].img+'">'+
		                        		'<img src="'+data[i].img+'">'+
		                        		'<img src="'+data[i].img+'">'+
		                        	'</div>'+
		                            '<div class="pro_img_small">'+
		                            	'<img src="'+data[i].img+'">'+
		                        		'<img src="'+data[i].img+'">'+
		                        		'<img src="'+data[i].img+'">'+
		                            '</div>'+
		                        '</li>'+
		                        '<a href="detils.html?pId='+data[i].pId+'">'+
			                        '<li class="pro_txt">'+
			                        	'<div class="pro_txt_title">'+
			                        		'Tribord'+
			                        	'</div>'+
			                          data[i].name+
			                        '</li>'+
		                        '</a>'+
		                        '<li class="pro_brand">'+
		                            '<span class="pro_evaluate">'+
		                               '<i class="fa fa-star"></i>'+
		                               '<i class="fa fa-star"></i>'+
		                               '<i class="fa fa-star"></i>'+
		                               '<i class="fa fa-star"></i>'+
		                               '<i class="fa fa-star-half-empty"></i>'+
		                               '<span>(1)</span>'+
		                           '</span>'+
		                        '</li>'+
		                    
		                '</ul>'+
						
					'</div>'+
				'</div>'
            }

            $(str).appendTo($proList);
            index+=24;
            $('#add_more').html('展开接下来24个商品 （共'+len+'个）');



            //产品列表 图片	
			$('.inner_bot_cont .pro_img').each(function() {
				slidePic({
			    	wrap:$(this),
			        list:$(this).find(".pro_img_big"),
			        btn: $(this).find(".pro_img_small img")
			    })
			})

        })
    }

});