import gulp from 'gulp'
import './gulp/dev.js'
import './gulp/docs.js'

gulp.task('default', gulp.series('clean:dev',
    gulp.parallel('html:dev', 'styles:dev', 'js:dev', 'utils:dev', 'icons:dev', 'images:dev', 'fonts:dev', 'mailer:dev'),
    gulp.parallel('watch:dev', 'server:dev')))

gulp.task('docs', gulp.series('clean:docs',
    gulp.parallel('html:docs', 'styles:docs', 'js:docs', 'utils:docs', 'icons:docs', 'images:docs', 'fonts:docs', 'mailer:docs'),
    gulp.parallel('server:docs')))