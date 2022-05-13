var bak = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
<meta name="renderer" content="webkit" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="format-detection" content="telphone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<meta http-equiv="pragma" content="no-cache" />
<meta name="Keywords" content="你大爷" />
<meta name="description" content="永远是你大爷" />
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
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
  <link  rel="stylesheet" href="./css/index.min.css" type="text/css" />
<link type="text/css" rel="stylesheet" href="./css/index.min.css?name=21321" />
<script src='./libs/jquery-1.11.3.min.js?'"''></script>
<!-- <script type="text/javascript" src="./libs/zepto.min.js" type="text/javascript"></script> -->
<!-- <script src="./libs/vconsole.min.js"></script> -->
<script src="./libs/template-web.js"></script>
<script src="./js/chunk-vendor.min.js?v=20220"></script>
<script src="./js/index.min.js"></script>
  <title>index</title>
</head>

<body>
  <h3>你大爷永远是你大爷!</h3>
  <ul>

    <li>
      <span>
        1
      </span>
      <span>
        hello world
      </span>
    </li>

    <li>
      <span>
        2
      </span>
      <span>
        hello gulp
      </span>
    </li>

  </ul>
  <p>hello main</p>
</body>
<!-- 此处资源的引用路径相对于打包输出页面的路径，详细见 build.config.js -->


<script type="text/javascript">
  setTimeout(function () {
    var h3List = document.querySelectorAll('h3');
    var h4List = document.querySelectorAll('h4');
    for (var i = 0; i < h3List.length; i++) {
      h3List[i].style.color = "red";
    }
    for (var i = 0; i < h4List.length; i++) {
      h4List[i].style.color = "blue";
    }
  }, 3000)
</script>

</html>`;

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
 * @member dateFormat 日期时间戳格式化
 * @param {Number|String} timestamp 日期时间戳秒数
 * @param {Object} param1 格式化参数配置
 * @param {Number} param1.type 格式化类型, 0 默认全部, 1 只日期部分, 2 只时间部分
 * @param {Boolean} param1.isShowSeparator 是否保留分隔符, 默认 true
 * @param {String} param1.dateSeparator 日期部分分隔符, 默认 -
 * @param {String} param1.timeSeparator 时间部分分隔符, 默认 :
 * @returns
 */
function dateFormat(timestamp, { type = 0, isShowSeparator = true, dateSeparator = '-', timeSeparator = ':' } = {}) {
  const _date = new Date(timestamp * 1000);
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
console.log(`dateFormat(1652441404) `, dateFormat(1652441404));
console.log(
  `dateFormat(1652441404, {type : 0, dateSeparator : '/', timeSeparator : '_', isShowSeparator :false}) `,
  dateFormat(1652441404, { type: 0, dateSeparator: '/', timeSeparator: '_', isShowSeparator: false })
);
console.log(
  `dateFormat(1652441404, {type : 1, dateSeparator : '/', timeSeparator : '_', isShowSeparator :false}) `,
  dateFormat(1652441404, { type: 1, dateSeparator: '/', timeSeparator: '_', isShowSeparator: false })
);
console.log(
  `dateFormat(1652441404, {type : 2, dateSeparator : '/', timeSeparator : '_', isShowSeparator :false}) `,
  dateFormat(1652441404, { type: 2, dateSeparator: '/', timeSeparator: '_', isShowSeparator: false })
);
console.log(
  `dateFormat(1652441404, {type : 3, dateSeparator : '/', timeSeparator : '_', isShowSeparator :false}) `,
  dateFormat(1652441404, { type: 3, dateSeparator: '/', timeSeparator: '_', isShowSeparator: false })
);
console.log(
  `dateFormat(1652441404, {type : 0, dateSeparator : '/', timeSeparator : '_', isShowSeparator :true}) `,
  dateFormat(1652441404, { type: 0, dateSeparator: '/', timeSeparator: '_', isShowSeparator: true })
);
console.log(
  `dateFormat(1652441404, {type : 1, dateSeparator : '/', timeSeparator : '_', isShowSeparator :true}) `,
  dateFormat(1652441404, { type: 1, dateSeparator: '/', timeSeparator: '_', isShowSeparator: true })
);
console.log(
  `dateFormat(1652441404, {type : 2, dateSeparator : '/', timeSeparator : '_', isShowSeparator :true}) `,
  dateFormat(1652441404, { type: 2, dateSeparator: '/', timeSeparator: '_', isShowSeparator: true })
);
console.log(
  `dateFormat(1652441404, {type : 3, dateSeparator : '/', timeSeparator : '_', isShowSeparator :true}) `,
  dateFormat(1652441404, { type: 3, dateSeparator: '/', timeSeparator: '_', isShowSeparator: true })
);

// var result = str.match(/<(?:\blink\b|\bscript\b).*?(?:\bsrc\b|\bhref\b)=("|')(.*)\1.*?\/?>/gim);
// var result = str.match(/(<(?:\blink\b|\bscript\b).*?(?:\bsrc\b|\bhref\b)=.*?)(?:(\.(?:css|js|map)\??))(.*?\/?>)/gim);
// console.log(result);
var date = Math.floor(Date.now() / 1000);
var r = str.replace(/(<(?:\blink\b|\bscript\b).*?(?:\bsrc\b|\bhref\b)=.*?)(?:(\.(?:css|js)\??))(.*?\/?>)/gim, function ($f, $1, $2, $3) {
  if ($2.includes('?')) {
    if ($3.includes()) {
    }
  } else {
    return `${$1}${$2}?v=${dateFormat(date, { isShowSeparator: false })}${$3}`;
  }
  // return `${$1}${$2.includes('?') ? `${$2}v=${dateFormat(date, { isShowSeparator: false })}&` : `${$2}?v=${dateFormat(date, { isShowSeparator: false })}`}${$3}`;
});
console.log(r);
