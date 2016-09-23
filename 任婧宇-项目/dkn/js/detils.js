/**
 * Created by yu on 2016/9/12.
 */
 var bigData;
$(function () {

	//加载数据


	//顾客评价
	
    var $imgList = $(".product_show");
	
	
   //ajax读取商品信息
	var url =  window.location.href;
    url.split("?")[1]//"pId=0020003"

   // console.log(url.split("?")[1].split("=")[1])//0020003
    var pId = fnBase.request("pId");
	
	$.ajax({  
         url: 'json/product.json',  
         type: 'GET',  
         dataType: 'json',  
         timeout: 1000,  
         cache: false,  
         beforeSend: LoadFunction, //加载执行方法    
         error: erryFunction,  //错误执行方法    
         success: succFunction //成功执行方法    
     })  
     function LoadFunction() {  
         $(".product_show").html('加载中...'); 

     }  
     function erryFunction() {  
         alert("error");  
     }  
     function succFunction(data) {  
         $(".product_show").html('');  
		 bigData=data;
         for(var i=0;i<data.length;i++){
            if(data[i].pId==pId){

                //有imgArray就使用imgArray，没有的话就使用[data[i].img]（放在数组里面使用）
		
                var imgArray = data[i].imgArray||[data[i].img];

                /*设置列表图片的src*/
                var str = "";
                str+='<div class="product_name">'+
							'<span></span>'+
							'<b>'+data[i].name+'</b>'+
						'</div>'+
						'<div class="product_cont row">'+
						'<div class="product_cont_left col-lg-3">'+
							'<div class="product_cont_left_cent">'+
								'<ul>'+
									'<li><i>款号 : '+data[i].cateId+'</i></li>'+
									'<li><span>运动前，运动中和放松运动时保持温暖！</span></li>'+
									'<li>'+data[i].des+'</li>'+
								'</ul>'+
								'<div class="look_more"><a href="#product_trait_img">'+
									'<div>'+
										'<img src="'+imgArray[0]+'"/>'+
									'</div>'+
									'<span>浏览更多</span>'+
								'</a></div>'+
								'<div class="look_more"><a href="#product_video">'+
									'<div>'+
										'<i class="fa fa-caret-square-o-right"></i>'+
									'</div>'+
									'<span>'+
										'视频'+
									'</span>'+
								'</a></div>'+
							'</div>'+
						'</div>'+
						'<div class="product_cont_center col-lg-6">'+
							'<ul class="product_cont_center_box">'+
								'<li><img src="'+imgArray[0]+'"/></li>'+
								'<li><img src="'+imgArray[0]+'"/></li>'+
								'<li><img src="'+imgArray[0]+'"/></li>'+
							'</ul>'+
						'</div>'+
						'<div class="product_cont_right col-lg-3">'+
							'<ul>'+
								'<li class="pro_pirce">'+
									'<div>'+
										'<b>￥'+data[i].price+'</b><span>.00</span>'+
									'</div>'+
								'</li>'+
								'<li class="pro_choose">'+
									'<a href="javascript:;" id="pro_choose" data-toggle="modal" data-target="#myModal">请选择颜色和尺寸</a>'+
									'<div class="modal fade addCart" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
										'<div class="modal-dialog">'+
											'<div class="modal-content">'+
												'<div class="modal-header">'+
													'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">'+
														'&times;'+
													'</button>'+
													'<h4 class="modal-title" id="myModalLabel">'+
														'请选择颜色和尺寸'+
													'</h4>'+
												'</div>'+
												'<div class="modal-body" id="choos_body">'+
													'<div class="choos_color">'+
														'<h5>颜色</h5>'+
														'<p id="product_choose_img">'+
															'<img src="'+imgArray[0]+'"/>'+
														'</p>'+
													'</div>'+
													'<div class="choos_size">'+
														'<h5>尺寸</h5>'+
														'<p>'+
															'<span>'+
																'<b>Xs</b> <br>'+
																'库存 61'+
															'</span>'+
															'<span>'+
																'<b>S</b> <br>'+
																'库存 61'+
															'</span>'+
															'<span>'+
																'<b>M</b> <br>'+
																'库存 61'+
															'</span>'+
															'<span>'+
																'<b>L</b> <br>'+
																'库存 61'+
															'</span>'+
														'</p>'+
													'</div>'+
													'<div class="choos_number">'+
														'<h5>数量</h5>'+
														'<p>'+
															'<button id="number_sub">-</button>'+
															'<span id="number_txt">1</span>'+
															'<button id="number_add">+</button>'+
														'</p>'+
													'</div>'+
												'</div>'+
												'<div class="modal-footer choose_bot" >'+
													'<button type="button" data-id="'+data[i].pId+'" class="add-cart" data-dismiss="modal">'+
													'加入购物车'+
													'</button>'+
													'<br>'+						
													'<button type="button" id="ks-buy" data-dismiss="modal">'+
														'快速购买'+
													'</button>'+
												'</div>'+
											'</div><!-- /.modal-content -->'+
										'</div><!-- /.modal -->'+
									'</div>'+
								'</li>'+
								'<li class="pro_brand">'+
									'<span>'+
										'<i class="fa fa-star"></i>'+
										'<i class="fa fa-star"></i>'+
										'<i class="fa fa-star"></i>'+
										'<i class="fa fa-star"></i>'+
										'<i class="fa fa-star"></i>'+
									'</span>'+
									'<i class="fa fa-chevron-circle-down"></i>'+
								'</li>'+
								'<li class="pro_pingjia">'+
									'<a href="###">'+data[i].sellerNum+'条评价</a>'+
								'</li>'+
								'<li class="pro_img">'+
									'<img class="active" src="'+imgArray[0]+'"/>'+
									'<img src="'+imgArray[0]+'"/>'+
									'<img src="'+imgArray[0]+'"/>'+
								'</li>'+
							'</ul>'+
						'</div>';
						 $(".product_show").html(str);
						 	
						
						//加入购物车
						/*
						header_cart	//头部购物车数量
						number_sub	//-按钮
						number_txt	//物品数量
						number_add	//+按钮
						*/

						var number = 1;
						
						//数量+按钮
						$(document).on('click','#number_add',function(){
							var numberTxtValue = parseInt($('#number_txt').text());
							$('#number_txt').text(number+numberTxtValue);						
							
						})

						//数量-按钮
						$(document).on('click','#number_sub',function(){
							var numberTxtValue = parseInt($('#number_txt').text());
							numberTxtValue-=number
							if(numberTxtValue <= 1){
								numberTxtValue = 1;
							}
							$('#number_txt').text(numberTxtValue);
							

						})

					//产品列表 点击小图轮播大图方法	
					slidePic({
					    wrap:$('.product_cont_center'),
					    list:$('.product_cont_center').find(".product_cont_center_box"),
					    btn: $('.pro_img').find("img")
					})
                
              
            }
        }

     } 


	//顶部关闭功能
	$('#top_close').click(function(){
		$('.top_banner').hide();
	})
    //滚轮滑动满一屏时 导航栏固定
    $(window).scroll(function () {
        var iScrollT = $(window).scrollTop();
        if(iScrollT>500){
        	$('.header').css({'position':'fixed','top':0,'left':0,'z-index':100,'width':'100%'});

        }else {
            $('.header').css({'position':'relative','top':0,'left':0,'z-index':5});
        }
        //滚轮大于第一屏时
        if(iScrollT>700){
        
           	$('#product_intrud_tit').addClass('product_intrud_tit_fixed');

        }else {
            $('#product_intrud_tit').removeClass('product_intrud_tit_fixed');
        }
    });

    //屏幕缩到最小时 点击左上角小菜单 大导航菜单显示
    
	
	
	
	
	
	//产品图片轮播
	$('.product_trait_img').each(function(){
		nextBtn = $(this).find('.product_trait_img_next'); //下一个按钮
		prevBtn = $(this).find('.product_trait_img_prev');	//上一个按钮
		parSiblBox = $(this).find('.product_trait_img_box'); //要移动的盒子
		parSiblBoxImg = parSiblBox.find('img');
		proSilder(parSiblBox,parSiblBoxImg,nextBtn,prevBtn)
		
	})
	
	
	function proSilder($box,$boxImg,$nextBtn,$prevBtn){
		var iIndex = 0;
		var mmiWidth = $boxImg.width();
		var len = $boxImg.length;

		//下一个
		$nextBtn.click(function(){
			if (iIndex>=len-7) {
				iIndex=len-7;
			}
			iIndex++;
			$box.animate({left:-iIndex*$boxImg.width()});
			console.log(mmiWidth)
		})
		//上一个
		$prevBtn.click(function() {
			if (iIndex<=0) {
				iIndex=1;
			}
			iIndex--;
			$box.animate({left:-iIndex*$boxImg.width()});
		})
		
	}
	    
});

  
