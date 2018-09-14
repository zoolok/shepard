var syntax        = 'css'; // Syntax: sass or css;

var gulp       = require('gulp'), // Подключаем Gulp
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    cleancss      = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов





gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/assets/libs/jquery/dist/jquery.min.js', // jQuery
        'app/assets/libs/magnific-popup/dist/jquery.magnific-popup.min.js', // Magnific Popup
        'app/assets/libs/owl.carousel/dist/owl.carousel.js',// OWL Carousel
        'app/assets/libs/slick-carousel/slick/slick.js',// Slick Carousel
        'app/assets/libs/spincrement/spincrement.min.js',// spincrement
        'app/assets/libs/waypoints/waypoints.min.js'// waypoints

    ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/assets/js')) // Выгружаем в папку app/js
        .pipe(browserSync.stream());
});

gulp.task('styles', function() {
    return gulp.src([
        'app/assets/css/main.css',
        'app/assets/css/libs.css'
    ])
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
        .pipe(gulp.dest('app/assets/css'))
        .pipe(browserSync.stream())
});

/*gulp.task('css', function(){ // Создаем таск Css
    return gulp.src('app/css/!**!/!*.css') // Берем источник
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('css-libs', ['css'], function() {
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});*/

/*gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/css/!**!/!*.css', ['css']); // Наблюдение за css файлами в папке css
    gulp.watch('app/!*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/!**!/!*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});*/

gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {
    gulp.watch('app/assets/'+syntax+'/**/*.'+syntax+'', ['styles']);
    gulp.watch(['app/assets/libs/**/*.js', 'app/assets/js/**/*.js'], browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('app/assets/images/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/assets/images')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'scripts'], function() {

    var buildCss = gulp.src([ // Переносим стили в продакшен
        'app/assets/css/main.min.css',
        'app/assets/css/libs.min.css'
    ])
        .pipe(gulp.dest('dist/assets/css'))

    var buildFonts = gulp.src('app/assets/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/assets/fonts'))

    var buildJs = gulp.src('app/assets/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/assets/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));


});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
