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

			// Load the modal from the given template URL
		    $ionicModal.fromTemplateUrl('js/Planner/planner-modal.html', function($ionicModal) {
		        $scope.modal = $ionicModal;
		    }, {
		        // Use our scope for the scope of the modal to keep it simple
		        scope: $scope,
		        
		        // The animation we want to use for the modal entrance
		        animation: 'slide-in-up'
		    });

			$scope.setPreference = function(id)
			{
				if($scope.modal.isShown())
				{
					$scope.modal.hide();
					var comment = $scope.modal.comment;
				} else {
					var comment = $scope.usercomment[id];
				}

				// Push data to server
				PlannerService.setPreference(id, $scope.userpreference[id], comment, function(data){
					populateState();
				},function(error){
					$ionicPopup.alert({
						title: 'Verbinding mislukt',
                       	template: 'Jouw voorkeur voor dit tijdstip kon niet worden opgeslagen omdat de server niet bereikt kon worden. Probeer het later nog eens. Als dit probleem zich blijft voordoen, neem dan contact op met de systeembeheerder.'
					})
				});
			}		

			$scope.openModal = function(index)
			{
				$scope.modal.item = $scope.meeting.slots[index];
				$scope.modal.comment = unescape(($scope.preferences && $scope.preferences[index].notes) ? $scope.preferences[index].notes : "");
				$scope.modal.show();
			}

			/**
			 * Populates the scope, but populateState sounds better
			 */
			populateState = function()
			{
				PlannerService.getDetails($stateParams.id, function(meetingdata){
					// Save meeting data to scope
					$scope.meeting = meetingdata.meeting;
					$scope.preferences = meetingdata.myPreferences;
					
					// Calculate response
					$scope.invited = $scope.meeting.participants.length;
					$scope.responded = $scope.meeting.slots[0].preferences.length;
					
					// Prepare slots for scope
					[$scope.slots, $scope.userpreference, $scope.usercomment] = prepareSlots($scope.meeting.slots, meetingdata.myPreferences);
				});
			}

			populateState();

		    /**
			 * Iterates through the slots in the meeting and
			 * prepares the slots for the scope
			 * @arg meetingslots 	The list of slots for the meeting
			 * @arg preferences 	The current users personal preferences, if any
			 * @arg list of two lists; the slots as prepared for the scope and the
			 *						user preferences as prepared for the scope
			 */
			prepareSlots = function(meetingslots, preferences)
			{
				var slots = [];
				var userpreference = {};
				var usercomment = {};
				var lastDate = "";
				var index = 0;

				for(var i = 0; i < meetingslots.length; i++)
				{
					var item = meetingslots[i];
					userpreference[item.id] = (preferences[i]) ? preferences[i].canattend : false;
					usercomment[item.id] = (preferences[i]) ? preferences[i].notes : null;
					[item.cando, item.nocando] = getAvailability(item.preferences);

					// Check if a divider is required
					var thisDate = $filter('date')(item.starttime, 'EEEE dd MMMM yyyy');
					if( thisDate != lastDate)
					{
						lastDate = thisDate;
						slots.push({divider: true, label: thisDate});
					}

					item.pctcolor = availability2color(item.cando, item.nocando);
					item.index = index;
					index++;

					slots.push(item);
				}
				
				return [slots, userpreference, usercomment];
			}

			/**
			 * Gives a list of people who are available and a list of
			 * people who are unavailable for a certain timeslot.
			 * @arg slotpreferences		The list of preferences for the slot
			 * @return 	list of lists of people who are available or not available
			 */
			getAvailability = function(slotpreferences)
			{
				var cando = [];
				var nocando = [];


				for(var j = 0; j < slotpreferences.length; j++)
				{
					if(slotpreferences[j].canattend)
					{
						cando.push(slotpreferences[j]);
					} else {
						nocando.push(slotpreferences[j]);
					}
				}

				return [cando, nocando];
			}

			/**
			 * Prepares the agenda as it was saved in the database
			 * for display
			 * @arg agenda 			Input string for agenda as saved in DB
			 * @return string formatted for display
			 */
			formatAgenda = function(agenda)
			{
				return agenda;
			}

		    /**
		     * Returns an rgb color that indicates the percentage, with
		     * 0% being completely red, 50% being yellow, 100% green and
		     * all other percentages in between.
		     * @arg cando	 	list of people who are available
		     * @arg nocando		list of people who are unavailable
		     * return 			String containing css-style rgb value
		     */
		    availability2color = function(cando, nocando)
		    {
				var percent = cando.length / (cando.length + nocando.length) * 100;
		    	red = (percent < 50) ? 255 : 256 - (percent - 50) * 5.12;
			    green = (percent > 50) ? 255 : percent * 5.12;
			    
			    return "rgb(" + Math.round(red) + "," + Math.round(green) + ",0)";
		    }
	}]);