const {watch, parallel, src, dest} = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const less = require('gulp-less');
// const sourcemaps = require('gulp-sourcemaps');

const config = {
   entry: {
      dir: './src/',
      js: 'app.js',
      html: 'index.html',
      styles: '*.less'
   },
   output: {
      dir: './dist/',
      html: './dist/index.html',
      js: 'app.js',
      styles: 'app.css'
   }
};

const serve = (done) => {
   browserSync.init({
      server: {
         baseDir: "./"
      },
      port: 3000,
      notify: false
   });
   done();
};

const reload = (file) => {
   browserSync.reload(file);
};

const watchFiles = () => {
   watch([config.entry.dir + '*.less'], styles);
   watch([config.entry.dir + '*.js'], javascript);
};

const javascript = (done) => {
   browserify({debug: false, standalone: 'NicePopup'})
      .transform(babelify.configure({
         presets: ['@babel/preset-env', 'minify'],
         comments: false
      }))
      .require(config.entry.dir + config.entry.js, {
         entry: true
      })
      .bundle()
      .pipe(source(config.output.js))
      .pipe(dest(config.output.dir));

   reload(config.entry.js);
   done();
};

const styles = (done) => {
   src(config.entry.dir + '*.less')
      .pipe(less())
      .pipe(browserSync.reload({stream: true}))
      .pipe(dest(config.output.dir));

   done();
};

exports.watch = parallel(serve, watchFiles);