$( document ).ready(function() {

  $.get( location.origin + "/api/getpoop", function( res ) {
    var response = $.parseJSON(res)
    $(".totalPoops").html(response.data.id);
    $(".latestTime").html(response.data.date);
  });

  $.get( location.origin + "/api/getfirstpoop", function( res ) {
    var response = $.parseJSON(res)
    $(".earliestDate").html(response.data.date);
  });

});
