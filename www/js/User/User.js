angular.module('appcki.user',[])
	.controller("loginPageController", ['$scope', '$http', '$location', '$ionicPopup','UserService',
        function($scope, $http, $location, $ionicPopup, UserService){	

        $scope.credentials = {};

        var animation = 'logo-animating-topturn';

		$scope.login = function(){           
            // Make logo spin
            var el = angular.element(document.querySelector('.logo-login'));
            el.addClass(animation);

            UserService.signin(
                {
                    username: $scope.credentials.username,
                    password: $scope.credentials.password
                },
                function(data){
                    el.removeClass(animation);
                    $location.path('/home');
                },
                function(){
                    el.removeClass(animation);
                    var alertPopup = $ionicPopup.alert({
                       title: 'Inloggen mislukt',
                       template: 'De gegevens kwamen niet overeen'
                    });
                }
            );
		};
	}]);