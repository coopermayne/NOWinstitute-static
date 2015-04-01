'use strict';

var gulp    = require( 'gulp' );
var connect = require( 'gulp-connect' );

var path    = require( '../../paths.js' );



gulp.task( 'connect', function(  )
{
	connect.server(
	{
		root: path.to.destination,
		hostname: '0.0.0.0',
		livereload: true,
		middleware: function(  )
		{
			// This get's rid of the # symbol in the URL
			return [ noHash ];
		}
	} );
} );
