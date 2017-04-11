var config = require('../config');
if(!config.tasks.svg) return;

var gulp          = require('gulp');
var path          = require('path');
var svgSprite     = require('gulp-svg-sprite');

var paths = {
    src: path.join(config.root.src, config.tasks.svg.src, '**/*.' + config.tasks.svg.extension),
    dest: path.join(config.tasks.svg.dest),
    spriteDest: path.join(config.tasks.svg.spriteDest)
};

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
      //example: false, // Enable this option if would like to create an html template
    },
    view: {
      bust: false,
      dest: '.',
      sprite: '../images/sprites/sprite.css.svg',
      render: {
        scss: {
          'dest': '../sass/sprites/_sprite.scss'
        }
      }
    }
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false
  }
}

// SVG sprite
gulp.task('svg', function () {
     gulp.src(paths.src)
        .pipe(svgSprite(options.svgprite))
        .pipe(gulp.dest(paths.dest));
});
