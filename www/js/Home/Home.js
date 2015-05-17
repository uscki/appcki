angular.module('appcki.home',[])
.controller("homePageCtrl", ['$scope', '$state', '$ionicNavBarDelegate', '$ionicSlideBoxDelegate', '$ionicPosition', '$ionicGesture', '$log', '$http','$location','UserService',
function($scope, $state, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $ionicPosition, $ionicGesture, $log, $http, $location, UserService){

	var element = angular.element(document.querySelector("#main-slide-box"));
	
	/**
	 * Method to set the title in the nav bar to the title of
	 * the view that is being shown
	 */
	$scope.slideChange = function()
	{
		var views = Object.keys($state.current.views);

		var i = $ionicSlideBoxDelegate.currentIndex();
		var next = (i == views.length-1) ? 0 : i+1;
		var prev = (i == 0) ? views.length-1 : i-1;
		
		var currentView = $state.current.views[views[i]].name;
		var nextView = $state.current.views[views[next]].name;
		var prevView = $state.current.views[views[prev]].name;

		var title = '<div id="header-title-bar">';
		title += '<span class="title-small title-prev">' + prevView + '</span>';
		title += '<span class="title-small title-next">' + nextView + '</span>';
		title += '<span class="title-current">' + currentView + '</span>';
		title += '</div>';

		$ionicNavBarDelegate.title(title);

	}

	$scope.$on('$ionicView.enter', function(){
		$scope.slideChange();
	});

	/** 
	 * Function that is called when content is dragged
	 * @param e 	drag event
	 */
	var myDrag = function(e){
		var x = e.gesture.deltaX;
		transformTitleBar(x, false);
	}

	/**
	 * Function that is called when content is done dragging, resetting
	 * the title position
	 * @param e 	drag event
	 */
	var myDragEnd = function(e)
	{
		transformTitleBar(0, true);
	}

	/**
	 * Function that handles the sliding of the title in the ion-nav-bar
	 * @param x 		the horizontal dragged distance
	 * @param finished 	boolean that indicates wether the dragging has ended
	 */
	var transformTitleBar = function(x, finished)
	{
		var titleBar = angular.element(document.querySelector('#header-title-bar'));

		if(finished)
		{
			titleBar.addClass('resetting');
		} else {
			titleBar.removeClass('resetting');
		}

		// Request element widths from title bar
		totalWidth = titleBar[0].offsetWidth;
		nextWidth = document.querySelector('#header-title-bar .title-next').offsetWidth;
		curWidth = document.querySelector('#header-title-bar .title-current').offsetWidth;

		// Calculate how far the titles can be dragged
		var maxDragLeft = totalWidth - nextWidth - 20;
		var maxDragRight = totalWidth - curWidth - 20;
		x = (x < -maxDragLeft) ? -maxDragLeft : x;
		x = (x > maxDragRight) ? maxDragRight : x;
		
		// Set new css
		var transformation = "translate(" + x + "px, 0px)";
		titleBar.css('transform', transformation);
	}

	// Remove event listeners on document destroy
	$scope.$on('$destroy', function(){
		$ionicGesture.off(dragGesture, 'drag', myDrag);
		$ionicGesture.off(dragEndGesture, 'dragend', myDragEnd);
	});

	// Event listeners for dragging the content
	var dragGesture = $ionicGesture.on('drag', myDrag, element);
	var dragEndGesture = $ionicGesture.on('dragend', myDragEnd, element);


}])
.controller("appCtrl", ['$rootScope', '$scope', '$state', '$ionicSideMenuDelegate', '$location',
function($rootScope, $scope, $state, $ionicSideMenuDelegate, $location){
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
}]);
