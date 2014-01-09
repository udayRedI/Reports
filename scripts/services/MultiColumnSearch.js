var app = angular.module('SearchApplication');
app.factory('MultiColumnSearchService', ['$rootScope', '$http', 'TableRowsService', function($rootScope, $http, tableRowsService){
    return{
        search : function(queryString){
            $http({method: 'GET', url: '/Reporting/TableContents.json'+queryString}).
            success(function(tableContents, status, headers, config){
                tableRowsService.addNewSet(tableContents.rows);
            });
        }
    }
}]);
