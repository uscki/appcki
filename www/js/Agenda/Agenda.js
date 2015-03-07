angular
	.module('appcki.agenda',[])
	/*.controller("AgendaPageCtrl", ['$scope', '$log', '$http','$location','$filter','$mdDialog','AgendaService','UserService',
	function($scope, $log, $http, $location, $filter, $mdDialog, AgendaService, UserService){	

		console.log($location.search().id);
		$scope.$on('$routeUpdate', function(){
			console.log($location.search().id);
		});

		$scope.action = function(agenda){ 
			$scope.agenda = agenda;
			$location.search('id', agenda.id);
		}
	}])*/
	.controller("appckiAgendaOverview", ['$scope', '$log', '$http','$location','$filter','AgendaService','UserService',
		function( $scope, $log, $http, $location, $filter, AgendaService, UserService){
			
			var dateFilter = $filter('date');

			$scope.groups = [];
			$scope.agendas = [];
			var state = AgendaService.createState();					
			var previousDateString = 0;
			state.newest -= 10000000000000;

			AgendaService.getNewer(state, function(agendas){

				for(var i=0; i < agendas.length; i++){
					var agenda = agendas[i];
					var dateString = dateFilter(agenda.startdate, 'd-M-yyyy');
					
					if(dateString != previousDateString){
						var group = {
							date:dateString,
							agendas:[agenda]
						};
						$scope.groups[agenda.id] = group;
						previousDateString=dateString;
					}

					$scope.agendas.push(agenda);
				}
			});
				
			
	}])
	.directive("appckiAgendaDetails", [ '$log', '$http','$location','$filter','$mdDialog','AgendaService','UserService',
		function( $log, $http, $location, $filter, $mdDialog, AgendaService, UserService){
			return{
				replace:true,
				restrict:'E',
				templateUrl: 'js/Agenda/directive-details.html',
				scope: {agenda:'='},
				link: function ($scope, element) {
					
				}
			}
	}])
	.directive("appckiAgendaFab", [ '$log', '$http','$location','$filter','$mdDialog','AgendaService','UserService',
		function( $log, $http, $location, $filter, $mdDialog, AgendaService, UserService){
			return {
				replace:true,
				restrict:'E',
				templateUrl: 'js/Agenda/directive-fab.html',
				scope: {agenda:'='},
				link: function($scope){
					$scope.$watch(function(){ if($scope.agenda) return $scope.agenda.subscribed; }, function(){
						if($scope.agenda){
							console.log("subscribed: " + $scope.agenda.subscribed)
						}
					})
				}

			}
	}]);