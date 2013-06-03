'use strict';

angular.module('bettermailApp')
    .factory('Cluster', function ($http) {
    var params = {
        host: 'http://localhost',
        port: '3000',
    },
        connectionString = params.host + ':' + params.port + '/clusters/';


    // Public API here
    return {
        divideBox: function (boxId) {
            return $http.get(connectionString + boxId).then(function (data) {
                var clusters = [];
                data.data.forEach(function (cluster, index) {
                    if (!cluster) {
                        return;
                    }
                    var newCluster = {};
                    newCluster.refer = cluster;
                    // newCluster.emails = cluster;
                    clusters.push(newCluster);
                });

                return clusters;
            });
        }
    };
});
