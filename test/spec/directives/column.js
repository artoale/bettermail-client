'use strict';

describe('Directive: column', function () {
  beforeEach(module('bettermailApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<column></column>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the column directive');
  }));
});
