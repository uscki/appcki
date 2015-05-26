angular.module('appcki.home',['ngSanitize'])
.controller("homePageCtrl", ['$rootScope', '$sce', '$scope', '$state', '$ionicNavBarDelegate', '$ionicSlideBoxDelegate', '$ionicPosition', '$ionicGesture', '$log', '$http','$location','UserService',
function($rootScope, $sce, $scope, $state, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $ionicPosition, $ionicGesture, $log, $http, $location, UserService){

	var element = angular.element(document.querySelector("#main-slide-box"));
	var slides, slideIndex;
	var maxDragLeft = 0;
	var maxDragRight = 0;
	var titleBarWidth = 0;
	
	/**
	 * Method to set the title in the nav bar to the title of
	 * the view that is being shown
	 */
	$scope.slideChange = function()
	{
		slideIndex = $ionicSlideBoxDelegate.currentIndex();

		var next = (slideIndex+1) % slides.length;
		var prev = (slideIndex === 0) ? slides.length-1 : slideIndex-1;
		var next2next = (slideIndex+2) % slides.length;

		var currentView = slides[slideIndex].title;
		var nextView = slides[next].title;
		var prevView = slides[prev].title;
		var next2nextView = slides[next2next].title;

		var title = '<div id="header-title-bar">';
		title += '<span class="title-small title-prev">' + prevView + '</span>';
		title += '<span class="title-small title-next">' + nextView + '</span>';
		title += '<span class="title-current">' + currentView + '</span>';
		title += '<span class="title-small title-next2next">' + next2nextView + '</span>';
		title += '</div>';

		$ionicNavBarDelegate.title(title);

		calculateMaxDrag();
		setOuterTitlePositions();
	};

	$scope.$on('$ionicView.enter', function(){
		slides = slides = document.querySelectorAll('.slider-slide');
		$scope.slideChange();
	});

	/** 
	 * Function that is called when content is dragged
	 * @param e 	drag event
	 */
	var myDrag = function(e){
		var slideIndex = $ionicSlideBoxDelegate.currentIndex();
		var style = angular.element(slides[slideIndex])[0].style;
		var x = /.*X\((-?\d*)px\)/.exec(style.transform)[1];
		transformTitleBar(x, false);
	};

	/**
	 * Function that is called when content drag starts
	 * @param e 	drag event
	 */
	var myDragStart = function(e)
	{

	};

	/**
	 * Function that is called when content is done dragging, resetting
	 * the title position
	 * @param e 	drag event
	 */
	var myDragEnd = function(e)
	{
		transformTitleBar(0, true);
	};

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
	};

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
	};

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
	};


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

	// $ionicSlideBoxDelegate.update();

	$scope.randomname = "news";

	/*$scope.$on('$ionicView.afterEnter', function(){
		var generatedSlides = document.querySelectorAll('.slider-slide');
		console.log(generatedSlides.length);
		for(var i = 0; i < generatedSlides.length; i++)
		{
			var el = angular.element(generatedSlides[i]);
			el.html("<ion-nav-view name=\"GoL\"><\/ion-nav-view>");
		}
		$ionicSlideBoxDelegate.update();
	});*/
	

}])
.controller("appCtrl", ['$rootScope', '$scope', '$state', '$ionicSideMenuDelegate', '$location',
function($rootScope, $scope, $state, $ionicSideMenuDelegate, $location){
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
}]);
