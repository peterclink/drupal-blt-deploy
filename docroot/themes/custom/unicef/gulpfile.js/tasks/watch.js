var config = require('../config');
var gulp   = require('gulp');
var watch  = require('gulp-watch');
var path   = require('path');

var watchTask = function () {
    var watchables = ['clean', 'html', 'images', 'css', 'js'];

    watchables.forEach(function (taskName) {
        var task = config.tasks[taskName];

        if (task) {
            var glob = path.join(config.root.src, task.src, '/**/*.{' + task.extensions.join(',') + '}');
            watch(glob, function () {
                require('./' + taskName)();
            });
        }
    });
};

gulp.task('watch', ['browserSync'], watchTask);
module.exports = watchTask;
