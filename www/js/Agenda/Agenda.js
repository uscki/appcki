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
						$scope.items.push({divider: true, label: dateString});
						previousDateString=dateString;
					}
					$scope.items.push(agenda);
				}
			});			
	}])
	.controller("appckiAgendaDetails", ['$scope', '$log', '$ionicPopup','$state','$stateParams','$filter','AgendaService','UserService',
		function( $scope, $log, $ionicPopup, $state, $stateParams, $filter, AgendaService, UserService){		
		$scope.icalUrl = AgendaService.getIcalUrl($stateParams.id);
		AgendaService.getDetails($stateParams.id, function(agenda){
			$scope.agenda = agenda;
			$scope.noteOpened = false;
			$scope.note = "";

			$scope.subscribe = function(){
				AgendaService.subscribe(agenda.id, "", function(result){
					if(result){
						$scope.subscribed = true;
						AgendaService.getDetails($stateParams.id, function(agenda){ $scope.agenda = agenda; });
					}
				})
			};

			$scope.unSubscribe = function(){
				AgendaService.unSubscribe(agenda.id, function(result){
					
					console.log(result);

					if(result){
						$scope.subscribed = false;
						$scope.data.note = "";
						AgendaService.getDetails($stateParams.id, function(agenda){ $scope.agenda = agenda; });
					}
				});
			}

			UserService.me(function(me){
				$scope.participation = AgendaService.getSubscription(agenda, me);
				$scope.subscribed = $scope.participation != null;
				$scope.data = {}
				$scope.data.note = $scope.participation.note;
			});

			//$scope.data = {}

			$scope.openNote = function(){
			  $ionicPopup.show({
			     template: '<textarea ng-model="data.note" style="height:80px;"> </textarea>',
			     title: 'Notitie',
			     subTitle: '',
			     scope: $scope,
			     buttons: [
			       { text: 'Annuleren' },
			       {
			         text: '<b>Opslaan</b>',
			         type: 'button-positive',
			         onTap: function(e) {
			             return $scope.data.note;
			         }
			       },
			     ]
			   }).then(function(res) {
			   	console.log($scope.data.note);
			   	console.log(res);
			   	AgendaService.subscribe(agenda.id, res, function(result){});
			   });			
			};

		})
	}])
	.controller("appckiAgendaParticipants", ['$scope', '$log', '$http','$state','$stateParams','$filter','AgendaService','UserService',
		function( $scope, $log, $http, $state, $stateParams, $filter, AgendaService, UserService){
		AgendaService.getDetails($stateParams.id, function(agenda){
			$scope.agenda = agenda;
		})
	}])

	;
