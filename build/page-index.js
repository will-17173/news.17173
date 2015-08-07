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

		new Listview({
		    element: '.list-news',
		    template: '#listview_template',
		    dataUrl: '/d.json',
		    queryParams: '[{"channelCode":10009,"newsKind":"256791"}]',
		    more: '.btn-more',
		    callback: function(){
		        var commentInfo2 = new CommentInfo({
				    commentItem: '.js-comment-item2',
				    commentType: 2
				});
		    	commentInfo2.init();
		    	$('.js-comment-item2').removeClass('js-comment-item2');
		    }
		});
	},
	swiper: function(){
		$('#swiper_focus').swiper({
			autoplay:4000,
			mode:'horizontal',
			loop: true,
			calculateHeight: true,
			pagination: '.slide-nav1'
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





