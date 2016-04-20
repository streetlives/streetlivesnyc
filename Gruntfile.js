'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    postcss: {
        options: {
            processors: [
                require('autoprefixer')({browsers: 'last 2 versions'})
            ]
        },
        dist: {
            src: 'sources/css/*.css'
        }
    },
    watch: {
      css: {
        files: ['sources/scss/**/*.scss'],
        tasks: ['css'],
        options: {
          livereload: true,
          spawn: false
        }
      } 
    },
    concat: {
      css: {
        src: [
          'sources/css/*.css'
        ],
        dest: 'public/css/<%= pkg.name %>.css'
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'sources/scss',
          src: ['*.scss'],
          dest: 'sources/css',
          ext: '.css'
        }]
      }
    }

  });

  grunt.registerTask('css', ['sass', 'concat:css', 'postcss']);
};
