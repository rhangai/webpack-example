"use strict";

const gulp  = require( 'gulp' );
const fs    = require( 'fs-extra' );
const path  = require( 'path' );
const _     = require( 'lodash' );
const JSON5 = require( 'json5' );
const argv  = require( 'yargs' ).argv;

// Options
const options = {
	root:   path.resolve( __dirname ),
	dest:   path.resolve( __dirname, 'build' ),
	src:    path.resolve( __dirname, 'www' ),
	server: !!argv.server,
	watch:  !!argv.watch,
	local:  !!argv.local,
};

// CONFIG
const CONFIG = (function() {
	const baseConfig = JSON5.parse( fs.readFileSync( './config.example.json' ) );
	const config = _.merge( baseConfig, require( './config' ) );
	config.$vars = config.$vars || {};
	config.$vars.options = options;
	config.$vars.dest    = options.dest;

	const doT = require( 'dot' );
	const templateSettings = _.extend({}, doT.templateSettings, {
		strip: false,
	});

	const processOptions = function( c ) {
		for ( let k in c ) {
			if ( k.charAt(0) === '$' )
				continue;
			
			if ( typeof(c[k]) === 'object' ) {
				processOptions( c[k] );
			} else if ( typeof(c[k]) === 'string' ) {
				const template = doT.template( c[k], templateSettings );
				c[k] = template( config.$vars );
			}
		}
	};
	processOptions( config );
	return config;
	
}());

// Eval every file on task
const basedir = path.resolve( __dirname, 'script/task' );
const files   = fs.readdirSync( basedir );
files.forEach(function( file ) {
	if ( path.extname( file ) !== '.js' )
		return;

	const m = require( path.resolve( basedir, file ) );
	if ( typeof(m) !== 'function' )
		throw new Error( `Module ${file} must export a function` );
	m( gulp, CONFIG, options );
});

// Default task
gulp.task( "default", ["webpack", "html"] );
