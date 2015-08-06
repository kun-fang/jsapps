/*global angular, console*/

angular.module('myApp', ['scheduleEditor', 'fileInput', 'csvDownload'])
    .controller('myAppCtrl', ['$scope', function ($scope) {
        $scope.data = [
            {a: 1, b:2},
            {a: 3, d:5},
            {a: 6, b: 9, c: 0}
        ];
    }]);