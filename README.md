## gulp 小型项目构建工具

```bash
  npm start # 启动开发环境
  npm run dev # 启动开发环境
  npm run build # 启动生产环境构建
```

一个用于快速构建小型项目开发生产环境的工具，主要功能包括 sass 编译，ES6 编译及垫片功能（兼容到 IE9），html 页面组件写法，浏览器刷新, 可以自定义源文件目录和编译输出目标目录，编译压缩后的 css 和 js 以\*.min.\* 结尾, 同时自动生成相应的 .map 文件便于调试

### 开发流程

1. 执行 npm install 安装项目运行依赖
2. 执行 npm start 或者 npm run dev 命令启动开发环境
3. gulp 读取 build/gulp.config.js 中的配置项, 按照配置项的源路径和目标路径编译生成相应压缩文件(\*.min.css | \*.min.js), 其中 src 为源文件配置项,支持 [glob](https://www.gulpjs.com.cn/docs/getting-started/explaining-globs/) 文件匹配模式, dest 为输出文件路径, isConcat 为是否合并为一个文件, 可以根据需要修改默认配置,详见下方配置项

   ```html
   // 非合并文件编译压缩后手动在页面引入
   <link href="dist/css/*.min.css" />
   <script src="dist/js/*.min.js"></script>
   ```

   - css 合并后生成 index.min.css
   - js 合并后生成 bundle.min.js

   ```html
   // 合并后文件手动在页面引入
   <link href="dist/css/index.min.css" />
   <script src="dist/js/bundle.min.js"></script>
   ```

4. 开发环境下, gulp 监听 build/gulp.config.js 中 css, image, js, html 配置项 src 目录中文件的变化, 自动执行相应的编译压缩任务, 同时会通知浏览器刷新页面, gulp 不会主动删除所有配置项 dest 目标目录
5. gulp 集成 webpack 工具, 读取 build/webpack.config.js 文件, 将模块中使用的第三方库抽离生成公共文件 chunk-vendor.min.js, 此文件存放在 js 配置项的 dest 目标目录下, 此文件需要手动在页面中引入

   ```html
   // 手动在页面引入
   <script src="dist/js/chunk-vendor.min.js"></script>
   ```

   ```javascript
   // 使用第三方库
   npm i jquery
   import $ from 'jquery';
   ```

6. 如果想在项目中使用依赖库的 CDN 链接并且不想把依赖库打包进来, 则需要修改 build/webpack.config.js 文件中的 externals 配置项, 同时在页面中手动添加依赖库的 CDN 链接

   ```html
   // 手动在页面引入
   <script src="dist/js/jquery.min.js"></script>
   ```

   ```javascript
   // 使用第三方库
   {
     "externals": {
       // jquery: 'jQuery',
     }
   }
   ```

7. gulp 读取 build/htmlincluder.config.js 文件, 此配置文件主要用于覆盖 [gulp-htmlincluder](https://github.com/internetErik/gulp-htmlincluder) 的配置项, 一般不需要修改, 详见下方配置项，使用语法详见 docs/htmlincluder/dist/pages/index.html

   - 导入文件:

     导入的文件名以 - 开头, - 开头的文件会被忽略掉不被编译打包, 编译后的文件名以当前文件名命名

     ```html
     <!--#insert path="./components/-nav.html" -->
     ```

   - 当前文件中的内容插入到目标文件指定位置（类似于插槽）

     目标文件名以 \_ 开头命名, \_ 开头的文件会被忽略掉不被编译打包, 编译后的文件名以当前文件名命名

     插入的内容：标记内的内容被渲染到目标文件指定位置

     ```html
     <!--#wrap path="./_wrap.html" -->
     <div>
       <h4>Hello Wrap</h4>
     </div>
     <!--#endwrap -->
     ```

     目标文件：当前标记可以在任何位置

     ```html
     <!--#middle -->
     ```

   - 文件内使用数据

     ```html
     <script>
       // jsonPath: 指定 rawJson 对象中的 key
       // rawJson: JS 对象，可以为一个立即执行函数表达式, 返回一个对象
       // default: 默认值
     </script>
     <!--#data jsonPath="name" rawJson="{name:'hello gulp-htmlincluder'}" default="hello world"-->
     ```

   - 使用判断

     ```html
     <!--#if jsonPath="flag" rawJson="{flag:true}"-->
     <p>类型为真的判断</p>
     <!--#endif-->
     ```

   - 使用循环

     - 遍历数组

       ```html
       <ul>
         <!--#each jsonPath="this" rawJson="[1, 2, 3]"-->
         <li>
           <!--#data jsonPath="this"-->
         </li>
         <!--#endeach -->
       </ul>
       ```

     - 遍历对象

       ```html
       <ul>
         <!--#each jsonPath="this" rawJson="[
          {name:'tom',age:18},
          {name:'jerry',age:19},
          {name:'jack'}
         ]"-->
         <li>
           <span>name</span>
           <span>
             <!--#data jsonPath="name"-->
           </span>
           <span>age</span>
           <span>
             <!--#data jsonPath="age" default="99"-->
           </span>
         </li>
         <!--#endeach-->
       </ul>
       ```

   - 忽略内容

     - 忽略之外的内容

       ```html
       <!--#clipbefore -->
       此处内容正常编译, 其他内容被忽略
       <!--#clipafter  -->
       ```

     - 忽略之内的内容

       ```html
       <!--#clipbetween -->
       此处的内容会被忽略, 其他内容正常编译
       <!--#endclipbetween -->
       ```

8. 生产环境下, gulp 首先执行清除任务, 将所有配置项的 dest 目标目录清除后再执行编译构建任务, 默认不会启动文件监听任务

### 开发注意事项

- ES6 以上 API 兼容 IE 9 用法: 需要手动在模块内导入以下包 [babel 7.4.0 版本 @babel/polyfill 包被废弃](https://babeljs.io/docs/en/babel-polyfill) | [Babel 新的提案](https://babeljs.io/docs/en/plugins-list#es2021)

  - import "core-js/stable";
  - import "regenerator-runtime/runtime";

- 构建工具默认没有安装任何项目运行依赖的库,可以根据需要自己手动安装引入依赖库, 例如 jquery, lodash 等

  ```html
  // 手动在页面引入
  <script src="dist/js/chunk-vendor.min.js"></script>
  ```

  ```javascript
  // 使用第三方库
  npm i jquery
  import $ from 'jquery';
  ```

- 如需要使用依赖库的 CDN 链接, 则需要修改 build/webpack.config.js 文件中的 externals 配置项, 同时需要手动在页面中添加 CDN 链接

  ```html
  // 手动在页面引入
  <script src="dist/js/jquery.min.js"></script>
  ```

  ```javascript
  // 使用第三方库
  {
    "externals": {
      /* jquery: 'jQuery', */
    }
  }
  ```

### 待办

- 依赖库 CDN 链接自动导入

### 配置文件说明

#### gulp.config.js

```javascript
{
  "css": {
    // css 的源目录, 使用 glob 文件匹配模式, 可修改
    "src": ["src/css/**/*.scss", "!src/css/**/*.map"],
    // 编译压缩后的 css 目标目录，可修改
    "dest": "dist/css",
    "isConcat": false // 是否将所有文件压缩成一个文件
  },
  "image": {
    // 图片的源目录, 使用 glob 文件匹配模式, 可修改
    "src": ["src/images/**/*"],
    // 图片的目标目录, 可修改
    "dest": "dist/images"
  },
  "js": {
    // js 的源目录，使用 glob 文件匹配模式, 可修改
    "src": ["src/js/**/*.js", "!src/js/**/*.min*"],
    // 编译压缩后的 js 目标目录，可修改
    "dest": "dist/js",
    // 是否将所有文件压缩成一个文件, 允许只是拼接压缩多个文件并不会优化代码逻辑
    "isConcat": false
  },
  "html": {
    // html 的源目录，使用 glob 文件匹配模式, 可修改
    "src": ["src/pages/**/*.html"],
    // 编译后的 html 目标目录, 可修改
    "dest": "dist/pages"
  },
  "libs": {
    // 依赖库 的源目录，使用 glob 文件匹配模式, 可修改
    "src": ["src/libs/**/*"],
    // 依赖库目标目录, 可修改
    "dest": "dist/libs"
  },
  "server": {
    "port": 8080, // 开发环境的端口号
    "host": "localhost", // 开发环境的域名
    "openBrowser": true, // 开发环境是否自动打开浏览器
    "baseDir": "./", // 开发环境应用路径
    "index": "index.html" // 开发环境默认页面
  }
}
```

#### webpack.config.js

```javascript
{
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ["babel-loader"],
        /* @babel/plugin-transform-runtime 无法对某些实例方法(includes, assign...)进行垫片处理, 需要手动引入 polyfill
        require.ensure 以及 AMD 采用异步式调用,在 IE 浏览器中报错  Promise not defined,
        webpack生成的 new Promise 相关代码, 超出了 babel-runtime 的控制范围，只有 polyfill 全局的 Promise 才能解决此问题
        */
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all", // async, initial 表示哪些 chunk 进行优化
      name: "chunk-vendor",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, //打包第三方库
          priority: 10, // 优先级
        },
      },
    },
  },
  externals: {
    // jquery: 'jQuery',
  }
}
```

#### htmlincluder.config.js

```javascript
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
{ "dev": {} }
```

### 目录

- src 源目录
  - images 图片目录
  - css sass 文件目录
  - js js 目录
  - libs 依赖库目录
  - pages 页面目录
- dist 生产环境目录
- docs 文档目录
- build gulp 任务运行配置文件目录
  - gulp.config.js 配置 gulp 任务工作流程文件
  - webpack.config.js webpack 配置文件
  - htmlincluder.config.js 页面模板配置文件
- .babelrc babel 配置文件
- .browserslistrc 浏览器版本配置文件
