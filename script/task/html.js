module.exports = function( gulp, config, options ) {
	gulp.task( "html", function() {
		const _    = require( 'lodash' );
		const path = require( 'path' );
		const fs   = require( 'fs-extra' );
		const doT  = require( 'dot' );
		const templateOptions = _.extend({}, doT.templateSettings, {
			strip: false,
		});

		return fs.readFile( path.resolve( options.src, "index.html" ), "utf8" )
			.then(function( file ) {
				const template = doT.template( file, templateOptions );
				const data = template({ config: config, options: options });

				return fs.outputFile( path.resolve( options.dest, "www/index.html" ), data );
			});
	});
};
