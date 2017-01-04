var id = getParam("id");

if (id != "") {
    if (isNaN(id)) {
        location.href = document.referrer || "index.html";
    } else {
        id = parseInt(id);
    }
} else {
    location.href = "index.html";
}

var vmArticle = avalon.define({
    $id: 'article',
    aid: id,
    src: '',
    getData: function() {
        $.ajax({
            type: "get",
            async: true,
            url: urls.getShareData,
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            data: {
                id: vmArticle.aid,
            },
            success: function(json) {
                if (json.status == 1) {
                   vmArticle.src= urlAPINet + json.data.contentImg;
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseText + "\n" + textStatus + "\n" + errorThrown);
            }
        });
    }
});

vmArticle.getData();
