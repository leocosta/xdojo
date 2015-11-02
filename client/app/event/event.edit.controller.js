'use strict';

angular.module('xdojoApp')
  .controller('EventEditCtrl', function ($scope, $state, toaster, Event) {
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
          $state.go('events');
        },
        function(err) {
          toaster.pop('error', null, err.data.message);
        });
      }
    };

    $scope.save = save;
    window.$scope = $scope;
  });
