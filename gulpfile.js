var file = require('fs');
var gulp = require('gulp');
var live = require('gulp-livereload');
var type = require('gulp-typescript');
var clea = require('gulp-clean');
var shel = require('gulp-shell');
var haml = require('gulp-ruby-haml');
var sass = require('gulp-sass');
var inst = require("gulp-install");
var proj = type.createProject('tsconfig.json');

var build_order = ['clean', 'build', 'clean_dock', 'dock'];

gulp.task('clean_html', function() {
  gulp
  .src("dist/**/*.html", {read: false})
  .pipe(clea({force: true}));
});

gulp.task('build_haml', function() {
  gulp
  .src("src/www/**/*.haml")
  .pipe(haml({noEscapeAttrs: true}))
  .pipe(gulp.dest("dist"));
});

gulp.task('build_sass', function() {
  gulp
  .src("src/www/**/*.scss")
  .pipe(sass())
  .pipe(gulp.dest("dist"));
});

gulp.task('clean_ecma', function() {
  gulp
  .src("dist/**/*.js", {read: false})
  .pipe(clea({force: true}));
});

gulp.task('clean_styl', function() {
  gulp
  .src("dist/**/*.css", {read: false})
  .pipe(clea({force: true}));
});

gulp.task('build_types', ['build_npm'], function () {
  var tsResult = proj.src('src/www/**/*.ts') // instead of gulp.src(...)
  .pipe(type(proj));
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('build_imgs', function() {
  gulp
  .src("src/www/img/*")
  .pipe(gulp.dest("dist/img"));
});

gulp.task('clean_imgs', function() {
  gulp
  .src("dist/img/*", {read: false})
  .pipe(clea({force: true}));
});

gulp.task('clean_stage', function() {
  gulp
  .src('dist/package.json', {read: false})
  .pipe(clea({force: true}));
})

gulp.task('build_npm', shel.task([
  'npm install --prefix ./src/www'
], {ignoreErrors: true}));

gulp.task('clean_dock', shel.task([
  'docker rm -f $(docker ps -a -q)'
], {ignoreErrors: true}));

gulp.task('dock', ['clean_dock'], shel.task([
  'docker build -t phoenix .',
  'docker run --detach=true -p 8080:8080 phoenix'
]));

gulp.task('build_stage', function() {
  gulp
  .src('src/www/package.json')
  .pipe(gulp.dest('dist'));
})

gulp.task('build', ['build_stage', 'build_haml', 'build_types', 'build_sass', 'build_imgs'], function() {});

gulp.task('clean', ['clean_html', 'clean_ecma', 'clean_styl', 'clean_imgs', 'clean_stage'], function() {});

gulp.task('devel', build_order, function() {
  process.stdin.resume();
  
  function exitHandler(options, err) {
    gulp.start('clean_dock');
    process.exit();
  }

  process.on('exit', exitHandler.bind(null,{cleanup:true}));
  process.on('SIGINT', exitHandler.bind(null, {exit:true}));
  process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
  
  file.readFile(__dirname + '/splash.txt', 'utf8', function (err, splash) {
    console.log(splash);
    console.log("NoSprawl Project Phoenix");
    console.log("Version 1.11");
    gulp.watch('src/**/*', build_order);
  });
  
});

gulp.task('default', ['devel'], function() {});
