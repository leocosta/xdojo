'use strict';

describe('Directive: collapsibleBox', function () {

  // load the directive's module
  beforeEach(module('xdojoClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<collapsible-box></collapsible-box>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the collapsibleBox directive');
  }));
});