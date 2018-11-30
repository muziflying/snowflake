var gulp = require('gulp')
var babel = require('gulp-babel')
var uglify = require('gulp-uglify')

gulp.task('babel', function() {
  return gulp.src('src/snowFlower.js')
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(gulp.dest('lib/dist'))
})

gulp.task('min', function () {
  return gulp.src('src/snowFlake.es5.js')
    .pipe(uglify())
    .pipe(gulp.dest('lib/min'))
})

gulp.task('default', ['min'])
