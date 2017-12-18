'use strict';

/**
 * Dependencias
 */
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');
//var stylus=require('gulp-stylus');
var jade = require('gulp-jade');
var connect = require('gulp-connect');

var browserify = require('browserify');
//var transform = require('vinyl-transform');
//var babelify=require('babelify');
//var uglify = require('gulp-uglify');
var fs=require('fs');
var tsify=require('tsify'); //typescript plugin for browserify


/**
 * Variable de entorno.
 * En la terminal se puede definir de manera opcional el puerto para cualquiera
 * de las tareas watch, un ejemplo de uso sería:
 * PORT=8080 gulp watch:all
 */
 var PORT = process.env.PORT || 7070;


/**
 * Compila los archivos sass hijos directos de la carpeta `scss/`.
 * Agrega los prefijos propietarios de los navegadores.
 * Los archivos CSS generados se guardan en la carpeta `css/`.
 */
gulp.task('sass', function () {
  var processors = [
    autoprefixer({ browsers: ['last 5 versions'] })
  ];

  return gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

/**
 * Compila los archivos styl de la carpeta src.
 * Agrega prefijos para navegadores.
 * Los CSS generados se guardan en la carpeta dist.
 */
// gulp.task('stylus', function () {
//   var processors = [
//     autoprefixer({ browsers: ['last 2 versions'] })
//   ];

//   return gulp.src('./src/index.styl')
//     .pipe(stylus({
//       compress: false //true
//     }))
//     .pipe(postcss(processors))
//     .pipe(gulp.dest('./dist'))
//     .pipe(connect.reload());
// });


/**
 * Compila los archivos jade hijos directos de la carpeta `scr/`.
 * Los archivos HTML generados se guardan en la carpeta dist del proyecto.
 */
gulp.task('jade', function() {
  gulp.src('./src/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});


/**
 * Recarga el HTML en el navegador.
 * Creado para quienes no usen Jade.
 */
// gulp.task('html', function () {
//   gulp.src('./src/*.html')
//     .pipe(connect.reload());
// });


/**
 * Crea un servidor local livereload
 * http://localhost:7070
 */
gulp.task('connect', function() {
  connect.server({
    root: './dist',
    port: PORT,
    livereload: true
  });
});


/**
 * Ejecuta las tareas connect y sass, queda escuchando los cambios de todos
 * los archivos Sass de la carpeta `scss/` y subcarpetas.
 */
gulp.task('watch:sass', ['connect', 'sass'], function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});

/**
 * Ejecuta las tareas connect y stylus, queda escuchando los cambios de todos
 * los archivos stylus de la carpeta `src/` y subcarpetas.
 */
// gulp.task('watch:stylus', ['connect', 'stylus'], function () {
//   gulp.watch('./src/**/*.styl', ['stylus']);
// });

/**
 * Ejecuta las tareas connect y jade, queda escuchando los cambios de todos
 * los archivos jade de la carpeta `jade/` y subcarpetas.
 */
gulp.task('watch:jade', ['connect', 'jade'], function () {
  gulp.watch('./src/**/*.jade', ['jade']);
});


/**
 * Ejecuta las tareas connect y html, queda escuchando los cambios de todos
 * los archivos HTML de la carpeta raíz del proyecto.
 * Creado para quienes no usen Jade.
 */
// gulp.task('watch:html', ['connect', 'html'], function () {
//   gulp.watch('./src/*.html', ['html']);
// });


/**
 * Ejecuta las tareas watch:html y watch:sass
 * Creado para quienes no usen Jade.
 */
//gulp.task('watch:html-sass', ['watch:html', 'watch:sass']);

/**
 * Ejecuta las tareas watch:html y watch:stylus
 * Creado para quienes no usen Jade.
 */
//gulp.task('watch:html-stylus', ['watch:html', 'watch:stylus']);

/**
 * Ejecuta las tareas watch:sass y watch:jade.
 */
//gulp.task('watch:all', ['watch:sass', 'watch:jade']);

/**
 * Ejecuta las tareas watch:stylus y watch:jade.
 */
gulp.task('watch:all', ['watch:sass', 'watch:jade', 'watch:ts']);

/**
 * Ejecuta la tarea watch:sass.
 */
//gulp.task('default', ['watch:sass']);

/**
 * Ejecuta la tarea watch:sass.
 */
gulp.task('default', ['watch:all']);

// gulp.task('js', function () {
//   browserify("src/index.js", { debug: true })
//   .transform(babelify)
//   .bundle()
//   .on("error", function (err) { console.log("Error : " + err.message); })
//   .pipe(fs.createWriteStream("dist/index.js"));
// });

// gulp.task('watch:js', ['connect', 'js'], function () {
//   gulp.watch('./src/**/*.js', ['js']);
// });

gulp.task('ts', function () {
  browserify("src/index.ts", { debug: true })
  .plugin('tsify', {
    noImplicitAny: true,
    alwaysStrict: true,
    target: 'es6'
  })
  .bundle()
  .on("error", function (err) { console.log("Error : " + err.message); })
  .pipe(fs.createWriteStream("dist/index.js"));
});

gulp.task('watch:ts', ['connect', 'ts'], function () {
  gulp.watch('./src/**/*.ts', ['ts']);
});
