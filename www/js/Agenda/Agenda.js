angular
	.module('appcki.agenda',[])
	.controller("appckiAgendaOverview", ['$scope', '$log', '$http','$state','$timeout','$filter','AgendaService','UserService','DateHelper',
		function( $scope, $log, $http, $state, $timeout, $filter, AgendaService, UserService, DateHelper){

			var dateFilter = $filter('date');

			$scope.items = [];

			$scope.getItemHeight = function(item){
				return item.divider? 34: 55;
			};
			$scope.click = function(item){
				if(!item.divider){
				}
			};

			var dayShort = ["zo", "ma", "di", "wo", "do", "vr", "za"];

			$scope.lowerLast = false;
			var newest;
			var prevBottomDividerString;
			$scope.loadNewer = function() {
				AgendaService.getNewer(newest, function(agendasdata){
					$scope.lowerLast = agendasdata.last;
					var agendas = agendasdata.content;
					newest = agendas[agendas.length-1].id;

					for(var i=0; i < agendas.length; i++){
						var agenda = agendas[i];
						var then = new Date(agenda.startdate);
						var dividerString = DateHelper.difference(then);

						if(dividerString != prevBottomDividerString){
							$scope.items.push({divider: true, label: dividerString});
							prevBottomDividerString = dividerString;
						}

						agenda.dayName = dayShort[then.getDay()];
						$scope.items.push(agenda);
					}

					if (!angular.isDefined(prevTopDividerString)) {
						prevTopDividerString = $scope.items[0].label; //get the upper dividerString.
						oldest = agendas[0].id;
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');

				}, function(){
					$scope.lowerLast = true;
					$timeout(function(){
						$scope.lowerLast = false;
					}, 60000);
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			};

			$scope.upperLast = false;
			var oldest;
			var prevTopDividerString;
			$scope.loadOlder = function() {
				AgendaService.getOlder(oldest, function(agendasdata){
					$scope.upperLast = agendasdata.last;
					var agendas = agendasdata.content;
					if(agendas.length >0){
						oldest = agendas[agendas.length-1].id;
					}

					$scope.items.shift(); //remove the top divider.

					for(var i=0; i < agendas.length; i++){
						var agenda = agendas[i];
						var then = new Date(agenda.startdate);
						var dividerString = DateHelper.difference(then);

						if(dividerString != prevTopDividerString){
							$scope.items.unshift({divider: true, label: prevTopDividerString});
							prevTopDividerString = dividerString;
						}

						agenda.dayName = dayShort[then.getDay()];
						$scope.items.unshift(agenda);
					}

					$scope.items.unshift({divider: true, label: prevTopDividerString});
					$scope.$broadcast('scroll.refreshComplete');
				});
			};
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
				});
			};

			$scope.unSubscribe = function(){
				AgendaService.unSubscribe(agenda.id, function(result){
					if(result){
						$scope.subscribed = false;
						$scope.note = "";
						AgendaService.getDetails($stateParams.id, function(agenda){ $scope.agenda = agenda; });
					}
				});
			};

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

		});
	}])
	.controller("appckiAgendaParticipants", ['$scope', '$log', '$http','$state','$stateParams','$filter','AgendaService','UserService',
		function( $scope, $log, $http, $state, $stateParams, $filter, AgendaService, UserService){
		AgendaService.getDetails($stateParams.id, function(agenda){
			$scope.agenda = agenda;
		});
	}]);
