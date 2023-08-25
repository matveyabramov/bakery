import gulp from 'gulp'
import clean from 'gulp-clean'
import browserSync from 'browser-sync'
import fileInclude from 'gulp-file-include'
import htmlmin from 'gulp-htmlmin'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import rename from 'gulp-rename'
import cleanCSS from 'gulp-clean-css'
import sourceMaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import minify from 'gulp-minify'
import concat from 'gulp-concat'
import changed from 'gulp-changed'

const sass = gulpSass(dartSass)

gulp.task('clean:dev', () => {
    return gulp.src('./build', { read: false, allowEmpty: true })
        .pipe(clean({ force: true }))
})

gulp.task('server:dev', () => {
    browserSync.init({
        server: {
            baseDir: './build'
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


gulp.task('html:dev', () => {
    return gulp.src('./src/*.html')
        .pipe(changed('./build', { hasChanged: changed.compareContents }))
        .pipe(plumber(plumberConfig('HTML')))
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream())
})

gulp.task('styles:dev', () => {
    return gulp.src('./src/sass/**/*.+(scss|sass)')
        .pipe(changed('./build/css'))
        .pipe(plumber(plumberConfig('Styles')))
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(rename({
            prefix: '',
            suffix: '.min'
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream())
})

gulp.task('js:dev', () => {
    return gulp.src(['./src/js/*.js', '!./src/js/utils.js'])
        .pipe(changed('./build/js'))
        .pipe(plumber(plumberConfig('JS')))
        .pipe(sourceMaps.init())
        .pipe(concat('script.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
})

gulp.task('utils:dev', () => {
    return gulp.src('./src/js/utils.js')
        .pipe(plumber(plumberConfig('Utils')))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
})

gulp.task('icons:dev', () => {
    return gulp.src('./src/icons/**/*')
        .pipe(changed('./build/icons'))
        .pipe(gulp.dest('./build/icons'))
        .pipe(browserSync.stream())
})

gulp.task('images:dev', () => {
    return gulp.src('./src/img/**/*')
        .pipe(changed('./build/img'))
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.stream())
})

gulp.task('fonts:dev', () => {
    return gulp.src("./src/fonts/**/*")
        .pipe(changed('./build/fonts'))
        .pipe(gulp.dest("./build/fonts"))
        .pipe(browserSync.stream())
})

gulp.task('mailer:dev', () => {
    return gulp.src("./src/mailer/**/*")
        .pipe(changed('./build/mailer'))
        .pipe(gulp.dest("./build/mailer"))
        .pipe(browserSync.stream())
})


gulp.task('watch:dev', () => {
    gulp.watch('./src/sass/**/*.+(scss|sass)', gulp.parallel('styles:dev'))
    gulp.watch('./src/**/*.html', gulp.parallel('html:dev'))
    gulp.watch('./src/icons/**/*', gulp.parallel('icons:dev'))
    gulp.watch('./src/img/**/*', gulp.parallel('images:dev'))
    gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'))
})