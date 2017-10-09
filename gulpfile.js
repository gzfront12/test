// 导入gulp实例
var gulp = require('gulp');
var gulpHtmlmin = require('gulp-htmlmin');
var gulpUglify = require('gulp-uglify');
var gulpConcat = require('gulp-concat');
var gulpRename = require('gulp-rename');
var gulpCleanCss = require('gulp-clean-css');
var gulpLess = require('gulp-less');

/**
 * task：
 * @param1 任务名
 * @param2 任务依赖，可选
 * @param3 执行任务的函数
 * */
gulp.task('log', [], function () {
  console.log('学习task—API');
});

/**
 * src 读文件
 * dest 写文件
 * */
gulp.task('cp', ['log'], function () {

  gulp.src(['src/js/*.js'])
    .pipe(gulp.dest('dist'));

});

/**
 * 创建一个默认default任务，这个任务依赖cp任务，
 * 然后监听js文件变化，变化时再自动执行cp任务。
 * */
gulp.task('default', ['cp'], function () {

  // 文件变化时再自调执行cp任务
  gulp.watch(['src/js/*.js'], function () {
    console.log('js文件发生了变化，重新执行cp任务');
    gulp.run('cp');
  });

});


/**
 * 编写一个压缩index.html的任务
 * */
gulp.task('htmlmin', [], function () {
  gulp.src(['src/index.html'])
    .pipe(gulpHtmlmin({
      collapseWhitespace: true, // 去掉空白字符
      minifyJS: true,//压缩页面JS
      minifyCSS: true,//压缩页面CSS
      removeComments: true//清除HTML注释
    }))
    .pipe(gulp.dest('dist'));
});

/**
 * 编写一个压缩js的任务
 * */
gulp.task('jsmin', [], function () {
  gulp.src(['src/js/*.js'])
    .pipe(gulpUglify())
    .pipe(gulp.dest('dist'));
});


/**
 * 编写一个合并压缩js的任务
 * */
gulp.task('js', [], function () {
  gulp.src(['src/js/a.js', 'src/js/b.js', 'src/js/*.js'])
    .pipe(gulpConcat('bundle.js'))
    .pipe(gulpUglify())
    .pipe(gulpRename({
      dirname: 'js',   // 这个配置可以基于dist目录增加一些层级
      prefix: 'pre_',   // 这个是在原名字前面加前缀
      suffix: '.min'    // 这个是在原名字后面加后缀
    }))
    .pipe(gulp.dest('dist'));
});

/**
 * 编写一个合并压缩css的任务
 * */
gulp.task('css', [], function () {
  gulp.src(['src/css/*.css'])
    .pipe(gulpConcat('bundle.css'))
    .pipe(gulpCleanCss())
    .pipe(gulpRename({
      dirname: 'css',   // 这个配置可以基于dist目录增加一些层级
      suffix: '.min'    // 这个是在原名字后面加后缀
    }))
    .pipe(gulp.dest('dist'));
});

/**
 * 创建一个解析less，然后压缩的任务
 * */
gulp.task('less', [], function () {
  gulp.src(['src/less/main.less'])
    .pipe(gulpLess())
    .pipe(gulpCleanCss())
    .pipe(gulpRename({
      dirname: 'less',   // 这个配置可以基于dist目录增加一些层级
      suffix: '.min'    // 这个是在原名字后面加后缀
    }))
    .pipe(gulp.dest('dist'));
});
