const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const sassGlob = require('gulp-sass-globi');
const paths = require('../../config/paths');

gulp.task('sass', function() {
    return gulp.src('assets/src/scss/app.scss', { cwd: paths.root })
        .pipe(sassGlob({ includePaths: [paths.src] }))
        .pipe(sass({
            includePaths: [
                paths.src,
            ],
        }).on('error', sass.logError))
        .pipe(gulp.dest('./assets/dist/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./assets/src/**/*.scss', gulp.parallel(['sass']));
});