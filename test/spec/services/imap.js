'use strict';

describe('Service: imap', function () {

  // load the service's module
  beforeEach(module('bettermailApp'));

  // instantiate service
  var imap;
  beforeEach(inject(function (_imap_) {
    imap = _imap_;
  }));

  it('should do something', function () {
    expect(!!imap).toBe(true);
  });

});
