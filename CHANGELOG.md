### 注意事项

- 打包代码目录在 build/gulp.config.js 中手动修改, 默认
  - src/css sass 目录
  - src/images img 目录
  - src/js js 目录
  - src/pages html 目录
- 如果打包其他项目目录(代码结构一致), 可以修改 build/gulp.config.js 中 baseDir 配置项
- 开发环境默认服务器 localhost:8080, 可以在 build/gulp.config.js 中覆盖配置
- 依赖库需要手动安装依赖,或者使用其他 CDN 链接在页面手动引入
- ES6 兼容 IE 需要手动引入 `core-js/stable`, `regenerator-runtime/runtime`
- 合并后的 css 文件名为 index.min.css
- 合并后的 js 文件名为 bundle.min.js

#### 开发环境

```bash
  npm run dev
```

#### 生产环境

```bash
  npm run build
```
