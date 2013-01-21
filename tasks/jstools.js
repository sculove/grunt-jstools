/*
 * grunt-jstools
 * https://github.com/sculove/grunt-jstools
 *
 * Copyright (c) 2013 sculove
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('jstools', 'Your task description goes here.', function() {
    grunt.log.write(grunt.helper('jstools'));
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('jstools', function() {
    return 'jstools!!!';
  });

};
