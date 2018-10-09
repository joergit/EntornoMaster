const gulp = require('gulp')
const browserSync = require('browser-sync')
const uglify = require('gulp-uglify-es').default
const sass = require('gulp-sass')
const pug = require('gulp-pug')
/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - watch files and folders for changes
*/

// Minify JS
gulp.task('minify', () => {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dev/js'))
    .pipe(browserSync.stream());
})

// Compile Sass
gulp.task('sass', () => {
  gulp.src('dev/sass/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
})

// Compile Pug
gulp.task('pug', () => {
  gulp.src('dev/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('src/'))
    .pipe(browserSync.stream());
})

gulp.task('default', ['minify', 'sass', 'pug'])

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: 'src/'
    }
  })
  gulp.watch('dev/sass/*.scss', ['sass'])
  gulp.watch('dev/pug/*.pug', ['pug'])
  gulp.watch('src/js/*.js', ['minify'])
  gulp.watch('src/index.html').on('change', browserSync.reload)
})
