module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            dist: {
                files: {
                    'app/dist/app.css': 'app/less/*.less'
                }
            }
        },
        babel: {
            options: {
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            jsx: {
                files: [{
                            expand: true,
                            cwd: 'app/javascript',
                            src: ['*.jsx'],
                            dest: 'app/javascript/',
                            ext: '.js'
                        }]
            }
        },
        "browserify": {
            dist: {
                options: {
                    alias: {
                        'pot': './lib/pot.js',
                        'draw': './lib/draw.js',
                        'participants': './lib/participants.js',
                        'app': './app/javascript/app.js',
                        'header': './app/javascript/header.js',
                        'register-section': './app/javascript/register-section.js',
                        'draw-section': './app/javascript/draw-section.js',
                        'registration-feedback': './app/javascript/registration-feedback.js',
                        'draw-feedback': './app/javascript/draw-feedback.js',
                        'react': './node_modules/react/dist/react.min.js',
                        'react-dom': './node_modules/react-dom/dist/react-dom.min.js'
                    }
                },
                files: {
                    'app/dist/app.js': ['lib/*.js', 'app/javascript/*.js', 'node_modules/react/dist/react.min.js', 'node_modules/react-dom/dist/react-dom.min.js']
                }
            }
        },
        "copy": {
            html: {
                cwd: 'app/html',
                src: '**/*',
                dest: 'app/dist',
                expand: true
            },
            fonts: {
                cwd: 'app/font',
                src: '**/*',
                dest: 'app/dist/',
                expand: true
            }
        },
        clean: {
            dist: ["app/javascript/*.js", "app/dist/app.js"],
            dev: ["app/javascript/*.js"]
        },
        uglify: {
            my_target: {
                files: {'app/dist/app.min.js': ['app/dist/app.js']}
            }
        },
        rename: {
            main: {
                files: [{
                            src: 'app/dist/app.js', 
                            dest: 'app/dist/app.min.js'
                        }]
          }
        },
        watch: {
            css: {
                files: ['app/less/*.less'],
                tasks: ['less:dist']
            }
        }
    });
    
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('prod', ['less:dist', 'babel', 'browserify:dist', 'uglify', 'copy:html', 'copy:fonts', 'clean:dist']);
    grunt.registerTask('dev', ['less:dist', 'babel', 'browserify:dist', 'rename', 'copy:html', 'copy:fonts', 'clean:dev']);
};