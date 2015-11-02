'use strict';

angular.module('xdojoApp')
  .controller('EventEditCtrl', function ($window, $scope, $state, lodash, toaster, Event) {
    $scope.event = {};
    $scope.errors = {};

    var onLocationChanged = function(){
      var place = this.getPlace();
      var location = convertFromPlace(place);
      $scope.event.location = $scope.event.location || {};
      lodash.merge($scope.event.location, location);

      $scope.map.setCenter(place.geometry.location);
      $scope.map.origin = place.geometry.location;
    };

    var convertFromPlace = function(place){
      var data = {};
      var filterByType = function(type, item){
        return item.types.indexOf(type) > -1;
      };

      var address = lodash.find(place.address_components, filterByType.bind(null, 'route'));
      var sublocality = lodash.find(place.address_components, filterByType.bind(null, 'sublocality'));
      var city = lodash.find(place.address_components, filterByType.bind(null, 'locality'));
      var state = lodash.find(place.address_components, filterByType.bind(null, 'administrative_area_level_1'));
      var country = lodash.find(place.address_components, filterByType.bind(null, 'country'));
      var geoLocation = place.geometry.location;

      if (address){
        data.address = address.long_name;
      }
      if (sublocality){
        data.sublocality = sublocality.long_name;
      }
      if (city){
        data.city = city.long_name;
      }
      if (state){
        data.state = state.short_name;
      }
      if (country){
        data.country = country.long_name;
      }
      if (geoLocation){
        data.geoLocation = {
          lat: geoLocation.lat(),
          lng: geoLocation.lng()
        };
      }
      return data;
    };

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

    $scope.$on('mapInitialized', function(e, map) {
      if ($window.navigator.geolocation) {
          $window.navigator.geolocation.getCurrentPosition(function(position){
            $scope.$apply(function(){
              map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
            });
          });
      }
    });

    $scope.save = save;
    $scope.onLocationChanged = onLocationChanged;

    window.$scope = $scope;
  });
