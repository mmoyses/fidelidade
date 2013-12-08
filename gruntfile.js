module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      jade: {
        files: ['app/views/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['app/**/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['public/views/**'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['public/css/**'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: ['gruntfile.js', 'app/**/*.js', 'test/**/*.js']
    },
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['app', 'config'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['test/**/*.js']
    },
    bower: {
      install: {
        options: {
          targetDir: './public/lib',
          layout: 'byComponent',
          install: true,
          verbose: true,
          cleanBowerDir: true
        }
      }
    },
    concat: {
      dist: {
        src: ['app/frontend/spa.js', 'app/frontend/spa.util.js', 'app/frontend/spa.data.js',
              'app/frontend/spa.fake.js', 'app/frontend/spa.model.js', 'app/frontend/spa.home.js',
              'app/frontend/spa.checkin.js', 'app/frontend/spa.checkout.js', 'app/frontend/spa.consultar.js',
              'app/frontend/spa.relatorios.js', 'app/frontend/spa.user.js', 'app/frontend/spa.shell.js'],
        dest: 'public/js/spa.js'
      }
    },
    uglify: {
      my_target: {
        options: {
          sourceMap: 'public/js/spa.map.js',
          sourceMappingURL: '/js/spa.map.js'
        },
        files: {
          'public/js/spa.min.js': ['public/js/spa.js']
        }
      }
    }
  });

  //Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'concurrent']);

  //Test task.
  grunt.registerTask('test', ['mochaTest']);

  //Bower task.
  grunt.registerTask('install', ['bower']);
};
