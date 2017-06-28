module.exports = function( gulp, config, options ) {
	gulp.task( "webpack", function( done ) {
		const path = require( 'path' );
		const gutil = require( 'gulp-util' );

		const webpack       = require( 'webpack' );
		let   webpackConfig = require( './webpack/webpack.config' );

		const webpackDevServer = require( 'webpack-dev-server' );
		
		if ( typeof(webpackConfig) === 'function' )
			webpackConfig = webpackConfig( gulp, config, options );

		// Output
		webpackConfig.output      = webpackConfig.output || {};
		webpackConfig.output.path = path.resolve( options.dest, "www" );
		webpackConfig.stats       = true;

		
		// Server 
		if ( options.server ) {
			setTimeout(function() {
				const devServerOptions = {
					//inline: true,
					contentBase: path.resolve( options.dest, "www" ),
					watchOptions: {
						ignored: /node_modules/
					},
					stats: { colors: true },
					host: "0.0.0.0",
					disableHostCheck: true,
				};
				const compiler = webpack( webpackConfig );
				const server = new webpackDevServer( compiler, devServerOptions );
				const port = getPort( options.server );
				server.listen( port );
				done();

			}, 0 );
			return;
		}

		// Watch
		if ( options.watch ) {
			let firstDone = false;
			setTimeout(function() {
				const watchOptions = Object.assign( {}, webpackConfig.watchOptions, {
					ignored: /node_modules/
				});

				const compiler = webpack( webpackConfig );
				compiler.watch( watchOptions, function( err, stats ) {
					if ( !firstDone ) {
						done();
						firstDone = true;
					}
					gutil.log(stats.toString({
						colors: gutil.colors.supportsColor
					}));
				});
			}, 0 );
			return;
		}

		// Roda o compilador
		const compiler = webpack( webpackConfig );
		compiler.run( function( err, stats ) {
			if ( stats ) {
				gutil.log(stats.toString({
					colors: gutil.colors.supportsColor
				}));
			}
			done( err );
		} );
	});

	function getPort( port ) {
		if ( ( !port ) || ( port === true ) )
			return ( config.devServer && config.devServer.port ) || 8080;
		if ( port.match( /^\d+$/ ) )
			return parseInt( port, 10 );
		return port;
	}
};
