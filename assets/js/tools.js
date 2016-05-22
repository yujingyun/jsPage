/**
 * Created by yjy on 16/2/15.
 */

/**
 * 判断数组中是否存在某个元素的方法
 * @param _array 原始数组
 * @param _element 待检测元素
 * @param id      元素标示属性名  字符串
 * @returns {boolean}
 */
function isExistInArr_shihang(_array, _element, id) {
    if (!_array || !_element) return false;
    if (!_array.length) {
        return (_array == _element);
    }
    for (var i = 0; i < _array.length; i++) {
        if (_element.id == _array[i].id) return true;
    }
    return false;
}


/**
 *去除数组中重复元素的方法
 * @param _array   原始数组
 * @param _id      数组元素标示属性名   字符串
 * @returns {*}    不重复列表
 */
function distinct_shihang(_array, _id) {
    if (!_array || !_array.length) return _array;
    var newArray = new Array();
    for (var i = 0; i < _array.length; i++) {
        var oEl = _array[i];
        if (!oEl || this.isExistInArr_shihang(newArray, oEl, _id)) continue;
        newArray[newArray.length] = oEl;
    }
    return newArray;
}

/**
 * 获取字符串长度
 * @param str
 * @returns {number}
 * @constructor
 */
function GetStringLength(str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};


/**
 * 截取字符串
 * @param str
 * @param len
 * @returns {*}
 */
function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    if (str == null) {
        console.trace();
    }

    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut + '...';
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}


/**
 * 截取字符串 无省略号
 * @param str
 * @param len
 * @returns {*}
 */
function cutstrnodot(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}

/**
 * 数字(索引)转换成英文(小写) 移动一位(返回多1)  不大于7
 * @param _num
 */
function num2English(_num) {
    var enStr = '';
    switch (_num) {
        case 0:
            enStr = 'one';
            break;
        case 1:
            enStr = 'two';
            break;
        case 2:
            enStr = 'three';
            break;
        case 3:
            enStr = 'four';
            break;
        case 4:
            enStr = 'five';
            break;
        case 5:
            enStr = 'six';
            break;
        case 6:
            enStr = 'seven';
            break;
        default:
            enStr = '';
            break;
    }
    return enStr;

}

/**
 * 数字(索引)转换成英文字母(小写) 移动一位(返回多1)  不大于7
 * @param _num
 */
function num2EnglishLetter(_num) {
    var enStr = '';
    switch (_num) {
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



/**
 * 数字(索引)转换成英文(小写)  在转换成css id 样式 移动一位(返回多1)  不大于7
 * @param _num
 */

function num2cssId(_num) {
    return '#' + num2English(_num);

}