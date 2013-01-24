module.exports = function(grunt) {
    var log = grunt.log, fs = grunt.file;
    grunt.registerMultiTask("jstools", "Log stuff.", function() {
        var src = this.file.src, dest = this.file.dest, srcFiles = fs.expandFiles(src), destFiles = fs.expandFiles(dest), isOutputDir = false, level = this.data.level;
        if ("" == destFiles) if (!/\.[a-zA-Z]{1,}$/.test(dest)) {
            fs.mkdir(dest);
            isOutputDir = true;
        }
        if (isOutputDir) {
            srcFiles.map(function(srcpath) {
                srcContents = grunt.helper("jstools-uglify", srcpath, level);
                fs.write(dest + "/" + srcpath, srcContents);
            });
            log.writeln('Directory "' + dest + '"');
        } else {
            srcContents = grunt.helper("jstools-uglify", srcFiles, level);
            fs.write(dest, srcContents);
            log.writeln('File "' + dest + '" created.');
        }
        if (this.errorCount) return false;
    });
    grunt.registerHelper("jstools-uglify", function(afiles, level) {
        var uglifyjs = require("uglify-js");
        var htOption = {
            mangle: true,
            output: {
                beautify: false
            },
            compress: {
                sequences: true,
                properties: true,
                dead_code: true,
                drop_debugger: true,
                unsafe: false,
                conditionals: true,
                comparisons: true,
                evaluate: true,
                booleans: true,
                loops: true,
                unused: true,
                hoist_funs: true,
                hoist_vars: false,
                if_return: true,
                join_vars: true,
                cascade: true,
                side_effects: true,
                warnings: true
            }
        };
        switch (level) {
          case "nocomment":
            htOption.output.beautify = true;

          case "min":
            for (var p in htOption.compress) htOption.compress[p] = false;
            htOption.mangle = false;
        }
        return uglifyjs.minify(afiles, htOption).code;
    });
};