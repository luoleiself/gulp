module.exports = {
  css: {
    src: ['src/css/**/*.scss', '!src/css/**/*.map'],
    dest: 'dist/css',
    isConcat: false,
  },
  image: {
    src: ['src/images/**/*'],
    dest: 'dist/images',
  },
  js: {
    src: ['src/js/**/*.js', '!src/js/**/*.min*'],
    dest: 'dist/js',
    isConcat: false,
  },
  html: {
    src: ['src/pages/**/*.html'],
    dest: 'dist/pages',
  },
  server: {
    port: 8080,
    host: 'localhost',
    openBrowser: false,
    baseDir: './',
    index: 'index.html',
  },
};
