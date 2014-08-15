'use strict';

angular
  .module('xdojo', [
    'ngCookies',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/events', {
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl'
      })
      .when('/event', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
