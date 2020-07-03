$(function () {
	if (parseInt(GetQueryString('apiType')) == 0) {
		window.__api = 'https://dev.baobaobei.com.cn:8980/jeezero-boblbee-app/'; //开发
	} else if (parseInt(GetQueryString('apiType')) == 1) {
		window.__api = 'https://beta.baobaobei.com.cn:18980/jeezero-boblbee-app/'; //仿真
	} else {
		window.__api = 'https://boblbee.superpapa.com.cn/jeezero-boblbee-app/'; //正式
	}
	// window.__api = 'https://dev.baobaobei.com.cn:8980/jeezero-boblbee-app/';

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
	var guide_id = GetQueryString('guide_id');
	// var guide_id = "52336";


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
		url: __api + 'v1/bnsBaby/bnsBabyGuide/detail',
		headers: {
			appname: "boblbee",
			"Access-Control-Allow-Origin": "*",
			'devicePlatform': 3
		},
		data: {
			id: guide_id
		},
		success: function (res) {
			console.log(res)
			if (res.code == -1) {
				$('#app').hide()
				return
			}
			$('.header-img').css({
				"background-image": `url(${res.data.urls?res.data.urls.split(',')[0]:"https://boblbee.superpapa.com.cn/boblbee/static/child/yuer_detail_top_placeholderimage@3x.png"})`
			})
			$('.title').html(res.data.title);
			$('.group-desc').html('适龄：'+res.data.groupExplain);
			res.data.guideContent = res.data.guideContent.replace(/<img/g, '<img style="max-width:100%;" onclick="lookImage(this)"')
			res.data.guideContent = res.data.guideContent.replace(/href/g, 'data-href')
			res.data.guideContent = res.data.guideContent.replace(/<section/g, '<section style="max-width:100%;"')
			res.data.guideContent = res.data.guideContent.replace(/preview.html/g, 'player.html')
			$('.guide-content').html(res.data.guideContent);
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
							title:res.data.title,
							desc: res.data.description,
							link: window.location.href,
							imgUrl: res.data.urls.split(',')[0]
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