const { dest, parallel, series, src, watch } = require("gulp");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const minify = require("gulp-minify");
const imagemin = require("gulp-imagemin");

// function images(cb) {
// 	return src("img/*")
// 		.pipe(
// 			imagemin({
// 				multipass: true,
// 				optimizationLevel: 7,
// 				progressive: true,
// 				svgoPlugins: [{ removeViewBox: false }]
// 			})
// 		)
// 		.pipe(dest("www/img"));
// }

function compress(cb) {
	return src("js/*.js")
		.pipe(
			minify({
				ext: {
					src: "-debug.js",
					min: ".js"
				},
				exclude: ["tasks"],
				ignoreFiles: [".combo.js", "-min.js"]
			})
		)
		.pipe(dest("www/js"));
}

exports.default = parallel(compress);

// gulp.task('minify-css', function() {
//   return gulp.src('css/*.css')
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(gulp.dest('css/'));
// });
