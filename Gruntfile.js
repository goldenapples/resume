module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: [ "build" ],
            dist: [ "dist" ]
        },
        sass: {
            options: {
                style: "expanded"
            },
            build: {
                files: {
                    'build/style-all.css': 'layout/style-all.scss',
                    'build/style-screen.css': 'layout/style-screen.scss',
                    'build/style-print.css': 'layout/style-print.scss',
                }
            }
        },
        css_img_2_data_uri: {
            options: {
                files: [
                    { src: 'build/style-all.css',    dest: 'build/style-all.hbs' },
                    { src: 'build/style-screen.css', dest: 'build/style-screen.hbs' },
                    { src: 'build/style-print.css',  dest: 'build/style-print.hbs' },
                ]
            }
        },
        assemble: {
            options: {
                data: 'content/data.yml',
                helpers: ['handlebars-helpers', 'helper-aggregate', 'helpers/helpers-*.*'],
                partials: ['build/*', 'layout/workExperience.hbs'],
            },
            resume: {
                options: { layout: 'layout/layout.hbs' },
                src: 'colophon.hbs',
                dest: 'dest/index.html'
            }
        },
        watch: {
            anything: {
                files: [ 'colophon.hbs', 'Gruntfile.js', 'layout/**/*', 'content/**/*' ],
                tasks: [ 'default' ]
            }
        },
        'gh-pages': {
            options: {
                base: 'dest'
            },
            src: ['**']
        }
    });

    // Load Grunt plugins required to rebuild file.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-css-img-2-data-uri');
    grunt.loadNpmTasks('assemble');

    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.loadNpmTasks('grunt-contrib-watch');

    // Define default task.
    grunt.registerTask('default', ['clean', 'sass', 'css_img_2_data_uri', 'assemble']);

};
