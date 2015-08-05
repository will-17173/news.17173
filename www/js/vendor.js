//黄果树列表， 依赖jQuery, doT.js和spin.js

//<script src="http://ue.17173cdn.com/a/lib/doT.min.js"></script>
//<script src="http://ue.17173cdn.com/a/news/final/2014/m/js/spin.min.js"></script>

// <script type="text/x-dot-template" id="listview_template">
//     {{ for(var i = 0; i < it.length; i++){ }}
//     <li class="item">
//         <a href="{{=it[i].newsUrl}}">
//             <div class="pic">
//                 <img src="{{=it[i].newsPic}}" alt="" />
//             </div>
//             <div class="text">
//                 <p class="qs">第<span></span>期</p>
//                 <h3 class="tit">{{=it[i].newsTitle}}</h3>
//             </div>
//         </a>
//     </li>
//     {{ } }}
// </script>

// new Listview({
//     element: '.zt-list',
//     template: '#listview_template',
//     dataUrl: '/d.json',
//     queryParams: '[{"channelCode":10009,"newsKind":"256791"}]',
//     more: '.btn-more',
//     callback: function(){
//         $('.zt-list li').each(function(i,el){
//             $(this).find('.qs span').text(++i);
//         })
//     }
// })
function Listview(options) {
    var self = this;
    self.defaults = {
        element: '', //\u63d2\u5165\u7684\u5730\u65b9
        template: '', //DOT\u6a21\u677f
        more: '', // \u52a0\u8f7d\u66f4\u591a
        page: 1, 
        queryParams: '',
        dataUrl: '',
        showLoading: true,
        pageSize: 10
    }
    self.options = $.extend({}, self.defaults, options);
    self.bindEvents();
    $(self.options.more).hide();
    self.getData();
}
Listview.prototype.bindEvents = function(){
    var self = this;
    $(self.options.more).click(function(){
        if($(self.options.more).text() === '\u70b9\u51fb\u52a0\u8f7d\u66f4\u591a'){
            self.getData();
        }
    })
}

Listview.prototype.getData = function() {
    var self = this;
    $.ajax({
        url: self.options.dataUrl,
        dataType: 'json',
        data: {
            page: self.options.page,
            queryParams: self.options.queryParams
        },
        beforeSend: function(){
            if(self.options.showLoading) self.loading();
        },
        success: function(data){
            if(data.status == 1){

                self.loadComplete();

                self.totalCount = data.totalCount;

                if(self.totalCount > self.options.pageSize * self.options.page){
                    $(self.options.more).show();
                } else{
                    $(self.options.more).hide();
                }

                self.options.page++;
                self.render(data);
                if(typeof self.options.callback === 'function'){
                    self.options.callback.call(self);
                }
                
            } else{
                console.log('error');
            }
        }
    })
}
Listview.prototype.render = function(data) {
    var self = this;
    var text = doT.template($(self.options.template).text());
    $(self.options.element).append(text(data.data));
}
Listview.prototype.loading = function(){
    var self = this;
    if(self.options.page == 1){
        var target = $('body')[0];
        new Spinner().spin(target);
    } else{
        $(self.options.more).text('\u52a0\u8f7d\u4e2d')
    }

}
Listview.prototype.loadComplete = function(){
    var self = this;
    $('.spinner').remove();
    $(self.options.more).text('\u70b9\u51fb\u52a0\u8f7d\u66f4\u591a');
}