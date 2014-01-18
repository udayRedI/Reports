var databaseReports = angular.module('DatabaseReports', []);
databaseReports.directive('databaseReporting', function(){
    return{
        restrict: 'E',
        templateUrl: 'templates/ReportsTemplate.html',
        controller: 'SearchController'
    }
});
