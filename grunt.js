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
		},
		task3 : {
			src : [ "source/**/*.js", "jindo.js" ],
			dest : "output",
			level : "nocomment"
		}
	}
  });

  grunt.loadNpmTasks('grunt-jstools');
};
