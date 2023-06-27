/*Swiper Banner*/
if ($('.swiper-wrapper .swiper-slide').length < 2) { $('.swiper-pagination').hide() }

// transition
$(function(){
  $(window).on('load',function(){
    $('body').removeClass('preload');
  })
})


$(function(){

  // header
  createDropBtn();
  changeuRL($('a'));
  setHeadFixed();
  setSearchPop();
  setLanguageDrop();
  goTop();


  setBannerSwiper();

  // fit mobile
  mSizeChange();
  $(window).resize(function() { mSizeChange() });

  // subpage
  setViewSwiper();
  setRealtedSwiper();
  tabContainer('.tab-content-wrap', '.tab-title', '.tab-panel');
  faqAccordion();
  setCateNav();
})




/*----------------------------------------------
                    FUNCTIONS
------------------------------------------------*/


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

//swiper.animate.min.js

function swiperAnimateCache(a) {
    for (j = 0; j < a.slides.length; j++)
        for (allBoxes = a.slides[j].querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++) allBoxes[i].attributes["style"] ? allBoxes[i].setAttribute("swiper-animate-style-cache", allBoxes[i].attributes["style"].value) : allBoxes[i].setAttribute("swiper-animate-style-cache", " "), allBoxes[i].style.visibility = "hidden"
}
function swiperAnimate(a) {
    clearSwiperAnimate(a);
    var b = a.slides[a.activeIndex].querySelectorAll(".ani");
    for (i = 0; i < b.length; i++) b[i].style.visibility = "visible", effect = b[i].attributes["swiper-animate-effect"] ? b[i].attributes["swiper-animate-effect"].value : "", b[i].className = b[i].className + "  " + effect + " " + "animated", style = b[i].attributes["style"].value, duration = b[i].attributes["swiper-animate-duration"] ? b[i].attributes["swiper-animate-duration"].value : "", duration && (style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";"), delay = b[i].attributes["swiper-animate-delay"] ? b[i].attributes["swiper-animate-delay"].value : "", delay && (style = style + "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";"), b[i].setAttribute("style", style)
}

function clearSwiperAnimate(a) {
    for (j = 0; j < a.slides.length; j++)
        for (allBoxes = a.slides[j].querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++) allBoxes[i].attributes["swiper-animate-style-cache"] && allBoxes[i].setAttribute("style", allBoxes[i].attributes["swiper-animate-style-cache"].value), allBoxes[i].style.visibility = "hidden", allBoxes[i].className = allBoxes[i].className.replace("animated", " "), allBoxes[i].attributes["swiper-animate-effect"] && (effect = allBoxes[i].attributes["swiper-animate-effect"].value, allBoxes[i].className = allBoxes[i].className.replace(effect, " "))
}


/*setViewSwiper*/
function setViewSwiper(){
  var viewSwiper = new Swiper('.image-additional', {
    slidesPerView: 3,
    spaceBetween: 0,
    pagination: {
      el: '.product-view .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.product-view .swiper-button-next',
      prevEl: '.product-view .swiper-button-prev',
    },
    breakpoints: {
      1366: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 3
      },
      480: {
        slidesPerView: 1
      }
    }
  });
}

/*setRealtedSwiper*/
function setRealtedSwiper(){
  var realtedSwiper = new Swiper('.goods-may-like .swiper-slider', {
    slidesPerView: 3,
    spaceBetween: 25,
    speed: 400,
    navigation: {
      nextEl: '.goods-may-like .swiper-button-next',
      prevEl: '.goods-may-like .swiper-button-prev',
    },
    breakpoints: {
      1920: {
        slidesPerView:3
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 15
      },
      1280: {
        slidesPerView: 2
      },
      480: {
        slidesPerView: 2,
        slidesPerGroup:2,
        spaceBetween: 4
      }

    }
  });
}

/*createDropBtn*/
function createDropBtn(){
  if($('.head_nav li').length){
    $('.head_nav li').each(function() {
      if ($(this).find('ul').length) {
        $(this).children('a,.menu_cell_tit').append("<b class='menu_toggle'></b>");
        $(this).addClass('has-child');
      } 
      else {
        if (!$(this).siblings('li').find('ul').length) {
          $(this).addClass('siblings-no-menu')
        }
      }
    })
  }
}

/*hideMsgPop*/
function hideMsgPop() { $('.inquiry-pop-bd').fadeOut('fast') }
if ($('body .inquiry-form-wrap').length > 0) {
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
$('.inquiry-pop,.product-btn-wrap .email,.company_subscribe .button,.side_content .side_list .email').click(function(e) { e.stopPropagation(); })
$(document).click(function() { hideMsgPop() })

/*changeuRL*/
function changeuRL(link) {
  var curUrl = document.location.href;
  var oldUrl = window.location.host + '/';
  var lgArr = ['fr/', 'de/', 'pt/', 'es/', 'ru/', 'ko/', 'ar/', 'ga/', 'ja/', 'el/', 'tr/', 'it/', 'da/', 'ro/', 'id/', 'cs/', 'af/', 'sv/', 'pl/', 'eu/', 'ca/', 'eo/', 'hi/', 'lo/', 'sq/', 'am/', 'hy/', 'az/', 'be/', 'bn/', 'bs/', 'bg/', 'ceb/', 'ny/', 'co/', 'hr/', 'nl/', 'et/', 'tl/', 'fi/', 'fy/', 'gl/', 'ka/', 'gu/', 'ht/', 'ha/', 'haw/', 'iw/', 'hmn/', 'hu/', 'is/', 'ig/', 'jw/', 'kn/', 'kk/', 'km/', 'ku/', 'ky/', 'la/', 'lv/', 'lt/', 'lb/', 'mk/', 'mg/', 'ms/', 'ml/', 'mt/', 'mi/', 'mr/', 'mn/', 'my/', 'ne/', 'no/', 'ps/', 'fa/', 'pa/', 'sr/', 'st/', 'si/', 'sk/', 'sl/', 'so/', 'sm/', 'gd/', 'sn/', 'sd/', 'su/', 'sw/', 'tg/', 'ta/', 'te/', 'th/', 'uk/', 'ur/', 'uz/', 'vi/', 'cy/', 'xh/', 'yi/', 'yo/', 'zu/', 'zh-CN/', 'zh-TW/'];
  $.each(lgArr, function(i, lenItem) {
    var lgUrl = oldUrl.toString() + lenItem;
    if (curUrl.indexOf(lgUrl) != -1) {
      link.each(function(i) {
        if (!$(this).parents().hasClass('language-flag')) {
          var iLink;
          if ($(this).prop('href')) {
            iLink = $(this).prop('href');
          }
          if (String(iLink).indexOf(oldUrl) != -1 && String(iLink).indexOf(lgUrl) == -1 && curUrl.indexOf(lgUrl) != -1) {
            var newLink = iLink.replace(oldUrl, lgUrl);
            $(this).attr('href', newLink);
          }
        }
      })
    }
  });
}

/*setLanguageDrop*/
function setLanguageDrop(){
  $('.change-language .change-language-cont').append("<div class='change-empty'>Untranslated</div>")
  $('.prisna-wp-translate-seo').append("<div class='lang-more'>More Language</div>")
  if ($('body .prisna-wp-translate-seo').length > 0 && $('.change-language .prisna-wp-translate-seo').length < 1) {
    $('.prisna-wp-translate-seo').appendTo('.change-language .change-language-cont')
    if ($('.change-language .change-language-cont .prisna-wp-translate-seo li').length > 0) {
      $('.change-language .change-language-cont .change-empty').hide()
      $('.change-language .change-language-cont .prisna-wp-translate-seo li').each(function(index) {
        if (index > 35) {
          $(this).addClass('lang-item lang-item-hide')
          $('.change-language-cont').find('.lang-more').fadeIn()
        } else {
          $('.change-language-cont').find('.lang-more').fadeOut()
        }
      })
      if ($('.change-language-cont .lang-more').length > 0) {
        $('.change-language-cont .lang-more').click(function() {
          if ($(this).parents('.change-language-cont').find('.prisna-wp-translate-seo li.lang-item').hasClass('lang-item-hide')) {
            $(this).parents('.change-language-cont').find('.prisna-wp-translate-seo li.lang-item').removeClass('lang-item-hide')
            $(this).addClass('more-active').text('×')
          } else {
            $(this).parents('.change-language-cont').find('.prisna-wp-translate-seo li.lang-item').addClass('lang-item-hide')
            $(this).removeClass('more-active').text('More Language')
          }
        })
      }
    } else {
      $('.change-language .change-language-cont .change-empty').fadeIn()
    }
  }
}

/*goTop*/
function goTop(){
  var mHeadTop = $('.web_head').offset().top;
  var $backToTopTxt = "TOP",
    $backToTopEle = $('<span class="gotop"></span>').appendTo($("body"))
    .html('<em>' + $backToTopTxt + '</em>').attr("title", $backToTopTxt).click(function() {
      $("html, body").animate({ scrollTop: 0 }, 300);
    }),
    $backToTopFun = function() {
      var st = $(document).scrollTop(),
        winh = $(window).height();
      (st > mHeadTop) ? $backToTopEle.addClass('active'): $backToTopEle.removeClass('active');
      if (!window.XMLHttpRequest) {
        $backToTopEle.css("top", st + winh - 210);
      }
    };
  $(window).bind("scroll", $backToTopFun);
  $backToTopFun(); 
}

/*faqAccordion*/
function faqAccordion(){
  $('.faq-item').each(function(index) {
    var _this = $(this)
    var title = _this.find('.faq-title')
    var cont = _this.find('.faq-cont')
    if (index == 0) {
      title.addClass('show-title')
    }
    title.on('click', function() {
      if (cont.is(':hidden') && !$(this).hasClass('show-title')) {
        cont.slideDown('fast')
        $(this).addClass('show-title')
        _this.siblings().find('.faq-title').removeClass('show-title')
        _this.siblings().find('.faq-cont').slideUp('fast')
      } else {
        cont.slideUp('fast')
        $(this).removeClass('show-title')
      }
    })
  })
}

/*getWinSize*/
var winWidth = 0;
var winHeight = 0;
function getWinSize() {
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
}

/*setHeadFixed*/
function setHeadFixed(){
  getWinSize();
  var $nav = $('.web_head'),
    navTop = $('.nav_wrap').offset().top,
    headH = $('.head_layer').outerHeight(),
    winTop_1 = 0,
    spr = $('body').height() - $nav.height(),
    holder = jQuery('<div class="head_holder">');
  function fixedTop() {
    var winTop_2 = $(window).scrollTop();
    holder.css('height', headH);
    if (winTop_2 > 0 && winWidth >= 950) {
      holder.show().appendTo($nav);
      $nav.addClass('fixed-nav');
      $nav.parents('body').addClass('fixed-body');
      setTimeout(function() { $nav.addClass('fixed-nav-active') });
    } else {
      holder.hide();
      $nav.removeClass('fixed-nav fixed-nav-active');
      $nav.parents('body').removeClass('fixed-body');
    }
    if (winTop_2 > winTop_1 && winWidth >= 950) {
      $nav.removeClass('fixed-nav-appear');
    } else if (winTop_2 < winTop_1) {
      $nav.addClass('fixed-nav-appear');
    }
    winTop_1 = $(window).scrollTop();
  }
  fixedTop();
  $(window).on('scroll', function() {
    fixedTop();
  })
  $(window).on('resize', function() {
    fixedTop();
  })
}

/*mSizeChange*/
function mSizeChange() {
  getWinSize();
  if (winWidth <= 950) {
    if ($('.mobile-head-items').length < 1) {
      // var mobileService = '<div class="mobile-head-items"><div class="mobile-head-item mobile-head-nav"><div class="title"></div><div class="main-content-wrap side-content-wrap"><div class="content-wrap"></div></div></div><div class="mobile-head-item mobile-head-language"><div class="title"></div><div class="main-content-wrap side-content-wrap"><div class="content-wrap"></div></div></div><div class="mobile-head-item mobile-head-search"><div class="title"></div><div class="main-content-wrap middle-content-wrap"><div class="content-wrap"></div></div></div>'
      var mobileService = ''
      $('body').append(mobileService)
      if ($('body .aside').length > 0) {
        $('.mobile-head-items').append('<div class="mobile-head-item mobile-head-aside"><div class="title"></div><div class="main-content-wrap side-content-wrap"><div class="content-wrap"></div></div></div>')
      }
      $('.mobile-head-item').each(function() {
        $(this).find('.title').click(function() {
          if ($(this).parents('.mobile-head-item').find('.main-content-wrap').length > 0) {
            var pItem = $(this).parents('.mobile-head-item')
            if (!pItem.find('.main-content-wrap').hasClass('show-content-wrap')) {
              pItem.find('.main-content-wrap').addClass('show-content-wrap')
              pItem.find('.side-content-wrap').stop().animate({ 'left': '0' }, 300)
              pItem.find('.middle-content-wrap').addClass('middle-show-content-wrap')
              pItem.find('.side-content-wrap').append("<b class='mobile-ico-close'></b>")
              pItem.siblings('.mobile-head-item').find('.main-content-wrap').removeClass('show-content-wrap')
              pItem.siblings('.mobile-head-item').find('.side-content-wrap').stop().animate({ 'left': '-80%' }, 300)
              pItem.siblings('.mobile-head-item').find('.middle-content-wrap').removeClass('middle-show-content-wrap')
              pItem.siblings('.mobile-head-item').find('.side-content-wrap .mobile-ico-close').remove()
              if ($('.mobile-head-items').find('.mobile-body-mask').length < 1) {
                $('.mobile-head-items').append('<div class="mobile-body-mask"></div>')
              }
            } else {
              pItem.find('.main-content-wrap').removeClass('show-content-wrap')
              pItem.find('.side-content-wrap').stop().animate({ 'left': '-80%' }, 300)
              pItem.find('.middle-content-wrap').removeClass('middle-show-content-wrap')
              pItem.find('.side-content-wrap .mobile-ico-close').remove()
            }
            $('.mobile-body-mask').click(function() {
              $('.mobile-body-mask').remove()
              $('.mobile-head-item .main-content-wrap').removeClass('show-content-wrap')
              $('.mobile-head-item .side-content-wrap').animate({ 'left': '-80%' }, 300)
              $('.mobile-head-item .middle-content-wrap').removeClass('middle-show-content-wrap')
              $('.mobile-head-item .side-content-wrap .mobile-ico-close').remove()
              // 点击遮罩层，恢复底部菜单状态
              if ($(".mobile-head-item .title").length) {
                $(".mobile-head-item .title").removeClass("current");
              }
              
            })
            $('.mobile-ico-close').click(function() {
              $('.mobile-body-mask').remove()
              $('.mobile-head-item .main-content-wrap').removeClass('show-content-wrap')
              $('.mobile-head-item .side-content-wrap').stop().animate({ 'left': '-80%' }, 300)
              $('.mobile-head-item .middle-content-wrap').removeClass('middle-show-content-wrap')
              $('.mobile-head-item .side-content-wrap .mobile-ico-close').remove()
            })
          }
        })
      })
      $('.change-currency ').clone().appendTo('.mobile-head-item.mobile-head-currency .main-content-wrap .content-wrap')
      $('.change-language .change-language-cont').clone().appendTo('.mobile-head-item.mobile-head-language .main-content-wrap .content-wrap')
      $('.nav_wrap .head_nav').clone().appendTo('.mobile-head-item.mobile-head-nav .main-content-wrap .content-wrap')
      // 2021-07-22
      if($('.choose_langs').length){
        $('.choose_langs').clone().appendTo('.mobile-head-item.mobile-head-nav .main-content-wrap .content-wrap')
      }
      
      $('.head-search:last').clone().appendTo('.mobile-head-item.mobile-head-search .main-content-wrap .content-wrap')
      $('.head_sns').clone().appendTo('.mobile-head-item.mobile-head-social .main-content-wrap .content-wrap')
      $('.aside .aside-wrap').clone().appendTo('.mobile-head-item.mobile-head-aside .main-content-wrap .content-wrap')
    }
  }
  //mobile end
  else {
    $(document).ready(function() {
      $('.mobile-body-mask,.mobile-head-items,.mobile-head-items,.mobile-nav-items,.mobile-cart-items,.mobile-tab-items').remove()
    });
  }
}

/*setCateNav*/
function sideCate(cateEle,siblingsStatus){
  $(cateEle).each(function() {
    if ($(this).find('ul').length ) {
      $(this).addClass('has-child');
      $(this).append("<span class='icon-cate icon-cate-down'></span>")
      $(this).children('.icon-cate').click(function(e) {
        var mEle=$(this).parent('li');
        var mList=$(this).parent('li').children('ul');
        var msiblings=$(this).parent('li').siblings('li');
        if(siblingsStatus==0){
          msiblings.removeClass('li_active');
          msiblings.children('ul').slideUp(150);
          msiblings.children('.icon-cate').removeClass('icon-cate-up').addClass('icon-cate-down');
        }
        if (mList.is(':hidden')) {
          mEle.addClass('li_active');
          mList.slideDown(150);
          $(this).removeClass('icon-cate-down').addClass('icon-cate-up');
        } else {
          mEle.removeClass('li_active');
          mList.slideUp(150);
          $(this).removeClass('icon-cate-up').addClass('icon-cate-down');
        }
        e.stopPropagation();
      })
    }
  }) 
}
function setCateNav(){
  sideCate('.side-cate li',0);
  $('.side-cate,.side-cate ul').each(function(){
    if(!$(this).find('ul').length){
      $(this).addClass('cate-type-list');
    }
  })
  var $currentEle=$('.side-widget .side-cate .nav-current');
  var $currentParent=$currentEle.parents('ul');
  if ($currentParent.length && $currentEle.find('ul').length ) {
    $currentParent.show();
    $currentEle.parents('li').addClass("show_li li_active");
    $currentEle.parents('li.show_li').children('.icon-cate').removeClass('icon-cate-down').addClass('icon-cate-up');
    $currentEle.children('ul').show();
    $('.side-widget .side-cate .nav-current ').children('.icon-cate').removeClass('icon-cate-down').addClass('icon-cate-up');
  } else if ($currentParent.length > 0 && $currentEle.find('ul').length < 1) {
    $currentParent.show();
    $currentEle.parents('li').addClass("show_li");
    $currentEle.parents('li.show_li').children('.icon-cate').removeClass('icon-cate-down').addClass('icon-cate-up');
  } else if ($currentParent.length < 1 && $currentEle.find('ul').length > 0) {
    $currentEle.children('ul').show();
    $currentEle.children('.icon-cate').removeClass('icon-cate-down').addClass('icon-cate-up');
  }
}

/*tabContainer*/
function tabContainer(container, title, panel) {
  $(container).each(function() {
    $(this).find(title).each(function() {
      if ($(this).hasClass('current')) {
        j = $(this).index();
        $(this).parents(container).find(panel).eq(j).removeClass('disabled')
      }
      $(this).click(function() {
        i = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $(this).parents(container).find(panel).eq(i).show();
        $(this).parents(container).find(panel).not($(this).parents(container).find(panel).eq(i)).hide();
      })
    })
  })
}

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


$(function() { $("#scrollsidebar").fix({ float: 'right', durationTime: 400 }); });
$('.business_right .events li').on('click', function() {
  $(this).addClass('current').siblings("li").removeClass('current')
  var i = $(this).index()
  $(this).parents('.index_business').find('.business_middle .tab_content').eq(i).addClass('current').siblings(".tab_content").removeClass('current')
})
$('table').each(function() {
  if (!$(this).parent().hasClass('table_wrap')) {
    $(this).wrap("<div class='table_wrap'><//div>")
  }
})




/* -------------- public Function --------------*/


/*!
 切换CLASS
 ----------
 * 说明:
 * btn:  按钮
 * item: 父容器
 * cName: 切换的className
 * siblingsStatus: 同级是否关闭(0:关闭,其他值:不受click影响)
*/
function toggleEleClass(btn, item, cName, hName, siblingsStatus) {
  var $btn = $(btn);
  var $item = $(item);
  if (siblingsStatus == 0) {
    $btn.parents(item).siblings(item).removeClass(cName).addClass(hName);
  }
  if ($btn.parents(item).hasClass(cName)) {
    $btn.parents(item).removeClass(cName).addClass(hName);
  } else {
    $btn.parents(item).addClass(cName).removeClass(hName);
  }
}



// set head nav Direction
function menuDirection(ele) {
  var winW = $(window).innerWidth();
  $(ele).each(function() {
    if ($(this).find('ul').length) {
      var linkEleW = $(this).children('a').width();
      var offRight = winW - $(this).offset().left;
      var childLen = $(this).find('ul').length;
      var childrenWidth = childLen * 250 + 10;
      if (offRight < childrenWidth) {
        $(this).addClass('menu_left');
      } else {
        $(this).removeClass('menu_left');
      }
    }
  })
}

// dropMenu
function dropMenu(menuItem, menuList,menustatus,showClass) {
  var mouseover_tid = [];
  var mouseout_tid = [];
  if(showClass){
    showClass=showClass;
  }
  else{
    showClass='active';
  }
  $(menuItem).each(function(index) {
    $(this).hover(
      function() {
        var _self = this;
        clearTimeout(mouseout_tid[index]);
        mouseover_tid[index] = setTimeout(function() {
          if(menustatus=='1'){
            $(_self).children(menuList).slideDown(150);
          }
          $(_self).addClass(showClass);
        }, 150);
      },
      function() {
        var _self = this;
        clearTimeout(mouseover_tid[index]);
        mouseout_tid[index] = setTimeout(function() {
          if(menustatus=='1'){
            $(_self).children(menuList).slideUp(50);
          }
          $(_self).removeClass(showClass);
        }, 150);
      }
    );
  })
}

// quick anchor
function quickMeta(anchor){
  var topH=0;
  if($('.index_web_head').length){
    topH=$('.index_web_head').outerHeight();
  }
  var $anchor=$(anchor);
  $anchor.on('click',function(){
    if($('.mobile-nav').length){
      topH=$('.mobile-nav').height();
    }
    var targetId=$(this).attr('data-targetId');
    var targetTop=$(targetId).offset().top;
    // var targetTop=$(targetId).offset().top-topH;
    $('html,body').animate({
      scrollTop:targetTop+'px'
    },200)
  })
}

// addWowAnm
function addWowAnm(_this,anmName,duration,delay){
  var curIndex=$(_this).index();
  $(_this).attr('data-wow-delay',(curIndex*delay).toFixed(2)+'s');
  $(_this).attr('data-wow-duration',duration);
  $(_this).addClass('wow').addClass(anmName);
}








/* -------------- header --------------*/

// dropmenu direction
$(function() {
  menuDirection('.head_nav>li');
  $(window).on('resize', function() {
    menuDirection('.head_nav>li');
  })
})


var mouseover_tid = [];
var mouseout_tid = [];
$(function() {
  // 导航菜单
  $('.web_head .head_nav>li').each(function(index) {
    if ($(this).children('ul').length) { }
      var $head = $(this).parents('.web_head');
      $(this).hover(
        function() {
          var _self = this;
          clearTimeout(mouseout_tid[index]);
          mouseover_tid[index] = setTimeout(function() {
            $(_self).addClass('item_menu_active');
            $head.addClass("head_menu_show");
          }, 0);
        },
        function() {
          var _self = this;
          clearTimeout(mouseover_tid[index]);
          mouseout_tid[index] = setTimeout(function() {
            $(_self).removeClass('item_menu_active');
            $head.removeClass("head_menu_show");
          }, 0);
        }
      );
   
  });

})

$(function() {
  // $('.nav_wrap').append('<span class="nav_btn_close"></span>');
  // 2021-06-22
  $('.head_nav li .menu_toggle').on('click', function() {
    var navItem = $(this).closest('li');
    var navMenu;
    if(navItem.children('ul').length){
      navMenu=navItem.children('ul');
    }
    else{
      navMenu=navItem.children().children('ul');
    }
    var siblingsItem=navItem.siblings('li');
    if (navMenu.is(':hidden')) {
      siblingsItem.find('ul').slideUp(150);
      siblingsItem.removeClass('active');
      navMenu.slideDown(150, function() {
        navItem.addClass('active');
      });
    } else {
      navItem.removeClass('active');
      navMenu.slideUp(150);
    }
    return false;
  })
})



/* -------------- footer --------------*/
$(function(){
  $('.foot_item_nav .foot_item_toggle').on('click',function(){
    var $footItem=$(this).parents('.foot_item_nav');
    if(!$footItem.hasClass('foot_item_active')){
      $('.foot_item_nav').removeClass('foot_item_active');
      $footItem.addClass('foot_item_active');
      $('.foot_item_nav .foot_item_bd').slideUp(200);
      $footItem.find('.foot_item_bd').slideDown(200);
    }
    else{
      $footItem.removeClass('foot_item_active');
      $footItem.find('.foot_item_bd').slideUp(200);
    }
  })
})



/* -------------- index --------------*/

$(function(){

  // index_adv
  if($('.adv_items').length){
    itemHover('.adv_items','.adv_item',3);
  }
  if($('.count_items .count_item_num').length){
    $('.count_items .count_item_num').countUp();
  }

  // index_cert
  certSlider();

  // partnerSlider
  partnerSlider();

})

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

// certSlider
function certSlider(){
  if($('.cert_slider').length) {
    var certSwiper = new Swiper('.cert_slider', {
      slidesPerView: 5,
      slidesPerGroup:1,
      effect: 'slide',
      centeredSlides: true,
      slideToClickedSlide: true,
      loop: true,
      // watchOverflow:true,
      speed: 400,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: '.index_cert .swiper-button-next',
        prevEl: '.index_cert .swiper-button-prev',
      },
      pagination: {
        el: '.index_cert .swiper-pagination',
        clickable: true,
      },
      breakpoints: {
       950: {
         slidesPerView: 3,
       },
       480: {
         slidesPerView: 1.2,
       }
      }
    });
    certSwiper.el.onmouseover = function() {
      certSwiper.autoplay.stop();
    }
    certSwiper.el.onmouseleave = function() {
      certSwiper.autoplay.start();
    }
  }
}

// video
$(function(){
  var playBox=$('.video_play_box');
  var playVideo = playBox.find('video');
  playBox.removeClass('video_play_active').addClass('video_play_ended');
  playBox.on('click',function(){
    if(playVideo[0].paused) {
      playVideo[0].play();
      $('.video_play_box').addClass('video_play_active').removeClass('video_play_ended');
      playVideo.attr('controls','controls');
      console.log('paused')
    } else {
      playVideo[0].pause();
      $('.video_play_box').addClass('video_play_ended').removeClass('video_play_active');
      playVideo.removeAttr('controls');
    }
  })
  playVideo.on('ended', function() {
    playBox.removeClass('video_play_active').addClass('video_play_ended');
  });
})


// itemHover
function itemHover(eles,item,activeIndex){
  var $eles=$(eles);
  if(activeIndex){
    $eles.find(item).eq(activeIndex-1).addClass('item_hover');
    $eles.find(item).eq(activeIndex).addClass('item_next');
  }
  $eles.find(item).hover(function(){
    $(item).removeClass('item_prev item_next');
    $(this).addClass('item_hover').siblings(item).removeClass('item_hover');
    $(this).prev(item).addClass('item_prev');
    $(this).next(item).addClass('item_next');
  })
}

// sysTabs
function sysTabs(wrap, tab, panel, item) {
  var _wrap = wrap;
  var _tab = tab;
  var _panel = panel;
  var _item = item;
  $(wrap).find(_tab).on('click', function() {
    var scTop = $(window).scrollTop();
    $('html,body').animate({
      scrollTop: scTop + 1
    }, 0)
    setTimeout(function() {
      $('html,body').animate({
        scrollTop: scTop
      }, 0)
    }, 10)
    $(this).addClass('active').siblings(_tab).removeClass('active');
    var tabIndex = $(this).index();
    var tabWrap = $(this).parents(_wrap);
    // tabWrap.find(_panel).css({
    //   'opacity': 0
    // })
    tabWrap.find(_panel).eq(tabIndex).addClass('panel_active').removeClass('panel_hide').siblings(_panel).addClass('panel_hide').removeClass('panel_active');
    tabWrap.find(_panel).eq(tabIndex).show().siblings(_panel).hide();
    tabWrap.find(_panel).removeClass('animated');
    tabWrap.find(_panel).eq(tabIndex).addClass('animated');
  })
}










/* -------------- subpage --------------*/

$(function(){
  $('.side-widget').each(function(){
    if(!$(this).find('.mobile-aside-toggle').length){
      $(this).find('.side-tit-bar').append('<span class="mobile-aside-toggle"></span>');
    }
  })
  var $cateBtn=$('.aside .mobile-aside-toggle');
  $cateBtn.on('click',function(){
    $(this).parents('.side-widget').toggleClass('show-cate');
  })
})

var sideProduct = new Swiper('.side_slider', {
  slidesPerView: 5,
  slidesPerGroup: 1,
  spaceBetween: 0,
  direction: 'vertical',
  navigation: {
    nextEl: '.side-product-items .btn-next',
    prevEl: '.side-product-items .btn-prev',
  },
  pagination: {
    el: '.side-product-items .swiper-pagination',
    clickable: true,
  },
});


var mSwiper = new Swiper('.main_banner_slider', {
  effect: 'fade',
  speed: 1000,
  loop: false,
  watchOverflow: true,
  spaceBetween: 0,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.main_banner_slider .swiper-pagination',
    clickable: true,
  }
});


if($('.sys_sub_head .swiper-slide').length<2){
  $('.sys_sub_head .swiper-control').hide();
}

else{
  var hdSwiper = new Swiper('.head_bn_slider',{
    effect: 'fade',
    speed: 1000,
    loop:true,
    spaceBetween: 0,
    watchOverflow:true,
    autoplay: {
         delay: 3500,
         disableOnInteraction: false,
      },
    pagination: {
         el: '.head_bn_slider .swiper-pagination',
         clickable: true,
      }
  });
}


// button
$(".sys_btn_wave").mouseenter(function(e) {
  var parentOffset = $(this).offset();
  var relX = e.pageX - parentOffset.left;
  var relY = e.pageY - parentOffset.top;
  $(this).find(".btn_wave_circle").css({ "left": relX, "top": relY });
  $(this).find(".btn_wave_circle").removeClass("desplode-circle");
  $(this).find(".btn_wave_circle").addClass("explode-circle");
});
$(".sys_btn_wave").mouseleave(function(e) {
  var parentOffset = $(this).offset();
  var relX = e.pageX - parentOffset.left;
  var relY = e.pageY - parentOffset.top;
  $(this).find(".btn_wave_circle").css({ "left": relX, "top": relY });
  $(this).find(".btn_wave_circle").removeClass("explode-circle");
  $(this).find(".btn_wave_circle").addClass("desplode-circle");
});
// $('.item_num').countUp();
 


addCurrent('.promote_items','.promote_item',0) 
addCurrent('.service_items','.service_item',1) 

function addCurrent(itmes,item,num){
  $(item).eq(num).addClass('active')
  $(item).each(function(){
    $(this).hover(function(){
      $(this).addClass('active');
      $(this).siblings(item).removeClass('active')
    })
  })
}

FWDU3DCarUtils.checkIfHasTransforms();
                    
                    window.fwdu3dcar0 = new FWDUltimate3DCarousel(
                    {carouselHolderDivId:'fwdu3dcarDiv0',
                        carouselDataListDivId:'fwdu3dcarPlaylist0',displayType:'responsive',
                        autoScale:'yes',
                        carouselWidth:1200,
                        carouselHeight:600,
                        skinPath:'images',
                        backgroundColor:'transparent',
                        backgroundImagePath:'',
                        thumbnailsBackgroundImagePath:'',
                        scrollbarBackgroundImagePath:'images/scrollbarBackground.jpg',
                        backgroundRepeat:'repeat-x',
                        carouselTopology:'star',
                        carouselXRadius:700,
                        carouselYRadius:0,
                        carouselXRotation:8,
                        carouselYOffset:10,
                        showCenterImage:'no',
                        centerImagePath:'',
                        centerImageYOffset:0,
                        showDisplay2DAlways:'no',
                        carouselStartPosition:'center',
                        autoplay:'yes',
                        slideshowDelay:3000,
                        rightClickContextMenu:'default',
                        addKeyboardSupport:'yes', 
                        fluidWidthZIndex:1000,thumbnailWidth:304,
                        thumbnailHeight:400,
                        thumbnailBorderSize:0,
                        thumbnailMinimumAlpha:0.1,		
                        thumbnailBackgroundColor:'transparent',
                        thumbnailBorderColor1:'transparent',
                        thumbnailBorderColor2:'transparent',
                        transparentImages:'no',
                        maxNumberOfThumbnailsOnMobile:13,
                        showThumbnailsGradient:'yes',
                        showThumbnailsHtmlContent:'no',
                        showText:'yes',
                        textBackgroundColor:'transparent',
                        textBackgroundOpacity:0.7,
                        showTextBackgroundImage:'no',
                        showFullTextWithoutHover:'no',
                        showThumbnailBoxShadow:'no',
                        thumbnailBoxShadowCss:'0px 2px 2px #555555',
                        showReflection:'yes',
                        reflectionHeight:60,
                        reflectionDistance:0,
                        reflectionOpacity:0.2,controlsMaxWidth:940,
                        controlsHeight:31,
                        controlsPosition:'bottom',
                        showPrevButton:'no',
                        showNextButton:'no',
                        disableNextAndPrevButtonsOnMobile:'no',
                        showSlideshowButton:'no',
                        slideshowTimerColor:'#777777',
                        showScrollbar:'no',
                        scrollbarHandlerWidth:300,
                        scrollbarTextColorNormal:'#777777',
                        scrollbarTextColorSelected:'#000000',
                        disableScrollbarOnMobile:'yes',
                        enableMouseWheelScroll:'yes',showComboBox:'no',
                        startAtCategory:1,
                        selectLabel:'SELECT CATEGORIES',
                        allCategoriesLabel:'All Categories',
                        showAllCategories:'no',
                        comboBoxPosition:'topright',
                        selectorBackgroundNormalColor1:'#fcfdfd',
                        selectorBackgroundNormalColor2:'#e4e4e4',
                        selectorBackgroundSelectedColor1:'#a7a7a7',
                        selectorBackgroundSelectedColor2:'#8e8e8e',
                        selectorTextNormalColor:'#8b8b8b',
                        selectorTextSelectedColor:'#ffffff',
                        buttonBackgroundNormalColor1:'#e7e7e7',
                        buttonBackgroundNormalColor2:'#e7e7e7',
                        buttonBackgroundSelectedColor1:'#a7a7a7',
                        buttonBackgroundSelectedColor2:'#8e8e8e',
                        buttonTextNormalColor:'#000000',
                        buttonTextSelectedColor:'#ffffff',
                        comboBoxShadowColor:'#000000',
                        comboBoxHorizontalMargins:12,
                        comboBoxVerticalMargins:12,
                        comboBoxCornerRadius:0,addLightBoxKeyboardSupport:'yes',
                        showLightBoxNextAndPrevButtons:'yes',
                        showLightBoxZoomButton:'yes',
                        showLightBoxInfoButton:'yes',
                        showLightBoxSlideShowButton:'yes',
                        showLightBoxInfoWindowByDefault:'no',
                        slideShowAutoPlay:'no',
                        lightBoxVideoAutoPlay:'no',
                        lightBoxVideoWidth:640,
                        lightBoxVideoHeight:480,
                        lightBoxIframeWidth:800,
                        lightBoxIframeHeight:600,
                        lightBoxBackgroundColor:'#000000',
                        lightBoxInfoWindowBackgroundColor:'#ffffff',
                        lightBoxItemBorderColor1:'#fcfdfd',
                        lightBoxItemBorderColor2:'#e4e4e4',
                        lightBoxItemBackgroundColor:'#333333',
                        lightBoxMainBackgroundOpacity:0.8,
                        lightBoxInfoWindowBackgroundOpacity:0.9,
                        lightBoxBorderSize:5,
                        lightBoxBorderRadius:0,
                        lightBoxSlideShowDelay:4000
                    });
 var swiper = new Swiper(".news_slider", {
        slidesPerView: 3,
        spaceBetween: 30,
       navigation: {
        nextEl: '.index_zz .swiper-button-next',
        prevEl: '.index_zz .swiper-button-prev',
      },
         breakpoints: {
       1280: {
        slidesPerView: 3,
        slidesPerGroup:3,
       },
       768: {
         slidesPerView: 2,
         slidesPerGroup:2,
         speed: 400,
       },
       480: {
         slidesPerView: 1,
         slidesPerGroup:1,
         speed: 400,
       },
      }
      });   
      
      
      
      
     var swiper = new Swiper(".swiper-container-wrap .certificate_slider", {
        slidesPerView: 3,
        spaceBetween: 30,
       navigation: {
        nextEl: '.swiper-container-wrap .swiper-button-next',
        prevEl: '.swiper-container-wrap .swiper-button-prev',
      },
         breakpoints: {
       1280: {
        slidesPerView: 3,
       },
       768: {
         slidesPerView: 2,
   
       },
       480: {
         slidesPerView: 1,
    
       },
      }
      });   
         
         
         
         
 var list = $('.swiper-container-wrap');
list.each(function (index) {
new Swiper ($(this).find('.certificate_slider_huhu1'), {
    slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 1,
       navigation: {
        nextEl:$(this).find('.swiper-button-next'),
        prevEl: $(this).find('.swiper-button-prev'),
      },
         breakpoints: {
       1280: {
        slidesPerView: 3,
       },
       768: {
         slidesPerView: 2,
   
       },
       480: {
         slidesPerView: 1,
    
       },
      }
});
});

 var list = $('.swiper-container-wrap');
list.each(function (index) {
new Swiper ($(this).find('.certificate_slider_huhu2'), {
    slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 1,
      navigation: {
        nextEl:$(this).find('.swiper-button-next'),
        prevEl: $(this).find('.swiper-button-prev'),
      },
         breakpoints: {
      1280: {
        slidesPerView: 3,
      },
      768: {
         slidesPerView: 2,
   
      },
      480: {
         slidesPerView: 1,
    
      },
      }
});
});

 var list = $('.swiper-container-wrap');
list.each(function (index) {
new Swiper ($(this).find('.certificate_slider_huhu3'), {
    slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 1,
      navigation: {
        nextEl:$(this).find('.swiper-button-next'),
        prevEl: $(this).find('.swiper-button-prev'),
      },
         breakpoints: {
      1280: {
        slidesPerView: 3,
      },
      768: {
         slidesPerView: 2,
   
      },
      480: {
         slidesPerView: 1,
    
      },
      }
});
});