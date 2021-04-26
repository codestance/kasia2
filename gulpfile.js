const {task, src, dest, parallel, watch} = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    cssmin = require('gulp-clean-css');
    uglify = require('gulp-uglify');

task('style',function(){
    return src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(cssmin({compatibility: 'ie8'}))
        .pipe(dest('./assets'))
        .pipe(browserSync.stream());
});

task('compressJs', function(){
    return src('./js/*.js')
        .pipe(uglify())
        .pipe(dest('./assets'))
});

task('serve', parallel('style', 'compressJs', function(){
    browserSync.init({
        server: "./"
    });
    watch('./scss/*.scss', parallel('style'));
    watch('src/js/.js', parallel('compressJs'));
    watch('./*.html').on('change', browserSync.reload);
}));

task('default', parallel('serve'));