var vmContact = avalon.define({
    $id: "contact",
    name: "",
    isNameError: false,
    nameFocus: function() {
        vmContact.isNameError = false;
    },
    mobile: "",
    isMobileError: false,
    mobileFocus: function() {
        vmContact.isMobileError = false;
    },
    email: "",
    isEmailError: false,
    emailFocus: function() {
        vmContact.isEmailError = false;
    },
    message: "",
    isMessageError: false,
    messageFocus: function() {
        vmContact.isMessageError = false;
    },
    contactUs: function() {
        //姓名不能为空，不能超过20个字符
        if(vmContact.name == "" || vmContact.name.length > 20) {
            vmContact.isNameError = true;
            return;
        }
        //手机号和Email不能同时为空
        if(vmContact.mobile == "" && vmContact.email == "") {
            vmContact.isMobileError = true;
            return;
        }

        //验证手机号格式
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (vmContact.mobile !="" && !(vmContact.mobile.length === 11 && reg.test(vmContact.mobile))) {
            vmContact.isMobileError = true;
            return;
        }
        //验证电子邮件格式
        var remail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
        //var remail = /^([A-Z0-9]+[_|\_|\.]?)*[A-Z0-9]+@([A-Z0-9]+[_|\_|\.]?)*[A-Z0-9]+\.[A-Z]{2,3}$/i
        if(vmContact.email !="" && !remail.test(vmContact.email)) {
            vmContact.isEmailError = true;
            return;
        }
        //留言验证
        if(vmContact.message != "" && vmContact.message.length > 200) {
            vmContact.isMessageError = true;
            return;
        }

        $.ajax({
            type: "get",
            async: true,
            url: urls.addContact,
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            data: {
                name: vmContact.name,
                mobile: vmContact.mobile,
                email: vmContact.email,
                message: vmContact.message
            },
            success: function(json) {
                if (json.status !== 1) {
                    alert(json.message);
                } else {
                    vmContact.name = "";
                    vmContact.mobile = "";
                    vmContact.email = "";
                    vmContact.message = "";
                    alert("提交成功");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseText + "\n" + textStatus + "\n" + errorThrown);
            }
        });
    }
})

// avalon.ready(function() {

//     //绑定回车事件
//     avalon.bind(document.body, 'keypress', function(e) {
//         if (e.keyCode == 13) {
//             vmContact.contactUs();
//         }
//     });
// });