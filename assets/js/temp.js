/**
 * 初始化加载动画   加载错误提示页
 * @param _newPage
 * @param _id
 * @constructor
 */
function INIT_ILOADER(_newPage, _id) {
    $(_newPage).find('#fakeloader').fakeLoaderInit({
        bgColor: "rgba(238, 231, 245, 0.0)",
        spinner: "spinner2"
    });
    var pageAttachedData = getIPageAttachedData(_id);
    pageAttachedData._iLoader._InitILoader($(_newPage).find('#fakeloader'), $(_newPage).find('#loading-error-el-id'));
}
