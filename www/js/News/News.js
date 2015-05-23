angular
	.module('appcki.news',[])
	.controller("appckiNewsOverview", ['$scope', '$log', '$http','$state','$filter','NewsService','UserService', 'DateHelper',
		function( $scope, $log, $http, $state, $filter, NewsService, UserService, DateHelper){


			var dateFilter = $filter('date');

			$scope.items = []; 

			var state = NewsService.createState();					

			$scope.last = false;
			$scope.loadOlder = function(){
				NewsService.getOlder(state, function(data){
					$scope.last = data.last;
					var articles = data.content;
					for(var i=0; i < articles.length; i++){
						var article = articles[i];
						article.postedtimeago = DateHelper.difference(article.posteddate);
						$scope.items.push(article);
					}
				}, function(){
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			};

			$scope.loadOlder();
	}])
	.controller("appckiNewsDetails", ['$scope', '$log', '$http','$state','$stateParams','$filter','NewsService','UserService', 'DateHelper',
		function( $scope, $log, $http, $state, $stateParams, $filter, NewsService, UserService, DateHelper){
			var dateFilter = $filter('date');
			NewsService.getDetails($stateParams.id, function(article){
				article.posteddateShort = DateHelper.dateNumbers(article.posteddate);
				$scope.article = article;
			});
	}]);
