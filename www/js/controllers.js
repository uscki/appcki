appcki
	.controller("loginPageController",function($scope, $http){	
		// Edit by Jan de Mooij
		// 	Is dit nodig (a)?
		//$scope.username = "asdf";

		$scope.login = function(){
			console.log("inloggen met: " 
				+ $scope.username + ", " 
				+ $scope.password);

			$http.jsonp(apiUrl + '/login',
				{
					params:{
						login:$scope.username, 
						password:$scope.password,
						format:"jsonp",
						callback:"JSON_CALLBACK"
					}
				})
			.success(function(data, status, headers, config) {
				$("html").append(data);

				console.log(data);
			}).error(function(data, status, headers, config) {

				console.log("Login failed");
			});
		}
	})