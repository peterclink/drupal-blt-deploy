var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
var gutil        = require('gulp-util');

var serveTask = function (cb) {
    gutil.env.type = 'dev';
    gulpSequence('clean', 'html', 'images', 'fonts', 'svg', 'css', 'js', 'pattern-lab', 'modernizr', 'watch', cb);
};

// gulp serve           -> build for dev
gulp.task('gulp:serve', serveTask);
module.exports = serveTask;
