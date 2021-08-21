//如果没有返回 stream, promise, event emitters, child processes, observables 需要手动调用 cb 标识任务完成
const path = require('path');
const os = require('os');
const { src, dest, task, series, parallel, watch } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const postCSS = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const gulpSass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const named = require('vinyl-named');
const webpack = require('webpack-stream');
const includer = require('gulp-htmlincluder'); // html文件导入
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del'); // delete files and folders
const plumber = require('gulp-plumber');
const { gulpConf } = require('./build/gulp.config');

const NODE_ENV = process.env.NODE_ENV || 'production';

// 处理 css
async function css(cb) {
  if (NODE_ENV === 'production') {
    await del([gulpConf.css.dest]);
  }
  let cssStream = src(gulpConf.css.src)
    .pipe(plumber())
    .pipe(sourceMaps.init({ loadMaps: false }))
    .pipe(gulpSass())
    .pipe(postCSS([autoprefixer({ cascade: true, grid: 'autoplace' })]))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }));
  cssStream = gulpConf.css.isConcat ? cssStream.pipe(concat('index.min.css')) : cssStream;
  cssStream = cssStream.pipe(sourceMaps.write('./')).pipe(dest(gulpConf.css.dest));
  cssStream = NODE_ENV === 'development' ? cssStream.pipe(browserSync.stream()) : cssStream;
  return cssStream;
}

// 处理图片
async function image(cb) {
  if (NODE_ENV === 'production') {
    await del([gulpConf.image.dest]);
  }
  let imgStream = src(gulpConf.image.src).pipe(plumber()).pipe(dest(gulpConf.image.dest));
  imgStream = NODE_ENV === 'development' ? imgStream.pipe(browserSync.stream()) : imgStream;

  return imgStream;
}

// 处理js
async function js(cb) {
  if (NODE_ENV === 'production') {
    await del([gulpConf.js.dest]);
  }
  let webpackConf = require('./build/webpack.config');
  webpackConf = Object.assign({}, { mode: NODE_ENV }, webpackConf);
  let jsStream = src(gulpConf.js.src)
    .pipe(plumber())
    // .pipe(babel()) // babel 编译 ES6
    // .pipe(uglify()) // 压缩 js
    .pipe(named()) // 配合 webpack 禁用 chunkHash 命名文件
    .pipe(webpack(webpackConf))
    .pipe(sourceMaps.init())
    .pipe(rename({ suffix: '.min' }));
  jsStream = gulpConf.js.isConcat ? jsStream.pipe(concat('bundle.min.js')) : jsStream; // 是否合并文件
  jsStream = jsStream.pipe(sourceMaps.write('./')).pipe(dest(gulpConf.js.dest));
  jsStream = NODE_ENV === 'development' ? jsStream.pipe(browserSync.stream()) : jsStream;
  return jsStream;
}

// 处理 html
async function html(cb) {
  if (NODE_ENV === 'production') {
    await del([gulpConf.html.dest]);
  }
  let options = require('./build/htmlincluder.config'); // gulp-htmlincluder
  let htmlStream = src(gulpConf.html.src).pipe(plumber()).pipe(includer(options));
  htmlStream = htmlStream.pipe(dest(gulpConf.html.dest));
  htmlStream = NODE_ENV === 'development' ? htmlStream.pipe(browserSync.stream()) : htmlStream;
  return htmlStream;
}

// 启动服务, 监听文件变化
function server(cb) {
  let options = {
    watch: true,
    open: gulpConf.server.openBrowser,
    server: {
      baseDir: gulpConf.server.baseDir,
      index: gulpConf.server.index,
    },
    port: gulpConf.server.port,
    host: gulpConf.server.host,
  };
  let startPath = path.join(gulpConf.html.dest, gulpConf.server.index);
  options.startPath = os.type().toLowerCase().includes('windows') && startPath.replace(/\\/gi, '/');
  browserSync.init(options);
  watch(gulpConf.html.src).on('change', series(html, browserSync.reload));
  watch(gulpConf.css.src, parallel(css));
  watch(gulpConf.js.src, parallel(js));
  watch(gulpConf.image.src, parallel(image));
}

exports.dev = parallel(server, css, js, image, html);
exports.build = parallel(css, js, image, html);
