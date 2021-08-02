//如果没有返回 stream, promise, event emitters, child processes, observables 需要手动调用 cb 标识任务完成
const { src, dest, task, series, parallel, watch } = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const postCSS = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const gulpSass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const includer = require('gulp-htmlincluder'); // html文件导入
const vinylPaths = require('vinyl-paths');
const del = require('del'); // delete files and folders
const named = require('vinyl-named');
const webpack = require('webpack-stream');
const gulpConf = require('./gulp.config');

const NODE_ENV = process.env.NODE_ENV || gulpConf.NODE_ENV || 'production';

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
  cssStream = gulpConf.css.isConcat ? cssStream.pipe(concat('main.min.css')) : cssStream;
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
  // let webpackConf = require('./webpack.config');
  let webpackConf = {
    mode: NODE_ENV,
    module: {
      rules: [
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          use: ['babel-loader'],
          /* @babel/plugin-transform-runtime 无法对某些实例方法(includes, assign...)进行垫片处理, 需要手动引入 polyfill
            require.ensure 以及 AMD 采用异步式调用,在 IE 浏览器中报错  Promise not defined,
            webpack生成的 new Promise 相关代码, 超出了 babel-runtime 的控制范围，只有 polyfill 全局的 Promise 才能解决此问题
          */
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all', // async, initial 表示哪些 chunk 进行优化
        name: 'chunk-vendor',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/, //打包第三方库
            priority: 10, // 优先级
          },
        },
      },
    },
  };

  let jsStream = src(gulpConf.js.src)
    .pipe(plumber())
    // .pipe(babel()) // babel 编译 ES6
    // .pipe(uglify()) // 压缩 js
    .pipe(named()) // 配合 webpack 禁用 chunkHash 命名文件
    .pipe(webpack(webpackConf))
    .pipe(sourceMaps.init())
    .pipe(rename({ suffix: '.min' }));
  jsStream = gulpConf.js.isConcat ? jsStream.pipe(concat('main.min.js')) : jsStream; // 是否合并文件
  jsStream = jsStream.pipe(sourceMaps.write('./')).pipe(dest(gulpConf.js.dest));
  jsStream = NODE_ENV === 'development' ? jsStream.pipe(browserSync.stream()) : jsStream;
  return jsStream;
}

// 处理 html
async function html(cb) {
  if (NODE_ENV === 'production') {
    await del([gulpConf.html.dest]);
  }
  // gulp-htmlincluder
  // @options = (optional) options for configuring htmlIncluder
  // options.jsonInput         = A json object used to populate data in files
  // options.insertPattern     = The test looked for in order to insert files
  //          (this is so ssi includes can be used instead)
  // options.filePathAttribute = the name used for the file pathing for #insert
  //          and #wrap (default= 'path')
  // options.jsonPathAttribute = the name used for the file pathing for #insert
  //          , #wrap, #data, #jsonInsert (default= 'jsonPath')
  //
  //
  // options.dev.limitIterations = the number of times processFileWithJsonInput will loop
  // options.dev.printIterations = console log each processFileWithJsonInput loop
  // options.dev.printResult = console logs the final output
  // options.dev.printPaths = console logs the output of buildPathFromRelativePath

  // let options = require('./htmlincluder.config');
  let options = { dev: {} };
  let htmlStream = src(gulpConf.html.src).pipe(plumber()).pipe(includer(options));
  htmlStream = gulpConf.html.isConcat ? htmlStream.pipe(concat('index.html')) : htmlStream; // 是否合并文件
  htmlStream = htmlStream.pipe(dest(gulpConf.html.dest));
  htmlStream = NODE_ENV === 'development' ? htmlStream.pipe(browserSync.stream()) : htmlStream;
  return htmlStream;
}

// 启动服务, 监听文件变化
function server(callback) {
  browserSync.init({
    watch: true,
    open: gulpConf.server.openBrowser,
    server: {
      baseDir: gulpConf.server.baseDir,
      index: gulpConf.server.index,
    },
    port: gulpConf.server.port,
    host: gulpConf.server.host,
  });
  watch(gulpConf.html.src).on('change', series(html, browserSync.reload));
  watch(gulpConf.css.src, parallel(css));
  watch(gulpConf.js.src, parallel(js));
  watch(gulpConf.image.src, parallel(image));
}

exports.dev = parallel(server, css, js, image, html);
exports.build = parallel(css, js, image, html);
