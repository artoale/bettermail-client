'use strict';

angular.module('bettermailApp')
    .controller('SmallColumnCtrl', function ($scope, mailCache, $location, $routeParams,$rootScope) {
    $scope.emails = [];
    $scope.watchMail = function watchMail(label, uid) {
        $scope.emails.forEach(function (element) {
            if (uid === element.messageId) {
                element.selected = true;
            } else {
                element.selected = false;
            }
        });
        $location.search({
            labelId: $scope.label,
            mailId: uid,
        });
        // $scope.click(label,uid);
    };
    $scope.delCol = function delCol() {
        $rootScope.$broadcast('deleteHomepageCol', $scope.label);
    };

    $scope.$on('$routeUpdate', function () {
        console.log('Route update', $routeParams);
        if (!$routeParams.labelId || $routeParams.labelId !== $scope.label) {
            $scope.emails.forEach(function (element) {
                element.selected = false;
            });
        }
    });

    $scope.unseen = function unseen(email) {
        var nonVisto = email.flags.indexOf('\\Seen') < 0;
        return nonVisto;
    };

    mailCache.getByLabel($scope.label).then(function (emails) {
        $scope.emails = emails;
    },function (err){
        console.error(err);
    });

});
