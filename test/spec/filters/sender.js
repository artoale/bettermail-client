'use strict';

describe('Filter: sender', function () {

  // load the filter's module
  beforeEach(module('bettermailApp'));

  // initialize a new instance of the filter before each test
  var sender;
  beforeEach(inject(function ($filter) {
    sender = $filter('sender');
  }));

  it('should return the input prefixed with "sender filter:"', function () {
    var text = 'angularjs';
    expect(sender(text)).toBe('sender filter: ' + text);
  });

});
