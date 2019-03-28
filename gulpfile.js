const {watch, parallel, dest} = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
// const sourcemaps = require('gulp-sourcemaps');

const config = {
   entry: {
      dir: './src/',
      js: 'app.js',
      html: 'index.html'
   },
   output: {
      dir: './dist/',
      html: './dist/index.html',
      js: 'app.js'
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
   // watch([config.entry.html], html);
   watch([config.entry.dir + '*.js'], javascript);
};

const javascript = (done) => {
   browserify({ debug: true })
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

exports.watch = parallel(serve, watchFiles);