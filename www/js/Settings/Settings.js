angular
	.module('appcki.settings',[])
	.controller("appckiSettingsOverview", ['$rootScope', '$scope', '$state', '$location', '$ionicSlideBoxDelegate', 'SettingsService', 'UserService',
		function( $rootScope, $scope, $state, $location, $ionicSlideBoxDelegate, SettingsService, UserService){

			$scope.username = UserService.fullname();
			$scope.showReorder = false;
			$rootScope.homeviews = [];

			$scope.logout = function(){          
				UserService.logout(
					function(){
						$location.path('/login');
					},
					function(){
						var alertPopup = $ionicPopup.alert({
							title: 'Uitloggen mislukt',
							template: 'Tja, wat kunnen we hier over zeggen...'
						});
					}
				);
			};

			$scope.removeFromHome = function(item)
			{
				SettingsService.setHome(item, false);
				updateMenuNavigation();
			};

			$scope.addToHome = function(item)
			{
				SettingsService.setHome(item, true);
				updateMenuNavigation();
			};

			$scope.moveItem = function(item, $fromIndex, $toIndex)
			{
				SettingsService.setNavOrder(item, $fromIndex, $toIndex);
				updateMenuNavigation();
			};

			$scope.toggleReorder = function()
			{
				console.log("Yoo to the fucking loo");
				$scope.showReorder = !$scope.showReorder;
			};

			var updateMenuNavigation = function()
			{
				$rootScope.homeviews =  SettingsService.getViews();
				$ionicSlideBoxDelegate.update();
			};

			updateMenuNavigation();
		}
	]);
