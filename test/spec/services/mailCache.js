'use strict';

describe('Service: mailCache', function () {

  // load the service's module
  beforeEach(module('bettermailApp'));

  // instantiate service
  var mailCache;
  beforeEach(inject(function (_mailCache_) {
    mailCache = _mailCache_;
  }));

  it('should do something', function () {
    expect(!!mailCache).toBe(true);
  });

});
