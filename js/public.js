function mSizeChange01() {
	if (window.innerWidth) {
		winWidth = window.innerWidth;
		winHeight = window.innerHeight;
	}
	else if ((document.body) && (document.body.clientWidth)) {
		winWidth = document.body.clientWidth;
		winHeight = document.body.clientHeight;
	}
	else{
		winHeight = document.documentElement.scrollWidth;
		winWidth = document.documentElement.scrollWidth;
	}
	if (winWidth <= 950) {
		$(function() {
			if ($(".mobile-head-items").find(".mobile-head-email").length < 1) {
				var mobileService = '<div class="mobile-head-item mobile-head-email"><div class="title"><em>Send inquiry</em></div></div>'
				$(".mobile-head-nav .title").html("<em>Categories</em>")
				$(".mobile-head-language .title").html("<em>Translate</em>")
				$(".mobile-head-search .title").html("<em>Search</em>")
				$(".mobile-head-items").append(mobileService)
				if($(".mobile-logo").length<1){
					$(".web_head").after("<div class='mobile-logo'></div>");
					$('.web_head .logo').children().clone().appendTo('.mobile-logo')
					if($(".mobile-nav").length<1){
					$(".mobile-logo").after("<div class='mobile-nav'><div class='wrap'><ul></ul></div></div>");
					}
				}
				var imageTOP = $(".mobile-nav").offset().top;

				$(window).on("scroll", function() {
					if ($(window).scrollTop() > imageTOP) {
						$(".mobile-nav").addClass("mobile-nav-fix")

					} else {
						$(".mobile-nav").removeClass("mobile-nav-fix")
					}
				})
				//$("body").append("<b class='mobile-ico-close body-mobile-ico-close'></b>")
				$('.mobile-head-item.mobile-head-email .title').click(function(e) {
					e.stopPropagation();
				})

				$(".mobile-head-nav .content-wrap .head_nav").children("li").each(function() {
					var liItem = $(this).children("a").clone()
					$(".mobile-nav ul").append("<li></li>")
					$(".mobile-nav ul li").each(function() {
						$(this).append(liItem)

					})
				})
				$('.mobile-head-item').each(function() {
					if (!$(this).hasClass("mobile-head-email")) {
						$(this).find('.title').click(function() {
							hideMsgPop()
							$('.mobile-head-item.mobile-head-email .title').removeClass("pop_hide")
						})
					} else {
						$(this).find('.title').click(function() {
							$('.mobile-body-mask').remove()
							$('.mobile-head-item .main-content-wrap').removeClass('show-content-wrap')
							$('.mobile-head-item .side-content-wrap').animate({
								'left': '-80%'
							}, 300)
							$('.mobile-head-item .middle-content-wrap').removeClass('middle-show-content-wrap')
							$('.mobile-head-item .side-content-wrap .mobile-ico-close').remove()
						})
					}
				})
				$(".pop_task,.inquiry-pop-bd .inquiry-pop .ico-close-pop").click(function() {
					$('.mobile-head-item.mobile-head-email .title').removeClass("pop_hide")
					$(".body-mobile-ico-close").hide()
				})
				$('.mobile-head-item').each(function() {
					$(this).find('.title').click(function() {

						if ($(this).parents('.mobile-head-item').find(".show-content-wrap").length < 1 && !$(this).parents('.mobile-head-item').hasClass("mobile-head-email")) {
							$('.mobile-body-mask').remove();
							$(".body-mobile-ico-close").hide()
						} else {
							$(".body-mobile-ico-close").show()
						}

					})
				})

				function hideMsgPop() {
					$('.inquiry-pop-bd').fadeOut('fast');
					$('.pop_task').fadeOut('fast')
				}
				
					$('.mobile-head-item.mobile-head-email .title').click(function() {
						if ($(this).hasClass("pop_hide")) {
							$(this).removeClass("pop_hide")
							hideMsgPop()
							$(".body-mobile-ico-close").hide()
						} else {
							$(this).addClass("pop_hide")
							$('.inquiry-pop-bd').fadeIn('fast')
							$('.pop_task').fadeIn('fast')
							$(".body-mobile-ico-close").show()
						}
						if ($('body .inquiry-form-wrap').length > 0) {
							$(".inquiry-pop-bd .inquiry-pop").html("")
							$(".inquiry-form-wrap").clone().appendTo(".inquiry-pop-bd .inquiry-pop")
					 
						}

					})
				 
				$('.mobile-body-mask,.mobile-ico-close').click(function(e) {
					$(".body-mobile-ico-close").hide()
					$('.mobile-head-item.mobile-head-email .title').removeClass("pop_hide")
				})
				$('.mobile-head-items .mobile-head-item').click(function(e) {
					e.stopPropagation();
				})
				$(document).click(function() {
					$(".body-mobile-ico-close").hide()
				})

				$('.mobile-head-item').each(function() {
					if (!$(this).hasClass("mobile-head-email")) {
						$('.mobile-head-item').find(".title").click(function() {
							if ($(this).parents(".mobile-head-item").find(".show-content-wrap").length < 1) {
								$(this).removeClass("current")

							} else {
								$(this).addClass("current")
								$(this).parents(".mobile-head-item").siblings().find(".title").removeClass("current")
							}
						})

					} else {
						$('.mobile-head-item').find(".title").click(function() {
							$(this).parents(".mobile-head-item").siblings().find(".title").removeClass("current")
						})
					}
				})
			}
		})
	} else {
		$(document).ready(function() {
			$('.mobile-tab-items,.mobile-logo,.mobile-nav,.mobile-head-email').remove()
		});
	}
}
$(function() {
	mSizeChange01();
})
$(window).resize(function() {
	mSizeChange01()
});