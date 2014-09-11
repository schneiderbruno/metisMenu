module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*\n' +
      ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
      ' * <%= pkg.description %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Made by <%= pkg.author.name %>\n' +
      ' * Under <%= pkg.license %> License\n' +
      ' */\n',

    jshint: {
      options: {
        jshintrc: 'src/.jshintrc'
      },
      grunt: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['Gruntfile.js']
      },
      metisMenu: {
        src: 'src/*.js'
      }
    },

    jscs: {
      options: {
        config: 'src/.jscsrc'
      },
      grunt: {
        src: '<%= jshint.grunt.src %>'
      },
      metisMenu: {
        src: '<%= jshint.metisMenu.src %>'
      }
    },

    concat: {
      plugin: {
        src: ['src/metisMenu.js'],
        dest: 'dist/metisMenu.js'
      },
      css: {
        src: ['src/metisMenu.css'],
        dest: 'dist/metisMenu.css'
      },
      options: {
        banner: '<%= banner %>'
      }
    },

    uglify: {
      plugin: {
        src: ['dist/metisMenu.js'],
        dest: 'dist/metisMenu.min.js'
      },
      options: {
        banner: '<%= banner %>'
      }
    },

    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      menucss: {
        src: ['src/metisMenu.css'],
        dest: 'dist/metisMenu.min.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('travis', ['jshint']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);
};
