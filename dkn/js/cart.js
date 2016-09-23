$(function () {


    var $chAll = $(".ch-all");
    var $chItem = $(".ch-item");
    // var $ok = $(".ok");
    var $cartBar = $("#cart-bar");

    var $allNum = $(".all-num");
    var $allSum = $(".all-sum");

    var $itemDelete = $(".item-delete");
    
    

    /*减*/
    $(document).on("click",".num-minus",function () {
        var number = -1;
        getSum($(this),number)  ;


    });
    // 加
    var sum=parseInt($('.num-text').val());
    var count = 1;
    $(document).on("click",".num-plus",function () {
        var number = 1;
        getSum($(this),number) 
        var thisParent = $(this).parents('.cart-item');  
    });
    
    //删除
    $(document).on("click",".item-delete",function(){
        var $theParent = $(this).parents('.cart-item');
        var tVal = $theParent.attr('data-id');
        var num = $theParent.find($('.num-text'));

        var val = parseInt(num.val());
        $.cookie('id_'+tVal,val,{expires:-1,path:"/"});

        
        $theParent.hide();
        console.log($theParent)
        
    })
    
    function getSum(obj,number) {
        var oP = obj.parents(".cart-item");
        var tVal = oP.attr('data-id');
        var sum = oP.find($('.item-sum'));
        var num = oP.find($('.num-text'));

        var price = oP.find($('.item-price'));
        var val = parseInt(num.val());
        val+=number;
        val=val==0?1:val;
        num.val(val);//可能要判断库存
        $.cookie('id_'+tVal,val,{expires:7,path:"/"});
        
        //金额
        var txtVal = price.html()
        var value = txtVal.match(/[1-9]\d+/g)[0]; 
        var numValue = parseInt(val*value);
        var sumValue = 0;

        sum.html('￥'+numValue+'.00')
        $allNum.html('￥'+numValue+'.00');

        $('.item-sum').each(function(){
            var iValue = $('.item-sum').text().match(/[1-9]\d+/g)[0];
            sumValue += parseInt(iValue);
        })
        var zs=0;
        $('.item-sum').each(function(index,el){
            zs+=parseInt($(el).html().match(/[1-9]\d+/g)[0]);

        })
        $allSum.html('￥'+zs+'.00');
        $allNum.html('￥'+zs+'.00');
    }

});