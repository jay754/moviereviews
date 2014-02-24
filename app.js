/**

U mad b?
App.js

**/

//module intialization for express
var express = require("express");
var reddit = require("redwrap");
var request = require("request");
var analyze = require('Sentimental').analyze //analyze sentimental value for a sentence

//function for finding out the score for the sentence
var score = function(sentence){
  return analyze(sentence)["score"];
}

var redditData = function(callback, username){
	
	request({
	  uri: 'http://www.reddit.com/user/' + username +'/comments.json', 
	  method: "GET",
	  timeout: 10000,
	  followRedirect: true,
	  maxRedirects: 10
	}, function(error, response, body){
	     //callback(body);
	     getData(JSON.parse(body));
	});
}

var getData = function(data){
  console.log(data);
}
//console.log(score("I love you")); //Score: -6, Comparative:-1.5