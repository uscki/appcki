angular.module('appcki.home',[])
.controller("homePageCtrl", ['$scope', '$state', '$ionicNavBarDelegate', '$ionicSlideBoxDelegate', '$ionicPosition', '$ionicGesture', '$log', '$http','$location','UserService',
function($scope, $state, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $ionicPosition, $ionicGesture, $log, $http, $location, UserService){

	var element = angular.element(document.querySelector("#main-slide-box"));
	console.log(element);
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
		/*console.log("Length: " + views.length);
		console.log("Index: " + i);
		console.log("Previous: " + prev);
		console.log("Next: " + next);*/
		
		var currentView = $state.current.views[views[i]].name;
		var nextView = $state.current.views[views[next]].name;
		var prevView = $state.current.views[views[prev]].name;

		var title = '<div id="header-title-bar">';
		title += '<span class="title-small title-prev">' + prevView + '</span>';
		title += '<span class="title-small title-next">' + nextView + '</span>';
		title += '<div class="title-current">' + currentView + '</div>';
		title += '</div>';

		$ionicNavBarDelegate.title(title);

	}

	$scope.$on('$ionicView.enter', function(){
		$scope.slideChange();
	});

	var myDrag = function(e){
		var x = e.gesture.deltaX;
		var titleBar = angular.element(document.querySelector('#header-title-bar'));
		titleBar.removeClass('resetting');
		transformTitleBar(titleBar, x);
	}

	var myDragEnd = function(e)
	{
		var titleBar = angular.element(document.querySelector('#header-title-bar'));
		titleBar.addClass('resetting');
		transformTitleBar(titleBar, 0);
	}

	var transformTitleBar = function(titleBar, x)
	{
		var transformation = "translate(" + x + "px, 0px)";
		titleBar.css('transform', transformation);
	}

	$scope.$on('$destroy', function(){
		$ionicGesture.off(dragGesture, 'drag', myDrag);
		$ionicGesture.off(dragEndGesture, 'dragend', myDragEnd);
	});

	var dragGesture = $ionicGesture.on('drag', myDrag, element);
	var dragEndGesture = $ionicGesture.on('dragend', myDragEnd, element);


}])
.controller("appCtrl", ['$rootScope', '$scope', '$state', '$ionicSideMenuDelegate', '$location',
function($rootScope, $scope, $state, $ionicSideMenuDelegate, $location){
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
}]);
