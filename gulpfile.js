var gulp = require('gulp');
var concat = require('gulp-concat');
var gls = require('gulp-live-server');

gulp.task('scripts', function() {
    return gulp.src('./www/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('serve', function() {

    var server = gls.static('www', 3000);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop) 
    gulp.watch(['www/**/*.css', 'www/**/*.html', 'www/**/*.js'], server.notify);
});



gulp.task('default', function() {

});