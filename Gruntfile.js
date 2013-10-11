module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: [ "build" ],
            dist: [ "dist" ]
        },
        css_img_2_data_uri: {
            options: {
                files: [
                    { src: 'layout/style-all.css',    dest: 'build/style-all.hbs' },
                    { src: 'layout/style-screen.css', dest: 'build/style-screen.hbs' },
                    { src: 'layout/style-print.css',  dest: 'build/style-print.hbs' },
                ]
            }
        },
        assemble: {
            options: {
                data: 'content/data.yml',
                helpers: ['helper-aggregate','helpers/helpers-*.*'],
                partials: ['build/*', 'layout/workExperience.hbs'],
            },
            resume: {
                options: { layout: 'layout/layout.hbs' },
                src: 'colophon.hbs',
                dest: 'dest/resume.html'
            }
        }
    });

    // Load Grunt plugins required to rebuild file.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-css-img-2-data-uri');
    grunt.loadNpmTasks('assemble');

    // Define default task.
    grunt.registerTask('default', ['css_img_2_data_uri', 'assemble']);

};
