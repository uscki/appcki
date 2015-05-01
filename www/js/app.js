
var appcki = angular.module('appcki', [
    'ionic',
    'appcki.home',
    'appcki.user',
    'appcki.agenda',
    'appcki.news',
    'appcki.settings',
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
  $urlRouterProvider.otherwise('/home');

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'js/User/login-details.html',
    controller: 'loginPageController'
  })

  .state('app', { 
    templateUrl: 'js/App/app.html', 
  })


  .state('app.home', { 
    templateUrl: 'js/Home/home.html',
  })
  .state('app.home.views',{
    url: "/home",
    views:{
      'agenda':{
        templateUrl: 'js/Agenda/agenda-overview.html', 
        controller: 'appckiAgendaOverview' 
      },
      'news':{
        templateUrl: 'js/News/news-overview.html',
        controller: 'appckiNewsOverview'
      },
      'settings':{
        templateUrl: 'js/Settings/settings-overview.html',
        controller: 'appckiSettingsOverview'
      }

    }
  })


  .state('app.home.agenda-overview', { 
    url: '/agenda',
    templateUrl: 'js/Agenda/agenda-overview.html', 
    controller: 'appckiAgendaOverview' 
  })
  .state('app.agenda-detail', { 
    url: '/agenda/detail/:id', 
    templateUrl: 'js/Agenda/agenda-details.html',
    controller: 'appckiAgendaDetails'
  })
  .state('app.agenda-participants', { 
    url: '/agenda/participants/:id', 
    templateUrl: 'js/Agenda/agenda-participants.html',
    controller: 'appckiAgendaParticipants'
  })
  .state('app.news-overview', { 
    url: '/news', 
    templateUrl: 'js/News/news-overview.html',
    controller: 'appckiNewsOverview'
  })
  .state('app.news-detail', { 
    url: '/news/detail/:id', 
    templateUrl: 'js/News/news-details.html',
    controller: 'appckiNewsDetails'
  })
  .state('app.settings-overview', {
    url: '/settings',
    templateUrl: 'js/Settings/settings-overview.html',
    controller: 'appckiSettingsOverview'
  });
})
.config(['$httpProvider',
  function( $httpProvider ) {

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', 
      function($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                console.log($localStorage);
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {

                  $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    }]);

  }]);

appcki.run(['$rootScope',function($rootScope){
  $rootScope.$on('$stateChangeStart', 
  function(event, toState, toParams, fromState, fromParams){ 
    $rootScope.bodyLayout = toState.name.match(/\.detail$/g) ? 'detailed':'';
  })
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
    template: '<img src="https://www.uscki.nl/?pagina=Media/MediaObject/Photo/Jpeg&mediaFile={{mid}}&size={{size}}" />'
  };
});