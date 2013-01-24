/*
 * grunt-jstools
 * https://github.com/sculove/grunt-jstools
 *
 * Copyright (c) 2013 sculove
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {
	var log = grunt.log,
		fs = grunt.file;

	grunt.registerMultiTask('jstools', 'Log stuff.', function() {
		var src = this.file.src,
			dest = this.file.dest,
			srcFiles = fs.expandFiles(src),
			destFiles = fs.expandFiles(dest),
			isOutputDir = false,
			level = this.data.level;
		
		// there is no destfile
		if(destFiles == "") {
			// isDirectory? or isFile?
			if(!/\.[a-zA-Z]{1,}$/.test(dest)) {
				fs.mkdir(dest);
				isOutputDir = true;
			}
		}
		if(isOutputDir) {
			srcFiles.map(function(srcpath) {
				srcContents = grunt.helper("jstools-uglify", srcpath, level);
				fs.write(dest + "/" + srcpath, srcContents);
			});
			log.writeln('Directory "' + dest + '"');
		} else {
	    	srcContents = grunt.helper("jstools-uglify", srcFiles, level);
	    	fs.write(dest, srcContents);
	    	
	    	// // Otherwise, print a success message.
	    	log.writeln('File "' + dest + '" created.');
		}

    	// Fail task if errors were logged.
    	if (this.errorCount) { return false; }
	});

	grunt.registerHelper("jstools-uglify", function(afiles, level) {
		var uglifyjs = require('uglify-js');
		var htOption = {
			mangle : true,
			output : {
				beautify : false
			},
			compress : {
				sequences     : true,  // join consecutive statemets with the “comma operator”
				properties    : true,  // optimize property access: a["foo"] → a.foo
				dead_code     : true,  // discard unreachable code
				drop_debugger : true,  // discard “debugger” statements
				unsafe        : false,  // some unsafe optimizations (see below)
				conditionals  : true,  // optimize if-s and conditional expressions
				comparisons   : true,  // optimize comparisons
				evaluate      : true,  // evaluate constant expressions
				booleans      : true,  // optimize boolean expressions
				loops         : true,  // optimize loops
				unused        : true,  // drop unused variables/functions
				hoist_funs    : true,  // hoist function declarations
				hoist_vars    : false, // hoist variable declarations
				if_return     : true,  // optimize if-s followed by return/continue
				join_vars     : true,  // join var declarations
				cascade       : true,  // try to cascade `right` into `left` in sequences
				side_effects  : true,  // drop side-effect-free statements
				warnings      : true
			}
		};

		switch(level) {
				case "nocomment" : htOption.output.beautify = true;
				case "min" : for(var p in htOption.compress) {
						htOption.compress[p] = false;
					}
					htOption.mangle = false;
					break;
			}
		return uglifyjs.minify(afiles, htOption).code;
	});
};