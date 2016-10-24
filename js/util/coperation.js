var vmOperation = avalon.define({
    $id: "operation",
    name: "",
    isNameError: false,
    nameFocus: function() {
        vmOperation.isNameError = false;
    },
    mobile: "",
    isMobileError: false,
    mobileFocus: function() {
        vmOperation.isMobileError = false;
    },
    address: "",
    isAddressError: false,
    addressFocus: function() {
        vmOperation.isAddressError = false;
    },
    message: "",
    isMessageError: false,
    messageFocus: function() {
        vmOperation.isMessageError = false;
    },
    provinceList: [],
    cityList: [],
    provinceSelected: '',
    citySelected: '',
    isProvinceError: false,
    isCityError: false,
    provinceFocus: function() {
        vmOperation.isProvinceError = false;
    },
    cityFocus: function() {
        vmOperation.isCityError = false;
    },
    getProvince: function() {
        //获取省列表
        $.ajax({
            type: "get",
            async: true,
            url: urls.getArea,
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            data: {
                parentId: 1,
            },
            success: function(json) {
                if (json.status == 1) {
                   vmOperation.provinceList = json.data;
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseText + "\n" + textStatus + "\n" + errorThrown);
            }
        });
    },
    submit: function() {
        //姓名不能为空，不能超过20个字符
        if(vmOperation.name == "" || vmOperation.name.length > 20) {
            vmOperation.isNameError = true;
            return;
        }

        //验证手机号格式
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!(vmOperation.mobile.length === 11 && reg.test(vmOperation.mobile))) {
            vmOperation.isMobileError = true;
            return;
        }

        //省市验证
        if(vmOperation.provinceSelected == "") {
            vmOperation.isProvinceError = true;
            return;
        }
        if(vmOperation.citySelected == "") {
            vmOperation.isCityError = true;
            return;
        }
        //详细地址验证
        if(vmOperation.address == "" || vmOperation.address.length > 50) {
            vmOperation.isAddressError = true;
            return;
        }

        //留言验证
        if(vmOperation.message != "" && vmOperation.message.length > 200) {
            vmOperation.isMessageError = true;
            return;
        }

        $.ajax({
            type: "get",
            async: true,
            url: urls.addCoperation,
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            data: {
                provinceId: vmOperation.provinceSelected,
                cityId: vmOperation.citySelected,
                address: vmOperation.address,
                name: vmOperation.name,
                mobile: vmOperation.mobile,
                message: vmOperation.message,
            },
            success: function(json) {
                if (json.status != 1) {
                    alert(json.message);
                } else {
                    vmOperation.provinceSelected = "";
                    vmOperation.citySelected = "";
                    vmOperation.address = "";
                    vmOperation.name = "";
                    vmOperation.mobile = "";
                    vmOperation.message = "";
                    alert("提交成功");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseText + "\n" + textStatus + "\n" + errorThrown);
            }
        });
        
    }
});

vmOperation.getProvince();

vmOperation.$watch("provinceSelected", function(a) {
    //获取市列表
    $.ajax({
        type: "get",
        async: true,
        url: urls.getArea,
        dataType: "jsonp",
        jsonp: "jsonpcallback",
        data: {
            parentId: a,
        },
        success: function(json) {
            if (json.status == 1) {
               vmOperation.cityList = json.data;
               vmOperation.citySelected = '';
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText + "\n" + textStatus + "\n" + errorThrown);
        }
    });
});

avalon.ready(function() {

    //绑定回车事件
    avalon.bind(document.body, 'keypress', function(e) {
        if (e.keyCode == 13) {
            vmOperation.submit();
        }
    });
});