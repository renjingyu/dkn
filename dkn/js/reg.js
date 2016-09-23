$(function(){

    //获取需要验证元素
    var telBtn = $("#tel_btn"); //手机号
    var man = $('#man');    //男
    var women = $('#women');     //女
    var sName = $('#s_name');      //姓
    var pName = $('#p_name');      //名
    var pwd = $('#pwd');      //密码
    var qrPwd = $('#qr_pwd');      //确认密码
    var email = $('#email');      //邮箱地址

    //获取需要验证元素的value
    var telVal = telBtn.val();
    var oVal;
    var manVal=$('#man:checked').val(); //男value
    var womenVal=$('#women:checked').val(); //女value
    var sNameVal = sName.val(); //姓
    var pNameVal = pName.val(); //名
    var pwdVal = pwd.val(); //密码
    var qrPwdVal = qrPwd.val(); //确认密码

    //手机号的父级
    var oPar = telBtn.parents('.input_box');

    //性别父选框及提示信息
    var sexPar = $('#women').parents('li');
    var sexInfo = sexPar.find('p');

    //姓名父选框及提示信息
    var namePar = sName.parents('li');
    var nameInfo = namePar.find('p');

    //密码父选框及提示信息
    var pwdPar = pwd.parents('li');
    var pwdInfo = pwdPar.find('p');


    //验证规则
    var userNameReg = /^[\w-]{4,20}$/;  //仅支持字母、数字、“-”“_”的组合
    var notNumberReg = /\D/;    //非数字
    var pwdReg = /^[a-z0-9_-]{6,18}$/; //密码 小写字母，数字，- _ 6-8位

    var mobileReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;    //手机号
    var eMailReg = /^([a-zA-Z]+\.)?\w+@\w+\.[a-z]{2,5}$/;   //邮箱
    
    
    //手机号码验证    

    //手机号失去框获取焦点时

    telBtn.blur(function () {
        var oSib = oPar.find('p');
        var oStrue = oPar.find('i');
        oVal = $(this).val();
        // 让提示显示
        
        //判断输入的内容是否满足要求

        if(mobileReg.test(oVal) || eMailReg.test(oVal)){
            //如果通过验证

            //隐藏提示去掉错误的样式
            oPar.removeClass('red_border');
            //对勾显示
            oStrue.show();

            //登录按钮状态为可用
            $("#creat_user").attr("disabled", false); 
            $("#creat_user").removeClass('un_use')

        }else {
            //显示提示信息
            oPar.addClass('red_border');
            // p标签显示提示信息
            oSib.html("格式错误，请输入正确的手机号码和邮箱号码"); 

            //登录按钮状态为不可用
            $("#creat_user").attr("disabled", true); 
            $("#creat_user").addClass('un_use');
        }

    });

    //性别按钮失去焦点时
    sName.blur(function(){
        sNameVal = $(this).val();
        sexPar.removeClass('red_border');
        //登录按钮状态为可用
        $("#creat_user").attr("disabled", false); 
        $("#creat_user").removeClass('un_use')
    })
    pName.blur(function(){
        pNameVal = $(this).val();
        sexPar.removeClass('red_border');
        //登录按钮状态为可用
        $("#creat_user").attr("disabled", false); 
        $("#creat_user").removeClass('un_use')
    })

    //姓名输入框失去焦点时
    sName.blur(function(){
        if(!sNameVal){   
            namePar.addClass('red_border');
        }else{
            //不为空
            namePar.removeClass('red_border');
            //登录按钮状态为可用
            $("#creat_user").attr("disabled", false); 
            $("#creat_user").removeClass('un_use')
        }
        
    })
    pName.blur(function(){
        if(!pNameVal){   
            namePar.addClass('red_border');
        }else{
            //不为空
            namePar.removeClass('red_border');
            //登录按钮状态为可用
            $("#creat_user").attr("disabled", false); 
            $("#creat_user").removeClass('un_use')
        }
    })

    //密码输入框失去焦点时
    pwd.blur(function(){
        pwdVal = $(this).val();
        if(!pwdVal){   
            pwdPar.addClass('red_border');
        }else{
            if(pwdReg.test(pwdVal)){                
                //不为空,且验证通过
                pwdPar.removeClass('red_border');
                //显示对勾
                $('.pwd_info').show();
                //登录按钮状态为可用
                $("#creat_user").attr("disabled", false); 
                $("#creat_user").removeClass('un_use')
            }else{
                pwdPar.addClass('red_border');
                //隐藏对勾
                $('.pwd_info').hide();
                pwdInfo.html('密码必须为：6-8位 由小写字母，数字，- 、_  组成');
            }
            
        }
        
    })
    qrPwd.blur(function(){
        qrPwdVal = $(this).val();
        if(!qrPwdVal){   
            pwdPar.addClass('red_border');
        }else{
            //不为空
            //确认密码是否等于密码
            if(qrPwdVal != pwdVal){
                pwdPar.addClass('red_border');
                pwdInfo.html('确认密码必须和密码相等');
                //隐藏对勾
                $('.pwd_info').hide();
            }else{
                pwdPar.removeClass('red_border');
                //显示对勾
                $('.pwd_info').show();
                //登录按钮状态为可用
                $("#creat_user").attr("disabled", false); 
                $("#creat_user").removeClass('un_use')
            }
            
            
        }
    })

    //邮箱号码验证    

    //邮箱输入框失去焦点时
    email.blur(function () {
        var oPar = $(this).parents('li');
        var oSib = oPar.find('p');
        var oStrue = oPar.find('i');
        var oVal = $(this).val();
        // 让提示显示
        
        //判断输入的内容是否满足要求

        if(eMailReg.test(oVal)){
            //如果通过验证

            //隐藏提示去掉错误的样式
            oPar.removeClass('red_border');
            //对勾显示
            oStrue.show();
            //登录按钮状态为可用
            $("#creat_user").attr("disabled", false); 
            $("#creat_user").removeClass('un_use')


        }else {
            //显示提示信息
            oPar.addClass('red_border');
            // p标签显示提示信息
            oSib.html("格式错误，请输入正确的邮箱号码"); 
            //格式错误，仅支持汉字、字母、数字、“-”“_”的组合

            //登录按钮状态为不可用
            $("#creat_user").attr("disabled", true); 
            $("#creat_user").addClass('un_use')
        }

    });


    //表单提交时
    $('#register_form').submit(function(){

        //手机号不能为空
        if(!oVal){
            oPar.addClass('red_border');
            //登录按钮状态为不可用
            $("#creat_user").attr("disabled", true); 
            $("#creat_user").addClass('un_use')
            return false;
        }else{
            oPar.removeClass('red_border');
        }
        


        //姓名必填
        if(!sNameVal || !pNameVal){
            namePar.addClass('red_border');
            //登录按钮状态为不可用
            $("#creat_user").attr("disabled", true); 
            $("#creat_user").addClass('un_use')
            return false;
        }else{
            namePar.removeClass('red_border');
            //登录按钮状态为可用
            $("#creat_user").attr("disabled", false); 
            $("#creat_user").removeClass('un_use')
        }

        //密码必填
        if(!pwdVal || !qrPwdVal){
            pwdPar.addClass('red_border');
            //登录按钮状态为不可用
            $("#creat_user").attr("disabled", true); 
            $("#creat_user").addClass('un_use')
            return false;
        }else{
            pwdPar.removeClass('red_border');
            //登录按钮状态为可用
            $("#creat_user").attr("disabled", false); 
            $("#creat_user").removeClass('un_use')
        }
    })


})