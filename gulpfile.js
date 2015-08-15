var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify'),
	buffer = require('gulp-buffer'),
	sourcemaps = require ('gulp-sourcemaps');


gulp.task('default',['scripts', 'lint'], function(){
	gulp.watch('js/src/**/*.js', ['scripts', 'lint']);

});

gulp.task('scripts',['lint'], function(){
	var bundler = browserify({
		entries: ['./js/src/script.js'],
		debug: true
	});

	return bundler.bundle()
		.on('error', function(err) { 
			console.log(err.message); this.emit('end');
			gutil.log('stuff happened', 'Really it did', gutil.colors.cyan('123'));
			gutil.beep();
			this.emit('end');
			})
		.pipe(source('script.dist.js')) //opvragen file die browerify heeft aangemaakt
		.pipe(buffer())					//dan bufferen
		.pipe(sourcemaps.init({loadMaps: true}))		//sourcemap op maken
		.pipe(uglify())					
		.pipe(sourcemaps.write('./', {
			sourceRoot: '../'
		}))
		.pipe(gulp.dest('./js'));  		//wegschrijven
});

gulp.task('lint', function() {
  	gulp.src('./js/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish')); //opmaak tussen reporter
});

