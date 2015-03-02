angular.module('appcki')
.controller("AgendaCtrl", ['$scope', '$log', '$http','$location','$filter','$mdDialog','AgendaService','UserService',
function($scope, $log, $http, $location, $filter, $mdDialog, AgendaService, UserService){	
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


}]);
