var config = require('../config');
if(!config.tasks.js) return;

var gulp        = require('gulp');
var fs          = require("fs");
var browserify  = require("browserify");
var babelify    = require("babelify");
var source      = require('vinyl-source-stream');
var gutil       = require('gulp-util');
var path        = require('path');
var browserSync = require('browser-sync');
var uglify      = require('gulp-uglify');
var buffer      = require('vinyl-buffer');
var watchify    = require('watchify');

var paths = {
    src: path.join(config.root.src, config.tasks.js.src, '/*.' + config.tasks.js.extensions),
    srcFile: path.join(config.root.src, config.tasks.js.src, config.tasks.js.srcName),
    dest: path.join(config.root.dest, config.tasks.js.dest)
};

var jsTask = function () {
  var bundler = browserify({ debug: true })
  .plugin(watchify, {ignoreWatch: ['**/node_modules/**', '**/bower_components/**']}) // Watchify to watch source file changes
  .transform(babelify)
  .require(paths.srcFile, { entry: true })
  .bundle()
  .on('error',gutil.log)
  .pipe(source(config.tasks.js.destName))
  .pipe(buffer())
  .pipe(gutil.env.type === 'prod' ? uglify() : gutil.noop())
  .pipe(gulp.dest(paths.dest))
  .pipe(browserSync.stream());

  bundler.on('update', function () {
      bundle(bundler); // Re-run bundle on source updates
  });
};

gulp.task('js', jsTask);
module.exports = jsTask;
