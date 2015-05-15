angular.module('appcki.home',[])
.controller("homePageCtrl", ['$scope', '$state', '$ionicNavBarDelegate', '$ionicSlideBoxDelegate', '$log', '$http','$location','UserService',
function($scope, $state, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $log, $http, $location, UserService){

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

		var title = '<span class="title-small title-prev">' + prevView + '</span>';
		title += '<span class="title-small title-next">' + nextView + '</span>';
		title += '<div class="title-current">' + currentView + '</div>';

		$ionicNavBarDelegate.title(title);

	}

	$scope.$on('$ionicView.enter', function(){
		$scope.slideChange();
	});


}])
.controller("appCtrl", ['$rootScope', '$scope', '$state', '$ionicSideMenuDelegate', '$location',
function($rootScope, $scope, $state, $ionicSideMenuDelegate, $location){
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
}]);
