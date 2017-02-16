"use strict";

const gulp    = require( 'gulp' );
const webpack = require( 'webpack-stream' );



gulp.task( "webpack", function() {
	const config = Object.assign({}, require( './webpack.config' ));
	if ( process.argv.indexOf("--watch") >= 0 )
		config.watch = true;
	return webpack( config, require( 'webpack' ) )
		.pipe( gulp.dest( "build" ) )
	;
});
gulp.task( "html", function() {
	return gulp.src( "index.html" )
		.pipe( gulp.dest( "build" ) )
	;
});
gulp.task( "default", ["webpack", "html"] );
