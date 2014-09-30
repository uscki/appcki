appcki
	.controller("loginPageController",function($scope, $http){		
		$scope.username = "asdf";

		$scope.login = function(){
			console.log("inloggen met: " 
				+ $scope.username + ", " 
				+ $scope.password);

			$http.post('https://www.uscki.nl/?output=mxml',
				{login:$scope.username, password:$scope.password})
			.success(function(data, status, headers, config) {

				console.log(data);
			}).error(function(data, status, headers, config) {

				console.log("Login failed");
			});
		}
	})