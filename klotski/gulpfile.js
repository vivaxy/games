/**
 * @since 15/02/07 下午7:24
 * @author vivaxy
 */
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var del = require('del');
var htmlReplace = require('gulp-html-replace');
var htmlSrc = require('gulp-html-src');
var minifyHtml = require('gulp-minify-html');
var browserSync = require('browser-sync');

var paths = {
    src: {
        root: 'source/',
        html: ['source/index.html'],
        js: [],
        css: []
    },
    dist: {
        root: 'release',
        html: 'index.html',
        js: 'main.js',
        css: 'main.css'
    },
    temp: {
        js: 'main.js',
        css: 'main.css'
    },
    watch: ['source/*']
};

var getJsFileName = function (file) {
    var fileName = file.attr('src');
    if (fileName !== '/ba.js') {
        paths.src.js.push(paths.src.root + fileName);
        return fileName;
    }
    return 'js/null.js';
};

var getCssFileName = function (file) {
    var fileName = file.attr('href');
    paths.src.css.push(paths.src.root + fileName);
    return fileName;
};

gulp.task('get-js', function () {
    return gulp.src(paths.src.html)
        .pipe(htmlSrc({getFileName: getJsFileName}));
});

gulp.task('get-css', function () {
    return gulp.src(paths.src.html)
        .pipe(htmlSrc({presets: 'css', getFileName: getCssFileName}))
});

gulp.task('html', ['clean-dist'], function () {
    return gulp.src(paths.src.html)
        .pipe(htmlReplace({
            js: 'main.min.js',
            css: 'main.min.css'
        }))
        .pipe(minifyHtml())
        .pipe(gulp.dest(paths.dist.root));
});

gulp.task('js', ['clean-dist', 'get-js'], function () {
    return gulp.src(paths.src.js)
        .pipe(concat(paths.temp.js))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dist.root));
});

gulp.task('css', ['clean-dist', 'get-css'], function () {
    return gulp.src(paths.src.css)
        .pipe(concat(paths.temp.css))
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dist.root));
});

gulp.task('build', ['js', 'css', 'html']);

gulp.task('clean-dist', function (cb) {
    return del([paths.dist.root], cb);
});

gulp.task('browser-sync', function () {
    browserSync.init(paths.watch, {
        server: {
            baseDir: './source/'
        }
    });
});

gulp.task('watch', ['browser-sync']);

gulp.task('default', ['build']);
