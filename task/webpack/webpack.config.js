const webpack = require( 'webpack' );
const path    = require( 'path' );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );

// PostCSS loader with autoprefixer
const POSTCSS_LOADER = {
	loader: 'postcss-loader',
	options: {
		plugins: [
			require('autoprefixer')()
		]
	}
};

/**
 * Basic configuration
 */
module.exports = function( gulp, config, options ) {
	const webpackConfig = {
		context: path.resolve( __dirname, '../../www' ),
		
		entry: {
			common: './common.js',
			index:  './index.js',
		},
		
		output: {
			path: path.resolve( __dirname, '../../build/www' ),
			filename: "[name].js",
		},

		plugins: [
			new webpack.DefinePlugin({
				CONFIG:  asDefine( config ),
				OPTIONS: asDefine( options ),
			}),
			new webpack.optimize.CommonsChunkPlugin( { name: 'common' } ),
			new ExtractTextPlugin( "[name].css" ),
		],

		module: {
			rules: [{
				oneOf: [{
					test: /\.jsx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
				}, {
					test: /\.s[ac]ss$/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: ['css-loader', POSTCSS_LOADER, 'sass-loader' ],
					})
				}, {
					test: /\.less$/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: ['css-loader', POSTCSS_LOADER, 'less-loader' ],
					})
				}, {
					test: /\.css/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [ 'css-loader', POSTCSS_LOADER ],
					})
				}, {
					test: /\.vue$/,
					use: ['vue-loader-subcomponent', {
						loader: 'vue-loader',
						options: {
							loaders: {
								scss: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: ['css-loader', 'sass-loader' ] }),
								sass: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: ['css-loader', 'sass-loader?indentedSyntax' ] }),
								less: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: ['css-loader', 'less-loader' ] }),
								subcomponent: 'vue-loader-subcomponent/subcomponent',
								test: options.test ? "vue-loader-test" : null,
							},
							postcss: POSTCSS_LOADER.options,
						}
					}],
				}, {
					test: function( file ) {
						const ext = path.extname( file );
						if ( [".vue", ".css", ".sass", ".scss", ".js", ".less" ].indexOf( ext ) >= 0 )
							return false;
						return true;
					},
					loader: 'file-loader',
					options: {
						outputPath: 'assets/',
						//publicPath: OPTIONS.local ? '' : '/assets/',
					},
				}]
			}],
		},

		resolve: {
			modules: [ "node_modules", path.resolve(options.root, "www")],
			extensions: [ ".webpack.js", ".web.js", ".js", ".json", ".vue" ],
			alias: {
				'vue$': 'vue/dist/vue.common.js'
			},
		},

		devtool: "cheap-module-eval-source-map",
	};

	// Production
	if ( process.env.NODE_ENV === 'production' ) {
		webpackConfig.plugins = (webpackConfig.plugins || []).concat([
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"production"'
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
				compress: {
					warnings: false
				}
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: true
			}),
		]);
		webpackConfig.devtool = false;
	}
	return webpackConfig;
};

function asDefine( obj ) {
	if ( typeof(obj) === 'string' )
		return JSON.stringify( obj );
	else if ( obj === true )
		return 'true';
	else if ( obj === false )
		return 'false';
	else if ( obj === null )
		return 'null';
	else if ( typeof(obj) === 'undefined' )
		return 'void 0';
	
	const ret = {};
	for ( let key in obj )
		ret[key] = asDefine( obj[ key] );
	return ret;
}
