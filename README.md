# jsPage
将微网页实现为手机app体验
1.依赖的js插件：jquery jquery.mobile iscroll
2.主要类：Page TabPage Intent  Api 


使用示例:开启一个新页面


var intent = new Intent({scrollEnable: true, _headerTitel: '新页面'});
                intent.setClass($(this).data('_page'), TAB_NEW_PAGE);
                $(this).data('_page').startPage(intent);
