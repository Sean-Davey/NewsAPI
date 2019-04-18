'use strict';

// Require all gulp modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');
var del = require('del');

// Testing gulp is functional
gulp.task('hello', function() {
    console.log("Hello!");
});

// Compile style SCSS file to CSS and initialize maps to show errors in temrinal and proper location in inspect element
gulp.task('compileSCSS', function(){
    gulp.src("scss/style.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('dist/css'));
});

// Watch SCSS but also run the compile function from above that's included in the watch
gulp.task('watch-scss', function() {
    gulp.watch('scss/**/*.scss', ['compileSCSS'])
});

// Combine each js script into one main app.js script
gulp.task('concatScripts', function(){
    gulp.src([
        'js/main.js', 
        'js/app.js'
    ])
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest("js"));
});


// Minify the app script and uglify it
gulp.task('minifyScripts', function() {
    gulp.src('dist/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'));
    gulp.src('node_modules/jquery/dist/jquery.js')
    .pipe(rename('jquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Minify and Uglify SCSS to CSS for build 
gulp.task('minifySCSS', function() {
    gulp.src('scss/style.scss')
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('dist/css'));
});

// Running both the minifyScripts and SCSS tasks to prepare the build 
gulp.task('buildFiles',['minifyScripts', 'minifySCSS']);