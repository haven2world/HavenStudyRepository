export function RenderIf(flag) {
  return function (viewContent) {
    return flag ? viewContent : null;
  };
}

export function isEmptyObject(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}

//格式化数字
export function formatNumber(num, cent, isThousand) {
  //为空判断
  if (num === null || typeof num === "undefined") {
    return '-';
  }
  num = num.toString().replace(/\$,/g, '');

  // 检查传入数值为数值类型
  if (isNaN(num))
    num = "0";
  if (typeof num !== 'number' && !isFinite(num)) {
    return "-";
  }

  // 获取符号(正/负数)
  let sign = (num === (num = Math.abs(num)));

  num = Math.floor(num * Math.pow(10, cent) + 0.50000000001); // 把指定的小数位先转换成整数.多余的小数位四舍五入
  let cents = num % Math.pow(10, cent);       // 求出小数位数值
  num = Math.floor(num / Math.pow(10, cent)).toString();  // 求出整数位数值
  cents = cents.toString();        // 把小数位转换成字符串,以便求小数位长度

  // 补足小数位到指定的位数
  while (cents.length < cent)
    cents = "0" + cents;

  if (isThousand) {
    // 对整数部分进行千分位格式化.
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  }

  if (cent > 0)
    return (((sign) ? '' : '-') + num + '.' + cents);
  else
    return (((sign) ? '' : '-') + num);
}

// 格式化日期，支持各种不同分隔符
export function formatDate(time, separator, noZero) {
  if (!time) return '';
  let date = new Date(time);
  let month;
  let day;
  if (noZero) {
    month = 1 + date.getMonth();
    day = date.getDate();
  } else {
    month = date.getMonth() < 9 ? ('0' + (1 + date.getMonth())) : (1 + date.getMonth());
    day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
  }

  return date.getFullYear() + separator + month + separator + day
}

// 格式化时间
export function formatTime(time, withDate) {
  if (!time) return '';
  let date = new Date(time);
  let month, day, hour, minute, second;

  hour = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
  minute = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
  month = date.getMonth() < 9 ? ('0' + (1 + date.getMonth())) : (1 + date.getMonth());
  day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
  second = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();

  return withDate ? `${month}月${day}日 ${hour}:${minute}:${second}` : `${hour}:${minute}:${second}`
}

//通过年月日获取date对象
export function setNewDate({year, month, day, hour, minute, second}) {
  let date = new Date();
  year && month && day && (date = new Date(year, month - 1, day));
  typeof hour !== 'undefined' && date.setHours(hour);
  typeof minute !== 'undefined' && date.setMinutes(minute);
  typeof second !== 'undefined' && date.setSeconds(second);
  return date;
}

// 计算指定时区时间
export function calcTime(time, offset) {
  let d = new Date(time)
  let utc = d.getTime() + (d.getTimezoneOffset() * 60000)
  let nd = new Date(utc + (3600000 * offset))
  return nd
}

//节流函数
export function throttle(func, wait, options) {
  /* options的默认值
   *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
   *  options.leading = true;
   * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
   *  options.trailing = true;
   */
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : new Date();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = new Date();
    if (!previous && options.leading === false) previous = now;
    // 计算剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 当到达wait指定的时间间隔，则调用func函数
    // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
    if (remaining <= 0 || remaining > wait) {
      // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // options.trailing=true时，延时执行func函数
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

//去抖函数
export function debounce(func, wait, immediate) {
  // immediate默认为false
  var timeout, args, context, timestamp, result;

  var later = function () {
    // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
    var last = new Date() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = new Date();
    // 第一次调用该方法时，且immediate为true，则调用func函数
    var callNow = immediate && !timeout;
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

// content（字符串或数组） 是否是 arr 的子集， content元素可重复
export function isInArray(content, arr, fuzzyFlag) {
  //精确匹配
  if (!isInArray.exactMatch) {
    isInArray.exactMatch = (content, arr) => {
      return arr.indexOf(content) >= 0
    }
  }
  //模糊匹配
  if (!isInArray.fuzzyMatch) {
    isInArray.fuzzyMatch = (content, arr) => {
      return arr.findIndex(item => content.indexOf(item) >= 0) >= 0
    }
  }
  let calculate = fuzzyFlag ? isInArray.fuzzyMatch : isInArray.exactMatch;
  if (!Array.isArray(arr)) {
    throw new Error('请输入数组')
  }
  if (typeof content === 'string') {
    return calculate(content, arr)
  } else if (content instanceof Array) {
    for (let i = 0, l = content.length; i < l; i++) {
      if (!calculate(content[i], arr)) {
        return false
      }
    }
    return true
  }
}

//生成不重复随机id
export function GenID(randomLength) {
  return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
}

//计算奇偶性
export function calParity(arr, before) {
  let currentParity;
  if (arr.length % 2) {
    currentParity = 'odd';
  } else {
    currentParity = 'even';
  }
  if (before && before === 'odd') {
    if (currentParity === 'odd') {
      currentParity = 'even';
    } else {
      currentParity = 'odd';
    }
  }
  return currentParity
}


//下载文件
export function downloadFile(url, name) {
  let pathArr = url.split('/');
  let downName = pathArr[pathArr.length - 1]; // 文件下载名称
  if (name) {
    downName = name;
  }
  let aTag = document.createElement('a');
  aTag.download = downName;
  aTag.href = url;
  aTag.target = '_blank';
  aTag.click();
  aTag.remove();
}

//从 URL 中获取查询参数
export function getQueryParameterByName(url, name) {
  let search = url.slice(url.indexOf('?'));
  let reg = new RegExp('[\\?&]' + name + '=([^&]*)(&|$)');
  let result = reg.exec(search);
  return result[1];
}

//登录
export function goToLogin() {
}

//判断是否登录
export function isSignedIn() {
  if (localStorage.loginId && localStorage.token) {

  } else {
    return false
  }
}


//选择文件
export function selectFile(multiple, accept = '*/*') {
  return new Promise((resolve, reject) => {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = multiple;
    input.accept = accept;
    input.onchange = function (event) {
      resolve(event.path[0].files);
      input.remove();
    };
    input.click();
  })
}

//修改query
export function changeQuery(searchString) {
  let currentUrl = window.location.href;
  if (window.location.search) {
    currentUrl = currentUrl.replace(/\?.*/, searchString);
  } else {
    currentUrl += searchString;
  }
  window.history.replaceState('', '', currentUrl);
}

//  判断浏览器平台
export function isMobile() {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true
  } else {
    return false
  }
}

//识别文件后缀
export function validateFileByExtensionName(file, ext1, ext2) {
  let ext = [].slice.call(arguments, 1);
  if (!file || !file.name) {
    throw new Error('请输入文件');
  }
  for (let i = 0; i < ext.length; ++i) {
    if (typeof ext[i] !== 'string') {
      throw new Error('扩展名请输入字符串');
    }
  }
  if (ext.length === 0) {
    return true;
  } else {
    let temp = file.name.split('.');
    let extName = temp[temp.length - 1].toLowerCase();
    return isInArray(extName, ext)
  }
}
//从object获取value
export function getValueFromObject(obj, keyString) {
  let keyArr = keyString.split('.');
  return keyArr.reduce((accumulator, current)=>{
    if(accumulator=== undefined){
      return undefined;
    }
    return accumulator[current];
  },obj);
}


//校验函数
function validateCommon(...args) {
  return (str) => {
    for (let i = 0; i < args.length; ++i) {
      if (args[i].test(str)) {
        return true
      }
    }
    return false
  }
}
//  常用校验
export const validate = {
  phone: validateCommon(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, /^(\(\d{3,4}-\)|\d{3,4}-)?\d{7,8}$/, /\d{3}-\d{8}|\d{4}-\d{7}/),
  email: validateCommon(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
  idCode: validateCommon(/^\d{15}|\d{18}$/),
  integer: validateCommon(/^-?[1-9]\d*$/),
  nonNegativeInteger: validateCommon(/^[1-9]\d*$|^0$/),
  double: validateCommon(/^-?([1-9]\d*(\.\d*)?|0(\.\d*[1-9]\d*)?|0)$/),
}

//为Upload组件增加token
export function setUploadToken() {
  return {
    headers:{token:localStorage.token, channel:'pc'}
  }
}

//引用比较 用于检测是否渲染
export function compareReferencesToBeEqual(a,b,keys) {
  let differentIndex = keys.findIndex(key=>{
    return getValueFromObject(a, key) !== getValueFromObject(b, key)
  });
  // console.log(keys[differentIndex]);
  return differentIndex===-1;
}
