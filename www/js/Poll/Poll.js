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
			$scope.items = [];
			$scope.polls = [];
			page = 0;

			// TODO: see if user voted (wait for API update)
			$scope.voted = false;
			PollService.getActivePoll(function(data){
				PollService.getDetails(data.id, function(polldata){
					console.log(polldata);
					for(var i = 0; i < polldata.options.length; i++)
					{
						var item = polldata.options[i];
						item.ivotedforthis = (item.id == polldata.myVote);
						$scope.votes += item.voteCount;
						$scope.items.push(item);
					}

					$scope.poll = polldata.poll;
					$scope.voted = polldata.myVote >= 0;
				});
			});

			$scope.loadMore = function(){
				PollService.getArchive(page, function(data){
					page = data.page;
					for(var i = 0; i < data.content.length; i++)
					{
						var item = data.content[i];
						$scope.polls.push(item);
					}
				}, function(){
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			}



			$scope.vote = function(id)
			{
				PollService.vote(id, function(data){
					console.log(data);
				});
			}

	}]);
