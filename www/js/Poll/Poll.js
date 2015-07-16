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
	.controller("appckiPollOverview", ['$scope', '$log', '$http','$state','$timeout','$filter','PollService',
		function( $scope, $log, $http, $state, $timeout, $filter, PollService){
			
			$scope.votes = 0;
			$scope.items = [];
			$scope.polls = [];
			$scope.last = false;
			page = 0;

			$scope.voted = false;
			loadPoll();
			
			function loadPoll(){
				PollService.getActivePoll(function(data){
					for(var i = 0; i < data.options.length; i++)
					{
						var item = data.options[i];
						item.ivotedforthis = (item.id == data.myVote);
						$scope.votes += item.voteCount;
						$scope.items.push(item);
					}

					$scope.poll = data.poll;
					$scope.voted = data.myVote !== null;
				});
			}
			

			$scope.loadMore = function(){
				PollService.getArchive(page, function(data){
					page = data.page;
					$scope.last = data.last;
					for(var i = 0; i < data.content.length; i++)
					{
						var item = data.content[i];
						$scope.polls.push(item);
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}, function(){
					$scope.last = true;
					$timeout(function(){
						$scope.last = false;
					}, 60000);
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			};

			$scope.vote = function(id)
			{
				PollService.vote(id, function(data){
					console.log(data);
				});
				loadPoll();
			};

	}])
	.controller("appckiPollArchive", ['$scope', '$log', '$http','$state', '$stateParams', '$filter','PollService',
		function( $scope, $log, $http, $state, $stateParams, $filter, PollService){
			
			$scope.votes = 0;
			$scope.items = [];

			PollService.getDetails($stateParams.id, function(data){
				for(var i = 0; i < data.options.length; i++)
				{
					var item = data.options[i];
					item.ivotedforthis = (item.id == data.myVote);
					$scope.votes += item.voteCount;
					$scope.items.push(item);
				}

				$scope.poll = data.poll;
			});
		}
	]);
