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
			PlannerService.getMeetings(state, function(meetings){

				for(var i = 0; i < meetings.length; i++){
					var meeting = meetings[i];

					meeting.actual_time = (meeting.actual_time == null) ? "Nog niet gepland" : meeting.actual_time;
					meeting.location = (meeting.location == null) ? "Nader te bepalen" : meeting.location;
					meeting.responses = getNumberOfResponses(meeting.id);
					$scope.items.push(meeting);
				}
			});

			/**
			 * Telt hoe veel mensen gereageerd hebben door in de tabel het aantal people te tellen waarin 
			 *	meeting_id gelijk is aan het id van de meeting en vervolgens in meeting_preferences te kijken
			 *	hoeveel van die mensen al daar in bestaan voor die vergadering
			 */
			function getNumberOfResponses(id)
			{
				return "3/5";
			}



	}])
	.controller("appckiPlannerDetails", ['$scope', '$ionicModal', '$log', '$http','$state','$stateParams','$filter','PlannerService', 'UserService',
		function( $scope, $ionicModal, $log, $http, $state, $stateParams, $filter, PlannerService, UserService){
			
			$scope.items = [];
			var lastDate = 0;

			/**
			 * Get details vraagt gewoon alle timeslots op.
			 * Vervolgens moet eigenlijk voor al die timeslots ook
			 * worden opgevraagd wie er al gereageerd hebben, of mensen
			 * comments hebben toegevoegd en al dat soort dingen
			 */
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

			$scope.openModal = function(id)
			{
				console.log("show modal for id: " + id);

				// Vanuit API starttijd van dit tijdsframe ophalen en vanuit
				// de kalender berekenen wat de eindtijd is (op basis van duur van een frame)
				$scope.modal.starttime = $scope.items[id].starttime;
				// Vanuit de API gegevens over dit frame ophalen:
				// - Alle namen die kunnen + comments
				// - Alle namen die niet kunnen + comments
				$scope.modal.kunnenwel = ['Pim hopmans', 'pim is slim'];
				$scope.modal.kunnenniet = ['Minder slimme Pim','Echt jongens','AppCKI is reuze belangrijk'];

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
	}]);