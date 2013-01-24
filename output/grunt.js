module.exports = function(grunt) {
    grunt.initConfig({
        jstools: {
            task1: {
                src: [ "tasks/**/*.js", "grunt.js" ],
                dest: "output",
                level: "nocomment"
            },
            task2: {
                src: [ "tasks/**/*.js", "grunt.js" ],
                dest: "merge_min.js",
                level: "min"
            },
            task3: {
                src: [ "tasks/**/*.js", "grunt.js" ],
                dest: "output",
                level: "nocomment"
            }
        }
    });
    grunt.loadNpmTasks("grunt-jstools");
};