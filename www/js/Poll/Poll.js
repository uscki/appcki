angular
	.module('appcki.poll',[])
	.directive('clickForOptions', ['$ionicGesture', function($ionicGesture) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$ionicGesture.on('tap', function(e){

					// Grab the content
					var content = element[0].querySelector('.item-content');

					// Grab the buttons and their width
					var buttons = element[0].querySelector('.item-options');

					var buttonsWidth = buttons.offsetWidth;

					ionic.requestAnimationFrame(function() {
						content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

						if (!buttons.classList.contains('invisible')) {
							content.style[ionic.CSS.TRANSFORM] = '';
							setTimeout(function() {
								buttons.classList.add('invisible');
							}, 250);				
						} else {
							buttons.classList.remove('invisible');
							content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
						}
					});		

				}, element);
			}
		};
	}])
	.controller("appckiPollOverview", ['$scope', '$log', '$http','$state','$filter','PollService',
		function( $scope, $log, $http, $state, $filter, PollService){
			
			$scope.votes = 0;

			// TODO: see if user voted (wait for API update)
			$scope.voted = true;
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
