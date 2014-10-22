'use strict';

var root = angular.module( 'root',
[
	'ui.router'
] );

root.config( function( $stateProvider )
{
	$stateProvider.state( 'root',
	{
		url: '/',
		views:
		{
			'root':
			{
				templateUrl: 'states/root/root.html',
				controller: 'RootController'
			}
		}
	} );
} );
