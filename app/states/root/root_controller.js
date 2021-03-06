'use strict';

var root = angular.module( 'root' );

root.controller( 'RootController', function( $rootScope, $scope, $state, $stateParams, $http, screenSize )
{
	// This is a controller.

	$scope.stateName = 'root';

	$scope.state = $state;

	$scope.stateParams = $stateParams;
	
	$scope.activeTopNav = $state.current.activeTopNav;

	// $scope.mobile = screenSize.on( 'xs', function( match )
	// {
	// 	$scope.mobile = match;
	// });

	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	if ( w < 500 )
	{
		$scope.mobile = true;
	}

	$rootScope.$on( '$stateChangeSuccess', function( event, to, toParams, from, fromParams )
	{
		$rootScope.previousState = from;
	} );

	$rootScope.$on( '$stateChangeStart', function( event, to, toParams, from, fromParams )
	{
		$scope.stateName = to.name;
	} );

} );
