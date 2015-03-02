angular
	.module('appcki.agenda',[])
	.controller("AgendaPageCtrl", ['$scope', '$log', '$http','$location','$filter','$mdDialog','AgendaService','UserService',
	function($scope, $log, $http, $location, $filter, $mdDialog, AgendaService, UserService){	

		console.log($location.search().id);
		$scope.$on('$routeUpdate', function(){
			console.log($location.search().id);
		});

		$scope.action = function(agenda){ 
			console.log( agenda);
			$scope.agenda = agenda;
		}

	}])
	.directive("appckiAgendaOverview", [ '$log', '$http','$location','$filter','$mdDialog','AgendaService','UserService',
		function( $log, $http, $location, $filter, $mdDialog, AgendaService, UserService){
			return{
				replace:true,
				restrict:'E',
				templateUrl: 'angular/Agenda/directive-overview.html',
				scope: {action:'='},
				link: function ($scope, element) {
					
				
					var dateFilter = $filter('date');

					var groups = [];
					$scope.groups = groups;
					var state = AgendaService.createState();					

					state.newest -= 10000000000000;
					console.log(state)
					AgendaService.getNewer(state, function(agendas){

						for(var i=0; i < agendas.length; i++){
							var agenda = agendas[i];
							var dateString = dateFilter(agenda.startdate, 'd-M-yyyy');
							
							if(groups.length == 0 || groups[groups.length-1].date != dateString){
								var group = {
									date:dateString,
									agendas:[agenda]
								};
								groups.push(group);
							}else{
								groups[groups.length-1].agendas.push(agenda);
							}
						}
					});
				}
			}
	}])
	.directive("appckiAgendaDetails", [ '$log', '$http','$location','$filter','$mdDialog','AgendaService','UserService',
		function( $log, $http, $location, $filter, $mdDialog, AgendaService, UserService){
			return{
				replace:true,
				restrict:'E',
				templateUrl: 'angular/Agenda/directive-details.html',
				scope: {agenda:'='},
				link: function ($scope, element) {
					
				}
			}
	}]).directive("appckiAgendaFab", [ '$log', '$http','$location','$filter','$mdDialog','AgendaService','UserService',
		function( $log, $http, $location, $filter, $mdDialog, AgendaService, UserService){
			return{
				replace:true,
				restrict:'E',
				templateUrl: 'angular/Agenda/directive-fab.html',

				scope: {agenda:'='},
				controller: function($scope, $element){
					$scope.toggle = function(agenda){
						console.log(agenda);
						agenda.subscribed = agenda.subscribed; // TODO: save this
					}
					console.log($scope);
				}
			}
	}]);

// $location.search('id', 123);