'use strict';


var app = angular.module('myApp.view2', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope, $http, $interval) {
    //$http.defaults.headers.common["api-key"] = "80e4d9935ef1778c43ecd7801bd4ae4c";
    $scope.kjv = "";  
    $scope.id = getCurrentID();
    //get booklist
    $http.get("view2/booklist2.json")
    .then(function(response) {
      $scope.bibles = response.data.books;
      $scope.versionoptions = response.data.versionoptions;
      $scope.selectedVersion = "kjv";
         //get kjv bible
        
    }, function(response) {
            $scope.bibles = response.data.books || 'Request failed';
    });
    
    $http.get("view2/booksAndVerses.json")
       .then(function(response) {
         $scope.kjv = response.data;
       }, function(response) {
               $scope.kjv = response.data || 'Request failed';
    });
    $scope.getWord = function (book, id){
        $scope.totalverses = $scope.kjv[book].length;
        $scope.currentID = id%$scope.totalverses;
        $scope.currentVerse = $scope.kjv[book][$scope.currentID];
        $scope.chapterNumber = $scope.currentVerse.chapter;
        $scope.verseNumber = $scope.currentVerse.verse;
        return $scope.currentVerse.word;
    };
    $scope.getTotalVerses = function (){
        return 1;
    }
    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        $scope.theTime = new Date();
        $scope.id = getCurrentID();
    }, 1000);
    //get versions list
//    $http.get("view1/versions_json.json")
//    .then(function(response) {
//
//      $scope.versionslist = response.data.versionslist;
//      $scope.versionoptions = response.data.versionoptions;
//      for (var v of $scope.versionslist){
//          
//          $scope.versions.choices.push({"version": $scope.versionoptions[v], "code": v});
//      }
//      $scope.id = getCurrentID();
//      
//    });
//    $scope.theTime = new Date().toLocaleTimeString();
//    $interval(function () {
//        $scope.theTime = new Date();
//        $scope.id = getCurrentID()
//    }, 1000);
    
 
    
    
}); 

function getCurrentID(){

    var date1 = new Date();
    var date2 = new Date(2018, 5, 23, 14, 45, 0, 0);
    var difference = date1.getTime() - date2.getTime();
    var minutesDifference = Math.floor(difference/1000/60);
    var currentID=minutesDifference;
    return currentID;
}
