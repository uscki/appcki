angular
	.module('appcki.poll',[])
	.controller("appckiPollOverview", ['$scope', '$log', '$http','$state','$filter','PollService',
		function( $scope, $log, $http, $state, $filter, PollService){
			
			$scope.votes = 0;

			PollService.getActivePoll($state, function(data){
				PollService.getDetails(data.id, function(polldata){
					$scope.poll = polldata.poll;
					$scope.options = polldata.options;
					for(var i = 0; i < $scope.options.length; i++)
					{
						$scope.votes += $scope.options[i].results.length;
					}
				});
			});

			$scope.vote = function(id)
			{
				PollService.vote(id, function(data){
					console.log(data);
				});
			}

			

	}]);
