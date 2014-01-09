var databaseSearch = angular.module('DatabaseSearch');
databaseSearch.factory('DatabaseColumnsService', function($rootScope){
    return{
        columns: [],
        addNewColumns: function(columns){
            this.columns = columns;
            $rootScope.$broadcast('columns.added');
        },
        getColumns: function(){
            return this.columns;
        }
    }
});
