import gulp from 'gulp'
import clean from 'gulp-clean'
import browserSync from 'browser-sync'
import fileInclude from 'gulp-file-include'
import htmlmin from 'gulp-htmlmin'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import rename from 'gulp-rename'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import babel from 'gulp-babel'
import minify from 'gulp-minify'
import concat from 'gulp-concat'
import imagemin from 'gulp-imagemin'
import changed from 'gulp-changed'

const sass = gulpSass(dartSass)

gulp.task('clean:docs', () => {
    return gulp.src('./dist', { read: false, allowEmpty: true })
        .pipe(clean({ force: true }))
})

gulp.task('server:docs', () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
})

const plumberConfig = (title) => {
    return {
        errorHandler: notify.onError({
            title,
            message: 'Error <%= error.message %>',
            sound: false
        })
    }
}

gulp.task('html:docs', () => {
    return gulp.src('./src/*.html')
        .pipe(changed('./dist'))
        .pipe(plumber(plumberConfig('HTML')))
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
})

gulp.task('styles:docs', () => {
    return gulp.src('./src/sass/**/*.+(scss|sass)')
        .pipe(changed('./dist/css'))
        .pipe(plumber(plumberConfig('Styles')))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({
            prefix: '',
            suffix: '.min'
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('js:docs', () => {
    return gulp.src(['./src/js/*.js', '!./src/js/utils.js'])
        .pipe(changed('./dist/js'))
        .pipe(plumber(plumberConfig('JS')))
        .pipe(babel())
        .pipe(concat('script.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('utils:docs', () => {
    return gulp.src('./src/js/utils.js')
        .pipe(plumber(plumberConfig('Utils')))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream())
})

gulp.task('icons:docs', () => {
    return gulp.src('./src/icons/**/*')
        .pipe(changed('./dist/icons'))
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest('./dist/icons'))
})

gulp.task('images:docs', () => {
    return gulp.src('./src/img/**/*')
        .pipe(changed('./dist/img'))
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('fonts:docs', () => {
    return gulp.src("./src/fonts/**/*")
        .pipe(changed('./dist/fonts'))
        .pipe(gulp.dest("./dist/fonts"))
})

gulp.task('mailer:docs', () => {
    return gulp.src("./src/mailer/**/*")
        .pipe(changed('./dist/mailer'))
        .pipe(gulp.dest("./dist/mailer"))
})