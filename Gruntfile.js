/*jshint camelcase: false*/
// Generated on 2013-10-05 using generator-chrome-extension 0.2.5
'use strict';
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                spawn: false
            },
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                'test/spec/{,*/}*.js'
            ]
        },
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        concat: {
            // not used since Uglify task does concat,
            // but still available if needed
            dist: {}
        },
        uglify: {
            // not enabled since usemin task does concat and uglify
            // check index.html to edit your build targets
            // enable this task if you prefer defining your build targets here
            dist: {}
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: [
                '<%= yeoman.app %>/popup.html',
                '<%= yeoman.app %>/options.html'
            ]
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            // Put files not handled in other tasks here
            prod: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.{webp,gif}',
                        '_locales/{,*/}*.json'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }]
            },
            dev: {
                files:[{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['**'],
                    dest: '<%= yeoman.dist %>/'
                }]
            }
        },
        concurrent: {
            server: [
                'coffee:dist',
                'compass:server'
            ],
            test: [
                'coffee',
                'compass'
            ],
            dist: [
                'coffee',                
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        chromeManifest: {
            dist: {
                options: {
                    buildnumber: true,
                    background: {
                        target:'scripts/background.js'
                    }
                },
                src: '<%= yeoman.app %>',
                dest: '<%= yeoman.dist %>'
            }
        },
        compress: {
            dist: {
                options: {
                    archive: 'package/SoundCloudSorter.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**'],
                    dest: ''
                }]
            }
        },
        requirejs: {
            scripts: {
                options: {
                    baseUrl: '<%= yeoman.app %>/scripts/',
                    findNestedDependencies: true,
                    mainConfigFile: '<%= yeoman.app %>/scripts/main.js',
                    name: 'main',
                    out: '<%= yeoman.app %>/scripts/contentscript.js',
                    preserveLicenseComments: false,
                    useStrict: true,
                    optimize:'none',
                    paths: {
                        requireLib: '../bower_components/requirejs/require',
                        'jquery': '../bower_components/jquery/jquery.min',
                        'lodash': '../bower_components/lodash/dist/lodash.min'
                    },
                    include: 'requireLib'

                }
            }
        }
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'jasmine'
    ]);

    grunt.registerTask('dev', [
        'clean:dist', //deletes files from dist folder
        'requirejs', // runs requirejs optimizer starting with main.js, walking dependancy tree, and creating contatinated file into contentscript.js
        //'chromeManifest:dist', // updates manifest, kicks off concat, cssmin, and uglify on js and css found in content_script block in manifest
        //'useminPrepare', // if i used options or popup in html, this would find css/js files in them and update the usemin tasks's src/dest options
        //'concurrent:dist', // runs several longer running task in parrarel, dist does cofee/compass/imgmin/svgmin/htmlmin
        //'cssmin', // combines files in app/styles to single file in styles.main
        //'concat', // no settings, since uglify handles concat
        //'uglify', // no settings since usemin handles concat and uglify
        'copy:dev', // moves all files from app to dest
        //'usemin', // minifies css files in destination folder
        //'compress' // zips up file sin dst and moves to packge dir
    ]);

    grunt.registerTask('prod', [
        'clean:dist',
        'requirejs',
        'chromeManifest:dist',
        'useminPrepare',
        'concurrent:dist',
        'cssmin',
        'concat',
        'uglify',
        'copy:prod',
        'usemin',
        'compress'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'prod'
    ]);
};
