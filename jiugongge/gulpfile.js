/**
 * @since 14/12/31 下午5:43
 * @author vivaxy
 */
var fs = require('fs');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var express = require('express');
var path = require('path');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  watch: ['src/*.js'],
  src: ['src/intro.js', 'src/request-animation-frame.js', 'src/messenger.js', 'src/tween.js', 'src/grid.js', 'src/outro.js'],
  dest: 'dest',
  destFileName: 'jiugongge.js'
};

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.watch).on('change', livereload.changed);
});

gulp.task('serve', function () {
  var app = express();
  var port = 3001;
  app.use(express.static(path.join(__dirname, '.')));

  app.post('/*', function (req, res) {
    fs.readFile(path.join(__dirname, req.url), 'utf-8', function (err, data) {
      res.set('Content-Type', 'application/json; charset=utf-8');
      res.send(data);
    });
  });
  app.listen(port);
  console.log('server started on http://127.0.0.1:' + port);
});

gulp.task('build', ['version'], function () {
  return gulp.src(paths.src)
    .pipe(concat(paths.destFileName))
    .pipe(gulp.dest(paths.dest))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('version', function(){
  var config_path = './package.json';
  var packageInfo = JSON.parse(fs.readFileSync(config_path));
  var current_version = packageInfo.version.split('.');
  current_version[2] = parseInt(current_version[2])+1;
  packageInfo.version = current_version.join('.');
  fs.writeFileSync(config_path, JSON.stringify(packageInfo));
});
