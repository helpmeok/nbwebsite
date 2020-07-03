$(function () {
	if (parseInt(GetQueryString('apiType')) == 0) {
		window.__api = 'https://dev.baobaobei.com.cn:8980/jeeplus-boblbee-app/'; //开发
	} else {
		window.__api = 'https://boblbee.superpapa.com.cn/jeeplus-boblbee-app/'; //正式
	}
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
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
		dataType: 'json',
		url: __api + 'v1/site/list',
		headers: {
			'appname': "boblbee",
			"Access-Control-Allow-Origin": "*",
			'devicePlatform': 3
		},
		data: {},
		success: function (res) {
			console.log(res)
			if (res.code == -1) {
				$('#app').hide()
				return
			}
			res.data = res.data
			var html = "";
			var downHtml = '';
			res.data.forEach(function (el) {
				if (phoneType() == 'android') {
					downHtml = `${el.apkUrl?'<div class="down-btn" data-url="'+el.apkUrl+'" onclick="downAPP(this)">下载</div>':'<div class="desc"">- 即将上线 -</div>'}`
				} else {
					downHtml = `${el.iosUrl?'<div class="down-btn" data-url="'+el.iosUrl+'" onclick="downAPP(this)">下载</div>':'<div class="desc"">- 即将上线 -</div>'}`
				}
				html += `<div class="item">
				<div class="item-l">
					<img src="${el.logo}" alt="" class="logo">
				</div>
				<div class="item-c">
					<div class="app-name">${el.siteName}</div>
					<div class="app-desc">${el.intro?el.intro:''}</div>
				</div>
				<div class="item-r">
					${downHtml}
				</div>
			</div>`
			})
			$('.list').html(html)
			// 分享功能
			$.ajax({
				async: false,
				type: 'get',
				url: 'https://boblbee.superpapa.com.cn/jeezero-boblbee-app/v1/other/getWechatH5Config',
				data: {
					url: window.location.href.split('#')[0]
				},
				success: function (ds) {
					var result = ds.data;
					if (!!result) {
						wx.config({
							debug: false,
							appId: result.appid,
							timestamp: result.timestamp,
							nonceStr: result.nonceStr,
							signature: result.signature,
							jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
						});
						var shareData = {
							title: "宝宝贝实用工具集",
							desc: "攻城狮奶爸们把智慧与育儿融为各类工具，等待你的品鉴！",
							link: window.location.href,
							imgUrl: "https://s1.ax1x.com/2020/05/07/YehJQs.th.png"
						}
						wxShare(shareData)
					}
				},
				error: function (e) {
					console.log(e)
				}
			});
		},
		error: function (err) {
			console.log(err)
			$('#app').hide()
		}
	})
})