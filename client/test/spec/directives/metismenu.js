'use strict';

describe('Directive: metisMenu', function () {

  // load the directive's module
  beforeEach(module('xdojoClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<metis-menu></metis-menu>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the metisMenu directive');
  }));
});
