var str = `<meta name="description" content="永远是你大爷" />
<!-- 强制禁止用户修改微信客户端的字体大小---begin--- -->
<style>
body {
  /* IOS禁止微信调整字体大小 */
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
}
</style>
<script>
(function () {
  if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
    handleFontSize();
  } else {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", handleFontSize);
      document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
    }
  }
  function handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 16 });
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on('menu:setfont', function () {
      WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 16 });
    });
  }
})();
</script>
<!-- 强制禁止用户修改微信客户端的字体大小---end--- -->
<script>
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth > 432) {
        docEl.style.fontSize = 100 + 'px';
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
</script>

<a class="cls" href="https://a.xcar.com.cn/article/detail/38242844238.txt?id=38&page=1&pagesize=10" data-id="38"></a>

<img data-id="fdlj2334" src="http://www.baidu.com/index/index.png?image2Attr/2/4/w/h/#00fff" alt=""/>

<img data-id="fdlj2334" src="http://www.baidu.com/index/index.png" alt=""/>
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
  <link  rel="stylesheet" href="./css/index.min.css" type="text/css" />
<link type="text/css" rel="stylesheet" href="./css/index.min.css?name=21321" />
<script src='./libs/jquery-1.11.3.min.js?'"''></script>
<!-- <script type="text/javascript" src="./libs/zepto.min.js" type="text/javascript"></script> -->
<!-- <script src="./libs/vconsole.min.js"></script> -->
<script src="./libs/template-web.js?v=20220"></script>
<script src="./js/chunk-vendor.min.js"></script>
<script src="./js/index.min.js"></script>
  <title>index</title>
</head>
<body>
<h3>你大爷永远是你大爷!</h3>
<ul><li>`;

// 日期时间格式化
/**
 * @member dateFormat 日期时间格式化
 * @param {Number|String|Object} paramDate 日期时间
 * @param {Object} param1 格式化参数配置
 * @param {Number} param1.type 格式化类型, 0 默认全部, 1 只日期部分, 2 只时间部分
 * @param {Boolean} param1.isShowSeparator 是否保留分隔符, 默认 true
 * @param {String} param1.dateSeparator 日期部分分隔符, 默认 -
 * @param {String} param1.timeSeparator 时间部分分隔符, 默认 :
 * @returns
 */
function dateFormat(paramDate, { type = 0, isShowSeparator = true, dateSeparator = '-', timeSeparator = ':' } = {}) {
  let _date = null;
  if (Object.prototype.toString.call(paramDate) == '[object Date]') {
    _date = paramDate;
  } else if (/^\d{1,}$/.test(paramDate)) {
    _date = new Date(paramDate);
  } else {
    _date = new Date();
  }
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const date = _date.getDate();

  const hour = _date.getHours();
  const min = _date.getMinutes();
  const second = _date.getSeconds();

  function gtNine(val) {
    return val > 9 ? val : `0${val}`;
  }
  let result = `${year}${dateSeparator}${gtNine(month)}${dateSeparator}${gtNine(date)} ${gtNine(hour)}${timeSeparator}${gtNine(
    min
  )}${timeSeparator}${gtNine(second)}`;

  const dateRegExp = new RegExp(dateSeparator, 'gmi');
  const timeRegExp = new RegExp(timeSeparator, 'gmi');

  let [dateRes, timeRes] = result.split(' ');

  switch (type) {
    case 1:
      return isShowSeparator ? dateRes : dateRes.replace(dateRegExp, '');
    case 2:
      return isShowSeparator ? timeRes : timeRes.replace(timeRegExp, '');
    default:
      return isShowSeparator ? result : `${dateRes.replace(dateRegExp, '')}${timeRes.replace(timeRegExp, '')}`;
  }
}
console.log(`dateFormat(1652441404000) `, dateFormat(1652441404000));
console.log(
  `dateFormat(1652441404000, {type : 0, dateSeparator : '/', timeSeparator : '_', isShowSeparator :false}) `,
  dateFormat(1652441404000, { type: 0, dateSeparator: '/', timeSeparator: '_', isShowSeparator: false })
);
console.log(
  `dateFormat(1652441404000, {type : 1, dateSeparator : '/', timeSeparator : '_', isShowSeparator :false}) `,
  dateFormat(1652441404000, { type: 1, dateSeparator: '/', timeSeparator: '_', isShowSeparator: false })
);
console.log(
  `dateFormat(1652441404000, {type : 2, dateSeparator : '/', timeSeparator : '_', isShowSeparator :false}) `,
  dateFormat(1652441404000, { type: 2, dateSeparator: '/', timeSeparator: '_', isShowSeparator: false })
);
console.log(
  `dateFormat(1652441404000, {type : 3, dateSeparator : '/', timeSeparator : '_', isShowSeparator :false}) `,
  dateFormat(1652441404000, { type: 3, dateSeparator: '/', timeSeparator: '_', isShowSeparator: false })
);
console.log(
  `dateFormat(1652441404000, {type : 0, dateSeparator : '/', timeSeparator : '_', isShowSeparator :true}) `,
  dateFormat(1652441404000, { type: 0, dateSeparator: '/', timeSeparator: '_', isShowSeparator: true })
);
console.log(
  `dateFormat(1652441404000, {type : 1, dateSeparator : '/', timeSeparator : '_', isShowSeparator :true}) `,
  dateFormat(1652441404000, { type: 1, dateSeparator: '/', timeSeparator: '_', isShowSeparator: true })
);
console.log(
  `dateFormat(1652441404000, {type : 2, dateSeparator : '/', timeSeparator : '_', isShowSeparator :true}) `,
  dateFormat(1652441404000, { type: 2, dateSeparator: '/', timeSeparator: '_', isShowSeparator: true })
);
console.log(
  `dateFormat(1652441404000, {type : 3, dateSeparator : '/', timeSeparator : '_', isShowSeparator :true}) `,
  dateFormat(1652441404000, { type: 3, dateSeparator: '/', timeSeparator: '_', isShowSeparator: true })
);

// var result = str.match(/<(?:\blink\b|\bscript\b).*?(?:\bsrc\b|\bhref\b)=("|')(.*)\1.*?\/?>/gim);
// var result = str.match(/(<(?:\blink\b|\bscript\b).*?(?:\bsrc\b|\bhref\b)=.*?)(?:(\.(?:css|js|map)\??))(.*?\/?>)/gim);
// console.log(result);
//
// 匹配 .css .js 文件
// (<(?:\blink\b|\bscript\b).*?(?:\bsrc\b|\bhref\b)=.*?)(?:(\.(?:css|js)\??))(.*?\/?>)
//
//
// var date = Math.floor(Date.now() / 1000);
// var r = str.replace(/(<(?:\blink\b|\bscript\b).*?(?:\bsrc\b|\bhref\b)=.*?)(?:(\.(?:css|js)\??))(.*?\/?>)/gim, function($f, $1, $2, $3) {
//     if ($2.includes('?')) {
//         if ($3.includes()) {}
//     } else {
//         return `${$1}${$2}?v=${dateFormat(date, { isShowSeparator: false })}${$3}`;
//     }
//     // return `${$1}${$2.includes('?') ? `${$2}v=${dateFormat(date, { isShowSeparator: false })}&` : `${$2}?v=${dateFormat(date, { isShowSeparator: false })}`}${$3}`;
// });
// console.log(r);
//
//
// 匹配 ? 参数
// (<(?:\blink\b|\bscript\b).*?(?:\bsrc\b|\bhref\b)=.*?\.(?:css|js))(\?[^<>\/]*)?(.*?\/?>)
//
var date = Date.now();
// (<(?:\blink\b|\bscript\b|img).*?(?:\bsrc\b|\bhref\b)=.*?\.(?:css|js|png|jpg|jpeg|bmp|gif|webp))(\?[^<>"']*)?(.*?\/?>)
// '(<(?:\\blink\\b|\\bscript\\b|img).*?(?:\bsrc\b|\bhref\b)=.*?\\.(?:'+ 'css|js|png|jpg|jpeg|bmp|gif|webp' +'))(\\?[^<>\"\']*)?(.*?\\/?>)'
var reg = new RegExp(
  '(<(?:' +
    '\\blink\\b|\\bscript\\b|img' +
    ').*?(?:' +
    '\\bsrc\\b|\\bhref\\b' +
    ')=.*?\\.(?:' +
    'css|js|png|jpg|jpeg|bmp|gif|webp' +
    '))(\\?[^<>\\"\\\']*)?(.*?\\/?>)',
  'gmi'
);
// var reg = new RegExp('(<(?:\\blink\\b|\\bscript\\b).*?(?:\\bsrc\\b|\\bhref\\b)=.*?\\.(?:' + 'css|js' + '))(\\?[^<>\\/]*)?(.*?\\/?>)', 'gmi');
var r = str.replace(reg, function ($f, $1, $2, $3) {
  // 没有匹配到 ? 参数
  if (!$2) {
    return `${$1}?v=${dateFormat(date, { isShowSeparator: false })}${$3}`;
  }
  // ? 参数中包含 v 参数
  var result = $2.match(/((v=)([^&]*))/gim);
  if (Array.isArray(result)) {
    $2 = $2.replace(/((v=)([^&]*))/gim, `$2${dateFormat(date, { isShowSeparator: false })}`); // 替换 v 参数
    return `${$1}${$2}${$3}`;
  }
  // 有 ? 但没有 v 参数, 可能有其他参数
  var arr = $2.split('?');
  return `${$1}${arr[0]}?v=${dateFormat(date, { isShowSeparator: false })}${arr[1] != '' ? `&${arr[1]}` : ''}${$3}`;
});
console.log(r);
