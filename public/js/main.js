$(function(){
  
  var load = $("#loading");

  load.hide().ajaxStart(function(){
    $(this).show();
  });
  load.ajaxStop(function(){
    $(this).hide();
  });


  $("#b").click(function(){
    
    var movie = $("#movie").val().toLowerCase();
    var results = $("#results");

    $.ajax({

       url: "/movies/"+movie,
       type: "GET",
       dataType: "json",

       success: function(msg){ 
        console.log(msg);
         
         var positive_reviews = msg.Data.positive;
         var negative_reviews = msg.Data.negative;

         $("#header").html("<h1> Stats </h1>");
         $("#positive_reviews").html( "<h3> Positive Reviews: " + positive_reviews+ "</h3>");
         $("#negative_reviews").html( " <h3> Negative Reviews: " + negative_reviews+ "</h3>");

         var limit = msg.Actual_Reviews.length;

         for(var i=0;i<limit;i++){
          var reviews = "<h3> Review: " +msg.Actual_Reviews[i].reviews + "</h3>";
          var critics = "<h3> Critic: " +msg.Actual_Reviews[i].critics + "</h3>";
          var scores = "<h3> Score of the review: " + msg.Actual_Reviews[i].NLPscore + "</h3>"

          $("#reviews").append(critics + reviews + scores + "<hr>");
         }
       },

       error: function(xhr, ajaxOptions, thrownError){
         console.log(xhr.status);
         console.log(thrownError);
       }

    });

  });

});