angular.module('appcki')
.controller("AgendaCtrl", ['$scope', '$log', '$http','$location','$filter','$mdDialog','AgendaService','UserService',
function($scope, $log, $http, $location, $filter, $mdDialog, AgendaService, UserService){	
	var dateFilter = $filter('date');


	$scope.agendas = [''];

	var dividersIndex;
	var dividers = {};
	$scope.dividers = dividers;

	var state = AgendaService.createState();
	


	state.newest -= 10000000000000;
	console.log(state)
	AgendaService.getNewer(state, function(agendas){
		console.log(agendas);

		$scope.agendas = agendas;

		for(var i=0; i < agendas.length; i++){
			var agenda = agendas[i];
			var dateString = dateFilter(agenda.startdate, 'd-M-yyyy');
			if(dividersIndex == undefined 
				|| dividers[dividersIndex] != dateString){
				dividersIndex = agenda.id;
				dividers[dividersIndex] = dateString;
			}

		}
	});


}]);
