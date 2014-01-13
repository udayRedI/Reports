var databaseSearch = angular.module('DatabaseSearch', ['ui.bootstrap']);
databaseSearch.directive('databaseSearch', function(){
    return{
        restrict: 'E',
        templateUrl: 'templates/SearchTemplate.html',
        controller: 'SearchController'
    }
});
