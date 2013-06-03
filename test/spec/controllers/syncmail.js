'use strict';

describe('Controller: SyncmailCtrl', function () {

  // load the controller's module
  beforeEach(module('bettermailApp'));

  var SyncmailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    SyncmailCtrl = $controller('SyncmailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
