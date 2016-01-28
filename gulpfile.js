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

gulp.task('clean_html', function() {
  gulp
  .src("dist/**/*.html", {read: false})
  .pipe(clea({force: true}));
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

gulp.task('clean_imgs', function() {
  gulp
  .src("dist/img/*", {read: false})
  .pipe(clea({force: true}));
});

gulp.task('clean_stage', function() {
  gulp
  .src(['dist/package.json'], {read: false})
  .pipe(clea({force: true}));
});

gulp.task('build_types', ['build_stage'], function () {
  return gulp.src('src/www/**/*.ts')
		.pipe(type({
      "target": "ES5",
      "module": "system",
      "moduleResolution": "node",
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "removeComments": false,
      "noImplicitAny": false
    }))
		.pipe(gulp.dest('dist'));
});

gulp.task('build_imgs', function() {
  gulp
  .src("src/www/img/*")
  .pipe(gulp.dest("dist/img"));
});

gulp.task('build_haml', ['build_sass', 'build_types'], function() {
  gulp
  .src("src/www/**/*.haml")
  .pipe(haml({noEscapeAttrs: true}))
  .pipe(gulp.dest("dist"));

  gulp
  .src("src/www/**/*.html")
  .pipe(gulp.dest("dist"));
});

gulp.task('build_sass', ['build_imgs'], function() {
  gulp
  .src("src/www/**/*.scss")
  .pipe(sass())
  .pipe(gulp.dest("dist"));
});

gulp.task('clean_dock', shel.task([
  'docker rm -f $(docker ps -a -q)'
], {ignoreErrors: true}));

gulp.task('deep_clean_dock', shel.task([
  'docker images -a | sed \'1 d\' | awk \'{print $3}\' | xargs -L1 docker rmi -f'
], {ignoreErrors: true}));

gulp.task('dock', ['clean_dock', 'build'], shel.task([
  'docker build -t phoenix . && \
   docker run --detach=true -p 8080:8080 phoenix'
], {ignoreErrors: true}));

gulp.task('build_stage', function() {
  gulp
  .src('src/www/package.json')
  .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build_haml'], function() {
  console.log("built.");
});

gulp.task('clean', ['clean_html', 'clean_ecma', 'clean_styl', 'clean_imgs',
                    'clean_stage'], function() {});

gulp.task('devel', ['dock'], function() {
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
    gulp.watch('src/**/*', ['dock']);
  });

});

gulp.task('default', ['devel'], function() {});
