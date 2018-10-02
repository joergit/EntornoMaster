const gulp = require('gulp');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - watch files and folders for changes
*/

// Minify JS
gulp.task('minify', () =>{
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dev/js'));
});

// Compile Sass
gulp.task('sass', () =>{
  gulp.src('dev/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

// Compile Sass
gulp.task('pug', () =>{
  gulp.src('dev/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('src/'));
});

gulp.task('default', ['minify', 'sass', 'pug']);

gulp.task('watch', () =>{
  browserSync({
    server: {
      baseDir: 'src/'
    }
  });
  gulp.watch('dev/sass/*.scss', ['sass']);
  gulp.watch('dev/pug/*.pug', ['pug']);
});