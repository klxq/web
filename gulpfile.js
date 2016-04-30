var gulp = require('gulp');

var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

// when gulp get exception
// notify notice error message
// plumber keep gulp watch continue
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

var browserSync = require('browser-sync').create();

// less
gulp.task('less', function () {
  // ! exclude
  // * *.less all less file
  // ** all nested directory
  // {} {a, b}.less only include a.less and b.less
  gulp.src('src/style/**/*.less')
      .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(cssmin())
      .pipe(gulp.dest('dest/style'))
      .pipe(browserSync.reload({stream: true}));
});

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'src/index.html'
    }
  });

  gulp.watch('style/base/**/*.less', ['less']);
  gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['less', 'browser-sync']);
