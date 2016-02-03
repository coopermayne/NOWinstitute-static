'use strict';

var projectState = angular.module( 'projectState' );

projectState.controller( 'ProjectStateController', function( $rootScope, $scope, $state, $stateParams, Project )
{

	// This is a controller.
	$scope.stateParams = $stateParams;

	Project.get( { id: $scope.stateParams.projectId } ).$promise.then( function( response )
	{
		$scope.activeProject = response.result;
	} );

	$scope.stateName = 'section-state.project-state';

	console.log( 'ProjectStateController active!' );

} );
