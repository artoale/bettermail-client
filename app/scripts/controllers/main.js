'use strict';

angular.module('bettermailApp')
    .controller('MainCtrl', function ($scope, $routeParams, $timeout, mailCache) {

    $scope.singleColumn = false;
    $scope.selectAnimation = function (column) {
        // return 'slideLeft';
        if (!column) {
            return;
        }
        if (column.type === 'small') {
            return 'slideLeft';
        } else {
            return 'slideRight';
        }
    };

    $scope.isActive = function (col) {
        return $scope.columns.filter(function (activeCol) {
            return activeCol.refer === col.refer;
        }).length > 0;
    };
    $scope.unmark = function () {
        $scope.allColumns.forEach(function (col) {
            col.mark = false;
        });
    };

    $scope.mark = function (col) {
        var index = Math.min($scope.allColumns.indexOf(col), $scope.allColumns.length - 4);

        $scope.allColumns.forEach(function (col, i) {
            col.mark = false;

            if (i >= index && i < index + 4) {
                col.mark = true;
            }
        });
    };

    $scope.$on('deleteHomepageCol', function(evt, label){
        $scope.delCol(label);
    });

    mailCache.getHomepageColumns().then(function (labels) {
        $scope.allColumns = labels.map(function (label) {
            return {
                type: 'small',
                refer: label.name,
            };
        });
        $scope.columns = $scope.allColumns.slice(0, 4);
        return mailCache.getLabels();
    }).then(function (labels) {
        $scope.labels = labels;
        updateAvailableColumns();
    });

    function updateAvailableColumns() {
        $scope.availableColumns = [];
        var takenNames = $scope.allColumns.map(function (label) {
            return label.refer;
        });

        $scope.labels.forEach(function (label) {
            if (takenNames.indexOf(label.name) < 0) {
                $scope.availableColumns.push({
                    type: 'small',
                    refer: label.name
                });
            }
        });

    }
    $scope.addCol = function (name) {
        $scope.allColumns.push({
            type: 'small',
            refer: name
        });
        if (!$scope.columns || $scope.columns.length < 4) {
            $scope.columns = $scope.allColumns.slice(0, 4);
        }
        $scope.selected = '';
        mailCache.addHomepageColumns({name: name});
        updateAvailableColumns();
    };

    $scope.delCol = function (name) {
        $scope.allColumns = $scope.allColumns.filter(function (col) {
            return col.refer !== name;
        });
        mailCache.deleteHomepageColumn(name).then(function () {
            updateAvailableColumns();
             $scope.columns = $scope.allColumns.slice(0, 4);
        });

    };
    // $scope.allColumns = [{
    //         type: 'small',
    //         refer: 'Eurecom',
    //     }, {
    //         type: 'small',
    //         refer: 'ArtKiller',
    //     }, {
    //         type: 'small',
    //         refer: 'intervieweb',
    //     }, {
    //         type: 'small',
    //         refer: 'Fineco',
    //     }, {
    //         type: 'small',
    //         refer: 'ebay',
    //     }, {
    //         type: 'small',
    //         refer: 'Politecnico',
    //     }];

    // $scope.columns = $scope.allColumns.slice(0, 4);
    // $scope.columns = [{
    //     type: 'small',
    //     refer: 'Eurecom',
    // }, {
    //     type: 'small',
    //     refer: 'ArtKiller',
    // }, {
    //     type: 'small',
    //     refer: 'intervieweb',
    // }, {
    //     type: 'small',
    //     refer: 'Fineco',
    // }];

    $scope.goTo = function (col) {
        var index;
        if (typeof col === 'number') {
            index = col;
        } else {
            index = Math.min($scope.allColumns.indexOf(col), $scope.allColumns.length - 4);
        }
        if ($scope.allColumns.length <= 4) {
            $scope.columns = $scope.allColumns;
        } else {
            $scope.columns = $scope.allColumns.slice(index, index + 4);
        }
    };
    $scope.selectColumns = function (column) {
        if ($scope.singleColumn) {
            return column.type === 'big' || column.refer === $scope.singleColumn;
        } else {
            return column.type === 'small';
        }
    };

    $scope.$on('$routeUpdate', function () {
        console.log('Route update', $routeParams);
        if ($routeParams.labelId && $routeParams.mailId) {
            watchMail($routeParams.labelId, $routeParams.mailId);
            $scope.details = true;
        } else {
            $scope.details = false;
            $scope.singleColumn = false;
            var index = $scope.columns.indexOf(bigColumn);
            if (index >= 0) {
                $timeout(function () {
                    $scope.columns.splice(index, 1);
                }, 1000);

            }
        }
    });

    $scope.open = function () {
        $scope.shouldBeOpen = true;
    };

    $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.shouldBeOpen = false;
    };

    $scope.items = ['item1', 'item2'];

    $scope.opts = {
        backdropFade: true,
        dialogFade: true
    };



    var bigColumn = {
        type: 'big',
        refer: {
            label: null,
            uid: null,
        }
    };

    var watchMail = function watchMail(label, mailUid) {
        var refer = {
            label: label,
            uid: mailUid,
        };
        var index = -1,
            counter = 0;
        $scope.columns.forEach(function (col) {
            if (col.refer === label) {
                index = counter;
            }
            counter++;
        });
        bigColumn.refer = refer;
        if (!$scope.details) {
            $scope.singleColumn = label;
            $scope.columns.splice(index + 1, 0, bigColumn);
        } else {
            index = $scope.columns.indexOf(bigColumn);
            $scope.columns.splice(index, 1, bigColumn);
        }
        // console.log('watchMail: ', $scope.details, $scope.columns);

    };

});
