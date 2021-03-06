$(function () {
    if (parseInt(GetQueryString('apiType')) == 0) {
        window.__api = 'https://dev.baobaobei.com.cn:8980/jeezero-boblbee-app/';//开发
    } else if (parseInt(GetQueryString('apiType')) == 1) {
        window.__api = 'https://beta.baobaobei.com.cn:18980/jeezero-boblbee-app/';//仿真
    } else {
        window.__api = 'https://boblbee.superpapa.com.cn/jeezero-boblbee-app/';//正式
    }
    // window.__api = 'https://beta.baobaobei.com.cn:8980/jeezero-boblbee-app/';
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    $('.close').click(function () {
        $('.download-app').hide()
        $('.pad-bottom').css({
            height: "1rem"
        })
    })
    var helperId = GetQueryString('helperId');
    // var helperId = 8368;

    function size() {
        var html = document.querySelector('html');
        html.style.fontSize = document.body.clientWidth / 7.5 + 'px';
    }
    size();
    window.onresize = size;
    setTimeout(function () {
        document.querySelector("body").style.visibility = "visible"
        document.querySelector("html").style.visibility = "visible"
    }, 100);
    $.ajax({
        async: false,
        type: 'get',
        url: __api + 'v1/search/qaset',
        headers: {
            appname: "boblbee",
            "Access-Control-Allow-Origin": "*",
            'devicePlatform': 3
        },
        data: {
            qaId: helperId,
            ctime: Date.now(),
            offset: 0,
            total: 10
        },
        success: function (res) {
            console.log(res)
            $('.question-text').html(res.data.questionName);
            $('.qa').html(res.data.questionWiki);
        },
        error: function (err) {
            console.log(err)
            $('#app').hide()
        }
    })
})
