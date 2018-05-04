"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

var posthtml = require('gulp-posthtml')
var include = require('posthtml-include')

var server = require("browser-sync").create();

gulp.task("html", function () {
  gulp.src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"))
});

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("fonts", function() {
  gulp.src("source/fonts/*.*")
    .pipe(gulp.dest("build/fonts"))
});

gulp.task("serve", ["html", "style", "fonts"], function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html").on("change", server.reload);
});
