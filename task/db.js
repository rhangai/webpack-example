module.exports = function( gulp, config, options ) {
	/**
	 * 
	 */
	gulp.task( 'db-build', function() {
		const doT = require( 'dot' );
		const _   = require( 'lodash' );
		const fs   = require( 'fs' );
		const path = require( 'path' );

		const templateOptions = _.extend({}, doT.templateSettings, {
			strip: false,
		});
		const template = doT.template( fs.readFileSync( path.resolve( options.root, 'database/flyway.in.conf' ), 'utf8' ), templateOptions );
		fs.writeFileSync( path.resolve( options.root, 'database/flyway.conf' ), template( config ) );
	});
};
