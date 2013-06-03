'use strict';

angular.module('bettermailApp')
    .controller('SyncmailCtrl', function ($scope, mailCache, imap) {
    $scope.progress = 0;

    mailCache.getLabels().then(function (labels) {
        $scope.labels = labels;
    });
    $scope.syncEurecom = function () {
        $scope.progress = 5;

        var label = $scope.labelToSync;
        var lastEmailId = label.uidnext,
            from = 0,
            to = Math.min(100, lastEmailId);

        if (!label) {
            console.error('No label selected');
            return;
        }
        function doSync() {
            imap.emailByRange(label.name, from, to).then(function (res) {
                // console.log(res.data[0]);
                return mailCache.storeEmail(res.data, label.name);
            }).then(function () {
                if (to < lastEmailId) {
                    from = to;
                    to = Math.min(to + 100, lastEmailId);
                    $scope.progress = Math.ceil(100 * from / lastEmailId);
                    doSync();
                } else {
                    console.log('Sync Complete');
                    $scope.progress = 100;
                }
            });

        }
        doSync();

    };
});
