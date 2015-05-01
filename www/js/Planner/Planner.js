angular
	.module('appcki.planner',[])
	.controller("appckiPlannerOverview", ['$scope', '$log', '$http','$state','$filter','PlannerService', 'UserService',
		function( $scope, $log, $http, $state, $filter, PlannerService, UserService){

			$scope.items = [];

			var state = PlannerService.createState();

			PlannerService.getMeetings(state, function(meetings){

				for(var i = 0; i < meetings.length; i++){
					var meeting = meetings[i];

					meeting.actual_time = (meeting.actual_time == null) ? "Nog niet gepland" : meeting.actual_time;
					meeting.location = (meeting.location == null) ? "Nader te bepalen" : meeting.location;
					meeting.responses = getNumberOfResponses(meeting.id);
					$scope.items.push(meeting);
				}
			});

			function getNumberOfResponses(id)
			{
				return "3/5";
			}



	}])
	.controller("appckiPlannerDetails", ['$scope', '$log', '$http','$state','$stateParams','$filter','PlannerService', 'UserService',
		function( $scope, $log, $http, $state, $stateParams, $filter, PlannerService, UserService){
			
			$scope.items = [];
			var lastDate = 0;

			PlannerService.getDetails(1, function(planner){
				for(var i = 0; i < planner.length; i++)
				{
					var item = planner[i];

					var thisDate = $filter('date')(item.starttime, 'EEEE dd MMMM yyyy');
					if( thisDate != lastDate)
					{
						lastDate = thisDate;
						$scope.items.push({divider: true, label: thisDate});
					}

					$scope.items.push(item);
				}
			});



	}])
	.controller("appckiPlannerModal", ['$scope', 'plannerModal', '$http','$state','$filter','PlannerService', 'UserService',
		function($scope, $plannerModal, $log, $http, $state, $filter, PlannerService, UserService){
			$plannerModal.fromTemplateUrl('planner-modal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
			});
			$scope.openModal = function() {
				$scope.modal.show();
			};
			$scope.closeModal = function() {
				$scope.modal.hide();
			};
			//Cleanup the modal when we're done with it!
				$scope.$on('$destroy', function() {
				$scope.modal.remove();
			});
			// Execute action on hide modal
			$scope.$on('modal.hidden', function() {
				// Execute action
			});
			// Execute action on remove modal
			$scope.$on('modal.removed', function() {
				// Execute action
			});
	}]);