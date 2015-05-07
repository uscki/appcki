angular
	.module('appcki.agenda',[])
	.controller("appckiAgendaOverview", ['$scope', '$log', '$http','$state','$filter','AgendaService','UserService',
		function( $scope, $log, $http, $state, $filter, AgendaService, UserService){

			var dateFilter = $filter('date');

			$scope.items = [];

			var state = AgendaService.createState();
			//state.newest -= 10000000000000;

			$scope.getItemHeight = function(item){
				return item.divider? 34: 55;
			};
			$scope.click = function(item){
				if(!item.divider){
				}
			};
			
			var oneWeek = 604800000;
			var relWeekNrToSTring = function(nr) {
				if (nr == 0) return "Deze week";
				if (nr == 1) return "Volgende week";
				if (nr == -1) return "Vorige week";
				if (nr > 1) return "Over " + (nr+1) + " weken";
				else return (nr*-1) + " weken geleden";
			};
			var weekdays = {
				0:"ma",
				1:"di",
				2:"wo",
				3:"do",
				4:"vr",
				5:"za",
				6:"zo"
			}
			AgendaService.getNewer(state, function(agendasdata){
				agendas = agendasdata.content;
				var now = new Date();
				var previousWeekString = 0;
				
				for(var i=0; i < agendas.length; i++){
					var agenda = agendas[i];

					var then = new Date(agenda.startdate);
					var relWeekNr = Math.floor((then.getTime() - now.getTime()) / oneWeek);
					if (then.getDay() > now.getDay()) relWeekNr -= 1;
					var weekString = relWeekNrToSTring(relWeekNr);

					if(weekString != previousWeekString){
						$scope.items.push({divider: true, label: weekString});
						previousWeekString=weekString;
					}

					agenda.dayName = weekdays[then.getDay()];

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
					if(result){
						$scope.subscribed = false;
						$scope.note = "";
						AgendaService.getDetails($stateParams.id, function(agenda){ $scope.agenda = agenda; });
					}
				});
			}

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
