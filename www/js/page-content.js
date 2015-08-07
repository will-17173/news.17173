


    pandora.use(['share'], function(Share) {
        new Share({
            element: '.share-box',
            shareList: 'tsina,tqq,qzone,',
            showLabel: false,
            importStyle: false
        });
    });
    $('.gb-final-js-rank li').each(function(i) {
        if (i < 3) {
            $(this).addClass('gb-final-top');
        }
        $(this).find('.num').text(++i);
    });

    (function() {
        var appid = 'cyqvqDTV5';
        var conf = 'prod_303ed4c69846ab36c2904d3ba8573050';
        var doc = document,
            s = doc.createElement('script');
        s.id = 'changyan_mobile_js';
        h = doc.getElementsByTagName('head')[0] || doc.head || doc.documentElement;
        s.type = 'text/javascript';
        s.charset = 'utf-8';
        s.src = 'http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf;
        h.insertBefore(s, h.firstChild);
    })();


    function wxReady(){
        wx.ready(function(){
            var shareTitle = document.title,
            shareLink = location.href,
            shareImgUrl = '',
            shareDesc = location.href;

            if($('.art-bd-html img').length){
                var src = $('.art-bd-html img:eq(0)').attr('src');
                if(src == 'http://ue.17173cdn.com/a/news/final/2014/m/img/placeholder.png' || src.split('.').pop() == 'gif'){
                    shareImgUrl = 'http://ue.17173cdn.com/a/news/final/2014/m/img/logo-square.png';
                } else{
                    shareImgUrl = src;
                }
            } else{
                shareImgUrl = 'http://ue.17173cdn.com/a/news/final/2014/m/img/logo-square.png';
            }

            wx.onMenuShareTimeline({
                title: shareTitle, 
                link: shareLink, 
                imgUrl: shareImgUrl, 
                success: function () { 

                },
                cancel: function () { 
                }
            });
            wx.onMenuShareAppMessage({
                title: shareTitle, 
                link: shareLink, 
                imgUrl: shareImgUrl, 
                desc: shareDesc,
                success: function () { 
                },
                cancel: function () { 
                }
            });
            wx.onMenuShareQQ({
                title: shareTitle, 
                link: shareLink, 
                imgUrl: shareImgUrl, 
                desc: shareDesc,
                success: function () { 
                },
                cancel: function () { 
                }
            });
        });
    }

    // 微信分享
    $.getJSON('http://act.17173.com/weixin/index.php?do=weixin&url=' + encodeURIComponent(location.href.split('#')[0]) + '&callback=?',function(data){
        var wxConfig = data;
        wxConfig.debug = false;
        wxConfig.jsApiList = [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'uploadImage',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'getNetworkType',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow'
        ];
        wx.config(wxConfig);
        wxReady();
    });

//GIF图片处理
$('.art-bd-html img[data-src]').each(function(i, el) {
    var $this = $(this);
    var src = $this.data('src');
    $this.parent('a').attr('href', 'javascript:;');
    $this.on('click', function() {
        $this.attr('src', 'http://ue.17173cdn.com/images/lib/v2/loading-white-16x16.gif');
        var img = new Image();
        img.src = src;
        img.onload = function() {
            $this.attr('src', src);
        };
    });
});

var picArr = {data: []};
function generateGallery() {
    var $img = $('.art-bd-html img').not('[data-src]').not('[data-navigation=true] img'); //排除GIF图片和导航里的图片
    for (var i = 0; i < $img.length; i++) {
        $img.eq(i).parent('a').attr('href', 'javascript:;');
        var temp = {
            img: $img.eq(i).attr('src'),
            content: $img.eq(i).next('span').text()
        };
        picArr.data.push(temp);
    }
}
generateGallery();

// 处理面包屑
if (!_config.type) {
    $('.type-name').hide().next('.sep').hide();
} else {
    if(_config.kind == '258456'){ //大B神单独设置面包屑
        $('.type-name').text(_config.type).attr('href', 'http://news.17173.com/m/dbs.shtml');
    } else{
        $('.type-name').text(_config.type).
        attr('href', '/list.html?type=' + encodeURI(_config.type) + '&kind=' + _config.kind);
    }
}

// 表格处理 
$('.art-bd-html table').each(function() {
    if ($(this).attr('width') > 300) {
        $(this).attr('width', '100%');
    }
});

//处理导航[data-navigation=true]内的链接，如果是本篇文章则删除链接
$('.art-bd-html [data-navigation=true] a').each(function(){
    var href = $(this).attr('href');
    if(href.indexOf('http://news.17173.com') > -1 && href.split('.')[2].split('/')[3].split('_')[0] == location.href.split('.')[2].split('/')[3].split('_')[0]){
        $(this).attr('href', 'javascript:;');
    }
})

            // 生成图集
            $('.art-bd-html img').not('[data-src]').not('[data-navigation=true] img').each(function(i, el) { 
                var $this = $(this);
                $this.on('click', function() {
                    if (!onArticleShow.picArr) {
                        return false;
                    }
                    var positionY = $(document).scrollTop();
                    $('#page_article').hide();
                    $('#page_gallery').show();
                    $('.gallery-back').one('click', function() {
                        $('#page_article').show();
                        $('#page_gallery').hide();
                        $(document).scrollTop(positionY);
                    });
                    var template = Handlebars.compile($('#tmpl-gallery').html()),
                        html = template(onArticleShow.picArr);
                    $('.swiper-wrapper').html(html);
                    var len = $('.swiper-wrapper li').length;
                    $('.swiper-wrapper li').css({
                        width: $(window).width() + 'px'
                    });
                    $('.swiper-wrapper li').each(function(i, el) {
                        var $this = $(this);
                        $this.find('i:eq(0)').text(++i);
                        $this.find('i:eq(1)').text(len);
                    });

                    function SlidePhoto() {
                        return new Slide($('#slideshow .gallery')[0], {
                            loop: false,
                            onInit: function() {
                                $(this.slider).css({
                                    '-webkit-transform': 'translate3d(0px, 0px, 0px)',
                                    '-webkit-transition': '0.2s'
                                });
                            },
                            onTouchEnd: function(e, cp, prep) {
                                var ori = $('.gallery-avatar:eq(' + cp + ') img').attr('src').split('!a')[0];
                                $('.view-pic').attr('href', ori);
                            }
                        });
                    }
                    var slideshow = new SlidePhoto();
                    slideshow.slideToPage(i);
                    $(document).scrollTop(0);
                    var originalPic = $('.gallery-avatar:eq(' + i + ') img').attr('src').split('!a')[0].replace(/(.*)([s]{1})(\.[a-z]*$)/i, '$1$3');
                    $('.view-pic').attr('href', originalPic);
                });
            });


