angular.module('SearchApplication')
.controller("SearchController",function($scope, $http){

    $http({method: 'GET', url: '/Reporting/TableNames.json'}).
        success(function(tableNames, status, headers, config){
            $scope.tables= tableNames.tables;
    });

    $scope.selectTable = function(){
        var tableName = $scope.tableName;
        
        $http({method: 'GET', url: '/Reporting/TableContents.json?tablename='+tableName}).
            success(function(tableContents, status, headers, config){
                $scope.columns = tableContents.columns;
                $scope.rows = tableContents.rows;
                $scope.show = 1;
        });
    }

    $scope.selectTableColumn = function(){
        console.log("Selected table");
    }

    $scope.search = function(){
        var searchable = $scope.searchBox;
        
        $http({method: 'GET', url: '/Reporting/TableContents.json'}).
            success(function(tableContents, status, headers, config){
                $scope.rows = tableContents.rows;
        });
    }
});
