"use strict";

const gulp    = require( 'gulp' );
const webpack = require( 'webpack-stream' );



gulp.task( "webpack", function() {
	return gulp.src( "src/index.js" )
		.pipe( webpack( require( './webpack.config' ), require( 'webpack' ) ) )
		.pipe( gulp.dest( "build" ) )
	;
});
