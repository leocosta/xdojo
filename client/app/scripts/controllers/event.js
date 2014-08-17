'use strict';

/**
 * @ngdoc function
 * @name xdojoClientApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the xdojo
 */
angular.module('xdojo')
  .controller('EventCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
