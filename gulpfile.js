var gulp = require('gulp');
//var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var replace = require('gulp-regex-replace');
var contentIncluder = require('gulp-content-includer');

gulp.task('minifycss', function() {
    gulp.src('./css/*.css')      //压缩的文件
    .pipe(minifycss())   //执行压缩
    //.pipe(rename('.min'))
    .pipe(gulp.dest('./dist/css'));   //输出文件夹
});

gulp.task('connect', function() {
    connect.server({
        root: './dist',
        livereload: true,
        port: 8888
    });
});

//首页
gulp.task('index', function() {
    gulp.src('index.html')
        .pipe(replace({
            regex:'<!-- footer -->',
            replace:'<!--include "./util/footer.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- goTop -->',
            replace:'<!--include "./util/goTop.html"-->'
        }))
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
        process.stdout.write('\x07');
});
     
//体验总页
gulp.task('experience', function() {
    gulp.src('experience.html')
        .pipe(replace({
            regex:'<!-- ex-seo -->',
            replace:'<!--include "./util/ex-seo.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- header -->',
            replace:'<!--include "./util/header.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- footer -->',
            replace:'<!--include "./util/footer.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- goTop -->',
            replace:'<!--include "./util/goTop2.html"-->'
        }))
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(rename('experience.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
        process.stdout.write('\x07');
});
//体验H&H
gulp.task('hh', function() {
    gulp.src('hh.html')
        .pipe(replace({
            regex:'<!-- ex-seo -->',
            replace:'<!--include "./util/ex-seo.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- header -->',
            replace:'<!--include "./util/header.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- footer -->',
            replace:'<!--include "./util/footer.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- goTop -->',
            replace:'<!--include "./util/goTop2.html"-->'
        }))
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(rename('hh.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
        process.stdout.write('\x07');
});

//体验情感附加
gulp.task('additive', function() {
    gulp.src('additive.html')
        .pipe(replace({
            regex:'<!-- ex-seo -->',
            replace:'<!--include "./util/ex-seo.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- header -->',
            replace:'<!--include "./util/header.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- footer -->',
            replace:'<!--include "./util/footer.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- goTop -->',
            replace:'<!--include "./util/goTop2.html"-->'
        }))
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(rename('additive.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
        process.stdout.write('\x07');
});
//服务
gulp.task('service', function() {
    gulp.src('service.html')
        .pipe(replace({
            regex:'<!-- ex-seo -->',
            replace:'<!--include "./util/ex-seo.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- header -->',
            replace:'<!--include "./util/header.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- footer -->',
            replace:'<!--include "./util/footer.html"-->'
        }))
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(rename('service.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
        process.stdout.write('\x07');
});
//体验设计
gulp.task('designer', function() {
    gulp.src('designer.html')
        .pipe(replace({
            regex:'<!-- ex-seo -->',
            replace:'<!--include "./util/ex-seo.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- header -->',
            replace:'<!--include "./util/header.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- footer -->',
            replace:'<!--include "./util/footer.html"-->'
        }))
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
//      .pipe(replace({
//      	regex:'class="input-bar input-bar-white"',
//      	replace:'class="input-bar input-bar-black"'
//      }))
        .pipe(replace({
        	regex:'<div class="commenting">',
        	replace:'<div class="commenting" style="background:linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.9))">'
        }))
        .pipe(rename('designer.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
        process.stdout.write('\x07');
});

//合作详情
gulp.task('cooperation', function() {
    gulp.src('cooperation.html')
        .pipe(replace({
            regex:'<!-- header -->',
            replace:'<!--include "./util/header2.html"-->'
        }))
        .pipe(replace({
            regex:'<!-- goTop -->',
            replace:'<!--include "./util/goTop.html"-->'
        }))
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(rename('cooperation.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
        process.stdout.write('\x07');
});

//联系我们
gulp.task('content', function() {
    gulp.src('content.html')
        .pipe(replace({
            regex:'<!-- header -->',
            replace:'<!--include "./util/header2.html"-->'
        }))
    	.pipe(replace({
    		regex:'<!-- content1 -->',
    		replace:'<!--include "./util/join.html"-->'
    	}))
        .pipe(contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(rename('content.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
        process.stdout.write('\x07');
});



gulp.task('copy', function(){
    gulp.src('favicon.ico').pipe(gulp.dest('./dist/'));
	gulp.src('img/*').pipe(gulp.dest('./dist/img/'));
    gulp.src('uploads/*').pipe(gulp.dest('./dist/uploads/'));
	gulp.src('js/**/*.js').pipe(gulp.dest('./dist/js/'));
	gulp.src('fonts/*').pipe(gulp.dest('./dist/fonts/'));
	gulp.src('css/*.css').pipe(gulp.dest('./dist/css/'));
    process.stdout.write('\x07');
});

gulp.task('watch',function(){
	gulp.watch('css/*.css', ['minifycss','reload']);
	gulp.watch('js/**/*.js', ['copy','reload']);
	gulp.watch('img/*.*', ['copy','reload']);
	gulp.watch('./*.html', ['all']);
})

gulp.task('reload',function(){
	gulp.src('./dist/*.html').pipe(connect.reload());
})

gulp.task('all',['experience','additive','hh','index','designer','service','content','cooperation','reload']);

gulp.task('default',['connect','watch']);