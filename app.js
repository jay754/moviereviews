/**

U mad b?
App.js

**/

//module intialization for express
var express = require("express");
var request = require("request");
var analyze = require('Sentimental').analyze //analyze sentimental value for a sentence
//console.log(score("I love you")); //Score: -6, Comparative:-1.5
var app = express();

var port = 2000;
var host = "127.0.0.1";

//for static content
app.use(express.static(__dirname + "/public"));

/* Basic math functions */

//function for finding out the score for the sentence
var score = function(sentence){
  var total = parseInt(analyze(sentence)["score"]);
  return total;
}


//for ratio between the positive and negative scoring
var ratio = function(positive_score, negative_score){
  var ratio = parseFloat(positive_score/negative_score);
  return ratio;
}


//getting the total positive percetage
var positivePercentage = function(total_positive, total_reviews){
  var per = parseFloat(total_positive/total_reviews);
  return per;
}


//getting the total negative percentage
var negativePercentage = function(total_negative, total_reviews){
  var per = parseFloat(total_negative/total_reviews);
  return per;
}

/* Basic Math Functions */

//getting moviedata method
var movieData = function(movie_id, callback){

  request({
    uri: 'http://api.rottentomatoes.com/api/public/v1.0/movies/'+ movie_id +'/reviews.json?apikey=5zpsctg74hteqeqmk9saswwc',
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  }, function(error, response, body){
       //callback(body);
       data = JSON.parse(body);

       callback(data);
    });
}

var setData = function(data, callback){
  var results = { "positive" : 0,
                  "negative" : 0 };

  var limit = 15; //for the first page

  for(var i=1;i<limit;i++){
    total = score(data.reviews[i]["quote"]);

    if(total > 0){
      results["positive"] += 1;
    }
    else{
      results["negative"] += 1;
    }
  }

  callback(results);
}

var getReviews = function(data, callback){

  var results = []

  var limit = 15; //for the first page

  for(var i=1;i<limit;i++){
    NLPs = score(data.reviews[i]["quote"]);
    r = data.reviews[i]["quote"];
    c = data.reviews[i]["critic"];

    results.push({ "reviews" : r,
                   "critics" : c,
                   "NLPscore" : NLPs });
  }

  callback(results);

}

//just the router

app.use(app.router);

/* http request on getting the movie that is wanted */

app.use(function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get("/movies/:movie_name", function(req, res){
  var movie = req.params.movie_name;

  request({
    uri: 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=5zpsctg74hteqeqmk9saswwc&q='+movie,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  }, function(error, response, body){
       var data = JSON.parse(body);
       var id = data.movies[0].id;

       movieData(id, function(r){
         
         setData(r, function(data){

           var rat = ratio(data["positive"], data["negative"]);
           var total_reviews = data["positive"] + data["negative"];
           var positive_score = positivePercentage(data["positive"], total_reviews);
           var negative_score = negativePercentage(data["negative"], total_reviews);
          
           getReviews(r, function(reviews){
             res.json({
               "Data" : data,
               "Positive_to_negative ratio" : rat,
               "positive_score" : positive_score,
               "negative_score" : negative_score,
               "Actual_Reviews" : reviews,
             });
           });
         });
      });
   });
});

//starting the server
app.listen(port, host, function(){
  console.log("server has been started at port " + port);
});