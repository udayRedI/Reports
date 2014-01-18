var databaseReports = angular.module('DatabaseReports');
databaseReports.factory('DatabaseFilterService', ['$rootScope', '$http', 'DatabaseRowsService', 'DatabaseColumnsService', function($rootScope, $http, databaseRowsService, databaseColumnsService){
    return{
        search : function(queryString){
            $http({method: 'GET', url: '/Reporting/TableContents.json'+queryString}).
            success(function(tableContents, status, headers, config){
                databaseRowsService.addNewRows(tableContents.rows);
                databaseRowsService.addTotalRowsLength(tableContents.totalRows);
                databaseColumnsService.addNewColumns(tableContents.columns);
            });
        }
    }
}]);
