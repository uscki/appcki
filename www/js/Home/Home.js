angular.module('appcki.home',[])
.controller("homePageCtrl", ['$scope', '$state', '$ionicNavBarDelegate', '$ionicSlideBoxDelegate', '$ionicPosition', '$ionicGesture', '$log', '$http','$location','UserService',
function($scope, $state, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $ionicPosition, $ionicGesture, $log, $http, $location, UserService){

	var element = angular.element(document.querySelector("#main-slide-box"));
	var maxDragLeft = 0;
	var maxDragRight = 0;
	var titleBarWidth = 0;
	
	/**
	 * Method to set the title in the nav bar to the title of
	 * the view that is being shown
	 */
	$scope.slideChange = function()
	{
		var views = Object.keys($state.current.views);

		var i = $ionicSlideBoxDelegate.currentIndex();
		var next = (i+1) % views.length;
		var prev = (i == 0) ? views.length-1 : i-1;
		var next2next = (i+2) % views.length;
		
		var currentView = $state.current.views[views[i]].name;
		var nextView = $state.current.views[views[next]].name;
		var prevView = $state.current.views[views[prev]].name;
		var next2nextView = $state.current.views[views[next2next]].name;

		var title = '<div id="header-title-bar">';
		title += '<span class="title-small title-prev">' + prevView + '</span>';
		title += '<span class="title-small title-next">' + nextView + '</span>';
		title += '<span class="title-current">' + currentView + '</span>';
		title += '<span class="title-small title-next2next">' + next2nextView + '</span>';
		title += '</div>';

		$ionicNavBarDelegate.title(title);

		calculateMaxDrag();
		setOuterTitlePositions();
	}

	$scope.$on('$ionicView.enter', function(){
		$scope.slideChange();
	});

	/** 
	 * Function that is called when content is dragged
	 * @param e 	drag event
	 */
	var myDrag = function(e){
		var slideIndex = $ionicSlideBoxDelegate.currentIndex();
		var width = window.innerWidth;
		var slide = angular.element(document.querySelectorAll('.slider-slide')[slideIndex]);
		var style = slide[0].style;
		var re = /.*X\((-?\d*)px\)/;
		var x = re.exec(style.transform)[1];
		transformTitleBar(x, false);
	}

	/**
	 * Function that is called when content drag starts
	 * @param e 	drag event
	 */
	var myDragStart = function(e)
	{

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
		
		x = (x < -maxDragLeft) ? -maxDragLeft : x;
		x = (x > maxDragRight) ? maxDragRight : x;
		
		// Set new css
		var transformation = "translate(" + x + "px, 0px)";
		titleBar.css('transform', transformation);
	}

	var setOuterTitlePositions = function()
	{
		var prevTitle = angular.element(document.querySelector('#header-title-bar .title-prev'));
		var prevWidth = prevTitle[0].offsetWidth;
		var curTitleWidth = document.querySelector('#header-title-bar .title-current').offsetWidth;

		var nextTitle = angular.element(document.querySelector('#header-title-bar .title-next2next'));
		var nextTitleWidth = nextTitle[0].offsetWidth;


		var left = "-" + maxDragRight + "px";
		var right = (titleBarWidth - curTitleWidth - nextTitleWidth - 20 + maxDragLeft) + "px";
		prevTitle.css('margin-left', left);
		nextTitle.css('margin-left', right);
	}

	/**
	 * Calculates the maximum distance the title bar can be dragged
	 * in either direction and sets the values in the controller
	 */
	var calculateMaxDrag = function()
	{
		var titleBar = angular.element(document.querySelector('#header-title-bar'));

		// Request element widths from title bar
		titleBarWidth = titleBar[0].offsetWidth;
		var nextWidth = document.querySelector('#header-title-bar .title-next').offsetWidth;
		var curWidth = document.querySelector('#header-title-bar .title-current').offsetWidth;

		// Calculate how far the titles can be dragged
		maxDragLeft = titleBarWidth - nextWidth - 20;
		maxDragRight = titleBarWidth - curWidth - 20;
	}


	// Remove event listeners on document destroy
	$scope.$on('$destroy', function(){
		$ionicGesture.off(dragGesture, 'drag', myDrag);
		$ionicGesture.off(dragEndGesture, 'dragend', myDragEnd);
		$ionicGesture.off(dragStartGesture, 'dragstart', myDragStart);
	});

	// Event listeners for dragging the content
	var dragGesture = $ionicGesture.on('drag', myDrag, element);
	var dragEndGesture = $ionicGesture.on('dragend', myDragEnd, element);
	var dragStartGesture = $ionicGesture.on('dragstart', myDragStart, element);


}])
.controller("appCtrl", ['$rootScope', '$scope', '$state', '$ionicSideMenuDelegate', '$location',
function($rootScope, $scope, $state, $ionicSideMenuDelegate, $location){
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
}]);
