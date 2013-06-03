'use strict';

describe('Service: Cluster', function () {

  // load the service's module
  beforeEach(module('bettermailClientApp'));

  // instantiate service
  var Cluster;
  beforeEach(inject(function (_Cluster_) {
    Cluster = _Cluster_;
  }));

  it('should do something', function () {
    expect(!!Cluster).toBe(true);
  });

});
