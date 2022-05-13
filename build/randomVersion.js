const through2 = require('through2');

/**
 * @member dateFormat 日期时间戳格式化
 * @param {Number|String} timestamp 日期时间戳秒数
 * @param {Object} param1 格式化参数配置
 * @param {Number} param1.type 格式化类型, 0 默认全部, 1 只日期部分, 2 只时间部分
 * @param {Boolean} param1.isShowSeparator 是否保留分隔符, 默认 true
 * @param {String} param1.dateSeparator 日期部分分隔符, 默认 -
 * @param {String} param1.timeSeparator 时间部分分隔符, 默认 :
 * @returns String
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
function versionReplace(str) {
  var date = Math.floor(Date.now() / 1000);
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
}

exports.randomVersion = function () {
  return through2.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isBuffer()) {
      let result = file.contents.toString();
      result = versionReplace(result);
      file.contents = Buffer.from(result);
    }
    cb(null, file);
  });
};
