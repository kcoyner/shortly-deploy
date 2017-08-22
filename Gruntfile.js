module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'public/lib/jquery.js',
          'public/lib/underscore.js',
          'public/lib/handlebars.js',
          'public/lib/backbone.js',
          // 'public/client/app.js',
          'public/client/link.js',
          'public/client/linkView.js',
          // 'public/client/creatLinkView.js',
          'public/client/linksView.js',
          'public/client/links.js',
          'public/client/router.js'
        ],
        dest: 'public/dist/built.js',
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      target: {
        files: {
          'public/dist/built.min.js': ['public/dist/built.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'app/**/*.js', 'lib/*.js', 'public/client/*.js', 'test/**/*.js', '*.js'
      ]
    },

    cssmin: {
      target: {
        files: {
          'public/dist/output.min.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });


  //////////////////////////////////////////////////////////////
  // Main grunt tasks
  //////////////////////////////////////////////////////////////


  grunt.registerTask('test', [
    'eslint', 'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat', 'cssmin', 'uglify' ]
  );

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run(['shell']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // /add your deploy tasks here
    'test', 'build', 'upload:' + grunt.option('prod')
  ]);
};

