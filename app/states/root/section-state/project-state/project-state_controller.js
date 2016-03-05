'use strict';

var projectState = angular.module( 'projectState' );

projectState.controller( 'ProjectStateController', function( $rootScope, $scope, $state, $stateParams, Project, $interval, $http )
{

	$scope.stateParams = $state.params;

	$scope.$on( '$stateChangeSuccess', function( event, toState, toParams, fromState, fromParams )
	{
		if ( fromState.name === 'root.section-state.sorting-state' )
		{ 
			$rootScope.originalIndex = {
				section: fromParams.section,
				sortingType: fromParams.sortingType,
				q: fromParams.q
			}
		}
	});

	switch( $scope.stateParams.section )
	{
		case 'about':
			$http(
			{
				method: 'GET',
				url: 'https://ancient-peak-41402.herokuapp.com/people/' + $scope.stateParams.projectId + '.json'
			} ).then( function( response )
			{
				$scope.activeItem = response.data;
			} );
		break;

		case 'search':
			if( $scope.stateParams.m === "person" )
			{
				$http(
				{
					method: 'GET',
					url: 'https://ancient-peak-41402.herokuapp.com/people/' + $scope.stateParams.projectId + '.json'
				} ).then( function( response )
				{
					$scope.activeItem = response.data;
				} );
			}
			else
			{
				Project.get( { id: $scope.stateParams.projectId } ).$promise.then( function( response )
				{
					$scope.activeItem = response.result;
				} );
			}
		break;

		default:
			Project.get( { id: $scope.stateParams.projectId } ).$promise.then( function( response )
			{
				$scope.activeItem = response.result;
			} );
		break;
	}

	$scope.stateName = 'section-state.project-state';

	console.log( 'ProjectStateController active!' );

	$scope.closeProject = function(  )
	{
		if ( $rootScope.originalIndex )
		{
			$state.go( 'root.section-state.sorting-state', { section: $rootScope.originalIndex.section, sortingType: $rootScope.originalIndex.sortingType } );

			// Clear originalIndex
			$rootScope.originalIndex = null;
		}
		else
		{
			$state.go( '^' );
		}
	}

	// var isLeft;
	// var velocity;

	// $scope.startScroll = function( event )
	// {		
	// 	var imageGalleryWrapper = document.getElementsByClassName( 'image-gallery-section-wrapper' )[ 0 ];

	// 	var imageWrapperX = imageGalleryWrapper.getBoundingClientRect(  ).left;
	// 	var imageWrapperMiddle = imageGalleryWrapper.offsetWidth / 2;
	// 	var mouseX = event.pageX;
	// 	var posX = mouseX - imageWrapperX;
	// 	var imageGallery = event.currentTarget.getElementsByClassName( 'image-gallery-section' )[ 0 ];

	// 	isLeft = posX < imageWrapperMiddle;

	// 	if ( isLeft )
	// 	{
	// 		velocity = 50 / -2
	// 	}
	// 	else
	// 	{
	// 		velocity = 50 / 2
	// 	}

	// 	$scope.scrollInterval = $interval( function(  )
	// 	{
	// 		imageGallery.scrollLeft += velocity;
	// 	}, 50 );
	// }

	// $scope.updateScroll = function( event )
	// {
	// 	$interval.cancel( $scope.scrollInterval );
	// 	$scope.startScroll( event );
	// }

	// $scope.stopScroll = function(  )
	// {
	// 	$interval.cancel( $scope.scrollInterval );
	// }


} );
