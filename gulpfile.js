var gulp = require('gulp');
var webpack = require('gulp-webpack');
var exec = require('child_process').exec;


gulp.task('build-es6', function() {

});

gulp.task('run', ["build-es6"], function(){
  exec('ps -ef | grep main.js | grep -v grep | awk \'{print $2}\' | xargs kill',function (err, stdout, stderr) {
    // console.log(err, stdout, stderr);
    exec('NODE_ENV=development $(npm bin)/babel-node main.js $>> tonalino_development.log',function (err, stdout, stderr) {
      // console.log(err, stdout, stderr);
    });
  });
});

gulp.task('run-as-production', ["build-es6"], function(){
  exec('sudo PATH=$PATH NODE_ENV=production $(npm bin)/babel-node main.js $>> tonalino_production.log ',function (err, stdout, stderr) {
    console.log(err, stdout, stderr);
  });
});

gulp.task("watch",function(){
  gulp.watch(["app/**/*.js", 'main.js'],["run"]);
  gulp.watch("app/**/*.json",["run"]);
  gulp.watch("entry.js",["run"]);

});
gulp.task("watch-as-production",function(){
  gulp.watch(["app/**/*.js", 'main.js'],["run-as-production"]);
  gulp.watch("app/**/*.json",["run-as-production"]);
  gulp.watch("entry.js",["run-as-production"]);
});

gulp.task("default", ["watch", "run"]);
gulp.task("production", ["watch-as-production", "run-as-production"]);
