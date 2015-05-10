angular.module('appcki.home',[])
.controller("homePageCtrl", ['$scope', '$state', '$ionicNavBarDelegate', '$ionicSlideBoxDelegate', '$log', '$http','$location','UserService',
function($scope, $state, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $log, $http, $location, UserService){

	/**
	 * Method to set the title in the nav bar to the title of
	 * the view that is being shown
	 */
	$scope.slideChange = function()
	{
		var i = $ionicSlideBoxDelegate.currentIndex();
		var views = Object.keys($state.current.views);
		var currentView = $state.current.views[views[i]].name;
		$ionicNavBarDelegate.title(currentView);
	}

	$scope.$on('$ionicView.beforeEnter', function(){
		$scope.slideChange();
	});


}])
.controller("appCtrl", ['$rootScope', '$scope', '$state', '$ionicSideMenuDelegate', '$location',
function($rootScope, $scope, $state, $ionicSideMenuDelegate, $location){
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
}]);
