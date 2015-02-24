angular.module('appcki')
	.controller("loginPageController", ['$scope', '$http','$location','UserService',
        function($scope, $http, $location, UserService){	
		// Edit by Jan de Mooij
		// 	Is dit nodig (a)?
		//$scope.username = "asdf";

		$scope.login = function(){
			console.log("inloggen met: " 
				+ $scope.username + ", " 
				+ $scope.password);

            UserService.signin({
                emailaddress: $scope.username,
                password: $scope.password
            },function(){
                $location.path('/home');
                console.log(data);
            },function(){
                console.log("Login failed");
            });


		}
	}])
    ;


	/*
angular.module('angularRestfulAuth')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', 
        function($rootScope, $scope, $location, $localStorage, Main) {

        $scope.signin = function() {
            var formData = {
                emailaddress: $scope.email,
                password: $scope.password
            }

            Main.signin(formData, function(res) {
                if (!res.token) {
                } else {
                    $localStorage.token = res.token;
                    $location.path( "/me" );
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            })
        };


        $scope.me = function() {
            Main.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };

        $scope.logout = function() {
            Main.logout(function() {
                window.location = "/"
            }, function() {
                alert("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;
    }])

.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {

        Main.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
}]);
	*/