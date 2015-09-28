var blockSize = 20,
	width = 10,
	height = 11;

angular.module('appcki.wilson',[])
	.controller("wilsonPageController", ['$scope', '$http','$location','$ionicPopup','UserService','WilsonService',
        function($scope, $http, $location, $ionicPopup, UserService, WilsonService){	

        $scope.wilson = WilsonService.getMyWilson();

	}])
    .directive('wilson', ['$location','$rootScope', function($location, $rootScope) {
      return {
        template: "<div class='wilson'> </div>",
        link: function (scope, element) {

        	var firstOk = false;
        	element.bind('click', function(e){ 

        		var x = Math.floor(((e.pageX - e.target.offsetLeft) + (width*blockSize/2)) / blockSize);
        		var y = Math.floor(((e.pageY - e.target.offsetTop) + (height*blockSize/2)) / blockSize);

        		if(firstOk && x == 5 && y == 4){
        			//console.log($location);
        			$rootScope.$apply(function() {
        				$location.path('/login');
        			});
        		}else if(x == 3 && y == 4){
        			firstOk = true;
        		}else{
        		//	firstOk = false;
        		}
        	});
        }
      };
    }]);