/*
 * grunt-jstools
 * https://github.com/sculove/grunt-jstools
 *
 * Copyright (c) 2013 sculove
 * Licensed under the MIT license.
 */
'use strict';
module.exports = function(grunt) {
	var log = grunt.log,
		fs = grunt.file;

	// Uglify
	function fpUglify(afiles, level) {
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
	}

	// gzip infomation
	function fpInfo(sPath, sConvertedContent, isDirType) {
		var nAfterLen = sConvertedContent.length,
			nGzipLen = require("gzip-js").zip(sConvertedContent, {}).length,
			nLen = 0;
		if(isDirType) {
			nLen = grunt.file.read(sPath).length;
		} else {
			sPath.forEach(function(value) {
				nLen += grunt.file.read(value).length;
			});
		}
		log.writeln("[" + (isDirType ? sPath : "Information") + "] ");
		log.writeln(" " + nLen + " => " + sConvertedContent.length + " bytes " + String(Math.round((nLen-nAfterLen) / nLen * 100 * 100)/100 + "%.").red + " gzipped " + String(nGzipLen).green + " bytes.");
	}

	grunt.registerMultiTask('jstools', function() {
		var src = this.data.src,
			dest = this.data.dest,
			srcFiles = fs.expand(src),
			isOutputDir = false,
			srcContents,
			level = this.data.level;

		if(dest) {
			if(fs.exists(dest)) {
				isOutputDir = fs.isDir(dest);
			} else {
				// not exist dest file or directory
				// if destfiles is directory, make a directory
				if(!/\.[a-zA-Z]{1,}$/.test(dest)) {
					fs.mkdir(dest);
					isOutputDir = true;
				}
			}
		} else {
			log.writeln("You must setting " + String('dest').red + " property!");
				return;
		}

		if(isOutputDir) {
			srcFiles.map(function(srcpath) {
				srcContents = fpUglify(srcpath, level);
				fs.write(dest + "/" + srcpath, srcContents);
				fpInfo(srcpath, srcContents, true);
			});
			log.writeln('Directory "' + dest + '"');
		} else {
			srcContents = fpUglify(srcFiles, level);
			fs.write(dest, srcContents);
			fpInfo(srcFiles, srcContents, false);
			// // Otherwise, print a success message.
			log.writeln('File "' + dest + '" created.');
		}
		// Fail task if errors were logged.
		if (this.errorCount) { return false; }
	});
};
