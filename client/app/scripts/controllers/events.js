'use strict';

/**
 * @ngdoc function
 * @name xdojo.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the xdojo
 */
angular.module('xdojo')
  .controller('EventsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
