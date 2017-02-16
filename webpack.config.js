"use strict";

const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
				use: 'css-loader!sass-loader'
			})
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: 'css-loader!less-loader'
			})
		}, {
			test: /\.css/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: 'css-loader'
			})
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					scss: 'vue-style-loader!css-loader!sass-loader',
					sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
					less: 'vue-style-loader!css-loader!less-loader',
				}
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
	}
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
}
