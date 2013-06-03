'use strict';

angular.module('bettermailApp')
    .controller('ClusterCtrl', function ($scope, Cluster, $routeParams, $route, mailCache, imap) {
    $scope.singleColumn = false;
    // $scope.selectAnimation = function (column) {
    //     // return 'slideLeft';
    //     if (!column) {
    //         return;
    //     }
    //     if (column.type === 'small') {
    //         return 'slideLeft';
    //     } else {
    //         return 'slideRight';
    //     }
    // };
    //
    $scope.refresh = function(){
        $route.reload();
    };

    $scope.$on('deleteColumn', function(evt, emails){
        $scope.allColumns = $scope.allColumns.filter(function(cluster){
            return cluster.refer !== emails;
        });
        $scope.goTo(0);
    });
    $scope.$on('saveColumn', function(evt, emails, label){
        console.log(emails);
        mailCache.addLabel({name:label});
        mailCache.addLabelToEmails(emails, label);
        imap.addLabel(emails, label);
        $scope.allColumns = $scope.allColumns.filter(function(cluster){
            return cluster.refer !== emails;
        });
        $scope.goTo(0);
    });
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
    $scope.isActive = function (col) {
        return $scope.columns.filter(function (activeCol) {
            return activeCol.refer === col.refer;
        }).length > 0;
    };
    $scope.allColumns = [];

    $scope.columns = $scope.allColumns.slice(0, 4);

    $scope.goTo = function (col) {
        var index;
        if (typeof col === 'number') {
            index = col;
        } else {
            index = Math.min($scope.allColumns.indexOf(col), $scope.allColumns.length - 4);
        }
        if ($scope.allColumns.length <= 4){
            $scope.columns = $scope.allColumns;
        } else {
            $scope.columns = $scope.allColumns.slice(index,  index + 4);
        }
    };
    $scope.selectColumns = function () {
        return true;
    };
    $scope.boxName = $routeParams.label;
    Cluster.divideBox($routeParams.label).then(function (clusters) {
        clusters.forEach(function (cluster) {
            cluster.type = 'smallCluster';
        });
        $scope.columns = clusters.slice(0, 4);
        $scope.allColumns = clusters;
    });
});
