var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var reactify = require("reactify");

var path = {
    HTML: 'app/src/index.html',
    ALL: ['app/src/js/*.js', 'app/src/js/*/*.js', 'app/src/index.html', 'app/src/css/*.css'],
    CSS: 'app/src/css/*.css',
    CSS_VENDOR: 'app/src/css/vendor/**',
    CONCATED_OUT_JS: 'build.js',
    CONCATED_OUT_CSS: 'build.css',
    DEST_BUILD: 'app/dist/build',
    DEST: 'app/dist',
    DEST_VENDOR: 'app/dist/vendor',
    ENTRY_POINT: 'app/src/js/main.js'
};

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
gulp.task('copyCSS', function () {
    gulp.src(path.CSS_VENDOR)
        .pipe(gulp.dest(path.DEST_VENDOR));
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
    gulp.watch(path.ALL, [ 'moveHTML', 'buildCSS', 'buildJS', 'copyCSS']);
});

gulp.task('default', ['watch', 'buildCSS', 'moveHTML', 'buildJS', 'copyCSS']);


