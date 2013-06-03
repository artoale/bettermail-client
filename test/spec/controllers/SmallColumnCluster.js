'use strict';

describe('Controller: SmallColumnClusterCtrl', function () {

  // load the controller's module
  beforeEach(module('bettermailClientApp'));

  var SmallColumnClusterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    SmallColumnClusterCtrl = $controller('SmallColumnClusterCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
