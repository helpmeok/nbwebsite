$(function () {
    if (parseInt(GetQueryString('apiType')) == 0) {
        window.__api = 'http://59.61.216.123:18980/jeezero-story-app/';
    } else if (parseInt(GetQueryString('apiType')) == 1) {
        window.__api = ' http://beta.jeezero.com/jeezero-story-app/';
    } else {
        window.__api = 'http://59.61.216.123:18980/jeezero-story-app/';
    }

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    if (GetQueryString('request_type')) {
        $('.fixed-bottom').css({
            'display': 'flex'
        })
        $('.pad-bottom').css({
            'display': 'flex'
        })
    }
    $('.close').click(function () {
        $('.fixed-bottom').hide()
    })
    var article_id = GetQueryString('article_id');
    // var article_id = 14934;
    function getimgsrc(htmlstr) {
        var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
        var imgsrcArr = [];
        while (tem = reg.exec(htmlstr)) {
            imgsrcArr.push(tem[2]);
        }
        return imgsrcArr;
    }

    function articleDataNum(value) {
        if (value < 10000) {
            return value
        } else {
            var num = value / 10000
            var result = (num.toString()).indexOf(".");
            if (result != -1) {
                num = num.toFixed(1);
                if (num.split('.')[1].toString() == '0') {
                    return num.split('.')[0] + 'w'
                } else {
                    return num + 'w'
                }
            } else {
                return num + 'w'
            }
        }
    }

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
        url: __api + 'v1/article/getArticleDetail',
        header: {
            // Authorization: token,
            appname: "boblbee",
            "Access-Control-Allow-Origin": "*"
        },
        data: {
            article_id: article_id,
            request_type: "app"
        },
        success: function (res) {
            console.log(res)
            res.data.content = res.data.content.replace(/<img/g, '<img style="max-width:100%;" onclick="lookImage(this)"')
            res.data.content = res.data.content.replace(/href/g, 'data-href')
            res.data.content = res.data.content.replace(/<section/g, '<section style="max-width:100%;"')
            // res.data.content = res.data.content.replace(/wx_fmt=/g, '')
            // res.data.content = res.data.content.replace(/data-src/g, 'src')
            res.data.content = res.data.content.replace(/preview.html/g, 'player.html')
            imgArr = getimgsrc(res.data.content)
            $('.content').html(res.data.content)
            $('.title').html(res.data.title)
            $('.head-portrait').attr('src', res.data.userAvatar)
            $('.name').html(res.data.author)
            $('.watch-box .num').html(articleDataNum(res.data.clickNum))
            if (res.data.categoryName) {
                $('.classify').html(res.data.categoryName)
            } else {
                $('.classify').hide()
            }

        },
        error: function (err) {
            console.log(err)
        }
    })
})