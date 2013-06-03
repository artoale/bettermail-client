'use strict';

angular.module('bettermailApp', ['ngSanitize','ui.bootstrap'])
    .config(function ($routeProvider) {
    $routeProvider.when('/emails', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        reloadOnSearch: false,
    }).when('/clusters/:label', {
        templateUrl: 'views/main.html',
        controller: 'ClusterCtrl',
        reloadOnSearch: false,
    })
        .when('/labels', {
        templateUrl: 'views/labels.html',
        controller: 'LabelsCtrl'
    })
        .when('/syncmail', {
        templateUrl: 'views/syncmail.html',
        controller: 'SyncmailCtrl'
    })
        .otherwise({
        redirectTo: '/emails'
    });

});
