var databaseSearch = angular.module('DatabaseSearch');
databaseSearch.factory('DatabaseFilterService', ['$rootScope', '$http', 'DatabaseRowsService', 'DatabaseColumnsService', function($rootScope, $http, databaseRowsService, databaseColumnsService){
    return{
        search : function(queryString){
            $http({method: 'GET', url: '/Reporting/TableContents.json'+queryString}).
            success(function(tableContents, status, headers, config){
                databaseRowsService.addNewRows(tableContents.rows);
                databaseColumnsService.addNewColumns(tableContents.columns);
            });
        }
    }
}]);
