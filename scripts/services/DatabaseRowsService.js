var databaseSearch = angular.module('DatabaseSearch');
databaseSearch.factory('DatabaseRowsService', function($rootScope){
    return{
        rows: [],
        addNewRows: function(rows){
            this.rows = rows;
            $rootScope.$broadcast('rows.added');
        },
        getRows: function(){
            return this.rows;
        }
    }
});
