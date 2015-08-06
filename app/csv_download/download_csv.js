angular.module('csvDownload', [])
    .directive('csv', function () {
        var convertCSV = function (data, delimiter) {
            var csvList = [],
                columns = [];
            data.forEach(function (row) {
                Object.keys(row).forEach(function (key) {
                    if (columns.indexOf(key) === -1) {
                        columns.push(key);
                    }
                });
            });
            csvList.push(columns.join(delimiter));
            data.forEach(function (row) {
                var line = [];
                columns.forEach(function (key) {
                    line.push(row[key]);
                });
                csvList.push(line.join(delimiter));
            });
            return csvList.join('\n');
        };
        var getFileName = function (fileName) {
            if (fileName.indexOf('.csv') === fileName.length - 4) {
                fileName = fileName.substring(0, fileName.length - 4);
            }
            return fileName + '.csv';
        };
        var link = function (scope, element, attr) {
            console.log(attr);
            scope.fileName = getFileName(attr.fileName || 'File');
            scope.delimiter = attr.delimiter || ',';
            scope.download = function () {
                var hiddenElement = document.createElement('a'),
                    csvData = convertCSV(scope.data, scope.delimiter);
                hiddenElement.href = 'data:attachment/csv,' + encodeURI(csvData);
                hiddenElement.target = '_blank';
                hiddenElement.download = scope.fileName;
                hiddenElement.click();
            };
        };
        return {
            restrict: 'AE',
            scope: {
                data: '='
            },
            template: '<button ng-click="download()"><ng-transclude></ng-transclude></button>',
            link: link,
            transclude: true,
            replace: true
        };
    });