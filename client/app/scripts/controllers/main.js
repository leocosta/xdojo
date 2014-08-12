'use strict';

/**
 * @ngdoc function
 * @name xdojo.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of main page
 */
angular.module('xdojo')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
