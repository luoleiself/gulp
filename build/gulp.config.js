let baseDir = '.';

// 打包资源文规则
const gulpConf = {
  libs: {
    src: [`${baseDir}/src/libs/**/*`],
    dest: `${baseDir}/dist/libs`,
  },
  css: {
    src: [`${baseDir}/src/css/**/*.scss`, `!${baseDir}/src/css/**/*.map`],
    dest: `${baseDir}/dist/css`,
    isConcat: false,
  },
  image: {
    src: [`${baseDir}/src/images/**/*`],
    dest: `${baseDir}/dist/images`,
  },
  js: {
    src: [`${baseDir}/src/js/**/*.js`, `!${baseDir}/src/js/**/*.min*`],
    dest: `${baseDir}/dist/js`,
    isConcat: false,
  },
  html: {
    src: [`${baseDir}/src/pages/**/*.html`],
    dest: `${baseDir}/dist/pages`,
  },
};
// 服务器配置
const serverConf = {
  port: 8080,
  host: 'localhost',
  openBrowser: true,
  baseDir: baseDir,
  index: 'index.html',
};

exports.gulpConf = gulpConf;
exports.serverConf = serverConf;
