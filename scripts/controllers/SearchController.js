angular.module('SearchApplication')
.controller("SearchController", [ '$scope', '$http', 'TableRowsService', 'MultiColumnSearchService', function($scope, $http, tableRowsService, multiColumnSearchService){

    $scope.tableNames = [];
    $scope.tableName;
    $scope.rows = [];
    $scope.searchFields = {};
    $scope.columns = [];
    $scope.resultsList = ["5", "10", "20", "30", "40"];
    $scope.resultsPerPage = "5";
    $scope.totalItems = $scope.rows.length;
    $scope.currentPage = 1;
    $scope.maxSize = 0;
    $scope.currentPage;

    $http({method: 'GET', url: '/Reporting/TableNames.json'}).
        success(function(tableNames, status, headers, config){
            tableNames.forEach(function(table){
                $scope.tableNames.push(table.name);
                $scope.tableName = $scope.tableNames[0];
            });
    });

    $scope.$watch("tableName", function(){
        var tableName = $scope.tableName;
        $http({method: 'GET', url: '/Reporting/TableContents.json?tablename='+tableName}).
            success(function(tableContents, status, headers, config){
                $scope.columns = tableContents.columns;
                tableContents.columns.forEach(function(column){
                    $scope.searchFields[tableContents.columns.indexOf(column)] = '';
                });
                console.log($scope.searchFields);
                $scope.rows = tableContents.rows;
                $scope.show = 1;
        });
    });

    $scope.search = function(pageNo){
        var queryString = "?pageNo="+pageNo
        $scope.columns.forEach(function(column, index){
            if(!column.disabled && $scope.searchFields[index] != ""){
                queryString = queryString + "&"+column.name+"="+$scope.searchFields[index];
            }
        });
        console.log(queryString);
        multiColumnSearchService.search(queryString);
    };

    $scope.$on('rows.added', function(){
        $scope.rows = tableRowsService.getRows();
    });

    $scope.$watch('currentPage', function(pageNo){
        $scope.search(pageNo);
    });
}]);
