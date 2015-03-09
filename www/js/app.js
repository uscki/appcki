var apiUrl = "http://localhost:4000";

var appcki = angular.module('appcki', [
    'ionic',
    'appcki.home',
    'appcki.user',
    'appcki.agenda',
    'ngStorage',
    'ngRoute',
]);

appcki
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/agenda')

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'js/User/login-details.html',
    controller: 'loginPageController'
  })
  $stateProvider.state('agenda-overview', {
    url: '/agenda',
    templateUrl: 'js/Agenda/agenda-overview.html',
    controller: 'appckiAgendaOverview'
  })
  $stateProvider.state('agenda-details', {
    url: '/agenda/:id',
    templateUrl: 'js/Agenda/agenda-details.html',
    controller: 'appckiAgendaDetails'
  })

})
.config(['$httpProvider',
  function( $httpProvider ) {
/*
    $routeProvider
      .when('/login', {
        templateUrl: 'js/User/login-details.html',
        controller: 'loginPageController'
      })
      .when('/home', {
          templateUrl: 'js/Home/home.html',
          controller: 'homePageCtrl'
      })
      .when('/agenda', {
          templateUrl: 'js/Agenda/agenda.html',
          controller: 'AgendaPageCtrl',
          reloadOnSearch: false
      })


      .otherwise({
        redirectTo: '/login'
      });
      
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



appcki
.directive("appckiPhotoMedia",function(){
  return {
    restrict:'E',
    replace: true,
    scope:{
      mid:'@',
      size:'@'
    },
    template: '<img src="https://www.uscki.nl/?pagina=Media/MediaObject/Photo/Jpeg&mediaFile={{mid}}&size=small" />'
  };
});