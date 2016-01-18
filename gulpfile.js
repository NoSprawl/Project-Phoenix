var file = require('fs');
var gulp = require('gulp');
var live = require('gulp-livereload');
var coff = require('gulp-coffee');
var clea = require('gulp-clean');
var shel = require('gulp-shell');
var haml = require('gulp-haml');

gulp.task('clean_html', function() {
  gulp
  .src("dist/**/*.html", {read: false})
  .pipe(clea({force: true}));
});

gulp.task('build_haml', function() {
  gulp
  .src("src/www/**/*.haml")
  .pipe(haml())
  .pipe(gulp.dest("dist"));
});

gulp.task('clean_ecma', function() {
  gulp
  .src("dist/**/*.js", {read: false})
  .pipe(clea({force: true}));
});

gulp.task('build_coff', function() {
  gulp
  .src("src/www/**/*.coffee")
  .pipe(coff())
  .pipe(gulp.dest("dist"));
});

gulp.task('clean_dock', shel.task([
  'docker rm -f $(docker ps -a -q)'
]));

gulp.task('dock', shel.task([
  'docker build -t phoenix .',
  'docker run --detach=true -p 8080:8080 phoenix'
]));

gulp.task('build', ['clean', 'build_haml', 'build_coff'], function() {
  gulp
  .src('src/www/package.json')
  .pipe(gulp.dest('dist'));
});

gulp.task('clean', ['clean_html', 'clean_ecma'], function() {});
gulp.task('devel', ['clean', 'build', 'clean_dock', 'dock'], function() {
  file.readFile(__dirname + '/splash.txt', 'utf8', function (err, splash) {
    console.log(splash);
    console.log("NoSprawl Project Phoenix");
    console.log("Version 1.11");
    live.listen();
    gulp.watch('src/**/*', ['clean_dock', 'clean', 'build', 'dock']);
  });
  
});

gulp.task('default', ['devel'], function() {});
