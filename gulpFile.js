var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var reactify = require("reactify");

var path = {
    HTML: 'app/src/index.html',
    LIB: 'app/src/lib/*.js',
    ALL: ['app/src/js/*.js', 'app/src/js/*/*.js', 'app/src/index.html', 'app/src/css/*.css'],
    CSS: 'app/src/css/*.css',
    CONCATED_OUT_JS: 'build.js',
    CONCATED_OUT_CSS: 'build.css',
    DEST_BUILD: 'app/dist/build',
    DEST_LIB: 'app/dist/lib',
    DEST: 'app/dist',
    ENTRY_POINT: 'app/src/js/main.js'
};

// Move lib
gulp.task('moveLib', function () {
    gulp.src(path.LIB)
        .pipe(gulp.dest(path.DEST_LIB));
});

// Move html
gulp.task('moveHTML', function () {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

// Concat all CSS codes
gulp.task('buildCSS', function () {
    gulp.src(path.CSS)
        .pipe(concat(path.CONCATED_OUT_CSS))
        .pipe(gulp.dest(path.DEST_BUILD));
});

// Transform JSX to JS
gulp.task('buildJS', function () {
    browserify({
        entries : [path.ENTRY_POINT],
        transform : [reactify]
    })
        .bundle()
        .pipe(source(path.CONCATED_OUT_JS))
        .pipe(gulp.dest(path.DEST_BUILD));
});

// Watch the change of all files
gulp.task('watch', function () {
    gulp.watch(path.ALL, ['transform', 'moveLib', 'moveHTML', 'buildCSS', 'buildJS']);
});

gulp.task('default', ['watch', 'moveLib', 'buildCSS', 'moveHTML', 'buildJS']);


