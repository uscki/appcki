angular
	.module('appcki.roephoek',[])
	.controller("appckiRoephoekOverview", ['$scope', '$ionicPopup', '$ionicScrollDelegate', 'RoephoekService', 'DateHelper',
		function( $scope, $ionicPopup, $ionicScrollDelegate, RoephoekService, DateHelper){
			var page = 0;
			$scope.last = false;
			var newestId;
			var oldestId = -1;

			$scope.items = [];

			/*RoephoekService.getOverview(page, function(data){
				console.log(data);
				$scope.last = data.last;
				newestId = data.content[0].id;
				for(var i = 0; i < data.content.length; i++) {
					var item = data.content[i];
					item.when = DateHelper.difference(item.timestamp);
					$scope.items.push(item);
				}
			}), function(){};*/

			$scope.doRefresh = function(){
				var items = [];
				RoephoekService.getNewer(newestId, function(data){
					for(var i = data.content.length; i > 0; i--)
					{
						var item = data.content[i-1];
						item.when = DateHelper.difference(item.timestamp);
						$scope.items.unshift(item);
					}

				}, function(){
					$scope.$broadcast('scroll.refreshComplete');
				});
			}

			$scope.loadMoreData = function()
			{
				console.log("Laden...");
				RoephoekService.getOlder(oldestId, function(data){
					$scope.last = data.last;
					
					newestId = newestId || data.content[0].id;
					oldestId = data.content[data.content.length - 1].id;

					for(var i = 0; i < data.content.length; i++) {
						var item = data.content[i];
						item.when = DateHelper.difference(item.timestamp);
						$scope.items.push(item);
					}
				}, function(){
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});

			}

			$scope.openShout = function(){
				console.log("ay");
			  $ionicPopup.show({
			     template: '<textarea ng-model="data.note" style="height:80px;"> </textarea>',
			     title: 'Roep',
			     subTitle: '',
			     scope: $scope,
			     buttons: [
			       { text: 'Annuleren' },
			       {
			         text: '<b>Roep!</b>',
			         type: 'button-positive',
			         onTap: function(e) {
			             return $scope.data.note;
			         }
			       },
			     ]
			   }).then(function(res) {
			   	console.log($scope.data.note);
			   	console.log(res);
			   	RoephoekService.shout(agenda.id, res, function(result){});
			   });			
			};
	}]);