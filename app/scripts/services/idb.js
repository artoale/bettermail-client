'use strict';

angular.module('bettermailApp')
    .factory('idb', function ($q, $rootScope) {

    function open(name, version, upgradeNeeded) {
        var deferred = $q.defer(),
            vrs = version,
            upgrade = upgradeNeeded;
        if (arguments.length === 2) {
            vrs = undefined;
            upgrade = version;
        }
        //console.log('Opening db: ' + name);
        var req = window.indexedDB.open(name, vrs);
        req.onsuccess = function () {
            //console.log('Db ' + name + 'opened');
            deferred.resolve(this.result);
            $rootScope.$apply();
        };
        req.onerror = function (err) {
            deferred.reject(err);
        };

        req.onupgradeneeded = function (evt) {
            //console.log('Upgrade Needed');
            upgrade(evt);
        };
        return deferred.promise;
    }



    // Public API here
    return {
        open: open,
    };
});
