"use strict";

module.exports = {
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			options: {
				presets: ['es2015'],
			}
		}]
	}
};
