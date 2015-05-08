angular.module('appcki.home',[])
.controller("homePageCtrl", ['$scope', '$state', '$ionicModal', '$ionicNavBarDelegate', '$log', '$http','$location','UserService',
function($scope, $state, $ionicModal, $ionicNavBarDelegate, $log, $http, $location, UserService){

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

}])
.controller("appCtrl", ['$rootScope', '$scope', '$state', '$ionicModal', '$location',
function($rootScope, $scope, $state, $ionicModal, $location){

	$scope.showSettings = function()
	{
		$scope.modal.show();
	}

	// Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('js/Settings/settings-overview.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        
        // The animation we want to use for the modal entrance
        animation: 'slide-in-right'
    });

}]);
