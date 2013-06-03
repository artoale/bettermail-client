'use strict';

angular.module('bettermailApp')
    .factory('mailCache', function (idb, $q, $rootScope) {

    var identity = function (item) {
        return item;
    };

    var open = function () {
        // return idb.open('bettermail', 2, function onUpdate(evt) {
        //     var db = evt.target.result;
        //     console.log('updating db structure');

        //     //Label object store
        //     // db.createObjectStore('boxes', {
        //     //     keyPath: 'name',
        //     // });

        //     //
        //     var emailStore = db.createObjectStore('emails', {
        //         keyPath: 'messageId',
        //     });

        //     emailStore.createIndex('date', 'date', {
        //         unique: false
        //     });

        //     emailStore.createIndex('labels', 'labels', {
        //         multiEntry: true
        //     });

        //     emailStore.createIndex('flags', 'flags', {
        //         multiEntry: true
        //     });
        // });
        return idb.open('bettermail', 3, function onUpdate(evt) {
            var db = evt.target.result;
            console.log('updating db structure');

            //Label object store
            // db.createObjectStore('boxes', {
            //     keyPath: 'name',
            // });

            //
            var homepageStore = db.createObjectStore('homepage', {
                keyPath: 'name',
            });


        });
    };



    var prepareEmail = function (label) {
        return function (email) {
            email.messageId = email.headers['message-id'] || email.uid + Math.random(10);
            if (typeof email.date === 'string') {
                email.date = new Date(email.date);
            }
            if (!email.labels) {
                email.labels = [label];
            } else {
                if (email.indexOf(label) < 0) {
                    email.labels.push(label);
                }
            }
            return email;
        };
    };

    var getByLabel = function (label) {
        return open().then(function (db) {
            var deferred = $q.defer();
            var emails = [];
            // console.log(db);
            //console.log('Opening transaction');
            var trans = db.transaction(['emails'], 'readonly');

            var emailStore = trans.objectStore('emails');
            var index = emailStore.index('labels');

            var cursor = index.openCursor(IDBKeyRange.only(label));
            cursor.onerror = function (event) {
                deferred.reject(event);
            };
            cursor.onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    emails.push(cursor.value);
                    cursor.
                    continue ();
                } else {
                    deferred.resolve(emails);
                    $rootScope.$apply();
                }
            };
            return deferred.promise;
        });
    };
    var addLabel = function (label) {
        return doStore('boxes')(label);
    };
    var getLabels = function () {
        return open().then(function (db) {
            var deferred = $q.defer();
            var labels = [];
            // console.log(db);
            //console.log('Opening transaction');
            var trans = db.transaction(['boxes'], 'readonly');

            var labelStore = trans.objectStore('boxes');

            var cursor = labelStore.openCursor();
            cursor.onerror = function (event) {
                deferred.reject(event);
            };
            cursor.onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    labels.push(cursor.value);
                    cursor.
                    continue ();
                } else {
                    deferred.resolve(labels);
                    $rootScope.$apply();
                }
            };
            return deferred.promise;
        });
    };

    var getHomepageColumns = function () {
        return open().then(function (db) {
            var deferred = $q.defer();
            var labels = [];
            // console.log(db);
            //console.log('Opening transaction');
            var trans = db.transaction(['homepage'], 'readonly');

            var homepageStore = trans.objectStore('homepage');

            var cursor = homepageStore.openCursor();
            cursor.onerror = function (event) {
                deferred.reject(event);
            };
            cursor.onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    labels.push(cursor.value);
                    cursor.
                    continue ();
                } else {
                    deferred.resolve(labels);
                    $rootScope.$apply();
                }
            };
            return deferred.promise;
        });
    }

    var doStore = function (storeName, preProcess) {
        var preProcessCallBack = preProcess || identity;
        return function (item) {
            return open().then(function (db) {
                var deferred = $q.defer();
                var trans = db.transaction([storeName], 'readwrite');

                trans.onerror = function (error) {
                    deferred.reject(error);
                };
                trans.oncomplete = function (evt) {
                    deferred.resolve(evt);
                    $rootScope.$apply();
                };
                var store = trans.objectStore(storeName);

                if (Array.isArray(item)) {
                    item.forEach(function (item) {
                        // console.log('doStore',item);
                        var toput = preProcessCallBack(item);
                        // console.log(toput);
                        store.put(toput);
                    });
                } else {
                    // console.log('saving item: ', item);
                    store.put(preProcessCallBack(item));
                }

                return deferred.promise;
            });
        };
    };
    var addHomepageColumns = function (label) {
        return doStore('homepage')(label);
    };
    var addLabelToEmails = function (emails, label) {
        emails.forEach(function (email) {
            email.labels = email['x-gm-labels'];
            if (email.labels.indexOf(label) < 0) {
                email.labels.push(label);
            }
        });
        return doStore('emails')(emails);
    };

    var storeEmail = function (item, label) {
        return doStore('emails', prepareEmail(label))(item);
    };

    var deleteHomepageColumn = function (name) {
        return open().then(function (db) {
            var deferred = $q.defer();
            var trans = db.transaction(['homepage'], 'readwrite');

            trans.onerror = function (error) {
                deferred.reject(error);
            };
            trans.oncomplete = function (evt) {
                deferred.resolve(evt);
                $rootScope.$apply();
            };
            var store = trans.objectStore('homepage');


            store.delete(name);

            return deferred.promise;
        });
    };

    var removeLabel = function (label) {
        return this.getByLabel(label).then(function (emails) {
            emails.forEach(function (email) {
                var i = email.labels.indexOf(label);
                if (i >= 0) {
                    email.labels.splice(i, 1);
                }
                i = email['x-gm-labels'].indexOf(label);
                if (i >= 0) {
                    email['x-gm-labels'].splice(i, 1);
                }
            });
            deleteHomepageColumn(label);
            return doStore('emails')(emails).then(function () {
                return open().then(function (db) {
                    var deferred = $q.defer();
                    var trans = db.transaction(['boxes'], 'readwrite');

                    trans.onerror = function (error) {
                        deferred.reject(error);
                    };
                    trans.oncomplete = function (evt) {
                        deferred.resolve(evt);
                        $rootScope.$apply();
                    };
                    var store = trans.objectStore('boxes');


                    store.delete(label);

                    return deferred.promise;
                });
            });
        });
    };
    // Public API
    return {
        getLabels: getLabels,
        storeLabels: doStore('boxes'),
        storeEmail: storeEmail,
        getByLabel: getByLabel,
        addLabel: addLabel,
        addLabelToEmails: addLabelToEmails,
        getHomepageColumns: getHomepageColumns,
        addHomepageColumns: addHomepageColumns,
        deleteHomepageColumn: deleteHomepageColumn,
        removeLabel: removeLabel,
    };
});
