'use strict';


var app = angular.module('myApp.view2', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope, $http) {
    $http.defaults.headers.common["api-key"] = "80e4d9935ef1778c43ecd7801bd4ae4c";
    $http.get("https://api.scripture.api.bible/v1/bibles")
    .then(function(response) {
      $scope.bibles = response.data.data;
    });
}); 
