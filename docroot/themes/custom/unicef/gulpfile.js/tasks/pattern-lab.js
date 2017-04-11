var config = require('../config');

var gulp = require('gulp');
var sass = require('gulp-sass');
var run = require('gulp-run');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');
var sassLint = require('gulp-sass-lint');
var sassGlob = require('gulp-sass-glob');
var browserSync  = require('browser-sync');
var watch  = require('gulp-watch');
var svgSprite     = require('gulp-svg-sprite');

// Basic SVG config
var options = {};
options.svgprite = {
  dest: '.',
  mode: {
    symbol: {
        dest: '.',
        sprite: '../images/sprites/symbols/sprites'
    },
    css: {
      bust: false,
    },
    view: {
      bust: false,
      dest: '.',
      sprite: '../images/sprites/sprite.css.svg',
      render: {
        scss: {
          'dest': '../../source/sass/sprites/sprite.scss'
        }
      }
    }
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false
  }
}

config.svg = {
  src: ['./assets/src/images/icons/**/*.svg'],
  destDir: './pattern-lab/source/images/'
};

config.patternLab = {
  dir: './pattern-lab'
};

config.patternsDir = './pattern-lab/source/_patterns';

config.js = {
  srcFiles: [
    './bootstrap/javascripts/bootstrap.min.js'
  ],
  patternDir: './pattern-lab/public/styleguide/js'
}
config.sass = {
  srcFiles: [
    './pattern-lab/source/sass/*.scss'
  ],
  watchFiles: [
    './pattern-lab/source/sass/**/*.scss',
    './pattern-lab/source/_patterns/**/*.scss'
  ],
  options: {
    includePaths: [
      './pattern-lab/source/sass',
      './node_modules/shila-css',
      './node_modules/breakpoint-sass/stylesheets',
      './node_modules/sass-toolkit/stylesheets',
      './node_modules/singularitygs/stylesheets'
    ],
    outputStyle: 'expanded'
  },
  destDir: './pattern-lab/source/css',
  patternDir: './assets/dist/css'
};

// SVG sprite.
gulp.task('pl:svg', function () {
     gulp.src(config.svg.src)
        .pipe(svgSprite(options.svgprite))
        .pipe(gulp.dest(config.svg.destDir));
});

/**
 * Generates Pattern Lab front-end.
 */
gulp.task('pl:generate', function () {
  if (isDirectory(config.patternLab.dir)) {
    return run('php ' + config.patternLab.dir + '/core/console --generate').exec();
  }
});

/**
 * Run Pattern Lab front-end server.
 */
gulp.task('pl:server', function () {
  if (isDirectory(config.patternLab.dir)) {
    return run('php ' + config.patternLab.dir + '/core/console --server --with-watch').exec();
  }
});

/**
 * Compiles Sass files.
 */
gulp.task('pl:sass', function () {
  return gulp.src(config.sass.srcFiles)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass.options).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.sass.destDir)) // pattern-lab folder
    .pipe(gulp.dest(config.sass.patternDir)); // assets folder
    //.pipe(browserSync.stream({match: '**/*.css' }));
    ;
});

// Helper functions.
function isDirectory(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  }
  catch (err) {
    return false;
  }
}

/**
 * Task sequence to run when Sass files have changed.
 */
gulp.task('pl:sass-change', function () {
  runSequence('pl:sass', 'pl:generate', 'pl:server');
});

/**
 * Task sequence to run when StarterKit pattern files have changed.
 */
gulp.task('pl:patterns-change', function () {
  runSequence('pl:generate');
});

/**
 * Sets up BrowserSync and watchers.
 */
gulp.task('pl:watch', function () {
  gulp.watch(config.sass.watchFiles, ['pl:sass-change']);
  gulp.watch(config.patternsDir + '/**/*.twig', ['pl:patterns-change']);
});

/**
 * Copy bootstrap js to pattern-lab js folder.
 */
gulp.task('pl:bootstrap', function () {
  gulp.src(config.js.srcFiles)
      .pipe(gulp.dest(config.js.patternDir));
});

/**
 * Gulp default task.
 */
gulp.task('pattern-lab', ['pl:svg', 'pl:bootstrap', 'pl:server', 'pl:watch']);
