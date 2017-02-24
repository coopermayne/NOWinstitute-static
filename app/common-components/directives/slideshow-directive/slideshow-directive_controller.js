'use strict';

var slideshowDirective = angular.module( 'slideshowDirective' );


slideshowDirective.controller( 'SlideshowDirectiveController', function( $rootScope, $scope, $state, $stateParams, $interval, screenSize, $timeout, $element )
{

	console.log('SlideShowDirectiveController active!')
  console.log( $scope.section );
	var counter = -1;

	$scope.stateParams = $stateParams;
	$scope.state = $state;

	// Check for desktop/mobile
	$scope.mobile = screenSize.on( 'xs', function( match )
	{
		$scope.mobile = match;
	});

		$scope.$watch( 'slides', function( apiResponse )
		{	
			if ( apiResponse !== undefined )
			{
				// Image slideshow
			
				$scope.playSlideShow = $interval( function(  )
				{
					if ( counter < $scope.slides.length - 1 )
					{
						counter++;
					}
					else
					{
						counter = 0;
					}

					$scope.currentSlide = $scope.slides[ counter ];
					$scope.nextSlide = $scope.slides[ counter + 1 ];
					return

				}, $scope.frameRate || 2000 );
			
		}
	} );

	// Control buttons
	$scope.setCurrentSlide = function( slide )
	{
		$interval.cancel( $scope.playSlideShow );

		$scope.currentSlide = slide;
	}


	// Reset counter on state change
	$rootScope.$on( '$stateChangeStart', function( event, unfoundState, fromState, fromParams )
	{ 
		return counter = -1;
	});


} );
