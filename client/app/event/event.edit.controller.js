'use strict';

angular.module('xdojoApp')
  .controller('EventEditCtrl', function ($scope, $state, Event) {
    $scope.event = {};
    $scope.errors = {};

    var save = function() {
      $scope.submitted = true;

      if($scope.form.$valid) {
        Event.save({
          name: $scope.event.name,
          info: $scope.event.info,
          location: $scope.event.location,
          startsAt: $scope.event.startsAt,
          endsAt: $scope.event.endsAt
        },
        function() {
          // Logged in, redirect to home
          $state.go('events');
        },
        function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.save = save;
  });
