module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                eqeqeq: true,//eqeqeq表示要用严格相等运算符取代相等运算符
                trailing: true//trailing表示行尾不得有多余的空格
            },
            files: ['Gruntfile.js', 'dev/js/*.js']
        },

        concat: {
            js: {
                src: [ "dev/js/requestAnimationFrame.js", "dev/js/coin.js", "dev/js/bowl.js", "dev/js/input.js", "dev/js/game.js", "dev/js/application.js" ],
                dest: "temp/<%= pkg.name %>.js"
            },
            css: {
                src: ['dev/css/*.css'],
                dest: 'temp/<%= pkg.name %>.css'
            }
        },

        uglify: {
            options: {
                mangle: true,
                preserveComments: false,
                sourceMap: true,
                sourceMapName: "<%= pkg.name %>.min.map",
                banner: "/* <%= pkg.name %> at <%= pkg.version %> by <%= pkg.author %> on <%= grunt.template.today('yyyymmdd') %> */"
            },
            build: {
                src: "temp/<%= pkg.name %>.js",
                dest: "<%= pkg.name %>.min.js"
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                src: "dev/index.html",
                dest: "index.html"
            }
        },

        clean: {
            build: {
                src: ["temp"]
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true
                },
                src: ['dev/index.html']
            }
        },

        cssmin: {
            bulid: {
                options: {
                    banner: "/* <%= pkg.name %> at <%= pkg.version %> by <%= pkg.author %> on <%= grunt.template.today('yyyymmdd') %> */"
                },
                expand: true,//如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
                cwd: 'temp',//需要处理的文件（input）所在的目录。
                src: ['<%= pkg.name %>.css'],//表示需要处理的文件。如果采用数组形式，数组的每一项就是一个文件名，可以使用通配符。
                dest: '',//表示处理后的文件名或所在目录。
                ext: '.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-markdown');

    grunt.registerTask('build', ['jshint', 'htmlhint', 'concat', 'uglify', 'cssmin', 'clean']);
    grunt.registerTask('check', ['jshint', 'htmlhint']);

};