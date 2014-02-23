//module intialization for express
var express = require("express");

//analyze sentimental value for a sentence
var analyze = require('Sentimental').analyze,
    positivity = require('Sentimental').positivity,
    negativity = require('Sentimental').negativity;

console.log(analyze("fucking asshole")["score"]); //Score: -6, Comparative:-1.5