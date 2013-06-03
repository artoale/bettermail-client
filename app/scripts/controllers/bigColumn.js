'use strict';

angular.module('bettermailApp')
    .controller('BigColumnCtrl', function ($scope, imap, $location) {
    $scope.label = $scope.refer.label;
    $scope.home = function home() {
        $location.search(null);
    };
    imap.byMessageId( $scope.refer.uid).then(function (res) {
        $scope.body = res.data.html || res.data.text.replace(/(\n|\r\n)/g,'<br>','gm');
        $scope.email = res.data;
        $scope.email.date = new Date($scope.email.date);
    });

});
