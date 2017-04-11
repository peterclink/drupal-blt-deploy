var config = require('../config');
if(!config.tasks.css) return;

var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var path         = require('path');
var gutil        = require('gulp-util');

var paths = {
    src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
    dest: path.join(config.root.dest, config.tasks.css.dest)
};

var cssTask = function () {
    return gulp.src(paths.src)
        .pipe(sass(gutil.env.type === 'prod' ? config.tasks.css.sass : gutil.noop()))
        .on('error', sass.logError)
        .pipe(autoprefixer(config.tasks.css.autoprefixer))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream());
};

gulp.task('css', cssTask);
module.exports = cssTask;
