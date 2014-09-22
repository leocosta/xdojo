'use strict';

/**
 * @ngdoc function
 * @name xdojo.controller:EventsNewCtrl
 * @description
 * # EventsNewCtrl
 * Controller of the xdojo
 */
angular.module('xdojo')
  .controller('EventsNewCtrl', function ($scope) {
    $scope.starts = new Date();
    $scope.ends = new Date();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
