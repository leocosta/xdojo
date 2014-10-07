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
    $scope.calendars = {
        starts: false,
        ends: false
    };

    $scope.toggleCalendar = function($event, calendar) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.calendars[calendar] = !$scope.calendars[calendar];
    };
    
  });
