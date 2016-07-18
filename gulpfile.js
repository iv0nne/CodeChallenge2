var gulp = require('gulp');


var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


gulp.task('lint',function () {
    return gulp.src("CodeChallenge2-IvonneMercado/scripts/*.js")
       .pipe(jshint())
        .pipe(jshint.reporter('default'));
 });

gulp.task('less', function () {
    return gulp.src("CodeChallenge2-IvonneMercado/styles/*.less")
        .pipe(less())
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/styles'));
});
gulp.task('mytask',function () {
console.log("hola Amigos !")
});
gulp.task('production',['less'], function () {
    return gulp.src("CodeChallenge2-IvonneMercado/scripts/*.js")
        .pipe(jshint())
        .pipe(concat('todo.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename('todo.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
});



gulp.task('watch', function () {
    gulp.watch("CodeChallenge2-IvonneMercado/scripts/*.js", ['production']);
    gulp.watch("CodeChallenge2-IvonneMercado/styles/*.less" , ['less']);
    gulp.watch("CodeChallenge2-IvonneMercado/styles/*.html" , ['jshint']);

    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});
//Default task
gulp.task('default', ['mytask', 'less', 'lint', 'production', 'watch' ]);