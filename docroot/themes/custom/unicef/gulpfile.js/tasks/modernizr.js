var config = require('../config');
if(!config.tasks.modernizr) return;

var gulp        = require('gulp');
var modernizr   = require('gulp-modernizr');
var browserSync = require('browser-sync');
var path        = require('path');
var gutil        = require('gulp-util');
var uglify        = require('gulp-uglify');

var paths = {
    src: path.join(config.root.src, config.tasks.modernizr.src, '/**/*.{' + config.tasks.modernizr.extensions + '}'),
    dest: path.join(config.root.dest, config.tasks.modernizr.dest)
};

var modernizrTask = function () {
    return gulp.src(paths.src)
        .pipe(modernizr({
            options: config.tasks.modernizr.options
        }))
        .pipe(gutil.env.type === 'prod' ? uglify() : gutil.noop())
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream());
};

gulp.task('modernizr', modernizrTask);
module.exports = modernizrTask;
