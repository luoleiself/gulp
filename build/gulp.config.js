let baseDir = '.';
String.prototype.delEndDelimiter = function (delimiter) {
  let value = this.toString();
  delimiter = delimiter || '/';
  return value.endsWith(delimiter) ? value.substring(0, value.length - 1) : value;
};

const gulpConf = {
  css: {
    src: [`${baseDir.delEndDelimiter()}/src/css/**/*.scss`, `!${baseDir.delEndDelimiter()}/src/css/**/*.map`],
    dest: `${baseDir.delEndDelimiter()}/dist/css`,
    isConcat: false,
  },
  image: {
    src: [`${baseDir.delEndDelimiter()}/src/images/**/*`],
    dest: `${baseDir.delEndDelimiter()}/dist/images`,
  },
  js: {
    src: [`${baseDir.delEndDelimiter()}/src/js/**/*.js`, `!${baseDir.delEndDelimiter()}/src/js/**/*.min*`],
    dest: `${baseDir.delEndDelimiter()}/dist/js`,
    isConcat: false,
  },
  html: {
    src: [`${baseDir.delEndDelimiter()}/src/pages/**/*.html`],
    dest: `${baseDir.delEndDelimiter()}/dist/pages`,
  },
  libs: {
    src: [`${baseDir.delEndDelimiter()}/src/libs/**/*`],
    dest: `${baseDir.delEndDelimiter()}/dist/libs`,
  },
  server: {
    port: 8080,
    host: 'localhost',
    openBrowser: true,
    baseDir: './',
    index: 'index.html',
  },
};

exports.baseDir = baseDir;
exports.gulpConf = gulpConf;
