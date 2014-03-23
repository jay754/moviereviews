$(function(){
 
  $("#b").click(function(){
    
    var movie = $("#movie").val().toLowerCase();

    $.ajax({

       url: "/movies/"+movie,
       type: "GET",
       dataType: "json",

       success: function(data){
         console.log(data);
       },

       error: function(xhr, ajaxOptions, thrownError){
         console.log(xhr.status);
         console.log(thrownError);
       }

    });

  });

});