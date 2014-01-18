var databaseReports = angular.module('DatabaseReports');
databaseReports.controller("SearchController", [ '$scope', '$http', 'DatabaseFilterService', 'DatabaseRowsService',  'DatabaseColumnsService', function($scope, $http, databaseFilterService, databaseRowsService, databaseColumnsService){

    $scope.tableNames = [];
    $scope.rows = [];
    $scope.searchFields = {};
    $scope.columns = [];
    $scope.resultsList = ["5", "10", "20", "30", "40"];
    $scope.table = {name:"", resultsPerPage:"5", totalRows:"0", currentPage:"1"};
    $scope.table.resultsPerPage = "5";

    $http({method: 'GET', url: '/Reporting/TableNames.json'}).
        success(function(tableNames, status, headers, config){
            tableNames.forEach(function(table){
                $scope.tableNames.push(table.name);
                $scope.table.name = $scope.tableNames[0];
            });
    });

    $scope.$watch("table.name", function(){
        $scope.search(1);
    });

    $scope.search = function(pageNo){
        var queryString = "?"+"tableName="+$scope.table.name+"&pageNo="+pageNo
        $scope.columns.forEach(function(column, index){
            if(!column.disabled && $scope.searchFields[index] != ""){
                queryString = queryString + "&"+column.name+"="+$scope.searchFields[index];
            }
        });
        console.log(queryString);
        databaseFilterService.search(queryString);
    };

    $scope.$on('rows.added', function(){
        console.log('Rows Added');
        $scope.rows = databaseRowsService.getRows();
    });

    $scope.$on('rowsLength.added', function(){
        console.log('Rows length added');
        $scope.table.totalRows = databaseRowsService.getTotalRows();
    });

    $scope.$on('columns.added', function(){
        console.log('Columns Added');
        $scope.columns = databaseColumnsService.getColumns();
        $scope.columns.forEach(function(column, columnIndex){
            $scope.searchFields[columnIndex] = '';
        });
        console.log($scope.searchFields);
    });

    $scope.$watch('table.currentPage', function(newValue, oldValue){
        $scope.search(newValue);
    });
}]);
