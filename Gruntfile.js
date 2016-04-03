'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    babel: {
      options: {
          sourceMap: true,
          presets: ['es2015', 'react']
      },
      dist: {
        files: {
            'sources/js/react-header.js': 'sources/js/jsx/header.js',
            'sources/js/react-search.js': 'sources/js/jsx/search.js',
            'sources/js/react-map.js': 'sources/js/jsx/map.js',
            'sources/js/react-app.js': 'sources/js/jsx/app.js'
        }
      }
    },

    mochaTest: {
      options: {
        ui: 'tdd'
      },
      test: {
        src: ['spec/**/*.js']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'mochaTest']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochaTest']
      },
      scripts: {
        files: ['sources/templates/**/*.jst.ejs', 'sources/js/**/*.js'],
        tasks: ['js'],
        options: {
          livereload: true,
          spawn: false
        },
      },
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
      js: {
        src: [
          'sources/js/vendor/underscore-min.js',
          'sources/js/vendor/backbone-min.js',
          'sources/js/vendor/react-with-addons.min.js',
          'sources/js/vendor/react-dom.min.js',
          'sources/js/vendor/jquery.mousewheel.js',
          'sources/js/vendor/moment.min.js',
          'sources/js/vendor/jquery.jscrollpane.min.js',
          'sources/js/templates.js',
          'sources/js/base.js',
          'sources/js/models.js',
          'sources/js/*.js',
        ],
        dest: 'public/js/<%= pkg.name %>.js'
      },
      css: {
        src: [
          'sources/css/*.css'
        ],
        dest: 'public/css/<%= pkg.name %>.css'
      },
    },

    uglify: {
      options: {
        report: 'min',
        mangle: true,
        compress: {}
      },
      build: {
        src: 'public/js/<%= pkg.name %>.js',
        dest: 'public/js/<%= pkg.name %>.min.js'
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
    },
    jst: {
      compile: {
        options: {
          templateSettings: {
            interpolate : /\{\{(.+?)\}\}/g
          }
        },
        files: {
          'sources/js/templates.js': ['sources/templates/**/*.jst.ejs']
        }
      }
    }

  });

  grunt.registerTask('default', ['jshint', 'mochaTest']);
  grunt.registerTask('js', ['babel', 'jst', 'concat:js']);
  grunt.registerTask('css', ['sass', 'concat:css']);
  grunt.registerTask('build', ['sass', 'babel', 'concat', 'uglify']);
};
