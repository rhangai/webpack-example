"use strict";

const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// PostCSS loader with autoprefixer
const POSTCSS_LOADER = {
	loader: 'postcss-loader',
	options: {
		plugins: [
			require('autoprefixer')()
		]
	}
};

module.exports = {
	entry: {
		common: './src/common.js',
		index:  './src/index.js',
	},
	output: {
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader'
		}, {
			test: /\.scss$/,
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
			loader: 'vue-loader',
			options: {
				loaders: {
					scss: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: ['css-loader', 'sass-loader' ] }),
					sass: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: ['css-loader', 'sass-loader?indentedSyntax' ] }),
					less: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: ['css-loader', 'less-loader' ] }),
				},
				postcss: POSTCSS_LOADER.options,
			}
		}]
	},
	plugins: [
		new CommonsChunkPlugin({ name: "common", filename: "common.js" }),
		new ExtractTextPlugin( "[name].css" ),
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	devtool: "cheap-module-eval-source-map",
};

// Minifica
if (process.env.NODE_ENV === 'production') {
	module.exports.plugins = (module.exports.plugins || []).concat([
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
		})
	])
	module.exports.devtool = false;
}
