'use strict';

describe('Controller: LabelsCtrl', function () {

  // load the controller's module
  beforeEach(module('bettermailApp'));

  var LabelsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    LabelsCtrl = $controller('LabelsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
