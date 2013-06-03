'use strict';

describe('Controller: SmallColumnCtrl', function () {

  // load the controller's module
  beforeEach(module('bettermailApp'));

  var SmallColumnCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    SmallColumnCtrl = $controller('SmallColumnCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
