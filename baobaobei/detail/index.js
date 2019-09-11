$(function() {
	if (parseInt(GetQueryString('apiType')) == 0) {
		window.__api = 'https://dev.jeezero.com:18980/jeezero-boblbee-app/';
	} else if (parseInt(GetQueryString('apiType')) == 1) {
		window.__api = ' http://beta.jeezero.com/jeezero-boblbee-app/';
	} else {
		window.__api = 'https://boblbee.superpapa.com.cn/jeezero-boblbee-app/';
	}
	// window.__api = 'https://dev.jeezero.com:18980/jeezero-boblbee-app/';

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
	$('.close').click(function() {
		$('.fixed-bottom').hide()
	})
	var article_id = GetQueryString('article_id');
	// var article_id = 44021;

	function getimgsrc(htmlstr) {
		var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
		var imgsrcArr = [];
		while (tem = reg.exec(htmlstr)) {
			imgsrcArr.push(tem[2]);
		}
		return imgsrcArr;
	}

	function size() {
		var html = document.querySelector('html');
		html.style.fontSize = document.body.clientWidth / 7.5 + 'px';
	}
	size();
	window.onresize = size;
	setTimeout(function() {
		document.querySelector("body").style.visibility = "visible"
		document.querySelector("html").style.visibility = "visible"
	}, 100);
	$('.show-all').click(function() {
		$('.mask').hide()
		$('.content').css({
			height: 'auto'
		})
	})
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
		success: function(res) {
			console.log(res)
			if (res.code == -1) {
				$('#app').hide()
				return
			}
			res.data.content = res.data.content.replace(/<img/g, '<img style="max-width:100%;" onclick="lookImage(this)"')
			res.data.content = res.data.content.replace(/href/g, 'data-href')
			res.data.content = res.data.content.replace(/<section/g, '<section style="max-width:100%;"')
			// res.data.content = res.data.content.replace(/wx_fmt=/g, '')
			// res.data.content = res.data.content.replace(/data-src/g, 'src')
			res.data.content = res.data.content.replace(/preview.html/g, 'player.html')
			imgArr = getimgsrc(res.data.content)

			$('.title').html(res.data.title)
			$('.head-portrait').attr('src', res.data.userAvatar)
			$('.name').html(res.data.author)
			if (res.data.oauthIntro) {
				$('.oauth-desc').html(res.data.oauthIntro)
			}
			if (res.data.categoryName) {
				$('.classify').html(res.data.categoryName)
			} else {
				$('.classify').hide()
			}
			if (res.data.tagList.length) {
				var tagHtml=''
				res.data.tagList.forEach(function (el,i) {
					tagHtml+=`<div class="item" onclick="goTag(${i})">${el.name}</div>`
				})
				$('.tags').html(tagHtml)
			} else {
				$('.tags').hide()
			}
			if (res.data.showType == 4) {
				$('.audio').html(`<audio src="${res.data.attachment[0].url}" controls>
				  您的浏览器不支持音频播放。
					</audio>`)
			} else if (res.data.showType == 5) {
				$('.vedio').html(
					`<video  controls poster="${res.data.attachment[0].thumbnail}" style="width:90%;height:4rem;margin-top:.3rem;">
    <source src="${res.data.attachment[0].url}" type="video/mp4">
    您的浏览器不支持视频播放。
						</video>`
				)
			} else {
				$('.content').html(res.data.content)
			}

			if (GetQueryString('request_type')) {
				if (res.data.questionList.length) {
					var questionHtml=''
					res.data.questionList.forEach(function(el){
						questionHtml+=`<div class="item">${el.questionName}</div>`
					})
					$('.question-box').html(questionHtml)
				}
				if (res.data.expendList.length) {
					var expendHtml=''
					res.data.expendList.forEach(function(el){
						expendHtml+=`<div class="item">
							<img src="${el.attachment[0].url}" style="width: 100%;height: 2.2rem;">
							<div class="sigle-line-text" style="font-size: .3rem;WebkitBoxOrient: vertical;">${el.title}阿达撒点阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德阿萨德撒</div>
							<div style="color: gray;font-size: .26rem; margin: .1rem 0;">
								<span>${el.author}</span>
							</div>
						</div>
						`
					})
					$('.expend-box').html(expendHtml)
				}else{
					$('.expend').hide()
				}
				if (res.data.recommendList.length) {
					var recommendHtml=''
					res.data.recommendList.forEach(function(el){
						recommendHtml+=`<div class="item">
							<img src="${el.attachment[0].url}" style="width: 25%;height: 100%;">
							<div style="width: 70%;height: 100%;" class="flex-c-center">
								<div class="sigle-line-text" style="font-size: .3rem;-webkit-box-orient: vertical;">${el.title}</div>
								<div style="color: gray;font-size: .26rem; margin: .1rem 0;">
									<span>${el.author}</span>
								</div>
							</div>
						</div>
						`
					})
					$('.recommend-box').html(recommendHtml)
				}else{
					$('.recommend').hide()
				}
			}else{
				$('.more-content').hide()
			}
		},
		error: function(err) {
			console.log(err)
			$('#app').hide()
		}
	})


})
