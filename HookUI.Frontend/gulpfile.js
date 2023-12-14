const gulp = require('gulp');
const esbuild = require('esbuild');
const fs = require('fs-extra'); // fs-extra is an extended version of Node's fs module

gulp.task('build-jsx', function (done) {
    esbuild.build({
        entryPoints: ['src/js/hookui.js'],
        outdir: 'dist',
        bundle: true,
        platform: 'browser',
        loader: {
            '.js': 'jsx',
            '.jsx': 'jsx'
        }
        // Add other esbuild options as needed
    }).then(() => {
        // After successful build, copy the file to the target directory
        fs.copySync(
            'dist/hookui.js',
            "../HookUI/Resources/hookui.js"
        );
        done();
    }).catch((error) => {
        console.error(error);
        done(new Error('Build failed'));
    });
});

gulp.task('default', gulp.series('build-jsx'));
