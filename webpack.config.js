"use strict";

const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

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
			test: /\.js$/,
			loader: 'babel-loader'
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
		}]
	},
	plugins: [
		new CommonsChunkPlugin({ name: "common", filename: "common.js" })
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	}
};
