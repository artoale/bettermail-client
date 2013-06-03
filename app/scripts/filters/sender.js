'use strict';

angular.module('bettermailApp')
    .filter('sender', function () {
    return function (input) {
        return input && (input.name || input.address) || 'Unknown';
    };
});
