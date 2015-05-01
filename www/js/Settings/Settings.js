angular
	.module('appcki.settings',[])
	.controller("appckiSettingsOverview", ['$scope', '$log', '$http','$state','$filter','AgendaService','UserService',
		function( $scope, $log, $http, $state, $filter, $location, UserService){
			$scope.logout = function(){          
				/**
				 * Ik weet niet wat deze functie doet, maar als ik het weg haal, werkt 
				 * het uitloggen niet meer.
				 */
				UserService.me(
					{
					}
				);

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
