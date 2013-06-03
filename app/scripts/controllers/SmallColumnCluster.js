'use strict';

angular.module('bettermailApp')
    .controller('SmallColumnClusterCtrl', function ($scope, $rootScope) {

    $scope.emails = [];
    $scope.watchMail = function (label, uid) {
        // $scope.emails.forEach(function (element) {
        //     if (uid === element.uid) {
        //         element.selected = true;
        //     } else {
        //         element.selected = false;
        //     }
        // });
        // $location.search({
        //     labelId: $scope.label,
        //     mailId: uid,
        // });
        // $scope.click(label,uid);
    };
    $scope.delete = function () {
        $rootScope.$broadcast('deleteColumn', $scope.emails);
    };

    $scope.save = function () {
        if (!$scope.label || $scope.label.trim().length === 0) {
            alert('Choose a name first');
            return;
        }
        $rootScope.$broadcast('saveColumn', $scope.emails, $scope.label);
    };
    $scope.removeEmail = function removeEmail(col) {
        var index = $scope.emails.indexOf(col);
        $scope.emails.splice(index, 1);
    };
    $scope.unseen = function unseen(email) {
        var nonVisto = email.flags.indexOf('\\Seen') < 0;
        return nonVisto;
    };
    $scope.emails = $scope.refer;
    // mailCache.getByLabel($scope.label).then(function (emails) {
    //     $scope.emails = emails;
    // });

});
