angular
	.module('appcki.settings',[])
	.controller("appckiSettingsOverview", ['$scope', '$state', '$localStorage', '$log', '$http','$state','$filter','$location', 'UserService',
		function( $scope, $state, $localStorage, $log, $http, $state, $filter, $location, UserService){

			$scope.username = UserService.fullname();
			$scope.homeviews = [];

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

			var updateMenuNavigation = function()
			{
				var views = $state.get('app.home.views').views;
				// var viewnames = views.keys();
				// console.log(views);

				// for(var i = 0; i < viewnames.length; i++)
				var homeviews = [];
				var home = {"name" : "Beginscherm", "state" : "app.home"};
				homeviews.push(home);
				for(var key in views)
				{
					var view = views[key];
					view.frontpage = true;
					view.id = key;
					homeviews.push(view);
				}

				return homeviews;
			}

			$scope.homeviews = updateMenuNavigation();
		}
	]);
