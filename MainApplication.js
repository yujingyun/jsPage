/**
 * Created by yjy on 16/2/22.
 */


{
    var TAB_ONE_PAGE = $.classExtends(Page, {
        pageName: 'TAB_ONE_PAGE',

        onCreate: function (view) {
            if (iPageUserDEBUG) console.log('TAB_ONE_PAGE onCreate user');
            $('<div></div>').html("J").css('text-align', 'center')
                .css('margin-top', '100px').css('font-size', '100px')
                .data('_page', this).click(function (_event, _data) {
                var intent = new Intent({scrollEnable: true, _headerTitel: '新页面'});
                intent.setClass($(this).data('_page'), TAB_NEW_PAGE);
                $(this).data('_page').startPage(intent);
            }).appendTo($(view));

        },
        onResume: function (view) {
            if (iPageUserDEBUG) console.log('TAB_ONE_PAGE onResume user');
        },
        onSRefresh: function (view) {
            TAB_ONE_PAGE.prototype.sRefresh();
            $.notie_info("刷新成功");
        },
        onSMore: function (view) {
            TAB_ONE_PAGE.prototype.sRefresh();
            $.notie_info("加载成功");
        }
    });
}


{
    var TAB_TWO_PAGE = $.classExtends(Page, {
        pageName: 'TAB_TWO_PAGE',

        onCreate: function (view) {
            if (iPageUserDEBUG) console.log('TAB_TWO_PAGE onCreate user');
            $('<div></div>').html("L").css('text-align', 'center')
                .css('margin-top', '100px').css('font-size', '100px')
                .data('_page', this).click(function (_event, _data) {
                var intent = new Intent({scrollEnable: true, _headerTitel: '新页面'});
                intent.setClass($(this).data('_page'), TAB_NEW_PAGE);
                $(this).data('_page').startPage(intent);
            }).appendTo($(view));

        },
        onResume: function (view) {
            if (iPageUserDEBUG) console.log('TAB_TWO_PAGE onResume user');
        },
        onSRefresh: function (view) {
            TAB_TWO_PAGE.prototype.sRefresh();
            $.notie_info("刷新成功");
        },
        onSMore: function (view) {
            TAB_TWO_PAGE.prototype.sRefresh();
            $.notie_info("加载成功");
        }
    });
}

{
    var TAB_THREE_PAGE = $.classExtends(Page, {
        pageName: 'TAB_THREE_PAGE',

        onCreate: function (view) {
            if (iPageUserDEBUG) console.log('TAB_THREE_PAGE onCreate user');

            $('<div></div>').html("P").css('text-align', 'center')
                .css('margin-top', '100px').css('font-size', '100px')
                .data('_page', this).click(function (_event, _data) {
                var intent = new Intent({scrollEnable: true, _headerTitel: '新页面'});
                intent.setClass($(this).data('_page'), TAB_NEW_PAGE);
                $(this).data('_page').startPage(intent);
            }).appendTo($(view));
        },
        onResume: function (view) {
            if (iPageUserDEBUG) console.log('TAB_THREE_PAGE onResume user');
        },
        onSRefresh: function (view) {
            TAB_THREE_PAGE.prototype.sRefresh();
            $.notie_info("刷新成功");
        },
        onSMore: function (view) {
            TAB_THREE_PAGE.prototype.sRefresh();
            $.notie_info("加载成功");
        }
    });
}

{
    var TAB_FOUR_PAGE = $.classExtends(Page, {
        pageName: 'TAB_FOUR_PAGE',

        onCreate: function (view) {
            if (iPageUserDEBUG) console.log('TAB_FOUR_PAGE onCreate user');
            $('<div></div>').html("Y").css('text-align', 'center')
                .css('margin-top', '100px').css('font-size', '100px')
                .data('_page', this).click(function (_event, _data) {
                var intent = new Intent({scrollEnable: true, _headerTitel: '新页面'});
                intent.setClass($(this).data('_page'), TAB_NEW_PAGE);
                $(this).data('_page').startPage(intent);
            }).appendTo($(view));

        },
        onResume: function (view) {
            if (iPageUserDEBUG) console.log('TAB_FOUR_PAGE onResume user');
        },
        onSRefresh: function (view) {
            TAB_FOUR_PAGE.prototype.sRefresh();
            $.notie_info("刷新成功");
        },
        onSMore: function (view) {
            TAB_FOUR_PAGE.prototype.sRefresh();
            $.notie_info("加载成功");
        }
    });
}


{
    var TAB_FIVE_PAGE = $.classExtends(Page, {
        pageName: 'TAB_FIVE_PAGE',

        onCreate: function (view) {
            if (iPageUserDEBUG) console.log('TAB_FIVE_PAGE onCreate user');
            $('<div></div>').html("点我").css('text-align', 'center')
                .css('margin-top', '100px').css('font-size', '100px')
                .data('_page', this).click(function (_event, _data) {
                var intent = new Intent({scrollEnable: true, _headerTitel: '新页面'});
                intent.setClass($(this).data('_page'), TAB_NEW_PAGE);
                $(this).data('_page').startPage(intent);
            }).appendTo($(view));

        },
        onResume: function (view) {
            if (iPageUserDEBUG) console.log('TAB_FIVE_PAGE onResume user');
        },
        onSRefresh: function (view) {
            TAB_FIVE_PAGE.prototype.sRefresh();
            $.notie_info("刷新成功");
        },
        onSMore: function (view) {
            TAB_FIVE_PAGE.prototype.sRefresh();
            $.notie_info("加载成功");
        }
    });
}
{
    var TAB_NEW_PAGE = $.classExtends(Page, {
        pageName: 'TAB_NEW_PAGE',

        onCreate: function (view) {
            if (iPageUserDEBUG) console.log('TAB_NEW_PAGE onCreate user');
            $('<div></div>').html("下拉刷新,上拉加载更多").css('text-align', 'center')
                .css('padding-top', '50px').css('font-size', '20px')
                .appendTo($(view));

            this.userData.hasMoreData = true;

        },
        onResume: function (view) {
            if (iPageUserDEBUG) console.log('TAB_FIVE_PAGE onResume user');
        },
        onSRefresh: function (view) {
            TAB_NEW_PAGE.prototype.sRefresh();
            $.notie_info("刷新成功");
        },
        onSMore: function (view) {
            TAB_NEW_PAGE.prototype.sRefresh();
            $.notie_info("加载成功");
        }
    });
}