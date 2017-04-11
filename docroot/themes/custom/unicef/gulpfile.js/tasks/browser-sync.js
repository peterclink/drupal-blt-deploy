if (global.production) return

var config      = require('../config');
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var path        = require('path');

var browserSyncTask = function () {
    /*Uncomment when you need to use browserSync task
    browserSync.init(config.tasks.browserSync);
    */
};

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;
