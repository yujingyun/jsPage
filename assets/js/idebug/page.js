/**
 * Created by yjy on 16/2/20.
 */
//html元素原型
var divP = $('<div></div>');
var liP = $('<li></li>');
var aP = $('<a></a>');
var imgP = $('<img>');
var ulP = $('<ul></ul>');
var spanP = $('<span></span>');

var iPageDEBUG = false;
var iPageUserDEBUG = false;
var iPageFinishDEBUG = false;
var iScrollDEBUG = false;
var iScrollUserDEBUG = false;
var ajaxUserDEBUG = false;
var viewchangeDEBUG = false;
var ILoaderDEBUG = false;

var pageHashTable = new HashTable();
var JSROOTDIRECTORY = 'assets/js/idebug/';


var OFFSET = 5;
var page = 1;
var myScroll,
    pullDownEl,
    pullUpEl;

var maxScrollY = 0;
var tabLastIndex = null;
var tabHomeRedirection = false;

$(function () {
    window.setTimeout(function tect() {

        var tabPage = new TabPage();
        var tabHost = new TabHost();
        tabHost.addTab(new TabSpec({
            text: 'one',
            imgOn: 'assets/img/navigation/tabbar_home_o.png',
            imgOff: 'assets/img/navigation/tabbar_home_n.png',
            colorOn: '#0F9854', //
            colorOff: '#797979',
            pageClass: 'TAB_ONE_PAGE'
        }));

        tabHost.addTab(new TabSpec({
            text: 'two',
            imgOn: 'assets/img/navigation/tabbar_event_o.png',
            imgOff: 'assets/img/navigation/tabbar_event_n.png',
            colorOn: '#0F9854',
            colorOff: '#797979',
            pageClass: 'TAB_TWO_PAGE'
        }));

        tabHost.addTab(new TabSpec({
            text: 'three',
            imgOn: 'assets/img/navigation/tabbar_sort_o.png',
            imgOff: 'assets/img/navigation/tabbar_sort_n.png',
            colorOn: '#0F9854',
            colorOff: '#797979',
            pageClass: 'TAB_THREE_PAGE'
        }));


        tabHost.addTab(new TabSpec({
            text: 'four',
            imgOn: 'assets/img/navigation/tabbar_cart_o.png',
            imgOff: 'assets/img/navigation/tabbar_cart_n.png',
            colorOn: '#0F9854',
            colorOff: '#797979',
            pageClass: 'TAB_FOUR_PAGE'
        }));

        tabHost.addTab(new TabSpec({
            text: 'five',
            imgOn: 'assets/img/navigation/tabbar_user_o.png',
            imgOff: 'assets/img/navigation/tabbar_user_n.png',
            colorOn: '#0F9854',
            colorOff: '#797979',
            pageClass: 'TAB_FIVE_PAGE'
        }));

        tabPage.setTabHost(tabHost).startPage();

    }, 100);
});


function _CNP(_page, _tabpage) {
    var _intent = _GI(_page);
    var _newPage = $('<div></div>').attr('id', hashcode(_page.pageName))
        .attr('data-role', 'page');
    if (_intent._header) {
        var _header = $('<div></div>').attr('id', 'header').attr('data-role', 'header')
            .attr('data-position', 'fixed').attr('data-theme', _intent._theme);
        $('<h1></h1>').html(_intent._headerTitel).appendTo($(_header));
        $(_header).appendTo($(_newPage));
        if (_intent.changeHash) {
            $(_newPage).attr('data-add-back-btn', true).attr('data-back-btn-text', _intent._backBtnText);
        }
    }
    var view = $('<div></div>').attr('data-role', 'content').appendTo($(_newPage)).css('padding', '0px');

    var _Scroll = _CNPUF(_page, _intent, view);

    _page.navBar = _Scroll._navBar;
    _page.viewWarper = _Scroll._sw;
    _page.view = _Scroll._sudw;
    _page.scroller = _Scroll._s;
    _page.viewContent = view;


    if (_intent._tabSubPage) {
        _CNBN(_page, _tabpage, _newPage);
    }

    $(_newPage).appendTo($('body'));

    // _page.onCreate(_Scroll._sudw);
    var eventData = {_page: _page, _view: _Scroll._sudw, _intent: _intent};
    $(document).on("pagecreate", '#' + hashcode(_page.pageName), eventData, function (_event, _data) {
        if (iPageDEBUG)console.log(_event.data._page.pageName + ' pagecreate sys');

        var eventData = {_page: _event.data._page};
        $(_event.data._view).bind('VIEWCHANGE', eventData, function (_event) {
            if (myScroll) {
                myScroll.refresh();
                maxScrollY = myScroll.maxScrollY;
            }
        });
        _event.data._page.onCreate(_event.data._view);
    });


    $(document).on("pageshow", '#' + hashcode(_page.pageName), eventData, function (_event, _data) {
        if (iPageDEBUG)console.log(_event.data._page.pageName + ' pageshow sys');
        myScroll = null;
        var _intent = _GI(_event.data._page);
        if (!_intent._pure) {
            _ISV(_event.data._page, _event.data._view, _intent);
        }
        _event.data._page.onResume(_event.data._view);

        /////////////tab首页重定向//////////////

        if (_page.pageName == 'TAB_HOME_PAGE' && tabLastIndex != null && tabLastIndex != 'TAB_HOME_PAGE' && tabHomeRedirection) {
            $.mobile.changePage('#' + hashcode(tabLastIndex), {changeHash: false});
        }

        if (_event.data._intent._tabSubPage) {
            tabHomeRedirection = false;
        } else {
            tabHomeRedirection = true;
        }

    });
    $(document).on("pagehide", '#' + hashcode(_page.pageName), eventData, function (_event, _data) {
        //if (iPageFinishDEBUG)console.log(_event.data._page.pageName + ' pagehide sys');
        if (!_GI(_event.data._page))return;
        if (((_GI(_event.data._page))._tabSubPage))return;
        if (!(_GI(_event.data._page))._forward) {
            _event.data._page.remove();
            if (iPageFinishDEBUG)console.log(_event.data._page.pageName + ' removed sys');
            return;
        }
        if (!_GI((_GI(_event.data._page))._forward)) {
            _event.data._page.remove();
            if (iPageFinishDEBUG)console.log(_event.data._page.pageName + ' removed sys');
        }
    });
    $(document).on("pagebeforehide", '#' + hashcode(_page.pageName), eventData, function (_event, _data) {
        if (_event.data._intent._tabSubPage) {
            tabLastIndex = _event.data._page.pageName;
        }
    });
}

function _CNBN(_page, _tabpage, _newPage) {
    if (_page.pageName == _tabpage.tabHost.tablist.get(0).pageClass) {
        $(_newPage).removeAttr('data-add-back-btn');
    }
    var _footer = $('<div></div>').attr('id', 'footer')
        .attr('data-position', 'fixed').css('background', 'none');
    var _BG = $('<div></div>').addClass('ui-grid-' + i2EnL(_tabpage.tabHost.tablist.size() - 2))
        .css('height', '50px').css('z-index', '2')
        .css('background-color', '#fff');
    for (var i = 0; i < _tabpage.tabHost.tablist.size(); i++) {

        var _BGI = $('<div></div>').addClass('ui-block-' + i2EnL(i))
            .css('text-align', 'center')
            .data('tabpage', _tabpage)
            .data('index', i)
            .data('tabspec', _tabpage.tabHost.tablist.get(i)).click(function () {
                var tabspec = $(this).data('tabspec');
                var tabpage = $(this).data('tabpage');
                var page = $.newInstance(tabspec.pageClass);
                if (_INEI(page)) {

                    if ($(this).data('index') == 4 || $(this).data('index') == 0 || $(this).data('index') == 3) {
                        page.userData.hasMoreData = false;
                    }
                    _SI(page, new Intent({
                        canback: false,
                        headerTitel: tabspec.text,
                        _tabSubPage: true,
                        scrollEnable: ($(this).data('index') == 2) ? false : true,
                        _removeOnHide: false
                    }));
                    _CNP(page, tabpage);
                    _OP(page);
                    return;
                }
                _OP((_GI(page))._this);
            });

        var _BGII = $('<img>').css('height', '26px').css('margin-top', '5px');
        if (_page.pageName == _tabpage.tabHost.tablist.get(i).pageClass) {
            $(_BGII).attr('src', _tabpage.tabHost.tablist.get(i).imgOn);
        } else {
            $(_BGII).attr('src', _tabpage.tabHost.tablist.get(i).imgOff);
        }
        $(_BGII).appendTo($(_BGI));
        var _BGIT = $('<div></div>').css('font-size', '9px').css('text-shadow', 'none')
            .html(_tabpage.tabHost.tablist.get(i).text);
        if (_page.pageName == _tabpage.tabHost.tablist.get(i).pageClass) {
            $(_BGIT).css('color', _tabpage.tabHost.tablist.get(i).colorOn);
        } else {
            $(_BGIT).css('color', _tabpage.tabHost.tablist.get(i).colorOff);
        }
        $(_BGIT).appendTo($(_BGI));
        $(_BGI).appendTo($(_BG));
    }
    $(_BG).appendTo($(_footer));
    $(_footer).appendTo($(_newPage));
}

function _CNPUF(_page, _intent, _view) {
    $('<div></div>').addClass('fakeloader').appendTo($(_view)).css('display', 'none').css('z-index', '999');
    var _ew = $('<div></div>')
        .addClass('loading-error-el').appendTo($(_view)).css('z-index', '999');
    $('<img>').addClass('loading-error-el-img')
        .attr('src', 'assets/img/refresh_icon.png').appendTo($(_ew));

    var _navBar = $('<div></div>').addClass('user-nav-wrapper').appendTo($(_view));

    var _sw = $('<div></div>').addClass('swrapper').appendTo($(_view));
    var _s = $('<div></div>').addClass('scroller').appendTo($(_sw));

    var _pd = $('<div></div>').css('display', 'none').addClass('pullDown').addClass('idle').appendTo($(_s));
    $('<span></span>').addClass('pullDownIcon').appendTo($(_pd));
    $('<span></span>').addClass('pullDownLabel').html('下拉刷新...').appendTo($(_pd));

    var _sudw = $('<div></div>').addClass('scrollerData').appendTo($(_s));

    var _pu = $('<div></div>').css('display', 'none').addClass('pullUp').addClass('idle').appendTo($(_s));
    $('<span></span>').addClass('pullUpIcon').appendTo($(_pu));
    $('<span></span>').addClass('pullUpLabel').html('刷新...').appendTo($(_pu));

    _ILE(_page, _view);

    return {_sudw: _sudw, _s: _s, _sw: _sw, _navBar: _navBar};
}

function _ILE(_page, _view) {
    var temp = _page.pageName;
    _page.iLoader = new Loader({page: _page});
    _page.iLoader._InitILoader($(_view).find('.fakeloader'), $(_view).find('.loading-error-el'));
    _page.iLoader.fakeLoaderInit({
        bgColor: "rgba(238, 231, 245, 0.0)",
        spinner: "spinner2"
    });
    $(_page.iLoader._fakeloaderEl).fadeOut();
}

function _ISV(_page, _sudw, _intent) {
    if (iScrollDEBUG)console.log(_page.pageName + ' init scroller...');
    if (_intent._tabSubPage)    $('#' + hashcode(_page.pageName) + ' .swrapper').css('bottom', '50px');
    else $('#' + hashcode(_page.pageName) + ' .swrapper').css('bottom', _intent._swrapperBottom);


    var _view = $(_sudw).parent();

    pullDownEl = $(_view).find('.pullDown')[0];
    pullUpEl = $(_view).find('.pullUp')[0];

    pullDownEl.className = 'pullDown';
    pullUpEl.className = 'pullUp';

    $(pullDownEl).hide();
    $(pullUpEl).hide();
    maxScrollY = 0;
    // hasMoreData = _page.userData.hasMoreData;


    var _SDV = $(_view).find('.scrollerData')[0];

    myScroll = new iScroll('#' + hashcode(_page.pageName) + ' .swrapper', {
        useTransition: true,
        topOffset: 0,
        onRefresh: function () {
            if ($(pullDownEl).hasClass('loading')) {
                $(pullDownEl).removeClass('flip');
                $(pullDownEl).addClass('idle');
                $(pullDownEl).removeClass('loading');
                $(pullDownEl).fadeOut();
            }
            if ($(pullUpEl).hasClass('loading')) {
                $(pullUpEl).removeClass('flip');
                $(pullUpEl).addClass('idle');
                $(pullUpEl).removeClass('loading');
                $(pullUpEl).find('.pullUpLabel').html('上拉加载...');
                $(pullUpEl).fadeOut();
            }
        },
        onScrollMove: function () {
            if (iScrollDEBUG) console.log('myScroll.maxScrollY   ' + myScroll.maxScrollY);
            if (iScrollDEBUG) console.log('this.y   ' + this.y);

            if (_intent._scrollEnable) {
                if (this.y > OFFSET && !$(pullDownEl).hasClass('flip')) {
                    $(pullDownEl).slideDown();
                    $(pullDownEl).addClass('flip');
                    $(pullDownEl).removeClass('idle')
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放加载...';
                }

                if (_page.userData.hasMoreData) {
                    if (this.y < (maxScrollY - OFFSET) && !$(pullUpEl).hasClass('flip')) {
                        $(pullUpEl).slideDown();
                        $(pullUpEl).toggleClass('flip');
                        $(pullUpEl).toggleClass('idle');
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放加载...';
                    }
                }
            }
        },
        onScrollEnd: function () {
            if (_intent._scrollEnable) {
                if ($(pullDownEl).hasClass('flip')) {
                    $(pullDownEl).addClass('loading');
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                    if (iScrollDEBUG) window.console.log("onSRefresh sys");
                    _page.onSRefresh(_SDV);
                }
                if ($(pullUpEl).hasClass('flip')) {
                    $(pullUpEl).addClass('loading');
                    $(pullUpEl).find('.pullUpLabel').html('加载中...');
                    if (iScrollDEBUG) window.console.log("onSMore sys");
                    _page.onSMore(_SDV);
                }
            }
        }
    });
}

function _OP(_page) {
    var _intent = _GI(_page);
    $.mobile.changePage('#' + hashcode(_page.pageName), _intent);
}

function Application() {
}
Application.prototype = {
    launcher: null,//初始化加载页面名称
    startApplication: function startApplication() {
        ($.newInstance(this.launcher)).startPage();
    }
}

function Page(options) {
    var setting = $.extend({
        hasMoreData: false,
        PAGEINDEX: 1,
        PAGESIZE: 10,
        refresh: true
    }, options);
    this.userData.hasMoreData = setting.hasMoreData;
    this.userData.PAGEINDEX = setting.PAGEINDEX;
    this.userData.PAGESIZE = setting.PAGESIZE;
    this.userData.refresh = setting.refresh;
}
Page.prototype = {
    pageName: null,
    userData: {PAGEINDEX: 1, PAGESIZE: 10, hasMoreData: true, refresh: true},
    iLoader: new Loader({page: this}),
    navBar: null,
    viewWarper: null,
    scroller: null,
    view: null,
    viewContent: null,
    intent: null,
    setIntent: function (_intent) {
        this.intent = _intent;
    },
    getIntent: function () {
        return this.intent;
    },
    onCreate: function (view) {
    },
    onResume: function (view) {
    },
    startPage: function (_intent) {
        if (!_intent)return;
        // _GI(this).setThis(_intent.getThis());
        _GI(this).setForward(_intent.getForward());
        if (_INEI(_intent._forward)) {
            _SI(_intent._forward, (new Intent(_intent._setting)).setUserData(_intent.getUserData()));
            _CNP(_intent._forward);
            _OP(_intent._forward);
        } else {
            _OP(_intent._forward);
        }
    },
    remove: function () {
        _RP(this);
    },
    getIntent: function () {
        return _GI(this);
    },
    onSInitRefresh: function (_SDV) {
    },
    onSRefresh: function (_SDV) {
    },
    onSMore: function (_SDV) {
    },
    sRefresh: function () {
        myScroll.refresh();
        maxScrollY = myScroll.maxScrollY;
    }
}


function TabPage() {
}
TabPage.prototype = {
    tabHost: null,
    setTabHost: function (tabHost) {
        this.tabHost = tabHost;
        return this;
    },
    startPage: function () {

        var tabHomePage;
        if (this.tabHost.tablist.get(0) && _INEI($.newInstance(this.tabHost.tablist.get(0).pageClass))) {
            for (var i = 0; i < 1; i++) {//其他字页面改为不存在时创建
                var pageInstance = $.newInstance(this.tabHost.tablist.get(i).pageClass);
                if (i == 0) {
                    tabHomePage = pageInstance;
                    tabHomePage.userData.hasMoreData = false;
                }
                _SI(pageInstance, new Intent({
                    canback: i == 0 ? true : false,
                    headerTitel: this.tabHost.tablist.get(i).text,
                    _tabSubPage: true,
                    scrollEnable: true,
                    _removeOnHide: false
                }));
                _CNP(pageInstance, this);
            }
        }
        _OP(tabHomePage);
        //$('#welcomePage').remove();
    }
}


function TabHost() {
    this.tablist = new List();
}
TabHost.prototype = {
    tablist: null,
    addTab: function (_TabSpec) {
        this.tablist.add(_TabSpec);
    }
}

function TabSpec(_options) {
    this.text = _options.text;
    this.imgOn = _options.imgOn;
    this.imgOff = _options.imgOff;
    this.colorOn = _options.colorOn;
    this.colorOff = _options.colorOff;
    this.pageClass = _options.pageClass;
}
TabSpec.prototype = {
    text: '',
    imgOn: '',
    imgOff: '',
    colorOn: '',
    colorOff: '',
    page: null
}


function Intent(_options) {
    this._setting = $.extend({
        header: true,
        headerTitel: '',
        backBtnText: '返回',
        theme: 'f',
        canback: true,
        transition: '',
        _tabSubPage: false,
        pure: false,
        scrollEnable: false,
        _removeOnHide: true,
        swrapperBottom: '0px'
    }, _options);

    this._header = this._setting.header;
    this._headerTitel = this._setting.headerTitel;
    this._backBtnText = this._setting.backBtnText;
    this._theme = this._setting.theme;
    this.changeHash = this._setting.canback;
    this._tabSubPage = this._setting._tabSubPage;
    this._removeOnHide = this._setting._removeOnHide;
    this._pure = this._setting.pure;
    this._scrollEnable = this._setting.scrollEnable;
    this._swrapperBottom = this._setting.swrapperBottom;
}


Intent.prototype = {
    _setting: null,
    _header: true,
    _headerTitel: '',
    changeHash: true,
    transition: '',
    _backBtnText: '返回',
    _theme: 'f',
    _tabSubPage: false,
    _pure: false,
    _scrollEnable: false,
    _removeOnHide: true,
    _this: null,
    _forward: null,
    _isDestroy: false,
    _userData: {},
    _swrapperBottom: '0px',
    ApiSettings: new ApiSettings(),

    setClass: function (_this, _forward) {
        if (!_this) this._this = _this;
        this._forward = new _forward;
        //this._forward = $.newInstance(_forward.pageName);
    },
    setThis: function (_this) {
        this._this = _this;
    },
    getThis: function () {
        return this._this;
    },
    setForward: function (_forward) {
        this._forward = _forward;
    },

    getForward: function () {
        return this._forward;
    },
    setDestroy: function () {
        this._isDestroy = true;
    },
    isDestroy: function () {
        return this._isDestroy;
    },
    setUserData: function (_data) {
        this._userData = _data;
        return this;
    },
    getUserData: function (_data) {
        return this._userData;
    }
}

function _SI(_page, _intent) {
    _intent.setThis(_page);
    _page.setIntent(_intent);
    pageHashTable.add(hashcode(_page.pageName), _intent);
}

function _GI(_page) {
    return pageHashTable.getValue(hashcode(_page.pageName));
}
function _DI(_page) {
    pageHashTable.remove(hashcode(_page.pageName));
}

function _IEI(_page) {
    return pageHashTable.containsKey(hashcode(_page.pageName));
}

function _INEI(_page) {
    return !pageHashTable.containsKey(hashcode(_page.pageName));
}

function _RP(_page) {
    _REL(_page);
    _DI(_page);
    $('#' + hashcode(_page.pageName)).remove();
}

function _REL(_page) {
    $(document).off('pagecreate', '#' + hashcode(_page.pageName));
    $(document).off('pageshow', '#' + hashcode(_page.pageName));
    $(document).off('pagehide', '#' + hashcode(_page.pageName));
    $(document).off('pagebeforehide', '#' + hashcode(_page.pageName));
}

$.extend({
        'classExtends': function (_superClass, _newClass) {
            function Constructor() {
            };
            Constructor.prototype = $.extend({}, _superClass.prototype);
            if (_newClass) _classExtend(Constructor.prototype, _newClass);
            return Constructor;
            function _classExtend(_o, _p) {
                for (prop in _p) {
                    _o[prop] = _p[prop];
                }
                return _o;
            }
        },
        'newInstance': function (_className) {
            return eval('new ' + _className + '()');
        },
        'startPage': function (_form, _to, data) {
            var intent = new Intent();
            intent.setUserData(data);
            try {
                $.newInstance(_to);
            } catch (ex) {
                $.ajax({
                    url: JSROOTDIRECTORY + _to + '.js',
                    dataType: "text",
                    async: false
                }).success(function (_a, _b) {
                    var myScript = document.createElement("script");
                    myScript.type = "text/javascript";
                    myScript.text = _a;
                    document.body.appendChild(myScript);

                    intent.setClass(_form, _to);
                    _form.prototype.startPage(intent);
                }).error(function () {
                    $.notie_error('系统错误,请稍后重试!');
                });
            }
        }
    }
)

function hashcode(str) {
    var hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    // console.trace();
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash + '';
}
function HashTable() {
    var size = 0;
    var entry = new Object();
    this.add = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    }
    this.getValue = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    }
    this.remove = function (key) {
        if (this.containsKey(key) && ( delete entry[key] )) {
            size--;
        }
    }
    this.containsKey = function (key) {
        return (key in entry);
    }
    this.getSize = function () {
        return size;
    }
}


function List() {
    var list = new Array();
    this.add = function (object) {
        list[list.length] = object;
    }
    this.remove = function (index) {
        var object = this.list[index];
        list.splice(index, 1);
        return object;
    }
    this.get = function (index) {
        return list[index];
    }
    this.size = function () {
        return list.length;
    }
}


function Fifo() {
    var fifo = new Array();
    this.push = function (object) {
        fifo[fifo.length] = object;
        return this;
    }
    this.pop = function () {
        if (fifo.length > 0) {
            var object = fifo[0];
            fifo.splice(0, 1);
            return object;
        }
        return null;
    }
    this.size = function () {
        return fifo.length;
    }
    this.clean = function () {
        fifo = new Array();
    }
}


function i2EnL(_index) {
    var enStr = '';
    switch (_index) {
        case 0:
            enStr = 'a';
            break;
        case 1:
            enStr = 'b';
            break;
        case 2:
            enStr = 'c';
            break;
        case 3:
            enStr = 'd';
            break;
        case 4:
            enStr = 'e';
            break;
        case 5:
            enStr = 'f';
            break;
        case 6:
            enStr = 'g';
            break;
        default:
            enStr = '';
            break;
    }
    return enStr;
}


function ApiSettings() {
    this.ajaxFifo = new Fifo();
    this.ajaxOnSuccessFifo = new Fifo();
    this.ajaxOnErrorFifo = new Fifo();
    this.startAjax = function () {
        if (this.ajaxFifo.size() > 0) {
            this.ajaxFifo.pop().start();
        }
    }
}
ApiSettings.prototype = {
    ajaxFifo: null,//ajax先入先出Api队列  ajax实现为同步执行
    ajaxOnSuccessFifo: null,//ajax请求成功回调队列
    ajaxOnErrorFifo: null,//ajax请求失败回调队列
    push: function (_api) {
        this.ajaxFifo.push(_api);
    },
    startAjax: function () {
        if (this.ajaxFifo.size() > 0) {
            this.ajaxFifo.pop().start();
        }
    }
}


function Api(_options) {
    var _settings = $.extend({
        page: null,
        method: "get",
        url: '',//请求地址
        userArgs: [],//请求参数数组
        errorMsg: '加载失败',//请求地址
        ajaxStart: null,
        beforeSend: null,
        ajaxSend: null,
        success: function () {
        },
        ajaxSuccess: null,
        error: function () {
        },
        ajaxError: null,
        complete: null,
        ajaxComplete: null,
        ajaxStop: null,
        async: true
    }, _options);
    this._method = _settings.method;
    this._url = _settings.url;
    this._userArgs = _settings.userArgs;
    this.page = _settings.page;
    this.page.intent.ApiSettings.ajaxOnSuccessFifo.push(_settings.success);
    this.page.intent.ApiSettings.ajaxOnErrorFifo.push(_settings.error);
}


Api.prototype = {
    page: null,
    _method: "get",
    _url: '',//请求地址
    _userArgs: [],//请求参数数组
    _complete: function () {
        //this 指向AJAX配置对象ajaxSettings
        var api = this.Api;
        api.page.iLoader._ILoaderDown();
        if (api.page.intent.ApiSettings.ajaxFifo.size() > 0) {
            api.page.intent.ApiSettings.ajaxFifo.pop().start();
        }
    },
    start: function () {
        this.page.iLoader._ILoaderUp();
        $.ajax({
            type: this._method,
            url: this._url + this.formatArgs(this._userArgs),
            dataType: "json",
            async: true,
            Api: this
        }).success(
            this.page.intent.ApiSettings.ajaxOnSuccessFifo.pop()
        ).error(
            this.page.intent.ApiSettings.ajaxOnErrorFifo.pop()
        ).complete(this._complete);
    },
    formatArgs: function (_argArray) {
        var argStr = '/';
        for (var i = 0; i < _argArray.length; i++) {
            if (i == 0) {
                argStr += _argArray[i];
            } else {
                argStr += '/' + _argArray[i];
            }
        }
        return argStr;
    }
}


function Loader(_options) {
    var _settings = $.extend({
        page: null,
        errorMsg: '加载失败',
        hintMsg: '请稍后重试',
        retryfun: null//错误重试函数
    }, _options);

    this._page = _settings.page;
    this._errorMsg = _settings.errorMsg;
    this._hintMsg = _settings.hintMsg;
    this._retryfun = _settings.retryfun;
}


Loader.prototype = {
    _page: null,
    _errorMsg: '加载失败',
    _hintMsg: '请稍后重试',
    _retryfun: null,//错误重试函数
    _fakeloaderEl: null,//加载动画
    _loaderErrorEl: null,//错误提示页面
    _loaderNum: 0,//加载动画计数器
    _isFromZero: false,//是否有无到有
    _isToZero: false,//是否由有到无
    _isShouldVisibility: false,//是有应该显示加载动画

    _InitILoader: function (_fakeloaderEl, _loaderErrorEl) {
        this._fakeloaderEl = _fakeloaderEl;
        this._loaderErrorEl = _loaderErrorEl;
        this.centerLoaderRefreshIcon($(_loaderErrorEl).find('.loading-error-el-img'));
        var eventData = {retryfun: this._retryfun};
        $(this._loaderErrorEl).find('.loading-error-el-img').unbind('click')
            .click(function (_event, _data) {
                $(this).parent('#loading-error-el-id').fadeOut();
                if (_event.data.retryfun)_event.data.retryfun();
            });
    },
    _ILoaderUp: function () {
        if (this._loaderNum == 0) {
            this._isFromZero = true;
        } else {
            this._isFromZero = false;
        }
        this._loaderNum++;
        this._isToZero = false;
        this._isShouldVisibility = true;
        if (ILoaderDEBUG)window.console.log(this._eventType + '     _loaderNum++');
        this._onILoaderNumChange();
    },
    _ILoaderDown: function () {
        if (this._loaderNum == 0)return;
        this._loaderNum--;
        if (this._loaderNum == 0) {
            this._isToZero = true;
            this._isShouldVisibility = false;
        } else {
            this._isToZero = false;
        }
        this._isFromZero = false;
        if (ILoaderDEBUG)window.console.log(this._eventType + '     _loaderNum--');
        this._onILoaderNumChange();
    },
    _onILoaderNumChange: function () {
        if (this._isFromZero) {
            $(this._fakeloaderEl).fadeIn();
            if (ILoaderDEBUG)window.console.log(this._eventType + '     loader   fadeIn...');
        }
        if (this._isToZero) {
            $(this._fakeloaderEl).fadeOut();
            if (ILoaderDEBUG)window.console.log(this._eventType + '     loader   fadeOut...');
        }
    },
    fakeLoaderInit: function (options) {
        var settings = $.extend({
            pos: 'fixed',// Default Position
            top: '0px',  // Default Top value
            left: '0px', // Default Left value
            width: '100%', // Default width
            height: '100%', // Default Height
            zIndex: '999',  // Default zIndex
            bgColor: '#2ecc71', // Default background color
            spinner: 'spinner7', // Default Spinner
            imagePath: '' // Default Path custom image
        }, options);

        //Customized Spinners
        var spinner01 = '<div class="fl spinner1"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>';
        var spinner02 = '<div class="fl spinner2"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
        var spinner03 = '<div class="fl spinner3"><div class="dot1"></div><div class="dot2"></div></div>';
        var spinner04 = '<div class="fl spinner4"></div>';
        var spinner05 = '<div class="fl spinner5"><div class="cube1"></div><div class="cube2"></div></div>';
        var spinner06 = '<div class="fl spinner6"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';
        var spinner07 = '<div class="fl spinner7"><div class="circ1"></div><div class="circ2"></div><div class="circ3"></div><div class="circ4"></div></div>';
        var spinner = $(divP).clone().css('background-color', '#424942')
            .css('width', '100px').css('height', '100px').css('text-align', 'center')
            .css('border-radius', '10px').attr('id', 'spinner');
        var sp = $(spinner02);
        $(sp).css('margin-top', '35px').css('margin-left', '35px');
        $(sp).appendTo($(spinner));
        var el = $(this._fakeloaderEl);
        $(el).fadeOut();
        //Init styles
        var initStyles = {
            'position': settings.pos,
            'width': settings.width,
            'height': settings.height,
            'top': settings.top,
            'left': settings.left,
        };
        el.css(initStyles);
        $(el).css(' background-color', '');
        el.each(function () {
            var a = settings.spinner;
            //console.log(a)
            switch (a) {
                case 'spinner1':
                    el.html(spinner01);
                    break;
                case 'spinner2':
                    // el.html(spinner02);
                    $(spinner).appendTo($(el));
                    break;
                case 'spinner3':
                    el.html(spinner03);

                    break;
                case 'spinner4':
                    el.html(spinner04);
                    break;
                case 'spinner5':
                    el.html(spinner05);
                    break;
                case 'spinner6':
                    el.html(spinner06);
                    break;
                case 'spinner7':
                    el.html(spinner07);
                    break;
                default:
                    el.html(spinner01);
            }
        });
        this.centerLoaderRefreshIcon($(this._fakeloaderEl).find('#spinner'));
    }, centerLoaderRefreshIcon: function (El) {
        var winW = $(window).width();
        var winH = $(window).height();
        var spinnerW = $(El).outerWidth();
        var spinnerH = $(El).outerHeight();
        $(El).css({
            'position': 'fixed',
            'left': (winW / 2) - (spinnerW / 2),
            'top': (winH / 2) - (spinnerH / 2)
        });
    }
}

$.extend({
    'notie_success': notie_success,
    'notie_warning': notie_warning,
    'notie_error': notie_error,
    'notie_info': notie_info,
});

function notie_success(msg) {
    notie.alert(1, msg, 2);
}

function notie_warning(msg) {
    notie.alert(2, msg, 2);
}

function notie_error(msg) {
    notie.alert(3, msg, 2);
}
function notie_info(msg) {
    notie.alert(4, msg, 2);
}



