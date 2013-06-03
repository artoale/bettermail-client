'use strict';

angular.module('bettermailApp')
    .factory('imap', function ($http, $q) {
    var params = {
        host: 'http://localhost',
        port: '3000',
    },
    connectionString = params.host + ':' + params.port + '/boxes/';



    return {
        emailByRange: function (label, from, to) {
            return $http.get(connectionString + label + '/from/' + from + '/to/' + to);
        },
        byLabel: function (label) {
            return $http.get(connectionString + label + '/' + 'all');
        },
        byUid: function (label, uid) {
            return $http.get(connectionString + label + '/' + uid);
        },
        byMessageId: function(msgId) {
            return $http.get(params.host + ':' + params.port + '/emails/' + msgId);
        },
        addLabel: function(emails, label){
            var messageIds = emails.map(function (email) {
                return email.messageId;
            });
            return $http.post(connectionString + label + '/emails/',messageIds);
        },
        removeLabel:function(label){
            return $http.delete(connectionString + label);
        },
        getLabels: function () {
            var deferred = $q.defer();
            $http.get(connectionString).then(function (res) {
                var labels = [],
                    count = 0;
                res.data.forEach(function (label) {
                    $http.get(connectionString + label.name).then(function (response) {
                        labels.push(response.data);
                        count++;
                        if (count === res.data.length - 1) {

                            deferred.resolve(labels);
                        }
                    });
                });
            });
            return deferred.promise;
        }
    };
});
// var getLabel = function getLabel(label) {
//                    $http.get(connectionString + label.name).then(function (response) {
//                        labels.push(response.data);
//                        count++;
//                        if (count === res.data.length - 1) {
//                            deferred.resolve(labels);
//                        } else {
//                            getLabel(res.data[count]);
//                        }
//                    });
//                };
//                getLabel(res.data[0]);
