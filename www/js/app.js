var apiUrl = "http://localhost:4000";

var appcki = angular.module('appcki', [
'ngRoute'
]);


appcki.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/login-details.html',
        controller: 'loginPageController'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);
