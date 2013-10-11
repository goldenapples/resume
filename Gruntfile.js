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
                    {
                    src: 'layout/style.css',
                    dest: 'build/style-inline.hbs'
                    }
                ]
            }
        },
        assemble: {
            options: {
                data: 'content/data.yml',
                layout: 'layout/layout.hbs',
                helpers: ['helper-aggregate','helpers/helpers-*.*'],
                partials: ['build/*', 'layout/workExperience.hbs'],
                collections: [ 'jobs' ]
            },
            resume: {
                src: 'colophon.hbs',
                files: { 'dest/jobs/': 'content/work-experience/*.hbs' },
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
