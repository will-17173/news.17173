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
		    element: '#play_list',
		    template: '#listview_template',
		    dataUrl: '/d.json',
		    queryParams: '[{"channelCode":"' + channelCode + '","newsKind":"' + newsKind + '"}]',
		    more: '.btn-more',
		    callback: function(){
		        var commentInfo2 = new CommentInfo({
				    commentItem: '#play_list .js-comment-item2',
				    commentType: 2
				});
		    	commentInfo2.init();
		    	$('#play_list .js-comment-item2').removeClass('js-comment-item2');
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





