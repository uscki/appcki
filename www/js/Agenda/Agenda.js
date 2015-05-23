angular
	.module('appcki.agenda',[])
	.controller("appckiAgendaOverview", ['$scope', '$log', '$http','$state','$filter','AgendaService','UserService','DateHelper',
		function( $scope, $log, $http, $state, $filter, AgendaService, UserService, DateHelper){

			var dateFilter = $filter('date');

			$scope.items = [];

			$scope.getItemHeight = function(item){
				return item.divider? 34: 55;
			};
			$scope.click = function(item){
				if(!item.divider){
				}
			};
			
			var newest;
			var prevBottomDividerString;
			AgendaService.getNewer(newest, function(agendasdata){
				var agendas = agendasdata.content;
				newest = agendas[agendas.length-1].id;

				for(var i=0; i < agendas.length; i++){
					var then = new Date(agendas[i].startdate);
					var dividerString = DateHelper.difference(then);

					if(dividerString != prevBottomDividerString){
						$scope.items.push({divider: true, label: dividerString});
						prevBottomDividerString = dividerString;
					}

					agenda.dayName = DateHelper.days[thenDay];

					$scope.items.push(agenda);
				}

				if (prevTopDividerString == undefined) {
					prevTopDividerString = $scope.items[0].label;
					oldest = agendas[0].id;
				}
			});		

			var oldest;
			var prevTopDividerString;
			AgendaService.getOlder(oldest, function(agendasdata){
				var agendas = agendasdata.content;
				oldest = agendas[agendas.length-1].id;

				if (prevTopDividerString == undefined) {
					$scope.items.shift();
				}

				for(var i=0; i < agendas.length; i++){
					var then = new Date(agendas[i].startdate);
					var dividerString = DateHelper.difference(then);

					if(dividerString != prevTopDividerString){
						$scope.items.push({divider: true, label: prevTopDividerString});
						prevTopDividerString = dividerString;
					}

					agenda.dayName = DateHelper.days[thenDay];

					$scope.items.unshift(agenda);
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
