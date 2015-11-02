'use strict';

angular.module('xdojoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('event:new', {
        url: '/event/new',
        templateUrl: 'app/event/event.edit.html',
        controller: 'EventEditCtrl'
      });
  });
