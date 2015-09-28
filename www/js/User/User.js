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
    .directive("logo", function(){
        var directive = {};
        directive.restrict = "E";
        directive.template = "<div class=\"logo\">";
        // directive.template += "<img id='logo-top-part' ng-class=\"{'logo-animating-topturn': animating}\" src='../../img/top-01.svg' alt='CKI logo top'/>";
        // directive.template += "<img src='../../img/bottom-01-transparant.svg' alt='CKI logo bottom'/>";
        directive.template += "<img id='logo-top-part' ng-class=\"{'logo-animating-topturn': animating}\" src='img/top-01.svg' alt='CKI logo top'/>";
        directive.template += "<img src='img/bottom-01-transparant.svg' alt='CKI logo bottom'/>";
        directive.template += "</div>";
        directive.link = function(s, e, a) {
            var h = Math.round(.01 * window.innerHeight * a.h) + "px";
            e.css({height: h, width: h, 'display': 'block'});
            e.addClass('logo-container');
            // e.addClass('logo-animating-topturn');
        }
        return directive;
    })
	.controller("loginPageController", ['$scope', '$http', '$location', '$ionicPopup','UserService',
        function($scope, $http, $location, $ionicPopup, UserService){	

        $scope.animating = false;
        $scope.credentials = {};

        var ANIMATION_CLASS = 'logo-animating-topturn';

		$scope.login = function(){           
            // Make logo spin
            $scope.animating = true;
            UserService.signin(
              {
                  username: $scope.credentials.username,
                  password: $scope.credentials.password
              },
              function(data){
                  $location.path('/home');
                  $scope.animating = false;
              },
              function(data){
                $scope.animating = false;
                if(data.status == 401)
                {
                  var alertPopup = $ionicPopup.alert({
                    title: 'Inloggen mislukt',
                    template: 'De gegevens kwamen niet overeen (response code 401)'
                  }); 
                } else if (data.status = 403) {
                  var alertPopup = $ionicPopup.alert({
                    title: 'Inloggen mislukt',
                    template: 'De gegevens kwamen niet overeen. (Response code 403)'
                  }); 
                } else if (data.status = 500) {
                  var alertPopup = $ionicPopup.alert({
                    title: 'Inloggen mislukt',
                    template: 'De server kon niet worden gevonden'
                  }); 
                } else if (data.status == 0) {
                  var alertPopup = $ionicPopup.alert({
                    title: 'Inloggen mislukt',
                    template: 'We doen ons best, maar dit is echt apeshit. Heb je internet? Anders ligt het aan ons. Sorry. Response code 0'
                  }); 
                } else {
                  var alertPopup = $ionicPopup.alert({
                    title: 'Inloggen mislukt',
                    template: 'Onbekende fout. Response code %s'.sprintf(data.status)
                  }); 
                }
              }
            );
		};

        $scope.animate = function(){
            $scope.animating = !$scope.animating;
            console.log($scope.animating);
        }
	}]);