'use strict';

var app = {
    init: function() {
        this.gotop();
        this.getList();
        this.bindEvents();
    },
    bindEvents: function() {
        FastClick.attach(document.body);
        $('.btn-gotop').click(function() {
            $(document).scrollTop(0);
        });
        $(window).scroll(function() {
            app.gotop();
        });
    },
    getList: function() {
        var channelCode = app.urlParams()['channelCode'],
            newsKind = app.urlParams()['newsKind'],
            kindName = app.urlParams()['kind'];
        $('#play_list').text(kindName);

        new Listview({
            element: '#player_news',
            template: '#listview_template',
            dataUrl: '/d.json',
            queryParams: '[{"channelCode":"' + channelCode + '","newsKind":"' + newsKind + '"}]',
            more: '#player_news .btn-more',
            callback: function() {
                var commentInfo2 = new CommentInfo({
                    commentItem: '#player_news .js-comment-item2',
                    commentType: 2
                });
                commentInfo2.init();
                $('#player_news .js-comment-item2').removeClass('js-comment-item2');
            }
        });
    },

    gotop: function() {
        var y = $(window).scrollTop(),
            header = $('.header').height();

        if (y > header) {
            $('.btn-gotop').fadeIn();
        } else {
            $('.btn-gotop').fadeOut();
        }
    },
    queryToJson: function(str, sep, eq) {
        var ret = {},
            decode = decodeURIComponent;
        sep || (sep = '&');
        eq || (eq = '=');
        str.split(sep).forEach(function(pair) {
            var key, val;
            pair = pair.split(eq);
            key = decode(pair[0]).replace(/\[\]$/g, '');
            try {
                val = decode(pair[1] || '');
            } catch (e) {
                console.log(e + 'decodeURIComponent error : ' + pair[1], 'error');
                val = pair[1] || '';
            }
            val = val.trim();
            if (ret.hasOwnProperty(key)) {
                if (Array.isArray(ret[key])) {
                    ret[key].push(val);
                } else {
                    ret[key] = [ret[key], val];
                }
            } else {
                ret[key] = val;
            }
        });
        return ret;
    },

    urlParams: function() {
        return this.queryToJson(window.location.search.replace(/^\?/, ''));
    },
};

app.init();
