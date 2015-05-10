angular
	.module('appcki.quote',[])
	.controller("appckiQuoteOverview", ['$scope', '$log', '$http','$state','$filter','QuoteService','UserService',
		function( $scope, $log, $http, $state, $filter, QuoteService, UserService){
		
			$scope.quote = {};

			var state = QuoteService.createState();
			
			QuoteService.getRandom(state, function(data){
				$scope.quote = data;
			});

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
			}
			
	}])
	.controller("appckiQuoteAdd", ['$scope', '$log', '$http','$state','$stateParams','$filter','QuoteService','UserService',
		function( $scope, $log, $http, $state, $stateParams, $filter, QuoteService, UserService){
			
	}]);
