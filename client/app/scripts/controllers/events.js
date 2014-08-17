'use strict';

/**
 * @ngdoc function
 * @name xdojo.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of Events page
 */
angular.module('xdojo')
  .controller('EventsCtrl', function ($scope, dialogs){
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.launch = function(){
      var dlg = null;
      $scope.confirmed = 'You thought thd';
      dlg = dialogs.confirm('Confirme, por favor!','Isso é ou não?');
      dlg.result.then(function(){

      },function(){
        $scope.confirmed = 'Shame on you for not thinking this is awesome!';
      });
    };
  });
