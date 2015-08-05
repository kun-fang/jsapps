/*global angular, console*/

angular.module('myApp', ['scheduleEditor', 'fileInput'])
    .controller('myAppCtrl', ['$scope', function ($scope) {
        $scope.test = function () {
            console.log($scope.file);
        };
    }]);