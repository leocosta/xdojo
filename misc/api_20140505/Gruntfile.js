'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  
  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js',
        expand: true,
        cwd: 'app',
        src: ['**/*.js'],
        dest: 'app',
        ext: '.js'
      }
    },
    jslint: {
      server: {
        src: [
          'app.js',
          'config/*.js',
          'routes/*.js',
          'app/**/*.js'
        ],
        exclude: [
          'test/**/*.js'
        ],
        directives: {
          node: true,
          passfail: true,
          bitwise: true,
          debug: true,
          eqeq: true,
          nomen: true,
          plusplus: true,
          todo: true,
          vars: false,
          unparam: false,
          indent: 2
        },
        options: {
          junit: 'out/server-junit.xml'
        }
      }
    },    
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'app.js',
          'routes/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['public/js/*.js'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: ['public/css/*.css'],
        options: {
          livereload: reloadPort
        }
      },
      jade: {
        files: ['views/*.jade'],
        options: {
          livereload: reloadPort
        }
      }
    },
    mochaTest: {
      test: {
        src: ['test/**/*.js'],
        options: {
          require: ['test/support/_specHelper.js'],
          ui: 'bdd',
          reporter: 'spec',
          clearRequireCache: true
        }
      },
      coverageHtml: {
        src: ['test/**/*.js'],
        options: {
          require: ['test/support/_instrumentForCoverage.js', 'test/support/_specHelper.js'],
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage-results/coverage.html'
        }
      },
      coverageLcov: {
        src: ['test/**/*.js'],
        options: {
          require: ['test/support/_instrumentForCoverage.js', 'test/support/_specHelper.js'],
          reporter: 'mocha-lcov-reporter',
          quiet: true,
          captureFile: 'coverage-results/coverage.lcov.info'
        }
      }
    },
    coveralls: {
      options: {
        src: 'coverage-results/coverage.lcov.info'
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-coveralls');

  grunt.registerTask('test', ['develop', 'mochaTest', 'coveralls']);
  grunt.registerTask('server', ['test', 'watch']);
  grunt.registerTask('build', ['jslint', 'test']);

  grunt.registerTask('default', ['build']);
};
