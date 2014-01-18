var databaseReports = angular.module('DatabaseReports');
databaseReports.factory('DatabaseColumnsService', function($rootScope){
 
    var columns = [];
    return{
        addNewColumns: function(columns){
            this.columns = columns;
            $rootScope.$broadcast('columns.added');
        },
        getColumns: function(){
            return this.columns;
        }
    }
});
