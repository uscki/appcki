angular.module('appcki.home',[])
.controller("homePageCtrl", ['$scope', '$state', '$ionicNavBarDelegate', '$log', '$http','$location','UserService',
function($scope, $state, $ionicNavBarDelegate, $log, $http, $location, UserService){	

	/**
	 * Method to set the title in the nav bar to the title of
	 * the view that is being shown
	 */
	$scope.slideChange = function($index)
	{
		var views = Object.keys($state.current.views);
		var currentView = $state.current.views[views[$index]].name;
		$ionicNavBarDelegate.title(currentView);
	}
	
	console.log("Changing slide now!");


}]);
