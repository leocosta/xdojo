'use strict';

/**
 * @ngdoc function
 * @name xdojo.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of Events page
 */
angular.module('xdojo')
  .controller('EventsListCtrl', function ($scope, dialogs){
    $scope.events = [
      {id: 1, name: 'III Copa Cara de Leão 2015', starts: '2015-08-01T09:00:00', ends: '2015-08-01T19:00:00', place: 'Vilar dos Teles - Colégio Fluminense'},
      {id: 2, name: 'Copa Hélio Grace', starts: '2015-10-01T09:00:00', ends: '2015-10-02T19:00:00', place: 'Ilha do Governador - Iate Clube Jd. Guanabara'},
      {id: 3, name: 'IV Copa Black Bear', starts: '2015-11-15T09:00:00', ends: '2015-11-15T19:00:00', place: 'São João de Meriti - Clube Social'}
    ];

    $scope.launch = function(){
      var dlg = dialogs.confirm('Confirme, por favor!','Isso é ou não?');
      dlg.result.then(function(){
      },function(){
        $scope.confirmed = 'Shame on you for not thinking this is awesome!';
      });
    };
  });
