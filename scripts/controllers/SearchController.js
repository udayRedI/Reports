var databaseSearch = angular.module('DatabaseSearch');
databaseSearch.controller("SearchController", [ '$scope', '$http', 'DatabaseFilterService', 'DatabaseRowsService',  'DatabaseColumnsService', function($scope, $http, databaseFilterService, databaseRowsService, databaseColumnsService){

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
        $scope.search(1);
    });

    $scope.search = function(pageNo){
        var queryString = "?"+"tableName="+$scope.tableName+"&pageNo="+pageNo
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

    $scope.$on('columns.added', function(){
        console.log('Columns Added');
        $scope.columns = databaseColumnsService.getColumns();
        $scope.columns.forEach(function(column, columnIndex){
            $scope.searchFields[columnIndex] = '';
        });
    });

    $scope.$watch('currentPage', function(pageNo){
        $scope.search(pageNo);
    });
}]);
