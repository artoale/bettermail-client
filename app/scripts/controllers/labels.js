'use strict';

angular.module('bettermailApp')
    .controller('LabelsCtrl', function ($scope, $http, mailCache, imap) {
    $scope.dosync = function () {
        console.log('Fetching labels information');
        imap.getLabels().then(function (labels) {
            console.log('Storing labels information');
            return mailCache.storeLabels(labels.filter(function (label) {
                return label.hasOwnProperty('name');
            }));
        }).then(function () {
            console.log('sync complete!');
        });
    };

    $scope.removeLabel = function (label) {
        mailCache.removeLabel(label).then(function () {
            mailCache.getLabels().then(function (labels) {
                $scope.labels = labels;
                $scope.newLabel = '';
            });
        });
        imap.removeLabel(label);
    };
    $scope.addLabel = function (label) {
        var labelObj = {
            name: label,
            lastSeenUid: 0,
        };
        mailCache.addLabel(labelObj).then(function () {
            $scope.labels.push(labelObj);
            $scope.newLabel = '';
        });
    };
    // imap.getLabels().then(function (labels){
    //     $scope.labels = labels;
    // });
    mailCache.getLabels().then(function (labels) {
        $scope.labels = labels;
    });

});
