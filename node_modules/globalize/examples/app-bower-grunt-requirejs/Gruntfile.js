module.exports = function(grunt) {

	"use strict";

	var _ = require("lodash");
	var path = require("path");
	var pkg = require("./package.json");

	grunt.initConfig({
		pkg: pkg,
		jshint: {
			source: {
				src: ["src/**/*.js", "tmp/jsx/**/*.js"],
				options: {
					jshintrc: ".jshintrc"
				}
			},
			grunt: {
				src: ["Gruntfile.js"],
				options: {
					jshintrc: ".jshintrc"
				}
			}
		},
		react: {
			source: {
				files: [{
					expand: true,
					cwd: "src",
					src: ["**/*.jsx"],
					dest: "tmp/jsx",
					ext: ".js"
				}]
			}
		},
		"react-globalize": {
			options: {
				defaultLocale: "en",
				locales: ["ar", "de", "en", "es", "pt", "zh"],
				amd: {
					config: _.merge({}, require("./src/config"), {
						paths: {
							director: "build/director",
							"todomvc-common": "build/todomvc-common"
						},
						baseUrl: __dirname + "/src",
						dir: "tmp/.build"
					})
				},
				modules: {
					app: {
						messages: "src/translations/{locale}.json",
						reactElements: function() {
							var Info = this.requirejs("jsx!info");
							var React = this.React;
							var TodoApp = this.requirejs("jsx!app");
							var fixtures = this.requirejs("fixtures");
							return fixtures.map(function(fixture) {
								return React.createElement(TodoApp, fixture);
							}).concat([
								React.createElement(Info)
							]);
						}
					}
				},
				build: {
					"dist/app/{locale}.js": ["app"]
				},
				onBuildWrite: function(locale, content) {
					return content.replace( /define\( \[/, "define(\"compiled-i18n-data\", [" );
				}
			}
		},
		requirejs: {
			options: _.merge({}, require("./src/config"), {
				paths: {
					almond: "../bower_components/almond/almond",
					"compiled-i18n-data": "../dist/app/en",
					"globalize-runtime": "../bower_components/globalize/dist/globalize-runtime",
					react: "../bower_components/react/react-with-addons.min"
				},
				map: {
					"*": {
						globalize: "globalize-runtime"
					}
				},
				dir: "tmp/.build",
				appDir: "src",
				baseUrl: ".",
				optimize: "none",
				skipDirOptimize: true,
				skipSemiColonInsertion: true,
				skipModuleInsertion: true,
				stubModules : ["jsx", "libs", "text"],
				onBuildWrite: function (id, path, contents) {
					if (id === "director") {
						contents += "\ndefine('" + id + "', function() {return Router;});";
					}
					if (id === "todomvc-common/base") {
						contents += "\ndefine('" + id + "', {});";
					}
					return contents
						.replace(/"globalize"/g, "\"globalize-runtime\"")
						.replace(/"globalize\//g, "\"globalize-runtime\/");
				}
			}),
			bundles: {
				options: {
					modules: [{
						name: "app",
						include: ["production"],
						exclude: ["compiled-i18n-data", "libs", "jsx"],
						create: true
					}, {
						name: "libs",
						include: ["almond", "libs"],
						create: true
					}]
				}
			}
		},
		copy: {
			options: {
				processContent: function(content, filename) {
					var module_id = path.basename(filename).split(".")[0];
					return content
						.replace(/jsx!/g, "")

						// Remove unused define created during rjs build.
						.replace(new RegExp("define\\(\"" + module_id + ".*"), "");
				}
			},
			dist: {
				expand: true,
				cwd: "tmp/.build/",
				src: [ "app.js", "libs.js" ],
				dest: "dist/"
			}
		},
		uglify: {
			app: {
				src: "dist/app.js",
				dest: "dist/app.min.js"
			},

			i18n: {
				expand: true,
				cwd: "dist/app",
				src: "*.js",
				dest: "dist/app",
				rename: function(dest, filename) {
					return path.join(dest, filename.replace( /\.js$/, ".min.js" ));
				}
			},

			libs: {
				src: "dist/libs.js",
				dest: "dist/libs.min.js"
			}
		},
		compare_size: {
			files: [
				"dist/app.min.js",
				"dist/app/*.min.js",
				"dist/libs.min.js"
			],
			options: {
				compress: {
					gz: function(fileContents) {
						return require("gzip-js").zip(fileContents, {}).length;
					}
				}
			}
		},
		clean: {
			dist: [
				"dist"
			],
			tmp: [
				"tmp"
			]
		}
	});

	require("matchdep").filter("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.registerTask("default", [
		"clean:tmp",
		"react",
		"jshint",
		"clean:dist",
		"react-globalize",
		"requirejs",
		"copy",
		"uglify",
		"compare_size"
	]);

};
