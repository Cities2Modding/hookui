const gulp = require('gulp');
const esbuild = require('esbuild');
const fs = require('fs-extra');
const path = require('path');

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
        // Define the path to the LocalLow folder
        const localLowPath = path.join(process.env.USERPROFILE, 'AppData', 'LocalLow');
        // Define the complete destination path for LocalLow
        const localLowDestPath = path.join(localLowPath, 'Colossal Order', 'Cities Skylines II', 'Mods', 'HookUI', 'hookui.js');

        // Copy the file to the LocalLow target directory
        fs.copySync('dist/hookui.js', localLowDestPath, { overwrite: true });

        // Define the destination path for "../HookUI/Resources/hookui.js"
        const hookUIDestPath = path.resolve(__dirname, "../HookUI/Resources/hookui.js");

        // Copy the file to the "../HookUI/Resources/hookui.js" directory
        fs.copySync('dist/hookui.js', hookUIDestPath, { overwrite: true });

        done();
    }).catch((error) => {
        console.error(error);
        done(new Error('Build failed'));
    });
});

gulp.task('default', gulp.series('build-jsx'));
