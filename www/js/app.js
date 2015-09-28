var appcki = angular.module('appcki', [
    'ionic',
    'appcki.helper',
    'appcki.wilson',
    'appcki.home',
    'appcki.user',
    'appcki.agenda',
    'appcki.news',
    'appcki.planner',
    'appcki.poll',
    // 'appcki.quote',
    'appcki.roephoek',
    // 'appcki.captioncontest',
    // 'appcki.leden',
    'appcki.GoL',
    'appcki.settings',
    'ngStorage',
    'ngRoute',
    'ngAnimate',
]);

appcki
.run(['$ionicPlatform', '$rootScope', 
  function($ionicPlatform, $rootScope) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if(window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    // }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', 
  function(event, toState, toParams, fromState, fromParams){ 
    $rootScope.bodyLayout = toState.name.match(/\.detail$/g) ? 'detailed':'';
  });
}])

.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', 
  function($httpProvider, $stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/login');

  $stateProvider.state('wilson', {
    url: '/wilson',
    templateUrl: 'js/Wilson/wilson.html',
    controller: 'wilsonPageController'
  });

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'js/User/login-details.html',
    controller: 'loginPageController'
  })

  .state('app', { 
    templateUrl: 'js/App/app.html',
    controller: 'appCtrl'
  })
    
  .state('app.home', { 
    templateUrl: 'js/Home/home.html',
    controller: 'homePageCtrl',
  })
  .state('app.home.views',{
    url: "/home",
    views:{
      'agenda':{
        templateUrl: 'js/Agenda/agenda-overview.html', 
        controller: 'appckiAgendaOverview',
        name: 'Agenda',
        state: 'app.agenda-overview',
        home: true,
      },
      'news':{
        templateUrl: 'js/News/news-overview.html',
        controller: 'appckiNewsOverview',
        name: 'Nieuws',
        state: 'app.news-overview',
        home : true,
      },
      'planner':{
        templateUrl: 'js/Planner/planner-overview.html',
        controller: 'appckiPlannerOverview',
        name: 'Vergaderplanner',
        state: 'app.planner-overview',
        home : true,
      },
      'poll':{
        templateUrl: 'js/Poll/poll-overview.html',
        controller: 'appckiPollOverview',
        name: 'Poll',
        state: 'app.poll-overview',
        home : true,
      },
      // 'quote':{
      //   templateUrl : 'js/Quote/quote-overview.html',
      //   controller: 'appckiQuoteOverview',
      //   name: 'Quotes',
      //   state: 'app.quote-overview',
      //   home : false,
      // },
      // 'leden':{
      //   templateUrl : 'js/Leden/leden-overview.html',
      //   controller: 'appckiLedenOverview',
      //   name: 'Leden',
      //   state: 'app.leden-overview',
      //   home : false,
      // },
      // 'captioncontest':{
      //   templateUrl : 'js/Captioncontest/captioncontest-overview.html',
      //   controller: 'appckiCaptioncontestOverview',
      //   name: 'Captioncontest',
      //   state: 'app.captioncontest',
      //   home : false,
      // },
      'roephoek':{
        templateUrl : 'js/Roephoek/roephoek-overview.html',
        controller: 'appckiRoephoekOverview',
        name: 'Roephoek',
        state: 'app.roephoek',
        home : true,
      },
      'GameOfLife':
      {
        templateUrl : 'js/GameOfLife/gameoflife.html',
        controller: 'GameOfLifeController',
        name: 'Conway\'s Game of Life',
        state: 'app.GoL',
        home : false,
      }
    }
  })

  .state('app.agenda-overview', { 
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
  .state('app.planner-overview', { 
    url: '/planner', 
    templateUrl: 'js/Planner/planner-overview.html',
    controller: 'appckiPlannerOverview'
  })
  .state('app.planner-detail', { 
    url: '/planner/detail/:id', 
    templateUrl: 'js/Planner/planner-details.html',
    controller: 'appckiPlannerDetails'
  })
  .state('app.poll-overview', {
    url: '/poll',
    templateUrl: 'js/Poll/poll-overview.html',
    controller: 'appckiPollOverview'
  })
  .state('app.poll-archive', { 
    url: '/poll/archive/:id', 
    templateUrl: 'js/Poll/poll-archive.html',
    controller: 'appckiPollArchive'
  })
  // .state('app.quote-overview', {
  //   url: '/quote',
  //   templateUrl: 'js/Quote/quote-overview.html',
  //   controller: 'appckiQuoteOverview'
  // })
  // .state('app.quote-list', {
  //   url: '/quote/list',
  //   templateUrl: 'js/Quote/quote-list.html',
  //   controller: 'appckiQuoteList'
  // })
  // .state('app.quote-add', {
  //   url: '/quote/add',
  //   templateUrl: 'js/Quote/quote-add.html',
  //   controller: 'appckiQuoteAdd'
  // })
  // .state('app.leden-overview', {
  //   url: '/leden',
  //   templateUrl: 'js/Leden/leden-overview.html',
  //   controller: 'appckiLedenOverview'
  // })
  // .state('app.leden-details', {
  //   url: '/leden/detail/:id',
  //   templateUrl: 'js/Leden/leden-details.html',
  //   controller: 'appckiLedenDetails'
  // })
  .state('app.roephoek', {
    url: '/roephoek',
    templateUrl: 'js/Roephoek/roephoek-overview.html',
    controller: 'appckiRoephoekOverview'
  })
  // .state('app.captioncontest', {
  //   url: '/captioncontest',
  //   templateUrl: 'js/Captioncontest/captioncontest-overview.html',
  //   controller: 'appckiCaptioncontestOverview'
  // })
  .state('app.GoL', {
    url : '/gameoflife',
    templateUrl: 'js/GameOfLife/gameoflife.html',
    controller: 'GameOfLifeController'
  })
  ;

  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', 
  function($q, $location, $localStorage) {
    return {
        'request': function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers['X-AUTH-TOKEN'] = $localStorage.token;
            }
            return config;
        },
        'responseError': function(response) {
            if(response.status === 0 || response.status === 401 || response.status === 403) {
              delete $localStorage.token;
              $location.path('/login');
            }
            return $q.reject(response);
        }
    };
  }]);
}]);