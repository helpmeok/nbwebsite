/*
	系统公共微信模块
*/
function wxShare(wxdata) {
    var friendcallback = function (res) {
        console.log("分享成功");
    };
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: wxdata.title,
            desc: wxdata.desc,
            link: wxdata.link,
            imgUrl: wxdata.imgUrl,
            success: function (res) {
                friendcallback(res);
            },
            fail: function (res) {
                console.log(res)
            }
        });
    });
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: wxdata.title,
            desc: wxdata.desc,
            link: wxdata.link,
            imgUrl: wxdata.imgUrl,
            success: function (res) {
                friendcallback(res);
            },
            fail: function (res) {
                console.log(res)
            }
        });
    });
    wx.ready(function () {
        wx.onMenuShareQQ({
            title: wxdata.title,
            desc: wxdata.desc,
            link: wxdata.link,
            imgUrl: wxdata.imgUrl,
            success: function (res) {
                friendcallback(res);
            },
            fail: function (res) {
                console.log(res)
            }
        });
    });
    wx.ready(function () {
        wx.onMenuShareQZone({
            title: wxdata.title,
            desc: wxdata.desc,
            link: wxdata.link,
            imgUrl: wxdata.imgUrl,
            success: function (res) {
                friendcallback(res);
            },
            fail: function (res) {
                console.log(res)
            }
        });
    });

    wx.ready(function () {
        wx.updateAppMessageShareData({
            title: wxdata.title,
            desc: wxdata.desc,
            link: wxdata.link,
            imgUrl: wxdata.imgUrl,
            success: function (res) {
                friendcallback(res);
            },
            fail: function (res) {
                console.log(res)
            }
        });
    });
    wx.ready(function () {
        wx.updateTimelineShareData({
            title: wxdata.title,
            desc: wxdata.desc,
            link: wxdata.link,
            imgUrl: wxdata.imgUrl,
            success: function (res) {
                friendcallback(res);
            },
            fail: function (res) {
                console.log(res)
            }
        });
    });
    wx.ready(function () {
        wx.onMenuShareWeibo({
            title: wxdata.title,
            desc: wxdata.desc,
            link: wxdata.link,
            imgUrl: wxdata.imgUrl,
            success: function (res) {
                friendcallback(res);
            },
            fail: function (res) {
                console.log(res)
            }
        });
    });
}