//接口根目录
var urlAPI = "http://web.api.bensue.com/";
// var urlAPI = "http://web.api.bensue.com/test"; //测试服

var urlAPINet = "http://img.bensue.com/";

var urls = {
	getArea: urlAPI + '/sys/area/getListByParentId', //获取区域列表
	addCoperation: urlAPI + '/cop/joinUs/save', //与我们合作
	addContact: urlAPI + '/cop/contactUs/save', //联系我们
	getAboutUs: urlAPI + '/cop/aboutUs/list', //关于我们
	getComment: urlAPI + '/cop/barrage/list', //获取弹幕评论列表
	addComment: urlAPI + '/cop/barrage/save', //添加弹幕
  getShareData: urlAPI + '/vip/shareMessage/detail', //分享内容详情
}

//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?da6eb9348fb1513a655de49fb0b4db09";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

//获取参数
function getParam(paramName) {
    var paramList = location.search.replace("?", "").split("&");
    for (var i = 0; i < paramList.length; i++) {
        if (paramList[i].split("=")[0] == paramName)
            return decodeURI(paramList[i].substring(paramList[i].indexOf("=") + 1, paramList[i].length));
    }
    return "";
}