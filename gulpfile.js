var gulp = require('gulp');
var webpack = require('gulp-webpack');
var exec = require('child_process').exec;


gulp.task('build-es6', function() {

});

gulp.task('run', ["build-es6"], function(){
  exec('ps -ef | grep main.js | grep -v grep | awk \'{print $2}\' | xargs kill',function (err, stdout, stderr) {
    // console.log(err, stdout, stderr);
    exec('NODE_ENV=development $(npm bin)/babel-node main.js >> tonalino_development.log 2>&1',function (err, stdout, stderr) {
      console.log(err, stdout, stderr);
      process.exit(0);
    });
  });
});

gulp.task('run-as-production', ["build-es6"], function(){
  exec('sudo PATH=$PATH NODE_ENV=production $(npm bin)/babel-node main.js &>> tonalino_production.log &',function (err, stdout, stderr) {
    console.log(err, stdout, stderr);
    process.exit(0);
  });
  process.exit(0);
});
gulp.task('kill-as-production', ["build-es6"], function(){
  var killCode = "ps aux | grep babel  | awk '{ print \"sudo kill\", $2; }' | sh";
  exec(killCode, function(err, stdout, stderr){
    console.log(err, stdout, stderr);
    process.exit(0);
  });
});
gulp.task("see", function(){
  exec("ps aux | grep babel | awk '{print $2;}'", function(err, stdout, stderr){
    console.log(err, stdout, stderr);
    process.exit(0);
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

gulp.task("seed", function(){
  exec("$(npm bin)/babel-node db/seed/seed.js &>> tonalino_production.log", function(err, stdout, stderr){
    console.log(err, stdout, stderr);
    process.exit(0);
  });
});

gulp.task("default", ["watch", "run"]);
gulp.task("prod", ["watch-as-production", "run-as-production"]);
gulp.task("kill", ["kill-as-production"]);
