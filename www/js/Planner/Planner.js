angular
	.module('appcki.planner',[])
	.controller("appckiPlannerOverview", ['$scope', '$log', '$http','$state','$filter','PlannerService', 'UserService',
		function( $scope, $log, $http, $state, $filter, PlannerService, UserService){

			$scope.items = [];

			var state = PlannerService.createState();
			
			PlannerService.getMeetings(state, function(meetingdata){
				var meetings = meetingdata.content;

				for(var i = 0; i < meetings.length; i++)
				{
					meeting = meetings[i];
					meeting.invited = meeting.participants.length;
					meeting.responded = meeting.slots[0].preferences.length;
					meeting.userstatus = (status(meeting.person.id, meeting.slots[0].preferences)) ? "Je hebt al gereageerd" : "Geef ff fucks!";
					$scope.items.push(meeting);
				}

			});

			/**
			  * Checks if the current user has responded to a 
			  * meeting yet
			  * @arg id 			Current user ID
			  * @arg preferences 	List of preferences for the first slot
			  *						of the meeting
			  * @return				True iff person id is found in preferences,
			  *						i.e. if person has responded
			  */
			function status(id, preferences)
			{
				for(var i = 0; i < preferences.length; i++)
				{
					if(preferences[i].id === id)
					{
						return true;
					}
				}

				return false;
			}

	}])
	.controller("appckiPlannerDetails", ['$scope', '$ionicModal', '$ionicPopup', '$log', '$http','$state','$stateParams','$filter','PlannerService', 'UserService',
		function( $scope, $ionicModal, $ionicPopup, $log, $http, $state, $stateParams, $filter, PlannerService, UserService){
			$scope.userpreference = {};

			PlannerService.getDetails($stateParams.id, function(meeting){

				meeting = meeting.meeting;
				
				$scope.invited = meeting.slots[0].preferences.length;
				$scope.responded = $stateParams.responded;
				
				$scope.meeting = meeting;

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

					item.cando = [];
					item.nocando = [];

					for(var j = 0; j < item.preferences.length; j++)
					{
						if(item.preferences[j].canattend)
						{
							item.cando.push(item.preferences[j]);
						} else {
							item.nocando.push(item.preferences[j]);
						}

						if(item.preferences[j].person.id === meeting.person.id)
						{
							item.canattend = item.preferences[j].canattend;
						}
					}

					if(item.cando.length || item.nocando.length)
					{
						item.pctcolor = pct2color(item.cando.length / (item.cando.length + item.nocando.length) * 100);
					} else {
						item.pctcolor = "rgb(255, 0, 0)";
					}
					
					item.timeslotIndex = timeslotIndex;

					$scope.items.push(item);
					timeslotIndex++;
				}
			});

			$scope.postComment = function()
			{
				$scope.modal.hide();

				PlannerService.uploadComment($scope.modal.id, $scope.modal.comment, function(data){
					console.log(data);
				}, function(){
					$ionicPopup.alert({
                       title: 'Verbinding mislukt',
                       template: 'Jouw comment kon niet worden opgeslagen omdat de server niet bereikt kon worden. Probeer het later nog eens. Als dit probleem zich blijft voordoen, neem dan contact op met de systeembeheerder.'
                    });
				});
			}

			$scope.setPreference = function(id)
			{
				PlannerService.setPreference(id, $scope.userpreference[id], function(data){
					console.log(data);
				},function(){
					$ionicPopup.alert({
						title: 'Verbinding mislukt',
                       	template: 'Jouw voorkeur voor dit tijdstip kon niet worden opgeslagen omdat de server niet bereikt kon worden. Probeer het later nog eens. Als dit probleem zich blijft voordoen, neem dan contact op met de systeembeheerder.'
					})
				});
			}			

			$scope.openModal = function(index)
			{
				var item = $scope.meeting.slots[index];
				$scope.modal.id = $scope.meeting.slots[index].id;

				$scope.modal.starttime = item.starttime;
				$scope.modal.preferences = item.preferences;

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

		    pct2color = function(percent)
		    {
		    	red = (percent < 50) ? 255 : 256 - (percent - 50) * 5.12;
			    green = (percent > 50) ? 255 : percent * 5.12;
			    return "rgb(" + Math.round(red) + "," + Math.round(green) + ",0)";
		    }
	}]);