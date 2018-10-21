var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('html', function() {
    return gulp.src('src/view/main.pug')
        .pipe(pug())
        .pipe(gulp.dest('build/html'))
});


gulp.task('sass', function() {
    return gulp.src('src/view/**/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("bundle.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/css'));
});

/*gulp.task('js', function(){
  return gulp.src('client/javascript/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});*/


gulp.task('default', [ 'html', 'sass' /*, 'js'*/ ]);