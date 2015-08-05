var gulp = require('gulp');
var concat = require('gulp-concat');
var gls = require('gulp-live-server');
var vendor = require('gulp-concat-vendor');
var uglify = require('gulp-uglify');
var del = require('del');




gulp.task('lib', function() {
	gulp.src('./www/js/lib/*')
		.pipe(vendor('lib.js'))
		.pipe(gulp.dest('./www/js/'));
});

gulp.task('vendor', function() {
	gulp.src('./www/js/vendor/*')
		.pipe(vendor('vendor.js'))
		.pipe(gulp.dest('./www/js/'));
});

gulp.task('concat', function() {
	return gulp.src(['./www/js/lib.js', './www/js/vendor.js'])
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('transport', function() {
	return gulp.src('./www/js/page-*.js')
		.pipe(gulp.dest('./build/'));
});


gulp.task('compress', function() {
  return gulp.src('build/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {

	var server = gls.static('www', 3000);
	server.start();

	//use gulp.watch to trigger server actions(notify, start or stop) 
	gulp.watch(['www/**/*.css', 'www/**/*.html', 'www/**/*.js'], server.notify);
});

gulp.task('build', ['lib', 'vendor', 'concat', 'compress']);


gulp.task('default', function() {

});

