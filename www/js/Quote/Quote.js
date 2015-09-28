angular
	.module('appcki.quote',[])
	.controller("appckiQuoteOverview", ['$scope', '$log', '$http','$state','$filter','QuoteService','UserService',
		function( $scope, $log, $http, $state, $filter, QuoteService, UserService){
		
			$scope.quote = {};

			var state = QuoteService.createState();

			populateScope = function(data){
				$scope.quote = data;

				// stemverhouding
				
				$scope.allInFavor = data.pos;
				$scope.allAgainst = data.neg;
				$scope.total = $scope.allInFavor + $scope.allAgainst;
				$scope.favorPct = Math.max(5, Math.min(95, $scope.allInFavor / $scope.total * 100));
				$scope.againstPct = 100;
				if($scope.total === 0) { $scope.favorPct = 50;}
				
			};
			
			$scope.random = function()
			{
				$scope.voted = false;
				QuoteService.getRandom(state, function(data){
					populateScope(data);
				});
			};

			refresh = function()
			{
				QuoteService.getDetails($scope.quote.id, function(){
					populateScope(data);
				});
			};

			$scope.vote = function(pos)
			{
				// Do a callback with the vote where pos is bool
				$scope.voted = true;
				refresh();
			};

			$scope.random();
			

	}])
	.controller("appckiQuoteList", ['$scope', '$log', '$http','$state','$stateParams','$filter','QuoteService','UserService',
		function( $scope, $log, $http, $state, $stateParams, $filter, QuoteService, UserService){
			var state = QuoteService.createState;
			$scope.items = [];

			QuoteService.getOverview(state, function(data){
				for(var i = 0; i < data.content.length; i++){
					$scope.items.push(data.content[i]);
				}
			});

			$scope.swipeRight = function()
			{
				console.log("swept of da flow");
			};
			
	}])
	.controller("appckiQuoteAdd", ['$scope', '$log', '$http','$state','$stateParams','$filter','QuoteService','UserService',
		function( $scope, $log, $http, $state, $stateParams, $filter, QuoteService, UserService){
			
	}]);
