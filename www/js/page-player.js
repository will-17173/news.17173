'use strict';

var app = {
	init: function(){
		this.swiper();
		this.gotop();
		this.getList();
		this.bindEvents();
	},
	bindEvents: function(){
		FastClick.attach(document.body);
		$('.btn-gotop').click(function(){
			$(document).scrollTop(0);
		});
		$(window).scroll(function(){
			app.gotop();
		});
	},
	getList: function(){
		var channelCode = $('#play_list').attr('data-channelCode'),
			newsKind = $('#play_list').attr('data-newsKind');

		new Listview({
		    element: '#player_news',
		    template: '#listview_template',
		    dataUrl: '/d.json',
		    queryParams: '[{"channelCode":"' + channelCode + '","newsKind":"' + newsKind + '"}]',
		    more: '#player_news .btn-more',
		    callback: function(){
		        var commentInfo2 = new CommentInfo({
				    commentItem: '#player_news .js-comment-item2',
				    commentType: 2
				});
		    	commentInfo2.init();
		    	$('#player_news .js-comment-item2').removeClass('js-comment-item2');
		    }
		});
	},
	swiper: function(){
		app.initChannel();

		$('#swiper_focus').swiper({
			autoplay:4000,
			mode:'horizontal',
			loop: true,
			calculateHeight: true,
			pagination: '.slide-nav1'
		});

		var channelSwiper = new Swiper('.swiper-channel',{
			freeMode : true,
			slidesPerView : 'auto'
		});
		var channelContent = new Swiper('#player_swiper', {
			onSlideChangeEnd: function(swiper){
				var i = swiper.activeIndex;
				$('#player_tab .swiper-slide').eq(i).addClass('active').siblings().removeClass('active');
				channelSwiper.slideTo(i);
			}
		});
		$('#player_tab .swiper-slide:eq(0)').addClass('active');
		$('#player_tab .swiper-slide a').click(function(){
			var $this = $(this),
				$slide = $this.parent();
			if($slide.hasClass('active')){
				return;
			}
			$slide.addClass('active').siblings().removeClass('active');
			channelContent.slideTo($slide.index(), 300, false);
		});
	},
	initChannel:function(){

		var $tab = $('#player_tab .swiper-slide');
		for(var i = 0; i < $tab.length; i++){
			var channel = $tab.eq(i).find('a').text();
			$('<div class="swiper-slide"><ul class="list-news list-news-ex"></ul><a href="javascript:;" class="btn-more-ex">更多' + channel + '</a></div>').appendTo('#player_swiper .swiper-wrapper');
		}
		$tab.each(function(i){
			var $this = $(this),
				channelCode = $this.find('a').attr('data-channelCode'),
				newsKind = $this.find('a').attr('data-newsKind');

			new Listview({
			    element: '#player_swiper .list-news:eq(' + i + ')',
			    template: '#listview_template',
			    dataUrl: '/dd.json',
			    showLoading: false,
			    queryParams: '[{"channelCode":"' + channelCode + '","newsKind":"' + newsKind + '"}]',
			    more: '.btn-more', //TODO
			    callback: function(){
			        var commentInfo2 = new CommentInfo({
					    commentItem: '.js-comment-item2',
					    commentType: 2
					});
			    	commentInfo2.init();
			    	$('.js-comment-item2').removeClass('js-comment-item2');
			    }
			});
		});
	},
	gotop: function(){
		var y = $(window).scrollTop(),
			header = $('.header').height();

		if(y > header){
			$('.btn-gotop').fadeIn();
		}else{
			$('.btn-gotop').fadeOut();
		}
	}
};

app.init();





