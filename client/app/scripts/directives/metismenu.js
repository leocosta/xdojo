'use strict';

/**
 * @ngdoc directive
 * @name xdojo.directive:metisMenu
 * @description
 * # metisMenu
 */
angular.module('xdojo')
  .directive('metisMenu', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        element.metisMenu();
      }
    };
  });
