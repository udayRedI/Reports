var databaseSearch = angular.module('DatabaseSearch');
databaseSearch.factory('DatabaseRowsService', function($rootScope){

    var rows = [];
    return{
        addNewRows: function(rows){
            this.rows = rows;
            $rootScope.$broadcast('rows.added');
        },
        getRows: function(){
            return this.rows;
        }
    }
});
