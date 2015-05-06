angular
	.module('appcki.planner',[])
	.controller("appckiPlannerOverview", ['$scope', '$log', '$http','$state','$filter','PlannerService', 'UserService',
		function( $scope, $log, $http, $state, $filter, PlannerService, UserService){

			$scope.items = [];

			var state = PlannerService.createState();

			/**
			 * Vraagt de meetings op bij de planner service en verandert elementen
			 * die null kunnen zijn in een passende text
			 */
			PlannerService.getMeetings(state, function(meetingdata){
				meetings = meetingdata.content

				for(var i = 0; i < meetings.length; i++){
					var meeting = meetings[i];
					meeting.actual_time = (meeting.actual_time == null) ? "Nog niet gepland" : meeting.actual_time;
					meeting.location = (meeting.location == null) ? "Nader te bepalen" : meeting.location;
					meeting.agenda = unescape(meeting.agenda);

					UserService.me(function(me){
						meeting.userStatus = (meeting.haveResponded.indexOf(me.id) > -1) ? "Je hebt al gereageerd" : "Jij hebt nog niet gereageerd";
					});

					$scope.items.push(meeting);
				}
			});



	}])
	.controller("appckiPlannerDetails", ['$scope', '$ionicModal', '$log', '$http','$state','$stateParams','$filter','PlannerService', 'UserService',
		function( $scope, $ionicModal, $log, $http, $state, $stateParams, $filter, PlannerService, UserService){
			/**
			 * Get details vraagt gewoon alle timeslots op.
			 * Vervolgens moet eigenlijk voor al die timeslots ook
			 * worden opgevraagd wie er al gereageerd hebben, of mensen
			 * comments hebben toegevoegd en al dat soort dingen
			 */
			PlannerService.getDetails($stateParams.id, function(meeting){
				meeting = meeting.meeting;
				meeting.location = (meeting.location == null) ? "Nader te bepalen" : meeting.location;
				
				$scope.participants = meeting.participants.length;
				// $scope.responded = $scope.participants - meeting.noresponse.length;
				
				$scope.meeting = meeting;

				UserService.me(function(me){
					$scope.participation = PlannerService.getMyResponse(meeting, me);
					$scope.subscribed = $scope.participation != null && $scope.participation != undefined;
					$scope.hasSubscribedMessage = ($scope.subscribed) ? "Je hebt al gereageerd" : "Jij hebt nog niet gereageerd";
				});

				$scope.items = [];
				var lastDate = 0;
				var timeslotIndex = 0;

				for(var i = 0; i < meeting.slots.length; i++)
				{
					var item = meeting.slots[i];

					var thisDate = $filter('date')(item.starttime, 'EEEE dd MMMM yyyy');
					if( thisDate != lastDate)
					{
						lastDate = thisDate;
						$scope.items.push({divider: true, label: thisDate});
					}

					// item.percentage = (item.unavailable.length / item.available.length * 100);
					item.timeslotIndex = timeslotIndex;

					$scope.items.push(item);
					timeslotIndex++;
				}
			});
			

			$scope.openModal = function(index)
			{
				var item = $scope.meeting.slots[index];

				$scope.modal.starttime = item.starttime;

				/*$scope.modal.available = PeopleAndCommentFromList(item.available);
				$scope.modal.unavailable = PeopleAndCommentFromList(item.unavailable);*/

				// Vanuit de API eigen comment ophalen en mogelijk maken
				// comment toe te voegen

				$scope.modal.show();
			}

  
		    // Load the modal from the given template URL
		    $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
		        $scope.modal = $ionicModal;
		    }, {

		        // Use our scope for the scope of the modal to keep it simple
		        scope: $scope,
		        
		        // The animation we want to use for the modal entrance
		        animation: 'slide-in-up'
		    });

		    PeopleAndCommentFromList = function(list)
		    {
		    	result = [];

		    	for(var i = 0; i < list.length; i++)
		    	{
		    		var item = {"comment" : list[i].comment};

		    		participants = $scope.meeting.participants;
		    		for(var j = 0; j < participants.length; j++)
		    		{
		    			if(participants[j].id == list[i].person_id)
		    			{
		    				item.person = participants[j];
		    				break;
		    			}
		    		}

		    		result.push(item);
		    	}

		    	return result;
		    }
	}]);