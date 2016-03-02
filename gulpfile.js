var gulp = require('gulp');
var webpack = require('gulp-webpack');
var exec = require('child_process').exec;


gulp.task('build-es6', function() {
});

gulp.task('run', ["build-es6"], function(){
  exec('$(npm bin)/babel-node main.js',function (err, stdout, stderr) { console.log(err) });
});

gulp.task("watch",function(){
  gulp.watch(["app/**/*.js", 'main.js'],["run"]);
  gulp.watch("app/**/*.json",["run"]);
  gulp.watch("entry.js",["run"]);
});

gulp.task("default", ["watch", "run"]);
