$(function(){
	
	$.ajax({
		type:'get',
		url:'json/product.json',
		async:true,
		success:function(data){
			var pStr = '';
			var str = '';
			for(var i=0;i<data.length;i++){
				str += '<ul><a href="cart.html?id='+data[i].pId+'">'+
				    		'<li class="l-img"><img src="'+data[i].img+'"/></li>'+
				    		'<span>'+data[i].name+'</span>'+
				    		'<li  class="add-cart">'+
				    			'<a href="###" data-id="'+data[i].pId+'">加入购物车</a>'+
				    		'</li>'+
				    	'</ul></a>';
				
			}
			
			$('.list-box').html(str);
			
			pStr = '<h4 id="p-name"><a href="cart.html">'+data[0].name+'</a></h4>'+
		    			'<h2 id="p-info">'+
		    				'<a href="cart.html?id='+data[0].pId+'">'
		    				+data[0].des+
		    				'</a>'+
		    				'<span>点此可跳转到购物车页面</span>'+
		    			'</h2>'+
		    			'<p id="p-price">$ 	<span>'+data[0].price+'</span> .00</p>'+
		    			'<div id="p-img-list">'+
		    				'<img src="images/MT_TYPE01_60x76.jpg" alt="" />'+
		    				'<img src="images/MT_TYPE02_60x76.jpg" alt="" />'+
		    			'</div>'+
		    			'<h3 id="size-charts">Size charts</h3>'+
		    			'<div class="size-cart">'+
		    				'<div class="choose-size">'+
		    					'<h6>'+
		    						'Size'+
		    						'<i class="down-sanjiao"><img src="images/arrow.png"/></i>'+
		    					'</h6>'+
		    					'<ul >'+	    					
			    					'<li>1</li>'+
			    					'<li>2</li>'+
			    					'<li>3</li>'+
			    					'<li>4</li>'+
			    				'</ul>'+
		    				'</div>'+
		    				
		    				'<a href="###" id="add-cart-t" data-id="'+data[0].pId+'">加入购物车</a>'+
		    			'</div>';
		    			
			$('.main_right').html(pStr);
			
			$('.main_left img').attr('src',data[0].img)
			
			
			//产品轮播图部分
			/*$('.list')
			$('.list-box')
			$('.list-box ul')*/
			
			//设置移动盒子的宽度
			var iW = 308;
			var iLen = $('.list-box ul').length;
			$('.list-box').css({'width':iW*iLen});
			var timer = null;
			var iNow = 0;
			
			$('#right-btn').click(function(){
				if(iNow >= iLen-4){
					iNow = -1;
				}
				iNow++;
				$('.list-box').animate({'left':-iW*iNow});
				
			})
			
			$('#left-btn').click(function(){
				if(iNow <= 0){
					iNow = iLen-3;
				}
				iNow--;
				$('.list-box').animate({'left':-iW*iNow});
				
			})
			
		
			
		}
	})
	
	//导航activ鼠标划过时显示二级菜单
	$('.nav a.active').mouseover(function(){
		$('.down').stop().animate({'opacity':1});
	})
	$('.nav a.active').mouseout(function(){
		$('.down').stop().animate({'opacity':0});
	})
	
	//点击size选择尺寸框出现
	$(document).on('click','.choose-size h6',function(){
		$('.choose-size ul').toggle();
	})
	
	//选择尺寸  把该值传入size框
	$(document).on('click','.choose-size ul li',function(){
		$('.choose-size h6').html($(this).html()+'<i class="down-sanjiao"><img src="images/arrow.png"/></i>');
	})
	
	
	//点击添加到购物车  存cookie
	var total = 0;
	$(document).on('click','.add-cart a',function(){
		var num = $.cookie("pid"+$(this).attr("data-id")+"num")||0;
			total++;
			if($.cookie("pid"+$(this).attr("data-id"))==null){
				$.cookie("pid"+$(this).attr("data-id"),$(this).attr("data-id"),{expires:7,path:'/'});
				$.cookie("pid"+$(this).attr("data-id")+"num",++num,{expires:7,path:'/'});
			}else{
				$.cookie("pid"+$(this).attr("data-id")+"num",++num,{expires:7,path:'/'});
			}
			$.cookie("total",total,{expires:7,path:'/'});
			console.log($.cookie())
	})
		

	//点击主体内容 部分添加到购物车  存该商品cookie
	$(document).on('click','#add-cart-t',function(){
		$.cookie('pid'+$(this).attr('data-id'),$(this).attr('data-id'),{expires:7,path:'/'})
		console.log($.cookie())
	})
	
	
	
	
	
	/*****************购物车部分*********************/
	
})

