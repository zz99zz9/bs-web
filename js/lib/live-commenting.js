var loaded = false;
var index = 0; //记录数列的位标
var list = [];
var nn, shell;
var isWait = false; //弹幕评论等待

$(function() {
    if (loaded) {
        return;
    }
    loaded = true;

    shell = $('#live-commenting');

    if (shell.length < 1) {
        return false;
    }

    var n = shell.data('count');

    $.ajax({
        type: "get",
        async: true,
        url: urls.getComment,
        dataType: "jsonp",
        jsonp: "jsonpcallback",
        data: {pageNo:1, pageSize:100},
        success: function(json) {
            if(json.status === 1) {
                list = json.data.list;
                //console.dir(list);
                //初始化
                for (var i = 0; i <= n - 1; i++) {
                    nn = CreateNode(list[i].content + ' ');
                    nn.addEventListener("transitionend", myFunction);
                    init(nn, false);
                    shell.append(nn);
                    index ++;
                    //console.log(i);
                }

                var sto = setTimeout("$('.ani').attr('class','ani new')", 100);
                //clearTimeout(sto);
            } else {
                alert(json.message);
            }
        },
        error: function(XMLHttpRequest, type, errorThrown) {
            //console.log(XMLHttpRequest.responseText + "\n" + type + "\n" + errorThrown);
        }
    });

    $('body').bind('keypress', function(e){
        if(e.keyCode == 13) {
            submitComment();
        }
    });
})

//弹幕块
function CreateNode(str) {
    //创建新div  
    var NewDiv = document.createElement("div");
    NewDiv.className = 'ani old';
    var NewText = document.createTextNode(str);
    //追加一个新的子结点  
    NewDiv.appendChild(NewText);
    //返回新创建结点数据  
    return NewDiv;
}

//设置弹幕块的样式
function init(e, isNew) {
    //e.addEventListener("transitionend", myFunction);
    var a = Math.random();
    e.style.fontSize = 12 + a * a * 16 + 'px';
    e.style.opacity = a * 0.5 + 0.6;
    e.style.zIndex = a * 40 + 500;
    e.style.transitionDuration = 20 - a * 15 + 's';
    var r = Math.floor(Math.random() * 128) + 64;
    var g = Math.floor(Math.random() * 128) + 64;
    var b = Math.floor(Math.random() * 128) + 64;
    e.style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
    e.style.textShadow = '0 0 10px ' + e.style.color;
    e.style.top = Math.random() * (shell.height() - 28) + 'px';

    if(isNew) {
        e.style.fontSize = '30px';
        e.style.border = "solid 2px " + e.style.color;
    } else {
        e.style.border = "none";
    }
}

//到左边后，重新从右边出来，改变样式
function myFunction() {
    if (this.className == 'ani new') {
        this.className = 'ani old';
        this.style.transitionDuration = '0.2s';
        //var temp=this.style.opacity;
        this.style.opacity = 0;
        this.style.top = Math.random() * shell.height() + 'px';
    } else {
        this.className = 'ani new';
        init(this, false);
        // console.log(index);

        if (index < list.length) {
            $(this).html(list[index].content);
            index ++;
        } else {
            index = 0;
            $(this).html(list[index].content);
            index ++;
        }
        // console.log(index);
    }
}

//提交新评论
function submitComment() {
    var content = $('#newComment').val();
    var o = {content: ''};
    if (isWait) {
        alert("请等一下再发言");
        return;
    }

    if (content.length > 25) {
        alert("内容长度不要超过25");
        return;
    }

    if (content.length > 0) {
        wait("submitComment", 10);
        //向服务端提交新评论
        $.ajax({
            type: "get",
            async: true,
            url: urls.addComment,
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            data: {content: content},
            success: function(json) {
                if(json.status == 1) {
                    //本地列表增加新评论
                    o.content = content;
                    list.push(o);

                    //本地显示新评论
                    nn = CreateNode(content + ' ');
                    nn.addEventListener("transitionend", myFunction);
                    init(nn, true);
                    shell.append(nn);
                    $('#newComment').val('');
                    setTimeout("$('.ani').attr('class','ani new')", 100);
                } else {
                    alert(json.message);
                    wati("submitComment", 0);
                }
            },
            error: function(XMLHttpRequest, type, errorThrown) {
                //console.log(XMLHttpRequest.responseText + "\n" + type + "\n" + errorThrown);
            }
        });
    }
}

function wait(tag, waitSecond) {
    // var $o = $("#btngetcode");
    var $o = $("#" + tag);

    if (waitSecond == 0) {
        $o.removeAttr("disabled");
        $o.text("发送");
        waitSecond = 10;
        isWait = false;
    } else {
        isWait = true;
        $o.attr("disabled", true);
        $o.text( waitSecond + "s");
        waitSecond--;
        setTimeout(function() {
            wait(tag, waitSecond)
        }, 1000);
    }
}
