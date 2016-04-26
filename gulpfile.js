var gulp = require('gulp');
var zip = require('gulp-zip');
var less = require('gulp-less');
var rename = require('gulp-rename');
var server = require('http-server');
var exec = require('child_process').exec;
var webpack = require('webpack-stream');
var package = require('./package.json');
var configures = require('./webpack.config');

// Zip files.
gulp.task('zip', function () {
  gulp.src(['./**', '!./node_modules', '!./node_modules/**'])
      .pipe(zip(package.name +'-'+ package.version +'.zip'))
      .pipe(gulp.dest('./'));
});

// Compile less file.
gulp.task('less', function () {
  gulp.src('./src/**/'+ package.name +'.less')
    .pipe(less())
    .pipe(rename(function (path) {
      path.extname = '.css';
      path.dirname = 'stylesheet';
    }))
    .pipe(gulp.dest('dist'));
});

// Compile jsx/es6 file.
gulp.task('webpack', function () {
  gulp.src(['./src/**/**.jsx', './src/**/**.es6'])
    .pipe(webpack(configures))
    .pipe(rename(function (path) {
      path.dirname = 'javascript';
    }))
    .pipe(gulp.dest('dist'));
});

// Watch less file.
gulp.task('watch:less', function () {
  gulp.watch('./src/**/**.less', ['less']);
});

// Watch jsx/es6 file.
gulp.task('watch:jsx', function () {
  gulp.watch(['./src/**/**.jsx', './src/**/**.es6'], ['webpack']);
});

// Run server.
gulp.task('server:start', function () {
  exec('./node_modules/http-server/bin/http-server -p 4000 -c-1');
});

gulp.task('default', ['less', 'webpack', 'watch:less', 'watch:jsx', 'server:start']);
