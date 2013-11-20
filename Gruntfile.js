'use strict';
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
		jstools: {
			// each file
			task1 : {
				src : [ "source/**/*.js", "jindo.js" ],
				dest : "output",
				level : "nocomment"
			},
			// merge file
			task2 : {
				src : [ "source/**/*.js", "jindo.js" ],
				dest : "merge_min.js",
				level : "min"
			}
		}
  });

  // grunt.loadNpmTasks('grunt-jstools');
  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['jstools']);
};
