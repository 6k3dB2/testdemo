$('.page_certificationsa', {
slidesPerView: 'auto',
  speed: 2000,
  loop:true,
  slidesPerGroup : 3,
  spaceBetween : 10,
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },

})
function winSize(){

	var mouseover_tid = [];

	var mouseout_tid = [];

	var winWidth = 0;

	var winHeight = 0;

	if (window.innerWidth)

		winWidth = window.innerWidth;

	else if ((document.body) && (document.body.clientWidth))

		winWidth = document.body.clientWidth;

	if (window.innerHeight)

		winHeight = window.innerHeight;

	else if ((document.body) && (document.body.clientHeight))

		winHeight = document.body.clientHeight;

	if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth)

	{

        winHeight = document.documentElement.clientHeight;

        winWidth = document.documentElement.clientWidth;

	}

	if(winWidth<=768){

			

			if($('.mobile-head-items').length<1 && $('.mobile-nav-items').length<1 && $('.mobile-cart-items').length<1){



			var mobileService='<div class="mobile-head-items"><div class="mobile-head-item mobile-head-home"><div class="title"><a href="/"></a></div></div><div class="mobile-head-item mobile-head-nav"><div class="title"></div><div class="main-content-wrap side-content-wrap"><div class="content-wrap"></div></div></div><div class="mobile-head-item mobile-head-language"><div class="title"></div><div class="main-content-wrap side-content-wrap"><div class="content-wrap"></div></div></div><div class="mobile-head-item mobile-head-search"><div class="title"></div><div class="main-content-wrap middle-content-wrap"><div class="content-wrap"></div></div></div><div class="mobile-head-item mobile-head-social"><div class="title"></div><div class="main-content-wrap middle-content-wrap"><div class="content-wrap"></div></div></div></div>'

			$('.head-wrapper').append(mobileService)

			if($('body .aside').length>0){

				$('.mobile-head-items').append('<div class="mobile-head-item mobile-head-aside"><div class="title"></div><div class="main-content-wrap side-content-wrap"><div class="content-wrap"></div></div></div>')

				}

			if($('.mobile-contact').length<1 && $('.head-contact').length>0){

				var mobileContact='<div class="mobile-contact"></div>'

				$('body').append(mobileContact)

			}

		 

		  mobileTabContainer('.tab-content-wrap','.tab-title','.tab-panel','span','.tab-panel-content')

					



$('.mobile-head-item').each(function(){

	$(this).find('.title').click(function(){

		if($(this).parents('.mobile-head-item').find('.main-content-wrap').length>0){

		var pItem=$(this).parents('.mobile-head-item')

		if(!pItem.find('.main-content-wrap').hasClass('show-content-wrap')){

			pItem.find('.main-content-wrap').addClass('show-content-wrap')

			pItem.find('.side-content-wrap').stop().animate({'left':'0'},300)

			pItem.find('.middle-content-wrap').addClass('middle-show-content-wrap')

			pItem.find('.side-content-wrap').append("<b class='mobile-ico-close'></b>")

			

			pItem.siblings('.mobile-head-item').find('.main-content-wrap').removeClass('show-content-wrap')

		 	pItem.siblings('.mobile-head-item').find('.side-content-wrap').stop().animate({'left':'-70%'},300) 

			pItem.siblings('.mobile-head-item').find('.middle-content-wrap').removeClass('middle-show-content-wrap')

			pItem.siblings('.mobile-head-item').find('.side-content-wrap .mobile-ico-close').remove()

			if($('.container').find('.mobile-body-mask').length<1){

				$('.container').append('<div class="mobile-body-mask"></div>')

			}

			 

		}

		else{

			pItem.find('.main-content-wrap').removeClass('show-content-wrap')

			pItem.find('.side-content-wrap').stop().animate({'left':'-70%'},300) 

			pItem.find('.middle-content-wrap').removeClass('middle-show-content-wrap')

			pItem.find('.side-content-wrap .mobile-ico-close').remove()

			}

		$('.mobile-body-mask').click(function(){

			$('.mobile-body-mask').remove()

			$('.mobile-head-item .main-content-wrap').removeClass('show-content-wrap')

			$('.mobile-head-item .side-content-wrap').animate({'left':'-70%'},300) 

			$('.mobile-head-item .middle-content-wrap').removeClass('middle-show-content-wrap')

			$('.mobile-head-item .side-content-wrap .mobile-ico-close').remove()



		})	

		$('.mobile-ico-close').click(function(){

			$('.mobile-body-mask').remove()

			$('.mobile-head-item .main-content-wrap').removeClass('show-content-wrap')

			$('.mobile-head-item .side-content-wrap').stop().animate({'left':'-70%'},300) 

			$('.mobile-head-item .middle-content-wrap').removeClass('middle-show-content-wrap')

			$('.mobile-head-item .side-content-wrap .mobile-ico-close').remove()



		})	

		

		}

	})

})



$('.change-language .change-language-cont ').clone().appendTo('.mobile-head-item.mobile-head-language .main-content-wrap .content-wrap')

$('.head-search-wrap').clone().appendTo('.mobile-head-item.mobile-head-search .main-content-wrap .content-wrap')

$('.nav-bar .nav').clone().appendTo('.mobile-head-item.mobile-head-nav .main-content-wrap .content-wrap')

$('.head-social').clone().appendTo('.mobile-head-item.mobile-head-social .main-content-wrap .content-wrap')

$('.aside .aside-wrap').clone().appendTo('.mobile-head-item.mobile-head-aside .main-content-wrap .content-wrap')

$('.head-contact').clone().appendTo('.mobile-contact')



		}

 

	}



	//mobile end

	else{

		

		

	$(document).ready(function(){

		 

		$('.mobile-body-mask,.mobile-head-items,.mobile-nav-items,.mobile-cart-items,.mobile-tab-items,.mobile-contact').remove()	

/* setBannerSwiper */
var interleaveOffset = 0.5;
function setBannerSwiper(){
  if($('.slider_banner .swiper-slide').length){
    var bnItemNum=$('.slider_banner .swiper-slide').length;
    var bnLoop=true;
    if(bnItemNum<2){
      bnLoop=false;
    }
    var bannerSwiper = new Swiper('.slider_banner', {
      effect: 'fade',
      parallax: true,
      speed: 1200,
      loop: bnLoop,
      allowTouchMove: bnLoop,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.slider_banner .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.slider_banner .swiper-button-next',
        prevEl: '.slider_banner .swiper-button-prev',
      },
      on: {
        init: function() {
          var _that = this;
          setCurPage('.slider_banner', _that);
          swiperAnimateCache(this);  
          swiperAnimate(this); 
        },
        slideChangeTransitionEnd: function(){ 
          swiperAnimate(this); 
        } 
      }
    });
    bannerSwiper.on('slideChange', function() {
      setCurPage('.slider_banner', bannerSwiper)
    });
    function setCurPage(sliderWrap, ele) {
      var curIndex = ele.realIndex + 1;
      var total = ele.slides.length - 2;
      var curHtml = '<i class="cur">' + curIndex + '</i>' + '<b class="line">/</b>' + '<i class="total">' + total + '</i>';
      $(sliderWrap).find('.slide-page-box').html(curHtml);
    }
  }
}	


setBannerSwiper();
    // partnerSlider
function partnerSlider(){
  if($('.partner_slider').length) {
    var partnerSwiper = new Swiper('.partner_slider', {
      slidesPerView: 4,
      slidesPerColumn: 2,
      slidesPerGroup:4,
      spaceBetween: 0,
      effect: 'slide',
      loop: false,
      watchOverflow:true,
      speed: 900,
      autoplay: false,
      navigation: {
        nextEl: '.index_partner .swiper-button-next',
        prevEl: '.index_partner .swiper-button-prev',
      },
      pagination: {
        el: '.index_partner .swiper-pagination',
        clickable: true,
      },
      breakpoints: {
       1280: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerGroup:3,
       },
       768: {
         slidesPerView: 2,
         slidesPerColumn: 2,
         slidesPerGroup:2,
         speed: 400,
       },
       480: {
         slidesPerView: 2,
         slidesPerColumn: 2,
         slidesPerGroup:2,
         speed: 400,
       },
      }
    });
  }
}
partnerSlider();



var partnerSwiper = new Swiper('.new_footer_pro', {
      slidesPerView: 5,
      slidesPerColumn: 2,
      spaceBetween: 10,
      effect: 'slide',
      loop: false,
      watchOverflow:true,
      speed: 900,
      autoplay: false,
      navigation: {
        nextEl: '.new_footer_pro .swiper-button-next',
        prevEl: '.new_footer_pro .swiper-button-prev',
      },
      pagination: {
        el: '.new_footer_pro .swiper-pagination',
        clickable: true,
      },
      breakpoints: {
       1280: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerGroup:3,
       },
       768: {
         slidesPerView: 2,
         slidesPerColumn: 2,
         slidesPerGroup:2,
         speed: 400,
       },
       480: {
         slidesPerView: 2,
         slidesPerColumn: 2,
         slidesPerGroup:2,
         speed: 400,
       },
      }
    });
partnerSwiper();
/*setSearchPop*/
function setSearchPop(){
  document.documentElement.className = 'js';
  if($('#btn-search').length){
    (function(window) {
      if (document.querySelector('.web-search')) {
        'use strict';
        var mainContainer = document.querySelector('.container'),
          searchContainer = document.querySelector('.web-search'),
          openCtrl = document.getElementById('btn-search'),
          closeCtrl = document.getElementById('btn-search-close'),
          inputSearch = searchContainer.querySelector('.search-ipt');
          function init() { initEvents() }
        function initEvents() {
          openCtrl.addEventListener('click', function() {
            if (!searchContainer.classList.contains("search--open")) { openSearch(); } else { closeSearch(); }
          });
          closeCtrl.addEventListener('click', closeSearch);
          document.addEventListener('keyup', function(ev) { if (ev.keyCode == 27) { closeSearch() } })
        }

        function openSearch() {
          mainContainer.classList.add('main-wrap--move');
          searchContainer.classList.add('search--open');
          setTimeout(function() { inputSearch.focus() }, 600)
        }

        function closeSearch() {
          mainContainer.classList.remove('main-wrap--move');
          searchContainer.classList.remove('search--open');
          inputSearch.blur();
          inputSearch.value = ''
        }
        init()
      }
    })(window);
  }
  $(document).on('click', function() {
    $('.container').removeClass('main-wrap--move');
    $('.web-search').removeClass('search--open');
  })
  $('#btn-search,.web-search').on('click', function(e) {
    e.stopPropagation();
  })
}
	//nav

 

	$('.nav li').each(function(index){

			if($(this).children('ul').length>0 && $(this).children('a').find('.nav-ico').length<1){

			$(this).children('a').append("<span class='nav-ico'></span>")

			$(this).hover( 



				function(){



					var _self = this;



					clearTimeout(mouseout_tid[index]);



					mouseover_tid[index] = setTimeout(function() {



						$(_self).children('ul').fadeIn();



					}, 50);



				},



	 			function(){



					var _self = this;



					clearTimeout(mouseover_tid[index]);



					mouseout_tid[index] = setTimeout(function() {



						$(_self).children('ul').fadeOut();



				  }, 50);



				}



			);



			}

			

		})

	//-----------------head-search-wrap-------------------
$('.head-search-wrap').each(function(index){	
		$(this).find('.search-title').click(function(){
			var wrap=$(this).parents('.head-search-wrap')
			var content= wrap.find('.head-search')
			if(wrap.hasClass('wrap-hide')){
				wrap.removeClass('wrap-hide')
				content.fadeIn()
				$('.nav-bar .nav').fadeOut()
			}else{
				wrap.addClass('wrap-hide')
				content.fadeOut()
				$('.nav-bar .nav').fadeIn(1000)
				}
		})
	})


//-----------------head-search-wrap end-------------------
$('.synopsis-item').each(function(){

	$('.synopsis-item').eq(1).addClass('current')

	$(this).hover(function(){

		$(this).addClass('current').siblings().removeClass('current')

		})

	})



		$('.products-scroll-list').each(function(){

		  if($(this).find('li').length>1){

	   

		  $(".products-scroll-list").jCarouselLite({

			 btnPrev: ".products-scroll-btn-prev",

			 btnNext: ".products-scroll-btn-next",

			 speed:100,

			 auto:false,

			 scroll:1,

			 visible:30,

			 vertical:true,

			 circular:false,

			 onMouse:true

		  });

		  }	

		   	  

   })

	})

	

		}	

	

}  


//scroll

(function($){$.fn.jCarouselLite=function(o){o=$.extend({btnPrev:null,btnNext:null,btnGo:null,mouseWheel:false,onMouse: false,auto:null,speed:500,easing:null,vertical:false,circular:true,visible:4,start:0,scroll:1,beforeStart:null,afterEnd:null},o||{});return this.each(function(){var b=false,animCss=o.vertical?"top":"left",sizeCss=o.vertical?"height":"width";var c=$(this),ul=$("ul",c),tLi=$("li",ul),tl=tLi.size(),v=o.visible;var TimeID=0;if(o.circular){ul.prepend(tLi.slice(tl-v-1+1).clone()).append(tLi.slice(0,v).clone());o.start+=v}var f=$("li",ul),itemLength=f.size(),curr=o.start;c.css("visibility","visible");f.css({overflow:"",float:o.vertical?"none":"left"});ul.css({position:"relative","list-style-type":"none","z-index":"1"});c.css({overflow:"hidden",position:"relative","z-index":"2",left:"0px"});var g=o.vertical?height(f):width(f);var h=g*itemLength;var j=g*v;f.css({width:f.width(),height:f.height()});ul.css(sizeCss,h+"px").css(animCss,-(curr*g));c.css(sizeCss,j+"px");if(o.btnPrev)$(o.btnPrev).click(function(){return go(curr-o.scroll)});if(o.btnNext)$(o.btnNext).click(function(){return go(curr+o.scroll)});if(o.btnGo)$.each(o.btnGo,function(i,a){$(a).click(function(){return go(o.circular?o.visible+i:i)})});if(o.mouseWheel&&c.mousewheel)c.mousewheel(function(e,d){return d>0?go(curr-o.scroll):go(curr+o.scroll)});if (o.auto)		TimeID=setInterval(function(){	go(curr + o.scroll);},o.auto+o.speed);if(o.onMouse){ul.bind("mouseover",function(){if(o.auto){clearInterval(TimeID);}}),ul.bind("mouseout",function(){if(o.auto){TimeID=setInterval(function(){go(curr+o.scroll);},o.auto+o.speed);}})}function vis(){return f.slice(curr).slice(0,v)};function go(a){if(!b){if(o.beforeStart)o.beforeStart.call(this,vis());if(o.circular){if(a<=o.start-v-1){ul.css(animCss,-((itemLength-(v*2))*g)+"px");curr=a==o.start-v-1?itemLength-(v*2)-1:itemLength-(v*2)-o.scroll}else if(a>=itemLength-v+1){ul.css(animCss,-((v)*g)+"px");curr=a==itemLength-v+1?v+1:v+o.scroll}else curr=a}else{if(a<0||a>itemLength-v)return;else curr=a}b=true;ul.animate(animCss=="left"?{left:-(curr*g)}:{top:-(curr*g)},o.speed,o.easing,function(){if(o.afterEnd)o.afterEnd.call(this,vis());b=false});if(!o.circular){$(o.btnPrev+","+o.btnNext).removeClass("disabled");$((curr-o.scroll<0&&o.btnPrev)||(curr+o.scroll>itemLength-v&&o.btnNext)||[]).addClass("disabled")}}return false}})};function css(a,b){return parseInt($.css(a[0],b))||0};function width(a){return a[0].offsetWidth+css(a,'marginLeft')+css(a,'marginRight')};function height(a){return a[0].offsetHeight+css(a,'marginTop')+css(a,'marginBottom')}})(jQuery);





 

$(function(){

	 var full_height = function()



        {



            if($(window).height() > 590)



            {



                if($('body').length > 0)



                {



                    $('.page-end').unbind().bind('click', function(){



                        $("html, body").animate({ scrollTop: $('.foot-wrapper').offset().top }, 2000);



                    }).css({cursor: 'pointer'});



                }

/*

                $(window).bind('scroll', function(){



                    footer_lock();



                });



                footer_lock();

*/

            }          



        }



        full_height();



        $(window).resize(function(){



            full_height();



        });

	var mHeadTop=$('.web_head').offset().top



    var $backToTopTxt="", $backToTopEle = $('<span class="gotop"></span>').appendTo($("body"))



        .text($backToTopTxt).attr("title", $backToTopTxt).click(function() {



            $("html, body").animate({ scrollTop:0 }, 1000);



			



    }), $backToTopFun = function() {	



        var st = $(document).scrollTop(), winh = $(window).height();



        (st > mHeadTop)? $backToTopEle.show(): $backToTopEle.hide();  		



        if (!window.XMLHttpRequest) {



            $backToTopEle.css("top", st + winh - 210); 



        }



		



    };



 $(window).bind("scroll", $backToTopFun);



    $(function() { $backToTopFun();});

	

	var $nav = $('.web_head'), navTop = $nav.offset().top, navH = $nav.outerHeight(),winTop_1=0,winWidth=$(window).width(), holder=jQuery('<div>');

		$(window).on('scroll',function(){

			var winTop_2 = $(window).scrollTop();

			holder.css('height',navH);

			

			if(winTop_2>navTop && winWidth>980){

				holder.show().insertBefore($nav);

				$nav.addClass('fixed-nav');

			}else{

				holder.hide();

				$nav.removeClass('fixed-nav');

			}

			

			if(winTop_2>winTop_1 && winWidth>980){

				$nav.removeClass('fixed-nav-appear');

			}else if(winTop_2<winTop_1){

				$nav.addClass('fixed-nav-appear');

			}

			winTop_1 = $(window).scrollTop();

		})

	 

//tab		

tabContainer('.tab-content-wrap','.tab-title','.tab-panel')      

   

});









$(document).ready(function(){

	/*侧栏产品分类*/

	$('.side-widget .side-cate li').each(function(){



		if($(this).find('ul').length>0){

 

			$(this).append("<span class='icon-cate icon-cate-down'></span>")



			$(this).children('.icon-cate').click(function(e){



							if($(this).parent('li').children('ul').is(':hidden')){



								$(this).parent('li').children('ul').slideDown(100);



									$(this).removeClass('icon-cate-down').addClass('icon-cate-up');



								}else{



									$(this).parent('li').children('ul').slideUp(100);



									$(this).removeClass('icon-cate-up').addClass('icon-cate-down');



									}



									e.stopPropagation();



							})

			}



		})

		if($('.side-widget .side-cate .nav-current').parents('ul').length>0 && $('.side-widget .side-cate .nav-current').find('ul').length>0) {

		$('.side-widget .side-cate .nav-current').parents('ul').show()

		$('.side-widget .side-cate .nav-current').children('ul').show()

		$('.side-widget .side-cate .nav-current ').children('.icon-cate').removeClass('icon-cate-down').addClass('icon-cate-up');

		}

		 else if($('.side-widget .side-cate .nav-current').parents('ul').length>0 && $('.side-widget .side-cate .nav-current').find('ul').length<1){

			 $('.side-widget .side-cate .nav-current').parents('ul').show()

			}

		 else if($('.side-widget .side-cate .nav-current').parents('ul').length<1 && $('.side-widget .side-cate .nav-current').find('ul').length>0){

			$('.side-widget .side-cate .nav-current').children('ul').show()

			$('.side-widget .side-cate .nav-current').children('.icon-cate').removeClass('icon-cate-down').addClass('icon-cate-up');

			}

	$('.faq-list li').each(function(){

		if($(this).find('.faq-cont').length>0){

			$(this).find('.faq-title b').addClass('faq-up')

			$(this).find('.faq-title').click(function(){

				if($(this).parent('li').find('.faq-cont').is(':hidden')){

					$(this).parent('li').find('.faq-cont').slideDown();

					$(this).find('b').removeClass('faq-down')

					$(this).find('b').addClass('faq-up')

					}else{

						$(this).parent('li').find('.faq-cont').slideUp();

					$(this).find('b').removeClass('faq-up')

					$(this).find('b').addClass('faq-down')

						}

				})

			}

		})



		$('.nav-bar ul,.product-list ul,.certificate-list ul,.video-list ul,.products-scroll-list ul,.gm-sep,.index-product-wrap .product-items').contents().filter(function() {

		return this.nodeType === 3;

		}).remove();

	



		// if($('.image-additional ul li').length<2){

		// 	$('.image-additional').addClass('image-additional-hide')

		// 	}





// $(".about-img").flexslider({

// 		animation:"fade",

// 		direction:"horizontal",

// 		animationLoop:true,

// 		slideshow:true,

// 		slideshowSpeed:7000, 

// 		animationSpeed: 600, 

// 		directionNav:false,

// 		controlNav:true,

// 		touch: true 

// 	});

// $('.entry').find('img').parents('a').addClass('fancybox');

// $("a.fancybox").fancybox();


$('.inquiry-form .form-item').each(function(index){

		$(this).addClass('form-item'+(index+1))

		})

//   var demo = $(".pd-inquiry-form,.ct-inquiry-form,.index-inquiry-form-wrap,.index-inquiry-form").Validform({

//       tiptype : 3,

//       showAllError : true,

//       ajaxPost : false

//   });

//   demo.addRule([

// 	  {

//       ele : "input.form-input-email",

//       datatype : "e",

//       nullmsg:"Please enter a valid email address",

//       errormsg:"Please enter a valid email address"

//       }, {

//       ele : "input.form-input-name",

//       datatype : "*1-200",

//       nullmsg:"Please enter a valid user name",

//       errormsg:"Please enter a valid user name"

//       }

//   ])

})



function tabContainer(container,title,panel){

	$(container).each(function(){

		$(this).find(title).each(function(){

			if($(this).hasClass('current')){

			j=$(this).index();

			$(this).parents(container).find(panel).eq(j).removeClass('disabled')

			}

			$(this).click(function(){

			i=$(this).index();

			$(this).addClass('current').siblings().removeClass('current');

			$(this).parents(container).find(panel).eq(i).show();

			$(this).parents(container).find(panel).not($(this).parents(container).find(panel).eq(i)).hide();

    	})   

			})

		})

	 

	}

			

function mobileTabContainer(container,title,panel,titleSpan,panelContent){

	$(container).each(function(){

		 if($(this).find(title).length>0 && $(this).find(panel).length>0){

			  $(this).append('<div class="mobile-tab-items"></div>')

					 var mobileTabItem='<div class="mobile-tab-item"><h2 class="mobile-tab-title"></h2><div class="mobile-tab-panel"></div></div>'

					 $(this).find(title).each(function(){

						$(this).parents(container).find('.mobile-tab-items').append(mobileTabItem)

						 })

		 }

		 var mobileTabTitle=$(this).find('.mobile-tab-items .mobile-tab-title')

					var mobileTabPanel=$(this).find('.mobile-tab-items .mobile-tab-panel')

					for(var i=0;i<$(this).find(title).length;i++){

						 $(this).find(title).eq(i).find(titleSpan).clone().appendTo(mobileTabTitle.eq(i))

						 $(this).find(panel).eq(i).find(panelContent).clone().appendTo(mobileTabPanel.eq(i))

						}

	})

	

	}

function picturesShow(container,picturesItem,length){	

	var containerWidth=$(container).width()

	var itemCurrentWidth=((1-1/8*(length-1))*100)+"%"

	var itemWidth=(1/8*100)+"%"

	$(container).find(picturesItem).css('width',itemWidth)

	$(container).find(picturesItem).eq(0).addClass('current').css('width',itemCurrentWidth)

	$(container).find(picturesItem).find('.item-wrap').css('width',containerWidth*(1-1/8*(length-1)) )

	$(container).find(picturesItem).each(function(){

		$(this).click(function(){

			$(this).addClass('current').stop().animate({'width':itemCurrentWidth},600)

			$(this).siblings().removeClass('current').stop().animate({'width':itemWidth},300)

			 

			})

	})

	}

$(function(){

if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){

	var wow = new WOW({

	    boxClass: 'wow',

	    animateClass: 'animated',

	    offset: 0,

	    mobile: false,

	    live: true

	});

	wow.init();

};

})

function decrease(item,time){

	var i=0;

	var j=item.length;

	item.each(function(){

	 i++

	 j--

	 var ii=(i-1)

	 var jj=time*j

	item.eq(ii).attr('data-wow-delay',jj+'s')

	 })

	}

function add(item,time){

	item.each(function(index){

	$(this).attr('data-wow-delay',(index*time)+'s')

	 })

	}

  


   
$(function(){
	decrease( $('.company-synopses .synopsis-item'),.15)
	add( $('.index-product-wrap .product-item'),.1)
	decrease( $('.index-new-wrap .news-item'),.15)
		decrease( $('.index-client-wrap .client-item'),.1)
	})
	
// FWDU3DCarUtils.checkIfHasTransforms();
                    
                    // window.fwdu3dcar0 = new FWDUltimate3DCarousel(
                    // {carouselHolderDivId:'fwdu3dcarDiv0',
                    //     carouselDataListDivId:'fwdu3dcarPlaylist0',displayType:'responsive',
                    //     autoScale:'yes',
                    //     carouselWidth:1200,
                    //     carouselHeight:600,
                    //     skinPath:'style/global/img',
                    //     backgroundColor:'transparent',
                    //     backgroundImagePath:'',
                    //     thumbnailsBackgroundImagePath:'',
                    //     scrollbarBackgroundImagePath:'style/global/img/scrollbarBackground.jpg',
                    //     backgroundRepeat:'repeat-x',
                    //     carouselTopology:'star',
                    //     carouselXRadius:700,
                    //     carouselYRadius:0,
                    //     carouselXRotation:8,
                    //     carouselYOffset:10,
                    //     showCenterImage:'no',
                    //     centerImagePath:'',
                    //     centerImageYOffset:0,
                    //     showDisplay2DAlways:'no',
                    //     carouselStartPosition:'center',
                    //     autoplay:'yes',
                    //     slideshowDelay:3000,
                    //     rightClickContextMenu:'default',
                    //     addKeyboardSupport:'yes', 
                    //     fluidWidthZIndex:1000,thumbnailWidth:304,
                    //     thumbnailHeight:400,
                    //     thumbnailBorderSize:0,
                    //     thumbnailMinimumAlpha:0.1,		
                    //     thumbnailBackgroundColor:'transparent',
                    //     thumbnailBorderColor1:'transparent',
                    //     thumbnailBorderColor2:'transparent',
                    //     transparentImages:'no',
                    //     maxNumberOfThumbnailsOnMobile:13,
                    //     showThumbnailsGradient:'yes',
                    //     showThumbnailsHtmlContent:'no',
                    //     showText:'yes',
                    //     textBackgroundColor:'transparent',
                    //     textBackgroundOpacity:0.7,
                    //     showTextBackgroundImage:'no',
                    //     showFullTextWithoutHover:'no',
                    //     showThumbnailBoxShadow:'no',
                    //     thumbnailBoxShadowCss:'0px 2px 2px #555555',
                    //     showReflection:'yes',
                    //     reflectionHeight:60,
                    //     reflectionDistance:0,
                    //     reflectionOpacity:0.2,controlsMaxWidth:940,
                    //     controlsHeight:31,
                    //     controlsPosition:'bottom',
                    //     showPrevButton:'no',
                    //     showNextButton:'no',
                    //     disableNextAndPrevButtonsOnMobile:'no',
                    //     showSlideshowButton:'no',
                    //     slideshowTimerColor:'#777777',
                    //     showScrollbar:'no',
                    //     scrollbarHandlerWidth:300,
                    //     scrollbarTextColorNormal:'#777777',
                    //     scrollbarTextColorSelected:'#000000',
                    //     disableScrollbarOnMobile:'yes',
                    //     enableMouseWheelScroll:'yes',showComboBox:'no',
                    //     startAtCategory:1,
                    //     selectLabel:'SELECT CATEGORIES',
                    //     allCategoriesLabel:'All Categories',
                    //     showAllCategories:'no',
                    //     comboBoxPosition:'topright',
                    //     selectorBackgroundNormalColor1:'#fcfdfd',
                    //     selectorBackgroundNormalColor2:'#e4e4e4',
                    //     selectorBackgroundSelectedColor1:'#a7a7a7',
                    //     selectorBackgroundSelectedColor2:'#8e8e8e',
                    //     selectorTextNormalColor:'#8b8b8b',
                    //     selectorTextSelectedColor:'#ffffff',
                    //     buttonBackgroundNormalColor1:'#e7e7e7',
                    //     buttonBackgroundNormalColor2:'#e7e7e7',
                    //     buttonBackgroundSelectedColor1:'#a7a7a7',
                    //     buttonBackgroundSelectedColor2:'#8e8e8e',
                    //     buttonTextNormalColor:'#000000',
                    //     buttonTextSelectedColor:'#ffffff',
                    //     comboBoxShadowColor:'#000000',
                    //     comboBoxHorizontalMargins:12,
                    //     comboBoxVerticalMargins:12,
                    //     comboBoxCornerRadius:0,addLightBoxKeyboardSupport:'yes',
                    //     showLightBoxNextAndPrevButtons:'yes',
                    //     showLightBoxZoomButton:'yes',
                    //     showLightBoxInfoButton:'yes',
                    //     showLightBoxSlideShowButton:'yes',
                    //     showLightBoxInfoWindowByDefault:'no',
                    //     slideShowAutoPlay:'no',
                    //     lightBoxVideoAutoPlay:'no',
                    //     lightBoxVideoWidth:640,
                    //     lightBoxVideoHeight:480,
                    //     lightBoxIframeWidth:800,
                    //     lightBoxIframeHeight:600,
                    //     lightBoxBackgroundColor:'#000000',
                    //     lightBoxInfoWindowBackgroundColor:'#ffffff',
                    //     lightBoxItemBorderColor1:'#fcfdfd',
                    //     lightBoxItemBorderColor2:'#e4e4e4',
                    //     lightBoxItemBackgroundColor:'#333333',
                    //     lightBoxMainBackgroundOpacity:0.8,
                    //     lightBoxInfoWindowBackgroundOpacity:0.9,
                    //     lightBoxBorderSize:5,
                    //     lightBoxBorderRadius:0,
                    //     lightBoxSlideShowDelay:4000
                    // });
                    
     var swiper = new Swiper(".news_slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });   
  
  
  window.onload=function(){
         var swiper = new Swiper(".certificate_slide", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });     
  }
      
     
     
//  可视化装修 幻灯片不显示

      $(document).ready(function(){
     var myEvent = new Event('resize');
        window.dispatchEvent(myEvent);
        });
 
window.onload = function () {
        var myEvent = new Event('resize');
        window.dispatchEvent(myEvent);
    }



function hideMsgPop() { $('.inquiry-pop-bd').fadeOut('fast') }
window.onload = function(){if ($('body .inquiry-form-wrap').length > 0) {
  var webTop = $('body .inquiry-form-wrap').offset().top - 80
  $('.product-btn-wrap .email,.company_subscribe .button,.side_content .side_list .email').click(function() {
    $("html, body").animate({ scrollTop: webTop }, 1000);
    $(".ad_prompt").show().delay(3000).hide(300);
  })
} else {
  $('.product-btn-wrap .email,.company_subscribe .button,.side_content .side_list .email').click(function() {
    $('.inquiry-pop-bd').fadeIn('fast')
  })
}
$('.inquiry-pop,.product-btn-wrap .email,.company_subscribe .button,.side_content .side_list .email').click(function(e){ e.stopPropagation();})
$(document).click(function(){hideMsgPop();})}