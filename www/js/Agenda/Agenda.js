angular
	.module('appcki.agenda',[])
	.controller("appckiAgendaOverview", ['$scope', '$log', '$http','$state','$filter','AgendaService','UserService',
		function( $scope, $log, $http, $state, $filter, AgendaService, UserService){
			
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
		AgendaService.getDetails($stateParams.id, function(agenda){
			$scope.agenda = agenda;

			UserService.me(function(me){
				$scope.subscribed = AgendaService.isSubscribed(agenda, me);
			});



		})
	}])
	.controller("appckiAgendaParticipants", ['$scope', '$log', '$http','$state','$stateParams','$filter','AgendaService','UserService',
		function( $scope, $log, $http, $state, $stateParams, $filter, AgendaService, UserService){

		AgendaService.getDetails($stateParams.id, function(agenda){
			$scope.agenda = agenda;
		})
	}])

	;
