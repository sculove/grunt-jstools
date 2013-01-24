module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
	jstools: {
		// each file
		task1 : {
			src : [ "tasks/**/*.js", "grunt.js" ],
			dest : "output",
			level : "nocomment"
		},
		// merge file
		task2 : {
			src : [ "tasks/**/*.js", "grunt.js" ],
			dest : "merge_min.js",
			level : "min"
		},
		//
		task3 : {
			src : [ "tasks/**/*.js", "grunt.js" ],
			dest : "output",
			level : "nocomment"
		}
	}
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
//  grunt.registerTask('default', 'lint test');

};
