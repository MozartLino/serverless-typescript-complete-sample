'use strict';

const gulp = require('gulp');
const tslint = require('gulp-tslint');
const shell = require('gulp-shell');

gulp.task('tslint', () => {
  return gulp
    .src('src/**/*.ts')
    .pipe(
      tslint({
        formatter: 'prose',
      })
    )
    .pipe(tslint.report());
});

gulp.task('compile', shell.task('tsc'));

gulp.task(
  'build',
  gulp.series(['tslint', 'compile'], (done) => {
    console.log('Building the project ...');
    done();
  })
);
