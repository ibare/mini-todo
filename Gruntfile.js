module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        devel: true,
        node: true,
        '-W083': true,
        globals: {},
      },
      all: ['./*.js', 'app/**/*.js', 'public/js/*.js']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
      },
      dist: {
        files: {
          'public/js/todo.min.js': ['public/js/todo.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('code-check', ['jshint']);
};