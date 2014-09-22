'use strict';

/**
 * @ngdoc function
 * @name xdojoClientApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the xdojo
 */
angular.module('xdojo')
  .controller('EventsIndexCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
