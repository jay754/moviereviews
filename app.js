/**

U mad b?
App.js

**/

//module intialization for express
var express = require("express");
var reddit = require("redwrap");
var request = require("request");
var analyze = require('Sentimental').analyze //analyze sentimental value for a sentence
//console.log(score("I love you")); //Score: -6, Comparative:-1.5

//function for finding out the score for the sentence
var score = function(sentence){
  return analyze(sentence)["score"];
}

var redditData = function(callback, movie_id){

	request({
	  //uri: 'http://www.reddit.com/user/' + username +'/comments.json', 
	  uri: 'http://api.rottentomatoes.com/api/public/v1.0/movies/'+ movie_id +'/reviews.json?apikey=5zpsctg74hteqeqmk9saswwc',
	  method: "GET",
	  timeout: 10000,
	  followRedirect: true,
	  maxRedirects: 10
	}, function(error, response, body){
	     //callback(body);
	     callback(JSON.parse(body));
		//console.log(JSON.parse(body.children[0].data.body));
	});
}

var getData = function(data){

  var results = { 
  	              "positive" : 0,
  				  "negative" : 0
  				};

  console.log(data.reviews[0]["quote"]);
  
  for(var i=1;i<15;i++){
  	total = score(data.reviews[i]["quote"]);

	if(total > 0){
		results["positive"] += 1;
	}
	else{
		results["negative"] += 1;
	}
  }
  
  console.log(results);
  //console.log(score(data.reviews[2]["quote"]));
}

redditData(getData, '770672122');