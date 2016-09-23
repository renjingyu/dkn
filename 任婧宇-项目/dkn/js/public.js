/**
 * Created by hasee on 2016/9/12.
 */
function focusPic($btnLi,$picLi,$wrap) {
    var iNow =0;
    var len = $picLi.length;
    var timer = null;

    /*初始的设置*/
    $btnLi.removeClass("active").eq(iNow).addClass("active");
    $picLi.hide().eq(iNow).show();

    autoPlay();//自动轮播

    $wrap.hover(function () {
        clearInterval(timer)
    },function () {
        autoPlay()
    });

    /*小按钮的事件*/
    $btnLi.mouseover(function () {
        if($(this).hasClass("active")){return}
        iNow = $(this).index();

        changeView()
    });

    function autoPlay() {
        timer= setInterval(toNext,3000)
    }

    function toNext () {
        /*iNow++;
         iNow%=len;*/
        iNow =++iNow%len;
        changeView()
    }

    function changeView() {
        $btnLi.removeClass("active").eq(iNow).addClass("active");
        $picLi.stop().fadeOut().eq(iNow).stop().fadeIn()
        //console.log(iNow)
    };
}

function slidePic(option) {
    /*划动轮播*/
     var $wrap =  option.wrap;//壳子
     var $list = option.list; //ul
     var $btn =  option.btn; //按钮
     var $prev =  option.prev;
     var $next =  option.next;

    var iNow = 0;
    var timer = null;
    var len = $btn.length;
    var iW = $wrap.width();
    console.log(iW)

    option.autoPlay && autoPlay()//如果需要自动，就自动播放

    $btn.click(function () {
        iNow = $(this).index();
        changeView()
    });
    $prev && $prev.click(function () {
        iNow--;
        if(iNow<0){
            iNow = len-1;
        }
        changeView()
    });
    $next && $next.click(toNext);

    /*如果需要轮播，再添加方法*/
    option.autoPlay && $wrap.hover(function () {
        clearInterval(timer)
    },function () {
        autoPlay()
    });

    function toNext() {
        iNow++;
        if(iNow>=len){
            iNow=0;
        }
        changeView()
    }
    function autoPlay() {
        timer = setInterval(toNext,2000)
    }


    function changeView() {
        $btn.removeClass("active").eq(iNow).addClass("active");
        $list.stop().animate({"left":-iNow*iW})
    }
}

/**/
$(function(){

    var sum=0,count=0;

    //刷新页面时，我的购物车右上角数量与cookie的键值数量相等 且显示相应的数据
    $.get("json/product.json",function (data) {
        bigData = data;  
        var dataStr=$.cookie();
        for(var i=0;i<data.length;i++){
            
            
            if(checkLive()){
                for(var tst in dataStr){ 
                    var testData = tst.replace(/[^0-9]/ig,"");
                    
                    if(data[i].pId==testData){ 
                        count+=parseInt(dataStr[tst]);
                        //其他页面购物车部分
                        jdShow(data[i],dataStr[tst])
                        cartShow(data[i],dataStr[tst])
                    }
                    //其他页面购物车部分
                    $('#header_cart').text(count);
                    $('.shopping_cart span').text(count);
                    $('.cart_list_null').hide();
                    $('.cart_list_full').show();                    
                }
            }
        }

        //购物车页面
        var sVal = 0;
        var sCount = 0;
        var allSval = 0;
        $('.item-sum').each(function(){
            var pDome=$(this).parents('.cart-item');
            sVal = pDome.find('.item-price').html().match(/[1-9]\d+/g)[0];
            sCount = pDome.find('.num-text').val()
            pDome.find('.item-sum').html('￥'+sVal*sCount+'.00');
            allSval += sVal*sCount;
        })
        $('.all-num').html('￥'+allSval+'.00');
        $('.all-sum').html('￥'+allSval+'.00');
         
    })
    

    

    //点击‘加入购物车’按钮添加商品
    $(document).on('click','.add-cart',function(){
        id=$(this).attr('data-id');
        var sum=parseInt($('#number_txt').text());
        var count=sum;
        dataStr=$.cookie();
        for(var data in dataStr){
            if(data=="id_"+id){
                sum=parseInt(dataStr[data])+sum;
            }
            count+=parseInt(dataStr[data]);
        }
        $('#header_cart').text(count);
        $('.shopping_cart span').text(count);
        $.cookie("id_"+id,sum,{expires:7,path:"/"});
        $('.cart_list_null').hide();
        $('.cart_list_full').show();
        $('.cart_list_full ul').empty();
        $(bigData).each(function(index,el){
            showShop(el.pId,el,jdShow);
        })
    })
    
    //头部右上角字符串拼接
    function jdShow(data,count){
        var cartStr ='<li><a href="detils.html?pId='+data.pId+'">'+
                    '<img src="'+data.img+'" alt="">'+
                    '<div>'+
                        '<h6>'+data.name+'</h6>'+
                        '<span>'+count+'</span> *'+
                        '<b>￥'+data.price+'.00</b>'+
                    '</div>'+
                    '</a></li>';
                $('.cart_list_full ul').append(cartStr);
    }

    //购物车页面字符串拼接
    function cartShow(data,count){
        var cartStr ='<li class="cart-item" data-id="'+data.pId+'">'+                                
                        '<a class="item-pic" href="detils.html?pId='+data.pId+'">'+
                            '<img src="'+data.img+'">'+
                        '</a>'+
        
                        '<div class="item-name">'+
                            '<a href="detils.html?pId='+data.pId+'">'+
                                '<ol>'+
                                    '<li>'+
                                        '<b>'+
                                            'DOMYOS'+
                                        '</b>'+
                                    '</li>'+
                                    '<li>'+
                                        data.name+
                                    '</li>'+
                                    '<li>'+
                                        '货号 : '+data.cateId+
                                    '</li>'+
                                    '<li>'+
                                        '颜色 : 橘黄色 - 尺寸 : 5岁'+
                                    '</li>'+
                                    '<li>'+
                                        '<a href="javascript:;">修改</a> | <a href="javascript:;">加入"稍后购买"</a>'+
                                    '</li>'+
                                '</ol>'+
                            '</a>'+
                        '</div>'+
                        
                        '<p class="item-price">￥'+data.price+'.00</p>'+
                        '<div class="item-num">'+
                            '<div class="num-wrap ovfl">'+
                                '<a href="javascript:;" class="num-minus">-</a>'+
                                '<input type="text" value="'+count+'" class="num-text" />'+
                                '<a href="javascript:;" class="num-plus">+</a>'+
                            '</div>'+
        
                        '</div>'+
                        '<p class="item-sum">￥0.00</p>'+
                        '<div class="item-option">'+
                            '<p><a href="javascript:;" class="item-delete">X</a></p>'+
                        '</div>'+
                        
                    '</li>';

                $('.cart-list').append(cartStr);
                
    }

    //展示商品
    function showShop(shopId,data,jdShow){
        var cookie=$.cookie();
        for(var attr in cookie){
            if(attr.replace('id_',"")==shopId){
                jdShow(data,cookie[attr])
            }
        }
    }
    //检查cookie是否存在
    function checkLive(){
        var cookie=$.cookie();
        var flag=false;
        for(var attr in cookie){
            if(/^id_\d+/.test(attr)){
                flag=true;
                break;
            }
        }
        return flag;
    }
})