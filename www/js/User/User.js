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
                    $location.path('/home');
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