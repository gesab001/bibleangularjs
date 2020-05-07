'use strict';


var app = angular.module('myApp.view1', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http) {
    $scope.firstName = "John";
    $http.get("view1/topics.json")
    .then(function(response) {
        
      $scope.topics = searchTopic(response)
      $scope.id = getCurrentID()
    });

}); 

function searchTopic(response){
    return response.data;
    
}
function getCurrentID(){
    return 1;
}

