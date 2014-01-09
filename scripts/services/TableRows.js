var app = angular.module('SearchApplication');
app.factory('TableRowsService', function($rootScope){
    return{
        rows: [],
        addNewSet: function(rows){
            this.rows = rows;
            $rootScope.$broadcast('rows.added');
        },
        getRows: function(){
            return this.rows;
        }
    }
});
