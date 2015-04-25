/*global angular*/
var app = angular.module("scheduleEditor", ['ui.bootstrap']);
var toLengthTwo = function (num) {
    return (num < 10 ? '0' : '') + num;
};

app.directive("scheduler", [function () {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            display: '=ngModel'
        },
        templateUrl: "app/scheduler/scheduler.html",
        controller: function ($scope) {
            $scope.hours = Array.apply(0, new Array(24)).map(function (x, y) { return y; });
            $scope.dates = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th',
                            '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th',
                            '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'];
            $scope.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            $scope.edit = false;
            $scope.editMode = function () {
                $scope.edit = true;
            };
            $scope.models = {
                hourly: {
                    hour: undefined,
                    display: function () {
                        if (!this.hour) return "";
                        return "every " + this.hour + " hours";
                    }
                },
                daily: {
                    hour: undefined,
                    display: function () {
                        if (!this.hour) return "";
                        return "daily at " + toLengthTwo(this.hour) + ":00";
                    }
                },
                monthly: {
                    dates: [],
                    hour: undefined,
                    display: function () {
                        if (!this.dates.length || !this.hour) return "";
                        return this.dates.join(",") + " of month at " + toLengthTwo(this.hour) + ":00";
                    }
                },
                weekly: {
                    weekdays: [],
                    hour: undefined,
                    display: function () {
                        if (!this.weekdays.length || !this.hour) return "";
                        return "Every " + this.weekdays.join(",") + " at " + toLengthTwo(this.hour) + ":00";
                    }
                }
            };
            $scope.onSelectTab = function (tab) {
                $scope.selectedTab = tab;
            };
            $scope.$watch("models", function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.display = $scope.models[$scope.selectedTab].display();
                    console.log($scope.selectedTab, $scope.display);
                }
            }, true);
        }
    };
}]);