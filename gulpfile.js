var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var wrapper = require('gulp-wrapper');

gulp.task('build', function() {
	gulp.src([
		'src/helpers.js',
		'src/Registry.js',
	  'src/Injector.js',
	  'src/loader.js',
	  'src/*.js',
	])
	.pipe(concat('renderer-moduleloader.js'))
	.pipe(wrapper({
		header: '(function() {',
		footer: '}());'
	}))
	.pipe(uglify())
	.pipe(gulp.dest('build'));
});