'use strict';

angular.module('bettermailApp')
    .directive('column', function ($http, $compile) {

    var templatesUri = {
        big: 'views/column/big.html',
        small: 'views/column/small.html',
        smallCluster: 'views/column/smallCluster.html',
    };

    return {
        restrict: 'E',
        terminal: true,
        scope: {
            refer: '=',
            type: '@',
            click: '=',
        },
        // controller: '@',
        compile: function () {
            return function (scope, element, attr) {
                var changeCounter = 0,
                    childScope;

                var clearContent = function () {
                    if (childScope) {
                        childScope.$destroy();
                        childScope = null;
                    }
                    element.html('');
                };

                var reload = function (type, refer) {
                    var src = templatesUri[type];
                    var thisChangeId = ++changeCounter;

                    if (src) {
                        $http.get(src //, {
                        //cache: $templateCache
                        //}
                        ).success(function (response) {
                            if (thisChangeId !== changeCounter) {
                                return;
                            }

                            if (childScope) {
                                childScope.$destroy();
                            }
                            childScope = scope.$new();
                            if (type === 'small' ) {
                                childScope.label = refer;
                            } else {
                                childScope.refer = refer;
                            }
                            // var contents = angular.element('<div/>').html(response).contents();
                            element.html(response);
                            $compile(element.contents())(childScope);

                            // if (isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                            //     $anchorScroll();
                            // }

                        }).error(function () {
                            if (thisChangeId === changeCounter) {
                                clearContent();
                            }
                        });
                    } else {
                        clearContent();
                    }
                };

                scope.$watch('refer', function (refer) {

                    reload(scope.type, refer);
                });


                scope.$watch('type', function columnWatchAction(type) {
                    reload(type, scope.refer);
                });
            };
        }
    };
});
