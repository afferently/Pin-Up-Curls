var gulp          = require('gulp');
var minify        = require('gulp-minify');
var imagemin      = require('gulp-imagemin');

gulp.task('images', function() {
  return gulp.src('img/*')
    .pipe(imagemin({
      multipass: true,
      optimizationLevel: 7,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('www/img'));
});

gulp.task('compress', function() {
  gulp.src('js/*.js')
    .pipe(minify({
        ext:{
          src:'-debug.js',
          min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('www/js'))
});

gulp.task('build', ['images', 'compress']);
