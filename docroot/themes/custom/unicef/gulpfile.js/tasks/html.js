var config = require('../config');
if(!config.tasks.html) return;

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var changed     = require('gulp-changed');
var path        = require('path');

var paths = {
    src: path.join(config.root.src, config.tasks.html.src, '/**/*.{' + config.tasks.html.extensions + '}'),
    dest: path.join(config.root.dest, config.tasks.html.dest)
};

var htmlTask = function () {
    return gulp.src(paths.src)
        .pipe(changed(paths.dest))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream());
};

gulp.task('html', htmlTask);
module.exports = htmlTask;
