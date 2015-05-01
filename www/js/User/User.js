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

        $scope.toggle = function()
        {

           /* var e = $scope.logo.bottom;//$("#logo-bottom");
            var t = $scope.logo.top;//$("#logo-top");
            var y = $scope.logo.topY;//$("#logo-topY");
            var x = $scope.logo.topX;//$("#logo-topX");
            var c = "animating-part-bottom";
            var ct = "animating-part-top";
            if (e.hasClass(c))
            {
                e.removeClass(c);
                t.removeClass(ct);
                y.removeClass(ct + "-y");
                x.removeClass(ct + "-x");
            } else {
                e.addClass(c);
                t.addClass(ct);
                y.addClass(ct + "-y");
                x.addClass(ct + "-x");
            }*/

            var c = "animating-part-bottom";
            $scope.logo.removeClass(c);

            alert("reached");
        };


	}]);