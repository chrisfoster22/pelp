 var gulp = require('gulp');
	gutil = require('gulp-util');
	concat = require('gulp-concat');
	compass = require('gulp-compass');
	connect = require('gulp-connect');
  webserver = require('gulp-webserver');



// All Sass files here.
var sassSources = ['css/style.scss']

// All js files that are to be concatenated:
var jsSources = [

	'js/main.js',
	'js/selects.js'
];

var htmlSources = [
	'views/*.html',
	'*.html'
]

// Concatenate all the jsSources files into script.js. Browserify then adds jquery and
// modernizr. Be sure that you have 'global.$ = require("jquery")' in the first .js file.
// Using connect.reload() on the last line to signal the server when a change is made here.
gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulp.dest('js'))
		.pipe(connect.reload())
});


// This task isn't using a config.rb file. If you want to use one, there's one included.
// Search for gulp-compass for an example of how to reference config.rb.
// Using connect.reload() on the last line to signal the server when a change is made here.
gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'css',
			image: 'img',
			comments: true,
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('css'))
		.pipe(connect.reload())
});

// What to watch constantly. compass files can't use sassSource var because that file
// doesn't change. Have to actually watch *.scss
gulp.task('watch', function() {
	gulp.watch(jsSources, ['js']),
	gulp.watch('css/*.scss', ['compass']),
	gulp.watch(htmlSources, ['html'])
});

// Starts server. Sets root of server to root directory (you can change this).
// Defaults to localhost:8080. You can specify port if needed.

// gulp.task('connect', function() {
// 	connect.server({
// 		livereload: true
// 	});
// });


gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
			proxies: [
        {
          source: '/api', target: 'https://pelp-api.herokuapp.com/markers/'
        }
      ]
    }));
});

// Make sure livereload is watching html files
gulp.task('html', function(){
	gulp.src(htmlSources)
		.pipe(connect.reload())
});

gulp.task('default', ['html', 'js', 'compass', 'webserver', 'watch'])
