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
//	appckiAgendaPage
/*	.controller("appckiAgendaPage", ['$scope', '$log', '$http','$state','$filter','AgendaService','UserService',
	function( $scope, $log, $http, $state, $filter, AgendaService, UserService){

	}])*/
	.controller("appckiAgendaOverview", ['$scope', '$log', '$http','$state','$filter','AgendaService','UserService',
		function( $scope, $log, $http, $state, $filter, AgendaService, UserService){
			console.log($state);
			
			var dateFilter = $filter('date');

			$scope.items = [];

			var state = AgendaService.createState();					
			var previousDateString = 0;
			state.newest -= 10000000000000;


			$scope.getItemHeight = function(item){
				return item.divider? 34: 55;
			};
			$scope.click = function(item){
				if(!item.divider){
				//	$state.go('agenda.details', { 'id': item.id });
				}
			};

			AgendaService.getNewer(state, function(agendas){
				for(var i=0; i < agendas.length; i++){
					var agenda = agendas[i];
					var dateString = dateFilter(agenda.startdate, 'd-M-yyyy');
					
					if(dateString != previousDateString){
						var group = {
							date:dateString,
							agendas:[agenda]
						};
						//$scope.groups[agenda.id] = group;
						$scope.items.push({divider: true, label: dateString});
						previousDateString=dateString;
					}
					$scope.items.push(agenda);
				}
			});
				
			
	}])
	.controller("appckiAgendaDetails", ['$scope', '$log', '$http','$state','$stateParams','$filter','AgendaService','UserService',
		function( $scope, $log, $http, $state, $stateParams, $filter, AgendaService, UserService){
			console.log("hello world?");
			console.log($stateParams);

		AgendaService.getDetails($stateParams.id, function(agenda){
			$scope.agenda = agenda;
		})
	}])
	;
/*
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
	}]);*/