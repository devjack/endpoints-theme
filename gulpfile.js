// A simple gulp task
// Based on th work done for sudqh/minimal: https://github.com/sudhq/minimal/blob/master/gulpfile.js

// Load plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass');
    // browserSync = require('browser-sync').create('minimal'),
    // browserReload = browserSync.reload;

// Allows gulp to not break after a sass error.
// Spits error out to console
function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

// Initialize browser-sync which starts a static server also allows for
// browsers to reload on filesave
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
          baseDir: "static/",
          injectChanges: true
        }
    });
});

// Task that compiles scss files down to good old css
gulp.task('pre-process', function(){
    return gulp.src("src/scss/endpoints.scss")
        .pipe(sass({
          includePaths: require('node-normalize-scss').includePaths
        }))
        .on('error', swallowError)
        // .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('static/css'))
        .pipe(minifyCSS())
        .pipe(rename('endpoints.min.css'))
        // .pipe(gulp.dest('src/css/'))
        .pipe(gulp.dest('static/css/'));
        // .pipe(browserSync.stream({match: '**/*.css'}));
});


/*
   DEFAULT TASK
 • Process sass then auto-prefixes and lints outputted css
 • Starts a server on port 3000
 • Reloads browsers when you change html, javascript or sass files
*/
gulp.task('default', ['pre-process'], function(){
  // // gulp.start('pre-process');
  // gulp.watch('src/scss/*', ['pre-process']);
  // /*gulp.watch('src/*.html', ['html']);*/
  // /*gulp.watch('public/*.html', browserReload);*/
});

gulp.task('watch', ['pre-process'], function() {
    gulp.watch('src/scss/**/*', ['pre-process']);
})
