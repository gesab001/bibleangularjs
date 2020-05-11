'use strict';


var app = angular.module('myApp.view1', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http, $interval, $filter) {
    $scope.topics = "";
    $scope.versions = {"choices":[{"version": "KJV", "code": "kjv"}, {"version": "Cebuano", "code": "Bible_Cebuano"}, {"version": "Basic English", "code": "basicenglish"}, {"version": "Maori", "code": "maori"}, {"version": "Korean", "code": "korean"}, {"version": "Hebrew", "code": "hebrew"}, {"version": "Greek", "code": "textusreceptus"}, {"version": "Tagalog", "code":"tagalog"}]};
    $scope.selectedVersion = "kjv";

    $http.get("view1/topics2.json")
    .then(function(response) {
      $scope.topics = response.data;
      $scope.topiclist = response.data.topiclist;
      $scope.id = getCurrentID();
      
    });
    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        $scope.theTime = new Date();
        $scope.id = getCurrentID()
    }, 1000);

      $scope.changeVerse = function(selectedVersion, cardName,verseid){
        $scope.word = $scope.topics.topics[cardName].verses[verseid].word[selectedVersion];

        return $scope.word;
      };

}); 

//
//
//function getXmlVerse(text, bookNumber, chapterNumber, verseNumber){ 
//    var parser = new DOMParser();
//    var xmlDoc = parser.parseFromString(text.data,"text/xml");
////    var bookNumber = 1;
////    var chapterNumber = 1;
////    var verseNumber = 1;
//    var books = xmlDoc.getElementsByTagName("BIBLEBOOK");
//    var chapters = books[bookNumber].getElementsByTagName("CHAPTER");
//    var verses = chapters[chapterNumber].getElementsByTagName("VERS");
//    var word = verses[verseNumber].childNodes[0].nodeValue;
//    return word;
//}

function getCurrentID(){

    var date1 = new Date();
    var date2 = new Date(2018, 5, 23, 14, 45, 0, 0);
    var difference = date1.getTime() - date2.getTime();
    var minutesDifference = Math.floor(difference/1000/60);
    var currentID=minutesDifference;
    return currentID;
}

