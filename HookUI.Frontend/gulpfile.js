"use strict";

const gulp = require('gulp');
const esbuild = require('esbuild');
const fs = require('fs-extra');
const path = require('path');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const replace = require('gulp-replace');

const apiFiles = [
    "src/js/api/_logger.js",
    "src/js/api/helpers/_dom.js",
    "src/js/api/plugins/_plugin-types.js",
    "src/js/api/plugins/_plugin.js",
    "src/js/api/systems/_events.js",
    "src/js/api/systems/_binding-promise.js",
    "src/js/api/systems/_bindings.js",
    "src/js/api/systems/_plugins.js",
    "src/js/api/_core.js",
    "src/js/api/_legacy.js"
];

//import "./systems/_plugins";
// This needs to be compiled in a specific way as it's a library of static
// classes and most bundlers alter the naming etc.
gulp.task('build-core', function () {
    return gulp.src(apiFiles)
        .pipe(concat('hookui.api.js')) // Concatenates files in the specified order
        .pipe(replace(/import [\"'].*?[\"']\;[\n\r]+/g, ""))
        .pipe(eslint()) // Run ESLint
        .pipe(eslint.format()) // Format ESLint results
        .pipe(eslint.failAfterError()) // Stop the task on a lint error
        .pipe(gulp.dest('dist')) // Output the bundled file to the dist directory
        .on('end', () => {
            // Copy the file to the desired locations
            const localLowPath = path.join(process.env.USERPROFILE, 'AppData', 'LocalLow');
            const localLowDestPath = path.join(localLowPath, 'Colossal Order', 'Cities Skylines II', 'Mods', 'HookUI', 'hookui.api.js');
            fs.copySync('dist/hookui.api.js', localLowDestPath, { overwrite: true });

            const hookUIDestPath = path.resolve(__dirname, "../HookUI/Resources/hookui.api.js");
            fs.copySync('dist/hookui.api.js', hookUIDestPath, { overwrite: true });
        });
});

// This is our main UI React code, built seperately to the API.
gulp.task('build-jsx', function (done) {
    esbuild.build({
        entryPoints: ['src/js/ui/hookui.js'],
        outdir: 'dist',
        bundle: true,
        platform: 'browser',
        format: 'esm',
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

gulp.task('default', gulp.series('build-core', 'build-jsx'));
