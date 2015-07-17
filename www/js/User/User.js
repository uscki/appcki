angular.module('appcki.user',[])
    .directive("logoDirective", function(){
        return function(s, e, a){
            var h = Math.round(.01 * window.innerHeight * a.h) + "px";
            e.css({height: h, width: h});
        }
    })
    .directive("offsetDirective", function(){
        return function(s, e, a){
            var h = Math.round(.01 * window.innerHeight * a.h) + "px";
            e.css({marginTop: h});
        }
    })
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
                    $location.path('/home');
                    el.removeClass(animation);
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