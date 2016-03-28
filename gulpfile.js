var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	wiredep = require('wiredep').stream,
	inject = require('gulp-inject'),
    karmaServer = require('karma').Server;

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('test', function (done) {
   new karmaServer({
       configFile:__dirname + '/test/karma.conf.js',
       singleRun:true
   }, done).start();
});

gulp.task('inject', function(){
	var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/**/*.js'], {
        read: false
    });
	
	var injectOptions = {
        ignorePath: '/public'
    };
	
	var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };
	
	return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});
	
gulp.task('default',['inject', 'test'], function(done){
	var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3001
        },
        watch: jsFiles
    };
	nodemon(options).on('restart', function(){
		console.log('restarted!');
	});
});