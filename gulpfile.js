'use strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe($.sass({
      includePaths: require('node-normalize-scss').includePaths,
      outputStyle: 'expanded'
    }))
    .pipe($.autoprefixer({
      browsers: ['last 20 versions']
    }))
    .pipe($.rename((path) => {
      path.extname = '.html'
    }))
    .pipe(gulp.dest('./layouts/partials/styles/'))
})

gulp.task('watch', ['scss'], function () {
  gulp.watch('src/scss/**/*.scss', ['scss'])
})
gulp.task('default', ['watch'])
