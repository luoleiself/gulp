let baseDir = '.';
if (baseDir.endsWith('/')) {
  baseDir = baseDir.substring(0, baseDir.length - 1);
}

exports.gulpConf = {
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
  server: {
    port: 8080,
    host: 'localhost',
    openBrowser: true,
    baseDir: './',
    index: 'index.html',
  },
};
