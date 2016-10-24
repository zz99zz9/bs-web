var vmAboutUs = avalon.define({
	$id: "aboutUs",
	list: [],
	getList: function() {
		$.ajax({
            type: "get",
            async: true,
            url: urls.getAboutUs,
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            success: function(json) {
                if (json.status != 1) {
                    alert(json.message);
                } else {
                    vmAboutUs.list = json.data.list;
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseText + "\n" + textStatus + "\n" + errorThrown);
            }
        });
	}
});

vmAboutUs.getList();