'use strict';

angular.module('bettermailApp', [])
    .config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
        .otherwise({
        redirectTo: '/'
    });
});
