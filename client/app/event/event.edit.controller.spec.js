'use strict';

describe('Controller: EventEditCtrl', function () {

  // load the controller's module
  beforeEach(module('xdojoApp'));

  var EventEditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventEditCtrl = $controller('EventEditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
