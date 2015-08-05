/*global angular*/
angular.module('fileInput', [])
    .directive('fileSelect', function () {
        var link = function (scope, element) {
            element.bind('change', function () {
                scope.$apply(function () {
                    var inputElement = element.children()[0];
                    scope.file = inputElement.files[0];
                });
            });
        };
        return {
            restrict: 'E',
            template: '<input type="file">',
            scope: {
                file: '=ngModel'
            },
            link: link
        };
    });