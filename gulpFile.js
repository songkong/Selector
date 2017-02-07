var gulp = require('gulp');
var concat = require('gulp-concat');
// var uglify =  require('gulp-uglify');
// var babel = require('gulp-babel');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

var path = {
    HTML: 'app/src/index.html',
    LIB: 'app/src/lib/*js',
    ALL: ['app/src/js/*.js', 'app/src/js/*/*.js', 'app/src/index.html', 'app/src/css/*.css'],
    JS: ['app/src/js/*.js', 'app/src/js/*/*.js'],
    CSS: 'app/src/css/*.css',
    CONCATED_OUT_JS: 'build.js',
    CONCATED_OUT_CSS: 'build.css',
    DEST_SRC: 'app/dist/src',
    DEST_BUILD: 'app/dist/build',
    DEST_LIB: 'app/dist/lib',
    DEST: 'app/dist'
};

// Transform JSX to JavaScript
gulp.task('transform',function () {
    gulp.src(path.JS)
        .pipe(react())
        .pipe(gulp.dest(path.DEST_SRC));
});

// Watch the change of all files
gulp.task('watch', function () {
    gulp.watch(path.ALL, ['transform', 'moveLib', 'replace', 'buildJS', 'buildCSS']);
});
// Move lib
gulp.task('moveLib', function () {
    gulp.src(path.LIB)
        .pipe(gulp.dest(path.DEST_LIB));
});
// Concat all JS codes
gulp.task('buildJS', function () {
    gulp.src(path.JS)
        .pipe(react())
        .pipe(concat(path.CONCATED_OUT_JS))
        .pipe(gulp.dest(path.DEST_BUILD));
});

// Concat all CSS codes
gulp.task('buildCSS', function () {
    gulp.src(path.CSS)
        .pipe(concat(path.CONCATED_OUT_CSS))
        .pipe(gulp.dest(path.DEST_BUILD));
});
// Move html
gulp.task('replace', function () {
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'build/' + path.CONCATED_OUT_JS,
            'css': 'build/' + path.CONCATED_OUT_CSS
        }))
        .pipe(gulp.dest(path.DEST));
});

gulp.task('default', ['watch', 'moveLib', 'transform', 'replace', 'buildJS', 'buildCSS']);

