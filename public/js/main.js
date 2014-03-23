$(function(){
 
  $("#b").click(function(){
    
    var movie = $("#movie").val();
    console.log("movie");

    $.ajax({

       url: "/movies/"+movie,
       type: "GET",
       // data: {movie_data: movie},
       dataType: "json",

       success: function(data){
         console.log(data); //this should start at 1
       },

       error: function(xhr, ajaxOptions, thrownError){
         console.log(xhr.status);
         console.log(thrownError);
       }

    });

  });

})