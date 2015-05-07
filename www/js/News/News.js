angular
	.module('appcki.news',[])
	.controller("appckiNewsOverview", ['$scope', '$log', '$http','$state','$filter','NewsService','UserService',
		function( $scope, $log, $http, $state, $filter, NewsService, UserService){


			var dateFilter = $filter('date');

			$scope.items = []; 

			var state = NewsService.createState();					

			NewsService.getOlder(state, function(articles){
				for(var i=0; i < articles.length; i++){
					var article = articles[i];
					article.posteddate = dateFilter(article.posteddate, 'd-M-yyyy');
					$scope.items.push(article);
				}
			});
	}])
	.controller("appckiNewsDetails", ['$scope', '$log', '$http','$state','$stateParams','$filter','NewsService','UserService',
		function( $scope, $log, $http, $state, $stateParams, $filter, NewsService, UserService){
			var dateFilter = $filter('date');
			NewsService.getDetails($stateParams.id, function(article){
				article.posteddate = dateFilter(article.posteddate, 'd-M-yyyy');
				$scope.article = article;
			});
	}]);
