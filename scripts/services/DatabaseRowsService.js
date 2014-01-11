var databaseSearch = angular.module('DatabaseSearch');
databaseSearch.factory('DatabaseRowsService', function($rootScope){

    var rows = [],length = 0;
    return{
        addNewRows: function(rows){
            this.rows = rows;
            $rootScope.$broadcast('rows.added');
        },
        addTotalRowsLength: function(length){
            this.length = length;
            $rootScope.$broadcast('rowsLength.added');
        },
        getRows: function(){
            return this.rows;
        },
        getTotalRows: function(){
            return this.length;
        }
    }
});
