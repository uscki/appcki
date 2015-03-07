angular.module('appcki.user',[])
	.controller("loginPageController", ['$scope', '$http','$location','$ionicPopup','UserService',
        function($scope, $http, $location, $ionicPopup, UserService){	

        $scope.credentials = {};

		$scope.login = function(){           
			console.log("inloggen met: " 
				+ $scope.credentials.username + ", " 
				+ $scope.credentials.password);

            UserService.signin(
                {
                    emailaddress: $scope.credentials.username,
                    password: $scope.credentials.password
                },
                function(data){
                    $location.path('/agenda');
                },
                function(){
                    var alertPopup = $ionicPopup.alert({
                       title: 'Inloggen mislukt',
                       template: 'De gegevens kwamen niet overeen'
                    });

                }
            );

		};

	}]);


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