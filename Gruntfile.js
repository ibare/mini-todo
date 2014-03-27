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
    },
    cssmin: {
      combine: {
        files: {
          'public/css/todo.min.css': ['<%= concat.cssdist.dest %>']
        }
      }
    },
    concat: {
      cssdist: {
        src: ['public/css/reset.css', 'public/css/default.css'],
        dest: 'public/css/todo.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['uglify','concat','cssmin']);
  grunt.registerTask('code-check', ['jshint']);
};