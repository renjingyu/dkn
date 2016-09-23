$(function(){

    var userName = $("#login_user");

    var userNameReg = /^[\w-]{4,20}$/;  //仅支持汉字、字母、数字、“-”“_”的组合
    var notNumberReg = /\D/;    //纯数字

    var mobileReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;    //手机号
    var eMailReg = /^([a-zA-Z]+\.)?\w+@\w+\.[a-z]{2,5}$/;   //邮箱
  


    //用户名输入框获取焦点时
    userName.focus(function(){
        var oPar = $(this).parents('li');
        oPar.addClass('red_border');
    });

    userName.blur(function () {
        var oPar = $(this).parents('li');
        var oSib = oPar.find('p');
        var oVal = $(this).val();
        // 让提示显示
        
        //判断输入的内容是否满足要求

        if(mobileReg.test(oVal) || eMailReg.test(oVal)){

            //如果验证正确隐藏提示去掉错误的样式
            oPar.removeClass('red_border');
            //登录按钮状态为可用
            $("#login_btn").attr("disabled", false); 
            $("#login_btn").removeClass('un_use')

        }else {
            //显示提示信息
            oPar.addClass('red_border');
            // p标签显示提示信息
            oSib.html("格式错误，请输入正确的手机号码或邮箱"); 
            //登录按钮状态为不可用
            $("#login_btn").attr("disabled", true); 
            $("#login_btn").addClass('un_use')

        }

    });


})