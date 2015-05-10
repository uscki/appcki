angular
	.module('appcki.settings',[])
	.controller("appckiSettingsOverview", ['$scope', '$localStorage', '$log', '$http','$state','$filter','$location', 'UserService',
		function( $scope, $localStorage, $log, $http, $state, $filter, $location, UserService){

			$scope.user = UserService.getUserFromToken($localStorage.token);

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
			}
		}
	]);
