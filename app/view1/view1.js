'use strict';


var app = angular.module('myApp.view1', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http, $interval) {
    $scope.firstName = "John";
    $http.get("view1/topics.json")
    .then(function(response) {
        
      $scope.topics = searchTopic(response)
      $scope.id = getCurrentID()
    });
    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        $scope.theTime = new Date();
    }, 1000);

}); 

function searchTopic(response){
    return response.data;
    
}

function getCurrentID(){

    var date1 = new Date();
    var date2 = new Date(2018, 5, 23, 14, 45, 0, 0);
    var difference = date1.getTime() - date2.getTime();
    var minutesDifference = Math.floor(difference/1000/60);
    var currentID=minutesDifference;
    return currentID;
}

