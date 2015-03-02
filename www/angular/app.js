var apiUrl = "http://localhost:4000";

var appcki = angular.module('appcki', [
    'appcki.home',
    'appcki.user',
    'appcki.agenda',
    'ngStorage',
    'ngRoute',
    'ngMaterial',
    'ngMdIcons'
]);

appcki
.config(function($mdThemingProvider) {
  // read https://material.angularjs.org/#/Theming/03_configuring_a_theme
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('blue');
})
.config(['$routeProvider','$httpProvider',
  function($routeProvider, $httpProvider) {

    $routeProvider
      .when('/login', {
        templateUrl: 'angular/User/login-details.html',
        controller: 'loginPageController'
      })
      .when('/home', {
          templateUrl: 'angular/Home/home.html',
          controller: 'homePageCtrl'
      })
      .when('/agenda', {
          templateUrl: 'angular/Agenda/agenda.html',
          controller: 'AgendaPageCtrl',
          reloadOnSearch: false
      })



      .otherwise({
        redirectTo: '/login'
      });

      /*
          $routeProvider.
          .
          when('/signin', {
              templateUrl: 'partials/signin.html',
              controller: 'HomeCtrl'
          }).
          when('/me', {
              templateUrl: 'partials/me.html',
              controller: 'HomeCtrl'
          }).
          otherwise({
              redirectTo: '/'
          });
      */

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', 
      function($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {

                  $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);

  }]);





