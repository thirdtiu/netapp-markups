// Gulp.js configuration
var
  // modules
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),
  htmlclean = require('gulp-htmlclean'),
  concat = require('gulp-concat'),
  deporder = require('gulp-deporder'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  assets = require('postcss-assets'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  cssnano = require('cssnano'),
  webserver = require('gulp-webserver'),

  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  folder = {
    src: 'src/',
    dist: 'dist/'
  }
;

// image processing
gulp.task('images', function() {
  var out = folder.dist + '_assets/template-images/';
  return gulp.src(folder.src + '_assets/template-images/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});

// HTML processing
gulp.task('html', gulp.series('images', function() {
  var
    out = folder.dist,
    page = gulp.src(folder.src + 'templates/**/*')
      .pipe(newer(out));

  // minify production code
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }

  return page.pipe(gulp.dest(out));
}));

// JavaScript processing
gulp.task('js-plugins', function() {

  var jsbuild = gulp.src(folder.src + '_assets/js/plugins/*')
    .pipe(deporder())
    .pipe(concat('plugins.js'))
    .pipe(uglify());

  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
  }

  return jsbuild.pipe(gulp.dest(folder.dist + '_assets/js/'));

});
gulp.task('js', function() {

  var jsbuild = gulp.src(folder.src + '_assets/js/*')
    .pipe(deporder())
    .pipe(concat('main.js'));
    // .pipe(uglify());

  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
  }

  return jsbuild.pipe(gulp.dest(folder.dist + '_assets/js/'));

});

// CSS processing
gulp.task('bootstrap-css', gulp.series('images', function() {

  var postCssOpts = [
  assets({ loadPaths: ['_assets/template-images/'] }),
  autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
  mqpacker
  ];

  if (!devBuild) {
    postCssOpts.push(cssnano);
  }

  return gulp.src(folder.src + '_assets/scss/bootstrap/bootstrap.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      imagePath: '_assets/template-images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(folder.dist + '_assets/css/'));

}));
gulp.task('css', gulp.series('images', function() {

  var postCssOpts = [
  assets({ loadPaths: ['_assets/template-images/'] }),
  autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
  mqpacker
  ];

  if (!devBuild) {
    postCssOpts.push(cssnano);
  }

  return gulp.src(folder.src + '_assets/scss/main.scss')
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: '_assets/template-images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(folder.dist + '_assets/css/'));

}));

gulp.task('webserver', function() {
  gulp.src('./dist/')
    .pipe(webserver({
      directoryListing: false,
      host: '0.0.0.0',
      livereload: {
        enabled: true
      }, 
      open: 'http://localhost:8888/',
      port: process.env.PORT || 8888,
    }))
});

// run all tasks
gulp.task('run', gulp.series('html', 'css', 'bootstrap-css', 'js', 'js-plugins', 'webserver'));

// new watch method
var cssWatcher = gulp.watch(folder.src + '_assets/scss/**', gulp.parallel('css'));
cssWatcher.on('all', function(event) {
  console.log('CSS watch: ' + event);
});

//image changes
var imageWatcher = gulp.watch(folder.src + '_assets/template-images/**/*', gulp.parallel('images'));
imageWatcher.on('all', function(event) {
  console.log('Image watch: ' + event);
})

// html changes
var htmlWatcher = gulp.watch(folder.src + 'templates/**/*', gulp.parallel('html'))
htmlWatcher.on('all', function(event) {
  console.log('HTML watch: ' + event);
})

// javascript changes 
var jsPluginsWatcher = gulp.watch(folder.src + '_assets/js/plugins/*', gulp.parallel('js-plugins'))
jsPluginsWatcher.on('all', function(event) {
  console.log('JS plugins watch: ' + event);
})

var jsWatcher = gulp.watch(folder.src + '_assets/js/*', gulp.parallel('js'));
jsWatcher.on('all', function(event) {
  console.log('JS watch: ' + event);
})

// end new watch method

gulp.task('default', gulp.series('run'));


// Fonts
gulp.task('fonts', function() {
    return gulp.src([
              'src/_assets/fonts/*'])
      .pipe(gulp.dest('dist/_assets/fonts/'));
});