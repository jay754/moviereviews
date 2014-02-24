//module intialization for express
var express = require("express");
var reddit = require("redwrap");
var analyze = require('Sentimental').analyze //analyze sentimental value for a sentence

//function for finding out the score for the sentence
var score = function(sentence){
	return analyze(sentence)["score"];
}

//console.log(score("I love you")); //Score: -6, Comparative:-1.5

//reddit wrapper test
reddit.r('awww').sort('top').all(function(res){
  res.on('data', function(data, res) {
        console.log(data); //a parsed javascript object of the requested data
         //the raw response data from Reddit
    });

    res.on('error', function(e) {
        console.log(e); //outputs any errors
    });

    res.on('end', function(){
        console.log('All Done');
    }); //outputs a parsed javascript object represeting
});