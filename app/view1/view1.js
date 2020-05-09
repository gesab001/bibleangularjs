'use strict';


var app = angular.module('myApp.view1', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http, $interval) {
    $scope.xmlBibles = {"Bible_Cebuano": "xml"};
    $scope.booklist = {"Genesis": "1", "Exodus": "2", "Leviticus": "3", "Numbers": "4", "Deuteronomy": "5", "Joshua": "6", "Judges": "7", "Ruth": "8", "1 Samuel": "9", "2 Samuel": "10", "1 Kings": "11", "2 Kings": "12", "1 Chronicles": "13", "2 Chronicles": "14", "Ezra": "15", "Nehemiah": "16", "Esther": "17", "Job": "18", "Psalms": "19", "Proverbs": "20", "Ecclesiastes": "21", "Song of Solomon": "22", "Isaiah": "23", "Jeremiah": "24", "Lamentations": "25", "Ezekiel": "26", "Daniel": "27", "Hosea": "28", "Joel": "29", "Amos": "30", "Obadiah": "31", "Jonah": "32", "Micah": "33", "Nahum": "34", "Habakkuk": "35", "Zephaniah": "36", "Haggai": "37", "Zechariah": "38", "Malachi": "39", "Matthew": "40", "Mark": "41", "Luke": "42", "John": "43", "Acts": "44", "Romans": "45", "1 Corinthians": "46", "2 Corinthians": "47", "Galatians": "48", "Ephesians": "49", "Philippians": "50", "Colossians": "51", "1 Thessalonians": "52", "2 Thessalonians": "53", "1 Timothy": "54", "2 Timothy": "55", "Titus": "56", "Philemon": "57", "Hebrews": "58", "James": "59", "1 Peter": "60", "2 Peter": "61", "1 John": "62", "2 John": "63", "3 John": "64", "Jude": "65", "Revelation": "66"};
    $scope.firstName = "John";
    $scope.code = "text";
    $scope.versions = {"choices":[{"version": "KJV", "code": "kjv"}, {"version": "Cebuano", "code": "Bible_Cebuano"}, {"version": "Basic English", "code": "basicenglish"}, {"version": "Maori", "code": "maori"}, {"version": "Korean", "code": "korean"}, {"version": "Hebrew", "code": "hebrew"}, {"version": "Greek", "code": "textusreceptus"}, {"version": "Tagalog", "code":"tagalog"}]};
    $http.get("view1/topics.json")
    .then(function(response) {
        
      $scope.topics = searchTopic(response)
      $scope.id = getCurrentID()
    });
    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        $scope.theTime = new Date();
        $scope.id = getCurrentID()
    }, 1000);
    $scope.changeVersion = function(code, bookName, chapterNumber, verseNumber, verseID, index) {
        $scope.bookNumber = $scope.booklist[bookName];
        
        if (code in $scope.xmlBibles){
            $scope.url = getXmlURL(code);
            $scope.topics.topics[index]["verses"][verseID].word = getXmlURL(code);
            
            $http({method: "GET", url: $scope.url}).
              then(function(response) {
//                  
                $scope.wordtext = getXmlVerse(response, $scope.bookNumber-1, chapterNumber-1, verseNumber-1);
                $scope.topics.topics[index]["verses"][verseID].word = $scope.wordtext;
              }, function(response) {
                $scope.topics.topics[index]["verses"][verseID].word = response.data || 'Request failed';
            });
        }else{
            $scope.url = getJsonURL(code, $scope.bookNumber);
            $http({method: "GET", url: $scope.url}).
              then(function(response) {
                $scope.topics.topics[index]["verses"][verseID].word = response.data["version"][$scope.bookNumber]["book"][chapterNumber]["chapter"][verseNumber]["verse"];
                $scope.data = response.data;
              }, function(response) {
                $scope.word = response.data || 'Request failed';
            });
        }
        
      };

}); 

function getXmlURL(code){
    var url = "view1/versions/"+code+".xml";
    return url;
}

function getXmlVerse(text, bookNumber, chapterNumber, verseNumber){ 
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(text.data,"text/xml");
//    var bookNumber = 1;
//    var chapterNumber = 1;
//    var verseNumber = 1;
    var books = xmlDoc.getElementsByTagName("BIBLEBOOK");
    var chapters = books[bookNumber].getElementsByTagName("CHAPTER");
    var verses = chapters[chapterNumber].getElementsByTagName("VERS");
    var word = verses[verseNumber].childNodes[0].nodeValue;
    return word;
}

function getJsonURL(code, bookNumber){
    var url = "";

    if(code=="textusreceptus" && bookNumber<40){
        url = "view1/versions/greekot-version.json";
    }else{
        url = "view1/versions/"+code+"-version.json";
    }
    if(code=="hebrew" && bookNumber>39){
        url = "view1/versions/hebrewmodern-version.json";
    }else{
        url = "view1/versions/"+code+"-version.json";
    }
    return url;
}


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

