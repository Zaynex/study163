//获取gulp模块
var gulp = require("gulp");
// 获取 uglify 模块（用于压缩 JS）
var uglify = require("gulp-uglify");
var gutil = require('gulp-util');
//minify-css模块压缩CSS
var minifyCSS = require("gulp-minify-css");
var imagemin = require("gulp-imagemin");
var watchPath = require('gulp-watch-path');
var combiner = require('stream-combiner2');
var sourcemaps = require('gulp-sourcemaps');


//检查错误
var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: ' + colors.red(err.fileName));
    gutil.log('lineNumber: ' + colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugin));
}


// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task("watchjs", function(){
	gulp.watch('src/js/**/*.js', function(event){
		var paths = watchPath(event, 'src/', 'dist/');
			/*
	        paths
	            { srcPath: 'src/js/log.js',
	              srcDir: 'src/js/',
	              distPath: 'dist/js/log.js',
	              distDir: 'dist/js/',
	              srcFilename: 'log.js',
	              distFilename: 'log.js' }
	        */
		gutil.log(gutil.colors.green(event.type) + " " + paths.srcPath);
		gutil.log("Dist " + paths.distPath);
		//找到文件
		var combined = combiner.obj([gulp.src(path.srcPath),
		//压缩文件
		uglify(),
		sourcemaps.write("./"),
		//另存压缩后的文件
		gulp.dest(paths.distDir)
		]);
		combined.on('error', handleError);
	});
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default', function(){
	gutil.log('message');
	gutil.log(gutil.colors.red('error'));
	gutil.log(gutil.colors.green('message:') + "some");
});


gulp.task('watchcss', function(){
	gulp.watch('src/css/**/*.css', function(event){
		var paths = watchPath(event, "src/", "dist/");

		gutil.log(gutil.colors.green(event.type) + " " + paths.srcPath);
		gutil.log('Dist' + paths.distPath);

		gulp.src(paths.srcPath)
			.pipe(sourcemaps.init())
			.pipe(autoprefixer({
				browsers: 'last 2 versions'
			}))
			.pipe(minifycss())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(paths.distDir));
	});
});


gulp.task('watchimage', function(event){
	gulp.watch('src/images/**/*', function(event){
		var paths = watchPath(event, "src/", "dist/");

		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        gulp.src(paths.srcPath)
			.pipe(imagemin({
				progressive: true
			}))
			.pipe(gulp.dest(paths.distDir));
	});
});

gulp.task('watchcopy', function () {
    gulp.watch('src/fonts/**/*', function (event) {
        var paths = watchPath(event);

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir));
    });
});




gulp.task('default',['watchjs','watchcss','watchimage', 'watchcopy']);
//一次编译所有文件
//gulp.task('default', ['script','minifycss','image']);

//一次编译所有js文件
//gulp.task('script', function () {
//    var combined = combiner.obj([
//        gulp.src('src/js/**/*.js'),
//        sourcemaps.init(),
//        uglify(),
//        sourcemaps.write('./'),
//        gulp.dest('dist/js/')
//    ])
//    combined.on('error', handleError)
//})

//一次编译所有css文件
//gulp.task('minifycss', function () {
//    gulp.src('src/css/**/*.css')
//        .pipe(sourcemaps.init())
//        .pipe(autoprefixer({
//          browsers: 'last 2 versions'
//        }))
//        .pipe(minifycss())
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('dist/css/'))
//})

//一次编译所有image文件
//gulp.task('image', function(){
//	gulp.src('src/images/**/*')
//		.pipe(imgaemin({
//			progressive:true
//		}))
//		.pipe(gulp.dest('/dist/images'));
//});
//
//
//复制字体
//gulp.task('copy', function () {
//    gulp.src('src/fonts/**/*')
//        .pipe(gulp.dest('dist/fonts/'));
//});

