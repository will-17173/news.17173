var app={init:function(){this.swiper(),this.gotop(),this.getList()},bindEvents:function(){FastClick.attach(document.body),$(".btn-gotop").click(function(){$(document).scrollTop(0)}),$(window).scroll(function(){app.gotop()})},getList:function(){new Listview({element:".list-news",template:"#listview_template",dataUrl:"/d.json",queryParams:'[{"channelCode":10009,"newsKind":"256791"}]',more:".btn-more",callback:function(){var t=new CommentInfo({commentItem:".js-comment-item2",commentType:2});t.init(),$(".js-comment-item2").removeClass("js-comment-item2")}})},swiper:function(){$("#swiper_focus").swiper({autoplay:4e3,mode:"horizontal",loop:!0,calculateHeight:!0,pagination:".slide-nav1"})},gotop:function(){var t=$(window).scrollTop(),e=$(".header").height();t>e?$(".btn-gotop").fadeIn():$(".btn-gotop").fadeOut()}};app.init();